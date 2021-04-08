// #!/usr/bin/env node
//
// argv = [0]node [1]script path
// [2]1:git status
// [3]1:git log  | hash値:git log hash
// [4]1:git diff | hash値:git diff hash
// [5]start | status | log  ;git-mode開始時はstartを指定、status、logはPPcで開くログの種類
// ※%si"oBranch"対象パスのブランチ名、%si"gr"レポジトリのルートパス、%si"gm"(status or log)表示中のログ
// %si"ps",%si"pl,%si"pd"にそれぞれstatus, log, diffのログのパスが設定される

'use strict';

/////////* 初期設定 *////////////

const log_max       = 100;  // git logの取得数
const diff_contents = 1;    // git diffの該当行前後に残す行数

// git-modeに使用するPPcID
const cID  = 'G';

// PPxのディレクトリパス
const ppxDir = 'C:\\bin\\PPx';
// 自分のレポジトリ
const myRepo = 'C:\\bin\\repository\\tar80\\misc';

// gitのリストをまとめておくディレクトリ
const listDir = 'C:\\bin\\HOME\\lists\\git';
// 取得するリストの名前 ※拡張子は自動で付与される
const gStatus = 'gitstatus';
const gLog    = 'gitlog';
const gDiff   = 'gitdiff';

/////////////////////////////////

const fs = require('fs');
const path = require('path');
const { exec, execSync } = require('child_process');
// const iconv = require('iconv-lite');

const arg = (() => {
  if (process.argv.length < 5) {
    console.log('Error:引数が足りません');
    process.exit();
  } else {
    return { 'open': process.argv[5], 'stat': process.argv[2], 'log': process.argv[3], 'diff': process.argv[4] };
  }
})();

// ディレクトリがなければ作る
if (!fs.existsSync(listDir)) { fs.mkdirSync(listDir); }

// レポジトリのルートとプレフィクスを取得
const gi = (() => {
  let wd = process.cwd();

  do{
    const isRoot = path.join(wd, '.git');
    if (fs.existsSync(isRoot)) {
      const pf = (wd === myRepo) ? '_' : '';
      return { 'prefix': pf, 'root': wd };
    }

    wd = path.dirname(wd);
    if (wd === path.parse(wd).root) {
      console.log('not repository.');
      process.exit();
    }
  } while (wd !== path.parse(wd).root);
})();

exec(`${ppxDir}\\pptrayw -c *execute CG,*jumppath -savelocate`, (err) => {
  if (err) { console.log(err); }
});

const pathStat = `${listDir}\\${gi.prefix}${gStatus}.xgit`;
const infoLog = (() => {
  const mode = (arg.log === '1')
    ? { 'add': '', 'str': 'log', 'func': (dist => Make_log(dist)) }
    : { 'add': '_commit', 'str': 'commit', 'func': (dist => Make_log_commit(dist)) };
  return (arg.log === '0')
    ? {
      'refs': '%si"gm"',
      'path': '',
      'func': ''
    }
    : {
      'refs': mode.str,
      'path': `${listDir}\\${gi.prefix}${gLog}${mode.add}.xgit`,
      'func': function () { return mode.func(this.path); }
    };
})();
const pathDiff = (() => {
  const add = (arg.diff === '1') ? '' : '_commit';
  return (arg.diff === '0') ? '' : `${listDir}\\${gi.prefix}${gDiff}${add}.patch`;
})();

const Make_status = (filepath => {
  const result = `;ListFile,;Base=${gi.root}|1,;git-status`.split(',');

  return new Promise((resolve, reject) => {
    exec('git status --porcelain -uall', (err, stdout) => {
      if (err) { reject(err); }
      const arrData = stdout.split('\u000A');

      for (const line of arrData) {
        line.replace(/^(.)(.)\s(.*)/, (match, p1, p2, p3) => {
          const p4 = (setColorNum => {
            setColorNum = new Map([[' ', 1], ['D', 5], ['!', 3]]);
            for (const [key, value] of setColorNum) {
              if (p2.indexOf(key) !== -1) { value; }
            }
            return 8;
          })();
          result.push(`"${p3}","",A:H${p4},C:0.0,L:0.0,W:0.0,S:0.0,R:0.0,H:0,M:0,T:"${p1}${p2}"`);
        });
      }
      resolve((arg.open !== 'start' || arrData.length > 1) ? Write_result(result, filepath, 1) : ['', filepath, 0]);
    });
  });
});

const Make_log = (filepath => {
  const result = `;ListFile,;Base=${gi.root}|1,;git-log`.split(',');

  return new Promise((resolve, reject) => {
    exec(`git log -n${log_max} --all --date=short --graph --format="%h @[%ad]@ %d%s"`, (err, stdout) => {
      if (err) { reject(err); }
      const arrData = stdout.split('\u000A');

      for (const line of arrData) {
        if (line.indexOf('@') === -1) {
          result.push(`"","${line}",`);
          continue;
        }
        line.replace(/^(\W*)(\w*)\s@(.[0-9-]*.)@(.*)/, (match, p1, p2, p3, p4) => {
          const p5 = (setColorNum => {
            setColorNum = new Map([['(HEAD', 10], ['(master', 1], ['(origin', 8]]);
            for (const [key, value] of setColorNum) {
              if (p4.indexOf(key) !== -1) { return value; }
            }
            return 0;
          })();
          result.push(`"${p2}","${p1}",A:H${p5},C:0.0,L:0.0,W:0.0,S:0,R:0.0,H:0,M:0,T:"${p3}${p4}"`);
        });
      }
      resolve(Write_result(result, filepath));
    });
  });
});

