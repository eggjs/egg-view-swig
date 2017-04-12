'use strict';
const assert = require('assert');

exports.resolveRoot = app => {
  const dirs = app.config.view.root;

  assert(dirs.length, `Can't find the one exist dir from ${dirs.join(',')}`);

  if (dirs.length > 1) {
    app.logger.warn(`swig#resolveRoot app view has more root dirs, will use first dir: ${dirs[0]}`);
  }
  return dirs[0];
};
