module.exports = function (params, done) {
  var fs = require('fs');
  fs.readdir(params.PATH, function (e, r) {
    if (e) return console.error('Path not found');
    return done({ FILES: r });
  });
};
