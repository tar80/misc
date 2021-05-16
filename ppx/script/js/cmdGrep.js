//!*script
/* grep結果を出力 */
//
// PPx.Arguments(0) = 出力ファイル
// PPx.Arguments(1) = grep|rg|jvgrep:初期選択grepコマンド
// PPx.Arguments(2) = LF|PPv:初期選択出力先
// PPx.Arguments(3) = 1:オプションの再登録 | 2:M_grepを削除して終了

var argLength = PPx.Arguments.length;

if (argLength < 3) {
  PPx.Echo('引数が足りません');
  PPx.Quit(-1);
} else if (argLength === 4 && PPx.Arguments(3) === '2') {
  PPx.Execute('*deletecust "M_grep"');
  PPx.SetPopLineMessage('Delete > M_grep');
  PPx.Quit(-1);
}

/////////* 初期設定 *////////////

//マークなしのときの選択対象(")で括るように
var nomark = '"..\\%*name(C,%FD)"';

// use:   使用するコマンド(Boolean)
// cmd:   grepコマンド
// op:    アウトプット(LF|PPv)
// lock:  オプション固定値
// add:   オプション可変値
// complist: オプション補完候補リスト
// ※addの記述はハイフン(-)で始まる場合スペースを１つ入れる
var exec = {
  'grepLF': {
    use: false,
    cmd: 'grep', op: 'LF', lock: '-nH', add: 'irEC1 --color=never', complist: 'GREPOPTION.TXT'
  },
  'grepPPv': {
    use: false,
    cmd: 'grep', op: 'PPv', lock: '-nH', add: 'irEC1 --color=never', complist: 'GREPOPTION.TXT'
  },
  'rgLF': {
    use: false,
    cmd: 'rg', op: 'LF', lock: '-nH --no-heading', add: ' --color never -Li -C1', complist: 'RGOPTION.TXT'
  },
  'rgPPv': {
    use: false,
    cmd: 'rg', op: 'PPv', lock: '-nH --no-heading', add: ' --color always -Li -C1', complist: 'RGOPTION.TXT'
  },
  'jvgrepLF': {
    use: true,
    cmd: 'jvgrep', op: 'LF', lock: '-n -r', add: ' --color=never -iGI -B1', complist: 'JVGREPOPTION.TXT'
  },
  'jvgrepPPv': {
    use: true,
    cmd: 'jvgrep', op: 'PPv', lock: '-n -r', add: ' --color=always -iGI -B1', complist: 'JVGREPOPTION.TXT'
  }
};

/////////////////////////////////

var arg = { 'listfile': PPx.Arguments(0), 'cmd': PPx.Arguments(1), 'output': PPx.Arguments(2) };
var ppxid = PPx.Extract('%n');
var dogrep = exec[arg.cmd + arg.output];

var optReload = (argLength === 4) ? PPx.Arguments(3) : null;
var checkMenu = PPx.Extract('%*getcust(M_grep)').split('\u000D\u000A');
if (checkMenu.length === 3 || optReload === '1') {
  for (var name in exec) {
    if (exec[name].use === true) {
      PPx.Execute('*setcust M_grep:' + name + '=*string i,cmd=' + exec[name].cmd +
        ' %%: *string i,gopt=' + exec[name].lock + exec[name].add +
        ' %%: *string e,lock=' + exec[name].lock +
        ' %%: *string e,add=' + exec[name].add +
        ' %%: *string e,list=' + exec[name].complist +
        ' %%: *string e,flen=' + exec[name].lock.length +
        ' %%: *string e,blen=' + exec[name].lock.length + exec[name].add.length +
        ' %%: *string i,output=' + exec[name].op);
    } else {
      PPx.Execute('*deletecust "M_grep:' + name + '"');
    }
  }
}

// optionボタンの設定
PPx.Execute('*string i,Edit_OptionCmd=*string i,gopt=%%*input("%%se"lock"%%se"add""' +
  ' -title:"Option  ※%%se"lock"は外さないこと※" -mode:e -select:%%se"flen",%%se"blen"' +
  ' -k *completelist /set /file:"%%\'list\'\\%%se"list"")' +
  ' %%: *setcaption [%%si"output"] %%si"cmd" %%si"gopt"  ※\\=\\\\\\\\');

// 検索文字の入力とエスケープ処理
var str = (function (esc) {
  try {
    PPx.Execute('*string i,gopt=' + dogrep.lock + dogrep.add);
    return esc = PPx.Extract('%*script(%\'scr\'%\\compCode.js,' +
      '"iOs",' +
      '"""%%",' +
      '"[' + arg.output + '] ' + arg.cmd + ' %%si""gopt"" ※\\=\\\\\\\\",' +
      '"*execute %%%%%%%%M_grep,!' + arg.cmd + arg.output + '")');
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

var targetPath = (PPx.EntryMarkCount) ? '%#FCB' : nomark;

if (PPx.Extract('%si"output"') === 'PPv') {
  // 一時的にキャレットモードに変更
  PPx.Execute('*linecust tmod,KV_main:CLOSEEVENT,*setcust XV_tmod=%*getcust(XV_tmod) %%: *linecust tmod,KV_main:CLOSEEVENT,');
  PPx.Execute('*setcust XV_tmod=1');
  // grepの結果をPPvの標準入力で受け取る
  PPx.Execute('*run -noppb -min %si"cmd" %si"gopt" "' + str + '" ' + targetPath +
    ' | %0ppvw -bootid:w -esc -document -k *string p,grep=1 %%: *find "' + str + '"');
} else {
  // grepの結果をutf16lbで出力
  PPx.Execute('%Obn %si"cmd" %si"gopt" "' + str + '" ' + targetPath + ' | %Os nkf -w16B > "' + arg.listfile + '"');

  // リストの整形
  var fso = PPx.CreateObject('Scripting.FileSystemObject');
  var pDir = PPx.Extract('%FD');
  var dirType = PPx.DirectoryType;
  var result = [
    ';ListFile\u000D\u000A' +
    ';Base=' + pDir + '|' + dirType + '\u000D\u000A' +
    '"file","line",A:H5,C:0.0,L:0.0,W:0.0,S:0.0,H:0,M:0,T:"result => ' + str + '"'
  ];
  var fsoTlist = fso.OpenTextFile(arg.listfile, 1, false, -1);

  while (!fsoTlist.AtEndOfStream) {
    fsoTlist.ReadLine().replace(/^([^-:]*)[-:](\d*)([-:])\s*(.*)/, function (match, p1, p2, p3, p4) {
      p1 = (p1 == '') ? p3 : p1.replace(/^\.\.\\.*\//, '');
      p3 = (p3.indexOf(':') != -1) ? 0 : 3;
      p4 = p4.replace(/"/g, '""');
      result.push('"' + p1 + '","' + p2 + '",A:H' + p3 + ',C:0.0,L:0.0,W:0.0,S:0.0,H:0,M:0,T:"' + p4 + '"');
    });
  }

  // 置換結果を書き出して上書き
  fsoTlist = fso.OpenTextFile(arg.listfile, 2, true, -1);
  fsoTlist.Write(result.join('\u000D\u000A'));
  fsoTlist.Close();
}

PPx.Execute('*execute ' + ppxid + ',*string i,cmd= %%: *string i,gopt=');

