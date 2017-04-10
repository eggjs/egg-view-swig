'use strict';
const swig = require('swig');

module.exports = app => {
  const config = app.config.swig;
  swig.setDefaults({
    cache: config.cache === true ? 'memory' : false,
  });
  return swig;
};

