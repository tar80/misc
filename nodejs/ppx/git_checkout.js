'use strict';

const fs = require('fs');
const path = require('path');
const { execSync, exec } = require('child_process');

const ppx = 'c:\\bin\\ppx';

const bn = execSync('git branch | peco').toString().replace(/\n/,'');
try {
  if (!bn || bn.indexOf('*') == 0) { throw new Error(); }
} catch (e) { console.log(e); }

// レポジトリのルート、現在のブランチ名を取得
let wd = process.cwd();
const root = path.parse(wd).root;
const arrGitRoot = [];

do {
  const gitroot = path.join(wd, '.git');
  try {
    if (fs.statSync(gitroot).isDirectory()) {
      arrGitRoot.push(wd, gitroot);
      break;
    }
  } catch (e) { null; }

  wd = path.dirname(wd);

} while (wd != root);

const head = path.join(arrGitRoot[1], 'HEAD');
const mt_before = fs.statSync(head).mtimeMs;

exec(`${ppx}\\ppbw -c git %*input("checkout ${bn}" -title:"git.." -select:9 -mode:e -k *completelist -file:%%'list'%%\\GITCOMMAND.TXT) %&`, (e) => {
  if (e) { throw new Error(e); }
  const mt_aftor = fs.statSync(head).mtimeMs;
  if (mt_before != mt_aftor) {
    fs.readFile(head),'utf-8', (e, data) => {
      if (e) { throw new Error(e); }
      const branch = data.replace(/ref: refs\/heads\/(.*)\n/, '$1');
      console.log(branch);
    };
  }
});
// fs.readFile(path.join(arrGitRoot[1], 'HEAD'), 'utf-8', (err, data) => {
//   if (err) { throw err; }
//   execSync('c:\\bin\\ppx\\ppbw -c *execute C, *string i,oBRANCH=' + data.replace(/ref: refs\/heads\/(.*)\n/, '$1'));
// });
// 
