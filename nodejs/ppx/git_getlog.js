// #!/usr/bin/env node
// argv = [0]node [1]script path
// [2]1:git status
// [3]1:git log  | hash:git log hash
// [4]1:git diff | hash:git diff hash
// [5]%FD 指定がなければPPc[G]が起動する
// ※argv[5]を空にするとgit-modeが開始され、%si"oBranch"対象パスのブランチ名、%si"gr".レポジトリのルートパス
// %si"gm"(status or log)表示中のログ、%si"ps",%si"pl,%si"pd"にそれぞれstatus,log,diffのログのパスが設定される
/* git-mode start keybind
KC_main = {
^G , *ifmatch !0,0%si"gm" %: *linemessage !"already run git-mode %: *stop
     *setcust _User:g_git_pos=0
     *setcust _User:g_C_back=%*getcust(C_back)
     *setcust _User:g_XC_alac=%*getcust(XC_alac)
     *setcust C_back=H12020E
     *setcust XC_alac=0
     node path\git_getlog.js 1 1 1
}
  */

'use strict';

/////////* 初期設定 *////////////

const log_max       = 100;  // git logの取得数
const diff_contents = 2;    // git diffの該当行前後に残す行数

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
const iconv = require('iconv-lite');

const arg = (() => {
  if (process.argv.length < 5) {
    console.log('Error:引数が足りません');
    process.exit();
  } else {
    return { 'gmpath': process.argv[5], 'stat': process.argv[2], 'log': process.argv[3], 'diff': process.argv[4] };
  }
})();

// ディレクトリがなければ作る
if (!fs.existsSync(listDir)) { fs.mkdirSync(listDir); }

// レポジトリのルートとプレフィクスを取得
const gi = (() => {
  let wd = (() => {
    try {
      process.chdir(arg.gmpath);
    } catch (err) {
      // 処理なし
    }
    return process.cwd();
  })();
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

const pathStat = `${listDir}\\${gi.prefix}${gStatus}.xgit`;
const infoLog = (() => {
  const mode = (arg.log === '1')
    ? { 'add': '', 'str': 'log', 'func': (dist => Make_log(dist)) }
    : { 'add': '_commit', 'str': 'commit', 'func': (dist => Make_log_commit(dist)) };
  return (arg.log === '0')
    ? {
      'str': '%si"gm"',
      'path': '',
      'func': ''
    }
    : {
      'str': mode.str,
      'path': `${listDir}\\${gi.prefix}${gLog}${mode.add}.xgit`,
      'func': function() { return mode.func(this.path); }
    };
})();
const pathDiff = (() => {
  const add = (arg.diff === '1') ? '' : '_commit';
  return (arg.diff === '0') ? '' : `${listDir}\\${gi.prefix}${gDiff}${add}.patch`;
})();

const Make_status = (filepath => {
  const result = `;ListFile,;Base=${gi.root}|1,;git-status`.split(',');

  return new Promise((resolve, reject) => {
    exec('git status --porcelain', (err, stdout) => {
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
      resolve((stdout.length > 3) ? Write_result(result, filepath, 1) : ['', 0]);
    });
  });
});

const Make_log = (filepath => {
  const result = `;ListFile,;Base=${gi.root}|1,;git-log`.split(',');

  return new Promise((resolve, reject) => {
    exec(`git log -n${log_max} --all --date=short --graph --format="%h @[%ad]@%d%s"`, (err, stdout) => {
      if (err) { reject(err); }
      const arrData = stdout.split('\u000A');
      // {
      //   const save_hash = arrData[0].replace(/^.*\s(\w{7})\s.*/, '$1');
      //   const head_hash = execSync('git rev-parse --short head').toString().replace('\u000A', '');
      //   if (save_hash === head_hash) {
      //     console.log('not change log');
      //     return;
      //   }
      // }

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

      for (const line of arrData) {
        line.replace(/^(.)\t?(.*)/, (match, p1, p2) => {
          const p3 = (setColorNum => {
            setColorNum = new Map([['M', 1], ['D', 5], ['A', 10], [' ', 0]]);
            for (const [key, value] of setColorNum) {
              if (p1.indexOf(key) !== -1) { return value; }
            }
            return 8;
          })();
          result.push(`"${p2}","${p1}",A:H${p3},C:0.0,L:0.0,W:0.0,S:0.0,R:0.0,H:0,M:0,T:"${arg.log}"`);
        });
      }
      resolve(Write_result(result, filepath));
    });
  });
});

const Make_diff = (filepath => {
  return new Promise((resolve, reject) => {
    exec(`git diff -U${diff_contents} --diff-filter=AM --no-prefix --color-words > ${filepath}`, (err) => {
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
function Write_result(result, dist, flag) {
  fs.writeFileSync(dist , '');
  const fd = fs.openSync(dist, 'w');
  const buf = iconv.encode(result.join('\u000D\u000A'), 'utf16');
  return new Promise((resolve, reject) => {
    fs.write(fd, buf, 0, buf.length, (err) => {
      if (err) { reject(err); }
      console.log(`${dist} ok.`);
      resolve({'path': dist, 'flag': flag});
    });
  });
}

Async_run().then(() => {
  console.log('complete.');
  process.exit();
});

function execPPx(dist, mode) {
  if (arg.gmpath === undefined) {
    const branch = (() => execSync('git rev-parse --abbrev-ref HEAD').toString().replace('\n', ''))();
    const ub = (gi.prefix === '_') ? `*setcust _User:u_git_branch=${branch} %:` : '';
    exec(`${ppxDir}\\ppcw -r -single -mps -bootid:g ${dist} -k ${ub} *string i,oBranch=${branch} %: *string i,gm=${mode} %: \
      *string i,ps=${pathStat} %: *string i,pl=${infoLog.path} %: *string i,pd=${pathDiff} %: *string i,gr=${gi.root} %: \
      *viewstyle -temp git${mode} %: *script %'scr'%\\exchangeKeys.js,1,%'cfg'%\\zz3GitKeys.cfg`, (err) => {
      if (err) { console.log(err); }
    });
  } else {
    const ps = (arg.stat === '0') ? '' : `*string i,ps=${pathStat}`;
    const pl = (arg.log === '0') ? '' : `*string i,pl=${infoLog.path}`;
    const pd = (arg.diff === '0') ? '' : `*string i,pd=${pathDiff}`;
    exec(`${ppxDir}\\ppcw -r -noactive -bootid:g -k *jumppath ${dist} -savelocate %: *string i,gm=${mode} %: \
      ${ps} %: ${pl} %: ${pd} %: *viewstyle -temp git${mode}` , (err) => {
      if (err) { console.log(err); }
    });
  }
  return;
}

async function Async_run () {
  if (arg.stat === '1') {
    await (async () => {
      const wReslut = await Make_status(pathStat);
      if (wReslut.flag === 1) {
        return execPPx(wReslut.path, 'status');
      } else {
        console.log('status no change.');
        throw new Error();
      }
    })().then(async () => {
      if (arg.log !== '0') { await infoLog.func(); }
    }).catch(async () => {
      if (arg.log !== '0') {
        await new Promise(resolve => {
          resolve(infoLog.func());
        }).then(wReslut => execPPx(wReslut.path, infoLog.str));
      }
    });
  } else {
    if (arg.log !== '0') {
      await new Promise(resolve => {
        resolve(infoLog.func());
      }).then(wReslut => execPPx(wReslut.path, infoLog.str));
    }
  }
  if (arg.diff !== '0') {
    await (() => { return (arg.diff === '1') ? Make_diff(pathDiff) : Make_diff_commit(pathDiff); })();
  }
}

