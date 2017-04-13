'use strict';

module.exports = app => {
  app.get('/', function* () {
    yield this.render('index', { name: 'swig' });
  });

  app.get('/single', function* () {
    yield this.render('single', { name: 'swig' });
  });

  app.get('/include', function* () {
    yield this.render('include', { name: 'swig' });
  });
};
