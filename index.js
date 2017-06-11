const fs    = require('fs');
const path  = require('path');
const debug = require('debug')('express-simple-route');

module.exports = function (base, app, baseUrl = '/') {
  function loadRoute(dir, app) {
    const files = fs.readdirSync(dir);
    files.forEach(function (e) {
      if (fs.statSync(path.join(dir, e)).isDirectory()) {
        loadRoute(path.join(dir, e), app);
      } else {
        if (e.match(/\.js$/i)) {
          const url = path.relative(base, path.join(dir, e));
          debug("loading route for %s", url);
          const router = require(path.join(base, url));
          if (router.aliases){
            router.aliases.forEach((alias) => {
              debug("%s has alias %s", url, alias);
              app.use(path.join(baseUrl, path.dirname(url), alias), router);
            })
          } else {
            app.use(path.join(baseUrl, url.substr(0, url.length - 3).replace('\\', '/')) //route url
              , router);
          }
        }
      }
    })
  }
  loadRoute(base, app);
};