const Make_log_commit = (filepath => {
  const result = `;ListFile,;Base=${gi.root}|1,;git-commit`.split(',');

  return new Promise((resolve, reject) => {
    exec(`git log -n1 --date=short --name-status --format="%h (%cr)%s %d" ${arg.log}`, (err, stdout) => {
      if (err) { reject(err); }
      const arrData = stdout.split('\u000A');
      let flag = true;

      for (const line of arrData) {
        if (flag === true) {
          flag = false;
          result.push(`"${line}","**",A:H10,C:0.0,L:0.0,W:0.0,S:0.0,R:0.0,H:0,M:0,T:"${arg.log}"`);
        } else {
          line.replace(/^(.)\t?(.*)/, (match, p1, p2) => {
            const p3 = (setColorNum => {
              setColorNum = new Map([['M', 0], ['D', 5], ['A', 1], [' ', 0]]);
              for (const [key, value] of setColorNum) {
                if (p1.indexOf(key) !== -1) { return value; }
              }
              return 8;
            })();
            result.push(`"${p2}","${p1}",A:H${p3},C:0.0,L:0.0,W:0.0,S:0.0,R:0.0,H:0,M:0,T:"${arg.log}"`);
          });
        }
      }
      resolve(Write_result(result, filepath));
    });
  });
});

const Make_diff = (filepath => {
  return new Promise((resolve, reject) => {
    exec(`git diff -U${diff_contents} --diff-filter=AM --no-prefix --color-words HEAD^ > ${filepath}`, (err) => {
      if (err) { reject(err); }
      console.log(`${filepath} ok.`);
      resolve();
    });
  });
});

const Make_diff_commit = (filepath => {
  return new Promise((resolve, reject) => {
    exec(`git show --no-prefix --color ${arg.diff} > ${filepath}`, (err) => {
      if (err) { reject(err); }
      console.log(`${filepath} ok.`);
      resolve();
    });
  });
});

// 置換結果を書き出して上書き
function Write_result(res, dist, flag) {
  fs.writeFileSync(dist , '');
  const fd = fs.openSync(dist, 'w');
  const buf = res.join('\u000D\u000A');
  // const buf = iconv.encode(res.join('\u000D\u000A'), 'utf16');
  return new Promise((resolve, reject) => {
    fs.write(fd, buf, 0, buf.length, (err) => {
      if (err) { reject(err); }
      console.log(`${dist} ok.`);
      resolve({'path': dist, 'flag': flag});
    });
  });
}

const Async_run = (async () => {
  (arg.open === 'start') ? await start() : await set();
  if (arg.diff !== '0') {
    await (() => { return (arg.diff === '1') ? Make_diff(pathDiff) : Make_diff_commit(pathDiff); })();
  }
});

Async_run().then(() => {
  console.log('complete.');
  process.exit();
});

async function start() {
  if (arg.stat === '1') {
    await (async () => {
      const wResult = await Make_status(pathStat);
      if (wResult.flag === 1) {
        return startPPc(wResult.path, 'status');
      } else {
        console.log('status no change.');
        throw new Error();
      }
    })().then(async () => {
      if (arg.log !== '0') { await infoLog.func(); }
    }).catch(async () => {
      if (arg.log !== '0') {
        await (async () => {
          const wResult = await infoLog.func();
          startPPc(wResult.path, 'log');
        })();
      }
    });
  } else {
    if (arg.log !== '0') {
      await (async () => {
        const wResult = await infoLog.func();
        startPPc(wResult.path, 'log');
      })();
    }
  }
}

async function set() {
  if (arg.stat !== '0') {
    await (async () => {
      const wResult = await Make_status(pathStat);
      if (arg.open === 'status') {
        setLog(wResult.path, 'status', '-update');
      }
      return;
    })();
  }
  if (arg.log !== '0') {
    await (async () => {
      const wResult = await infoLog.func();
      if (arg.open === 'log') {
        return setLog(wResult.path, infoLog.refs);
      }
      return;
    })();
  }
}

function startPPc(dist, mode) {
  const branch = (() => execSync('git rev-parse --abbrev-ref HEAD').toString().replace('\n', ''))();
  const ub = (gi.prefix === '_') ? `*setcust _User:u_git_branch=${branch}` : '';
  exec(`${ppxDir}\\ppcw -r -single -mps -bootid:${cID} ${dist} -k ${ub} %:*string i,oBranch=${branch} %:\
*string i,gm=${mode} %:*string i,ps=${pathStat} %:*string i,pl=${infoLog.path} %:*string i,pd=${pathDiff} %:\
*string i,gr=${gi.root} %:*setcust _User:g_ppcid=${cID} %: *viewstyle -temp git${mode} %:\
*script %'scr'%\\exchangeKeys.js,1,%'cfg'%\\zz3GitKeys.cfg %:*script %'scr'%\\gitModePos.js,c`, (err) => {
    if (err) { console.log(err); }
  });
  return;
}

function setLog(dist, mode, opt) {
  const ps = (arg.stat === '0') ? '' : `*string i,ps=${pathStat}`;
  const pl = (arg.log === '0') ? '' : `*string i,pl=${infoLog.path}`;
  const pd = (arg.diff === '0') ? '' : `*string i,pd=${pathDiff}`;
  return new Promise((resolve, reject) => {
    exec(`${ppxDir}\\ppcw -r -noactive -bootid:${cID} -k *jumppath ${dist} ${opt} -savelocate %:\
*string i,gm=${mode} %:${ps} %:${pl} %:${pd} %:*viewstyle -temp git${mode}` , (err) => {
      if (err) { reject(err); }
      resolve();
    });
  });
}

