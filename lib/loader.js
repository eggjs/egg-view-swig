'use strict';

const fs = require('fs');
const path = require('path');

/**
 * safe template, auto inject csrf and nonce
 */
class SecurityFileLoader {
  constructor(app, viewRoot) {
    this.app = app;
    this.viewRoot = viewRoot;
  }

  /**
   * Resolves `to` to an absolute path or unique identifier. This is used for building correct, normalized, and absolute paths to a given template.
   * @alias resolve
   * @param  {string} to        Non-absolute identifier or pathname to a file.
   * @param  {string} [from]    If given, should attempt to find the <var>to</var> path in relation to this given, known path.
   * @return {string} real path
   */
  resolve(to, from) {
    let dir = this.viewRoot;
    /* istanbul ignore if */
    if (!dir) {
      dir = from ? path.dirname(from) : process.cwd();
    }
    return path.resolve(dir, to);
  }

  /**
   * Loads a single template. Given a unique <var>identifier</var> found by the <var>resolve</var> method this should return the given template.
   * @alias load
   * @param  {string}   identifier  Unique identifier of a template (possibly an absolute path).
   * @param  {function} [cb]        Asynchronous callback function. If not provided, this method should run synchronously.
   * @return {string}               Template source string.
   */
  load(identifier, cb) {
    let ext = path.extname(identifier);
    let filePath = this.resolve(identifier);
    if (!ext) {
      /* istanbul ignore next */
      ext = '.' + (this.app.config.view.ext || 'tpl');
      filePath += ext;
    }
    if (cb) {
      fs.readFile(filePath, 'utf8', (err, content) => {
        /* istanbul ignore if */
        if (err) {
          return cb(err, content);
        }
        cb(err, this.patchFile(content));
      });
    } else {
      return this.patchFile(fs.readFileSync(filePath, 'utf8'));
    }
  }

  patchFile(content) {
    let result = content;
    const config = this.app.config.security;

    // form auto inject `_csrf`, dependence egg-security#app.injectCsrf
    if (!(config.csrf === false || config.csrf.enable === false)) {
      result = this.app.injectCsrf(result);
    }

    // script auto inject `nonce`, dependence egg-security#app.injectNonce
    if (!(config.csp === false || config.csp.enable === false)) {
      result = this.app.injectNonce(result);
    }

    return result;
  }
}

module.exports = SecurityFileLoader;
