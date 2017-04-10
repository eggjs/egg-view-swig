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

  it('should render', done => {
    request(app.callback())
      .get('/')
      .expect(200)
      .expect('Hi,EGG swig render-----egg view plugin for swig', done);
  });

  it('should render error', done => {
    request(app.callback())
      .get('/error')
      .expect(500)
      .expect(/Unexpected tag/, done);
  });

  it('should renderString', done => {
    request(app.callback())
      .get('/renderString')
      .expect(200)
      .expect(/<p>swig renderString<\/p>/, done);
  });
});
