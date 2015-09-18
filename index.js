var fs = require('fs');
var path = require('path');
var debug = require('debug:express-simple-route');

module.exports = function (base, app) {
  function loadRoute(dir, app) {
  	var files = fs.readdirSync(dir);
  	files.forEach(function (e) {
  	  if (fs.statSync(path.join(dir, e)).isDirectory()) {
  	  	loadRoute(path.join(dir, e), app);
  	  } else {
  	  	if (e.match(/\.js$/i)) {
  	  	  var url = path.relative(base, path.join(dir, e));
  	  	  debug("loading route for %s", url);
  	  	  app.use('/' + url.substr(0, url.length - 3).replace('\\', '/') //route url
  	  		, require(path.join(base, url)));
  	  	}
  	  }
  	})
  }
};