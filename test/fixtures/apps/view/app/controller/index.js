'use strict';
exports.render = function* (ctx) {
  yield ctx.render('index.html', {
    data: {
      name: 'swig render',
      description: 'egg view plugin for swig',
    },
  });
};

exports.error = function* (ctx) {
  try {
    yield ctx.render('error.html', {
      data: {
        name: 'swig render',
        description: 'egg view plugin for swig',
      },
    });
  } catch (e) {
    this.status = 500;
    this.body = e.toString();
  }
};

exports.renderString = function* (ctx) {
  ctx.body = yield ctx.renderString('<p>{{ data.name}}</p>', {
    data: {
      name: 'swig renderString',
    },
  });
};
