'use strict';
const exec = require('child_process').exec;
exec('git rev-parse --abbrev-ref HEAD | xargs c:/bin/ppx/PPTRAYW -c *setcust _user:u_git_branch=');

sleep(1000).then(() => {
  exec('c:/bin/ppx/PPCW.EXE -r -k %K"@F5');
});

function sleep(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}
