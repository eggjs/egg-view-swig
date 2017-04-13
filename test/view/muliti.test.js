'use strict';

const request = require('supertest');
const mm = require('egg-mock');

describe('test/view/muliti.test.js', () => {
  let app;
  before(() => {
    app = mm.app({
      baseDir: 'apps/muliti',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mm.restore);

  it('should render view2/index.html', () => {
    return request(app.callback())
      .get('/')
      .expect(200)
      .expect('hi, swig');
  });

  it('should render view1/single.html', () => {
    return request(app.callback())
      .get('/single')
      .expect(200)
      .expect('hi, single swig');
  });

  it('should render include', () => {
    return request(app.callback())
      .get('/include')
      .expect(200)
      .expect('include: sub, sub2');
  });
});
