'use strict';

const request = require('supertest');
const mm = require('egg-mock');
const cheerio = require('cheerio');
const assert = require('assert');
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
        const $ = cheerio.load(res.text);
        console.log('>>>res.text', res.text);
        assert.equal($('#form1 input').length, 2);
        assert.equal($('#form1 [name=_csrf]').attr('name'), '_csrf');
        assert.equal($('#form2 input').length, 1);
        assert.equal($('#form2 input').attr('data-a'), 'a');
        assert.notEqual($('#form1 [name=_csrf]').val(), '');
        assert.notEqual($('#form2 [name=_csrf]').val(), '');
        done();
      });
  });

  it('should inject nonce attribute to script tag', done => {
    request(app.callback())
      .get('/security/nonce')
      .expect(200, (err, res) => {
        const $ = cheerio.load(res.text);
        const expectedNonce = $('#input1').val();
        assert.equal($('#script1').attr('nonce'), expectedNonce);
        assert.equal($('#script2').attr('nonce'), expectedNonce);
        assert.equal($('#script3').attr('nonce'), expectedNonce);
        done();
      });
  });
});

