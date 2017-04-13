'use strict';
const path = require('path');

module.exports = appInfo => {
  const config = {};

  config.keys = '123456';

  config.view = {
    defaultViewEngine: 'swig',
    root: [
      path.join(appInfo.baseDir, 'app/no-exist'),
      path.join(appInfo.baseDir, 'app/view1'),
      path.join(appInfo.baseDir, 'app/view2'),
    ].join(','),

    mapping: {
      '.html': 'swig',
    },
  };

  return config;
};
