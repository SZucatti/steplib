module.exports = function (params, done) {
  if (!params.scripts) return done();
  cmd(params.scripts, function (results) {
    console.log(results);
    done(results);
  });
};
