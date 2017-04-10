'use strict';

module.exports = app => {
  app.view.use('swig', require('./lib/view'));
};
