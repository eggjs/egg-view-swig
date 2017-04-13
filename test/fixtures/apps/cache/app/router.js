'use strict';

module.exports = app => {
  app.get('/', function* () {
    yield this.render('index', { name: 'swig' });
  });
};
