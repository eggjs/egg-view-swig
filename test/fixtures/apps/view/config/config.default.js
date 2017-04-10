'use strict';
module.exports = () => {
  const config = {};

  config.keys = '123456';

  config.security = {
    csp: {
      enable: true,
    },
  };

  config.view = {
    defaultViewEngine: 'swig',
    mapping: {
      '.html': 'swig',
    },
  };

  return config;
};
