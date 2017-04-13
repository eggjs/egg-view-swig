'use strict';

module.exports = app => {
  app.get('/', 'index.render');
  app.get('/error', 'index.error');
  app.get('/renderString', 'index.renderString');
  app.get('/renderStringOptions', 'index.renderStringOptions');
  app.get('/renderStringError', 'index.renderStringError');

  app.get('/security/home', '/security', 'security.home');
  app.get('/security/xss', 'security.xss');
  app.post('/security/context', 'security.context');
  app.get('/security/sjs', 'security.sjs');
  app.get('/security/shtml', 'security.shtml');
  app.get('/security/locals', 'security.locals');
  app.get('/security/string', 'security.string');
  app.get('/security/form_csrf', 'security.csrf');
  app.get('/security/nonce', 'security.nonce');
  app.get('/security/watch', 'security.watch');
  app.get('/security/error', 'security.error');
  app.get('/security/filter', 'security.filter');
  app.get('/security/render_string_error', 'security.render_string_error');
};
