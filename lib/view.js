'use strict';

class SwigView {
  constructor(ctx) {
    this.app = ctx.app;
  }

  render(name, locals) {
    return new Promise((resolve, reject) => {
      this.app.swig.renderFile(name, locals, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  renderString(tpl, locals) {
    return new Promise((resolve, reject) => {
      try {
        resolve(this.app.swig.render(tpl, { locals }));
      } catch (err) {
        reject(err);
      }
    });
  }
}

module.exports = SwigView;
