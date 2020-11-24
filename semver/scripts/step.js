module.exports = function (params, done) {
  var semver = require('semver');
  var yaml = require('yaml');
  var fs = require('fs');
  function check_package(cb) {
    fs.readFile('package.yaml', 'utf-8', function (e, r) {
      if (e)
        return fs.readFile('package.yml', 'utf-8', function (e, r) {
          if (e)
            return fs.readFile('package.json', 'utf-8', function (e, r) {
              if (e) return cb(false);
              cb('package.json', JSON.parse(r));
            });
          cb('package.yml', yaml.parse(r));
        });
      cb('package.yaml', yaml.parse(r));
    });
  }
  if (params.workdir) process.chdir(params.workdir);
  /** check version from a package.yaml */
  check_package(function (name, pkg) {
    if (pkg) global.VERSION = pkg.version;
    if (!global.VERSION) global.VERSION = '0.0.0';
    console.info(`project version was ${global.VERSION}`);
    global.VERSION = semver.inc(global.VERSION, 'patch');
    console.info(`project version bumps to ${global.VERSION}`);
    done({ VERSION: global.VERSION });
  });
};
