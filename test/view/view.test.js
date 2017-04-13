'use strict';

const request = require('supertest');
const mm = require('egg-mock');

describe('test/view/view.test.js', () => {
  let app;
  before(() => {
    app = mm.app({
      baseDir: 'apps/view',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mm.restore);

  it('should render', () => {
    return request(app.callback())
      .get('/')
      .expect(200)
      .expect('Hi,EGG swig render-----egg view plugin for swig');
  });

  it('should render error', () => {
    return request(app.callback())
      .get('/error')
      .expect(500)
      .expect(/Unexpected tag/);
  });

  it('should renderString', () => {
    return request(app.callback())
      .get('/renderString')
      .expect(200)
      .expect(/<p>swig renderString<\/p>/);
  });

  it('should renderStringError', () => {
    return request(app.callback())
      .get('/renderStringError')
      .expect(500)
      .expect(/Unexpected tag/);
  });
});
