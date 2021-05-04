//!*script
/* grep結果を出力 */
//
// PPx.Arguments() = (0)出力ファイル, (1)grep|rg|jvgrep:初期選択するgrepコマンド, (2)LF|PPv:初期選択の出力先 (3)1:オプションの再登録, 2:M_grepを削除して終了

'use strict';

const arglen = PPx.Arguments.length;

if (arglen < 3) {
  PPx.Echo('引数が足りません');
  PPx.Quit(-1);
} else if (arglen === 4 && PPx.Arguments(3) === '2') {
  PPx.Execute('*deletecust "M_grep"');
  PPx.SetPopLineMessage('Delete > M_grep');
  PPx.Quit(-1);
}

/////////* 初期設定 *////////////

//マークなしのときの選択対象(")で括るように
const nomark = '"..\\%*name(C,%FD)"';

// use:   使用するコマンド(Boolean)
// cmd:   grepコマンド
// op:    アウトプット(LF|PPv)
// lock:  オプション固定値
// add:   オプション可変値
// complist: オプション補完候補リスト
// ※addの記述はハイフン(-)で始まる場合スペースを１つ入れる
const exec = {
  'grepLF': {
    use: false,
    cmd: 'grep', op: 'LF', lock: '-nH', add: 'irEC1 --color=never', complist: 'GREPOPTION.TXT'
  },
  'grepPPv': {
    use: false,
    cmd: 'grep', op: 'PPv', lock: '-nH', add: 'irEC1 --color=never', complist: 'GREPOPTION.TXT'
  },
  'rgLF': {
    use: true,
    cmd: 'rg', op: 'LF', lock: '-nH --no-heading', add: ' --color never -Li -C1', complist: 'RGOPTION.TXT'
  },
  'rgPPv': {
    use: false,
    cmd: 'rg', op: 'PPv', lock: '-nH --no-heading', add: ' --color always -Li -C1', complist: 'RGOPTION.TXT'
  },
  'jvgrepLF': {
    use: false,
    cmd: 'jvgrep', op: 'LF', lock: '-n -r', add: ' --color=never -iGI -B1', complist: 'JVGREPOPTION.TXT'
  },
  'jvgrepPPv': {
    use: true,
    cmd: 'jvgrep', op: 'PPv', lock: '-n -r', add: ' --color=always -iGI -B1', complist: 'JVGREPOPTION.TXT'
  }
};

/////////////////////////////////

const arg = { 'listfile': PPx.Arguments(0), 'cmd': PPx.Arguments(1), 'output': PPx.Arguments(2) };
const ppxid = PPx.Extract('%n');
const dogrep = exec[arg.cmd + arg.output];
{
  const reload_opt = (arglen === 4) ? PPx.Arguments(3) : null;
  const check_Menu = PPx.Extract('%*getcust(M_grep)').split('\u000D\u000A');
  if (check_Menu.length === 3 || reload_opt === '1') {
    for (const name of Object.keys(exec)) {
      if (exec[name].use === true) {
        PPx.Execute(`%OC *setcust M_grep:${name}=*string i,cmd=${exec[name].cmd} %%: *string i,gopt=${exec[name].lock}${exec[name].add}
        *string e,lock=${exec[name].lock} %%: *string e,add=${exec[name].add} %%: *string e,list=${exec[name].complist}
        *string e,flen=${exec[name].lock.length} %%: *string e,blen=${exec[name].lock.length + exec[name].add.length}
        *string i,output=${exec[name].op}`);
      } else {
        PPx.Execute(`*deletecust "M_grep:${name}"`);
      }
    }
  }
}

// optionボタンの設定
PPx.Execute('*string i,Edit_OptionCmd=*string i,gopt=%%*input("%%se"lock"%%se"add""' +
  ' -title:"Option  ※%%se"lock"は外さないこと※" -mode:e -select:%%se"flen",%%se"blen"' +
  ' -k *completelist /set /file:"%%\'list\'\\%%se"list"")' +
  ' %%: *setcaption [%%si"output"] %%si"cmd" %%si"gopt"  ※\\=\\\\\\\\');

