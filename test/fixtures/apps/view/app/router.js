'use strict';

module.exports = app => {

  app.get('/', app.controller.index.render);
  app.get('/error', app.controller.index.error);
  app.get('/renderString', app.controller.index.renderString);

  app.get('/security/home', '/security', app.controller.security.home);
  app.get('/security/xss', app.controller.security.xss);
  app.post('/security/context', app.controller.security.context);
  app.get('/security/sjs', app.controller.security.sjs);
  app.get('/security/shtml', app.controller.security.shtml);
  app.get('/security/locals', app.controller.security.locals);
  app.get('/security/string', app.controller.security.string);
  app.get('/security/form_csrf', app.controller.security.csrf);
  app.get('/security/nonce', app.controller.security.nonce);
  app.get('/security/watch', app.controller.security.watch);
  app.get('/security/error', app.controller.security.error);

  app.get('/security/render_string_error', function* () {
    try {
      this.body = yield this.renderString('{%}');
    } catch (e) {
      this.status = 500;
      this.body = e.toString();
    }
  });

  app.get('/security/filter', function* () {
    this.body = yield this.renderString('{{ user | hello }}', { user: 'egg' });
  });
};
