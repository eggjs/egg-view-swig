'use strict';

const request = require('supertest');
const mm = require('egg-mock');

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
});
