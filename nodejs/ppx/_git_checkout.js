'use strict';

// const fs = require('fs');
// const path = require('path');
const { execSync, exec } = require('child_process');

const ppx = 'c:\\bin\\ppx';

const bn = execSync('git branch | peco').toString().replace(/\n/,'');
if (!bn || bn.indexOf('*') == 0) { process.exit(); }

// レポジトリのルート、現在のブランチ名を取得
// const ditectRoot = ((resolve) => {
//   exec('git rev-parse --show-toplevel', (err, stdout) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     resolve(stdout);
//   });
// });

exec(`${ppx}\\ppbw.exe -k git *stdout "%*input("checkout${bn}" -title:"git.." -select:9 -mode:e -k *completelist -file:%%'list'%%\\GITCOMMAND.TXT)"`, (err, stdout) => {
  if (err) {
    console.error(`${err}`);
    return;
  }
  console.log(stdout);
  // execSync(`c:\\bin\\ppx\\ppbw -c *execute C, *string i,oBRANCH=${stdout}`);
});