// 検索文字の入力とエスケープ処理
const str = (esc => {
  try {
    PPx.Execute(`*string i,gopt=${dogrep.lock}${dogrep.add}`);
    return esc = PPx.Extract('%*script(%\'scr\'%\\compCode.js,' +
      '"iOs",' +
      '"""%%",' +
      `"[${arg.output}] ${arg.cmd} %%si""gopt"" ※\\=\\\\\\\\",` +
      `"*execute %%%%%%%%M_grep,!${arg.cmd}${arg.output}")`);
  } catch (e) {
    PPx.Execute('*string i,gopt=');
    PPx.Echo(e);
    PPx.Quit(-1);
  } finally {
    if (esc === '') {
      PPx.Execute('*string i,gopt=');
      PPx.Quit(-1);
    }
  }
})();

const tPath = (PPx.EntryMarkCount) ? '%#FCB' : nomark;

if (PPx.Extract('%si"output"') === 'PPv') {
  // 一時的にキャレットモードに変更
  PPx.Execute('*linecust tmod,KV_main:CLOSEEVENT,*setcust XV_tmod=%*getcust(XV_tmod) %%: *linecust tmod,KV_main:CLOSEEVENT,');
  PPx.Execute('*setcust XV_tmod=1');
  // grepの結果をPPvの標準入力で受け取る
  PPx.Execute(`*run -noppb -min %si"cmd" %si"gopt" "${str}" ${tPath}` +
  ` | %0ppvw -bootid:w -esc -document -k *string p,grep=1 %%: *find "${str}"`);

} else {
  // grepの結果を出力
  PPx.Execute(`%Obn %si"cmd" %si"gopt" "${str}" ${tPath} > ${arg.listfile} %&`);

  // リストの整形
  const dirType = PPx.DirectoryType;
  const pDir = PPx.Extract('%FD');
  const result = [
    ';ListFile\u000D\u000A' +
    `;Base=${pDir}|${dirType}\u000D\u000A` +
    `"file","line",A:H5,C:0.0,L:0.0,W:0.0,S:0.0,H:0,M:0,T:"result => ${str}"`
  ];

  const st = PPx.CreateObject('ADODB.stream');
  st.Open;
  st.Type = 2;
  st.Charset = 'UTF-8';
  st.LoadFromFile(arg.listfile);

  const stCnts = st.ReadText(-1).split('\u000A');

  for (const value of stCnts) {
    value.replace(/^([^-:]*)[-:](\d*)([-:])\s*(.*)/, (match, p1, p2, p3, p4) => {
      p1 = (p1 === '') ? p3 : p1.replace(/^\.\.\\.*\//, '');
      p3 = (p3.indexOf(':') !== -1) ? 0 : 3;
      p4 = p4.replace(/"/g, '""');
      result.push(`"${p1}","${p2}",A:H${p3},C:0.0,L:0.0,W:0.0,S:0.0,H:0,M:0,T:"${p4}"`);
    });
  }

  st.Position = 0;
  st.WriteText(result.join('\u000D\u000A'));
  st.SaveToFile(arg.listfile, 2);
  st.Close;
}

// ログの書き出しにunixコマンドを使う ※前後行の色分けは無し
// } else {
//   const dirType = PPx.DirectoryType;
//   const pDir = PPx.Extract('%FD').replace(/\\/g, '\\\\\\\\');
//
//   PPx.Execute(`*run -noppb -cmd -min -wait:later %si"cmd" %si"gopt" "${str}" ${tPath}` +
//     ' | sed -r \'s/^(.*)[:-]([0-9]*)([:-])(.*)/"\\1","\\2",A:H0,C:0.0,L:0.0,W:0.0,S:0.0,H:0,M:0,T:"\\4"/\'' +
//     ' | awk \'BEGIN {print "' +
//       ';ListFile\\r\\n' +
//       `;Base=${pDir}|${dirType}\\r\\n` +
//       `\\"file\\",\\"line\\",A:H5,C:0.0,L:0.0,W:0.0,S:0.0,H:0,M:0,T:\\"result: ${str}\\""} {print $0}'` +
//     ` > ${arg.listfile} %: *wait -run`);
// }

PPx.Execute(`*execute ${ppxid},*string i,cmd= %%: *string i,gopt=`);

