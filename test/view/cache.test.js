'use strict';

const request = require('supertest');
const mm = require('egg-mock');
const fs = require('fs');
const path = require('path');

describe('test/view/cache.test.js', () => {
  let app;
  const templateFilePath = path.join(__dirname, '../fixtures/apps/cache/app/view/index.html');
  const templateContent = fs.readFileSync(templateFilePath, { encoding: 'utf-8' });

  describe('should cache', () => {
    before(() => {
      app = mm.app({
        baseDir: 'apps/cache',
      });
      return app.ready();
    });

    after(() => app.close());
    afterEach(mm.restore);
    afterEach(() => fs.writeFileSync(templateFilePath, templateContent));

    it('use cache', function* () {
      yield request(app.callback())
        .get('/')
        .expect(200, /hi, swig/);

      fs.writeFileSync(templateFilePath, 'TEMPLATE CHANGED');

      yield request(app.callback())
        .get('/')
        .expect(200, /hi, swig/);
    });
  });

  describe('should NOT cache', () => {
    before(() => {
      mm(process.env, 'EGG_SERVER_ENV', 'local');
      app = mm.app({
        baseDir: 'apps/cache',
      });
      return app.ready();
    });

    after(() => app.close());
    afterEach(mm.restore);
    afterEach(() => fs.writeFileSync(templateFilePath, templateContent));

    it('skip cache', function* () {
      yield request(app.callback())
        .get('/')
        .expect(200, /hi, swig/);

      fs.writeFileSync(templateFilePath, 'TEMPLATE CHANGED');

      yield request(app.callback())
        .get('/')
        .expect(200, /TEMPLATE CHANGED/);
    });
  });
});
