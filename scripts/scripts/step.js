module.exports = function (params, done) {
  if (!params.scripts) return done();
  cmd(params.scripts, function (results) {
    done(results);
  });
};
