'use strict';

const request = require('supertest');
const mm = require('egg-mock');
const cheerio = require('cheerio');
describe('test/view/security.test.js', () => {
  let app;
  before(() => {
    app = mm.app({
      baseDir: 'apps/view',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mm.restore);

  it('should render xss', done => {
    request(app.callback())
    .get('/security/xss')
    .expect(200)
    .expect([
      'http://alipay.com/index.html?a=&lt;div&gt;',
      'http://alipay.com/index.html?a=<div>',
      'http://alipay.com/index.html?a=&lt;div&gt;',
      '&lt;div id=&quot;a&quot;&gt;&#39;a&#39;&lt;/div&gt;',
      '',
    ].join('\n'), done);
  });

  it('should render sjs', done => {
    request(app.callback())
    .get('/security/sjs')
    .expect(200)
    .expect('var foo = "\\x22hello\\x22";\n', done);
  });

  it('should render shtml', done => {
    request(app.callback())
    .get('/security/shtml')
    .expect(200)
    .expect('<img><h1>foo</h1>\n', done);
  });

  it('should inject csrf hidden field in form', done => {
    request(app.callback())
      .get('/security/form_csrf')
      .expect(200, (err, res) => {
        console.log('>>>inject csrf res.text', res.text);
        const $ = cheerio.load(res.text);
        $('#form1 input').length.should.equal(2);
        $('#form1 [name=_csrf]').attr('name').should.equal('_csrf');
        $('#form1 [name=_csrf]').val().length.should.above(1);
        $('#form2 input').length.should.equal(1);
        $('#form2 input').attr('data-a').should.equal('a');
        $('#form2 input').val().length.should.above(1);
        done();
      });
  });
});
