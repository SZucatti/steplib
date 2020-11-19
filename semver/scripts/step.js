module.exports = function (params, done) {
  var semver = require('semver');
  if (!global.VERSION) global.VERSION = '0.0.0';
  global.VERSION = semver.inc(global.VERSION, 'patch');
  console.info(`project version bumps to ${global.VERSION}`);
  done();
};
