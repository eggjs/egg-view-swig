'use strict';

const fs = require('fs');
const path = require('path');

/**
 * safe template, auto inject csrf and nonce
 */
class FileLoader {
  constructor(app) {
    this.app = app;
    this.root = app.config.view.root;
  }

  /**
   * Resolves `to` to an absolute path or unique identifier. This is used for building correct, normalized, and absolute paths to a given template.
   * @param {String} to - Non-absolute identifier or pathname to a file.
   * @param {String} [from] - If given, should attempt to find the `to` path in relation to this given, known path.
   * @return {String} real path
   */
  resolve(to, from) {
    if (path.isAbsolute(to)) return to;

    const dirs = this.root.slice();

    /* istanbul ignore else */
    if (from) {
      dirs.unshift(path.dirname(from));
    }

    for (const dir of dirs) {
      const filePath = path.resolve(dir, to);
      if (fs.existsSync(filePath)) {
        return filePath;
      }
    }
  }

  /**
   * Loads a single template.
   * @param {String} filePath - Unique identifier of a template (egg-view will pass absolute path).
   * @param {Function} [cb] - Asynchronous callback function. If not provided, this method should run synchronously.
   * @return {String} - Template source string.
   */
  load(filePath, cb) {
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
    /* istanbul ignore else */
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

module.exports = FileLoader;
