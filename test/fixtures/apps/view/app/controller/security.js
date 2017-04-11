'use strict';
exports.context = function* (ctx) {
  yield ctx.render('security/js.html', {
    context: {
      a: this.request.body.a,
    },
  });
};

exports.csrf = function* (ctx) {
  yield ctx.render('security/form_csrf.html');
};

exports.empty = function* (ctx) {
  yield ctx.render('security/index.html');
};

exports.error = function* (ctx) {
  try {
    yield ctx.render('security/error.html');
  } catch (e) {
    this.status = 500;
    this.body = e.toString();
  }
};


exports.home = function* (ctx) {
  yield ctx.render('security/index.html', { name: 'mk・2' });
  this.app.swig.invalidateCache();
};

exports.locals = function* (ctx) {
  yield ctx.render('security/locals.html');
};

exports.nonce = function* (ctx) {
  yield ctx.render('security/nonce.html');
};

exports.shtml = function* (ctx) {
  yield ctx.render('security/shtml.html', {
    foo: '<img onload="xx"><h1>foo</h1>',
  });
};

exports.sjs = function* (ctx) {
  const view = 'security/sjs.html';
  yield ctx.render(view, {
    foo: '"hello"',
  });
};

exports.string = function* (ctx) {
  this.body = yield ctx.renderString('{{ context.a }}', {
    context: {
      a: 'templateString',
    },
  });
};


exports.watch = function* (ctx) {
  yield ctx.render('security/watch.html');
};

exports.xss = function* (ctx) {
  yield ctx.render('security/xss.html', {
    url: 'http://alipay.com/index.html?a=<div>',
    html: '<div id="a">\'a\'</div>',
  });
};
