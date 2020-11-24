module.exports = function (params, done) {
  if (params.command) global.cmd('yarn ' + params.command, done);
};
