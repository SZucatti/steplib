module.exports = function (params, done) {
  var p = params.URL.split('://');
  var git_cmd = [
    `git init`,
    `git remote add origin ${p[0]}://oauth2:${params.TOKEN}@${p[1]}`,
    `git fetch origin refs/heads/${params.BRANCH}`,
    `git checkout ${params.BRANCH}`,
    `git merge origin/${params.BRANCH}`,
    `git submodule update --init --recursive`,
  ];
  cmd(git_cmd, function (results) {
    console.log('\nExporting git logs\n');
    var git_cmd = [
      `GIT_CLONE_COMMIT_HASH=>git log -1 --format=%H`,
      `GIT_CLONE_COMMIT_MESSAGE_SUBJECT=>git log -1 --format=%s`,
      `GIT_CLONE_COMMIT_MESSAGE_BODY=>git log -1 --format=%b`,
      `GIT_CLONE_COMMIT_AUTHOR_NAME=>git log -1 --format=%an`,
      `GIT_CLONE_COMMIT_AUTHOR_EMAIL=>git log -1 --format=%ae`,
      `GIT_CLONE_COMMIT_COMMITER_NAME=>git log -1 --format=%cn`,
      `GIT_CLONE_COMMIT_COMMITER_EMAIL=>git log -1 --format=%ce`,
      `GIT_CLONE_COMMIT_COUNT=>git rev-list HEAD --count`,
    ];
    cmd(git_cmd, function (results) {
      done(results);
    });
  });
};
