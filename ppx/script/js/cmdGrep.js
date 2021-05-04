//!*script
/* grep結果を出力 */
//
// PPx.Arguments() = (0)出力ファイル, (1)grep|rg|jvgrep:初期選択するgrepコマンド, (2)LF|PPv:初期選択の出力先 (3)1:オプションの再登録, 2:M_grepを削除して終了

var arglen = PPx.Arguments.length;

if (arglen < 3) {
  PPx.Echo('引数が足りません');
  PPx.Quit(-1);
} else if (arglen === 4 && PPx.Arguments(3) === '2') {
  PPx.Execute('*deletecust "M_grep"');
  PPx.SetPopLineMessage('Delete > M_grep');
  PPx.Quit(-1);
}

/////////* 初期設定 *////////////

// 使用するコマンド
var use_LF_grep    = false;
var use_LF_rg      = false;
var use_LF_jvgrep  = true;
var use_PPv_grep   = false;
var use_PPv_rg     = false;
var use_PPv_jvgrep = true;

// grep_option lockは固定。addの値を変更
// ※addの記述はハイフン(-)で始まる場合スペースを１つ入れる
// grep
var grLF = (use_LF_grep === true)
  ? { 'op': 'LF', 'lock': '-nH', 'add': 'irEC1 --color=never', 'complist': 'GREPOPTION.TXT' } : null;
var grPPv = (use_PPv_grep === true)
  ? { 'op': 'LF', 'lock': '-nH', 'add': 'irEC1 --color=never', 'complist': 'GREPOPTION.TXT' } : null;
// ripgrep
var rgLF = (use_LF_rg === true)
  ? { 'op': 'LF', 'lock': '-nH --no-heading', 'add': ' --color never -Li -C1', 'complist': 'RGOPTION.TXT' } : null;
var rgPPv = (use_PPv_rg === true)
  ? { 'op': 'ppv', 'lock': '-nH --no-heading', 'add': ' --color always -Li -C1', 'complist': 'RGOPTION.TXT' } : null;
// jvgrep
var jvLF = (use_LF_jvgrep === true)
  ? { 'op': 'ppv', 'lock': '-n -r', 'add': ' --color=never -iGI -B1', 'complist': 'JVGREPOPTION.TXT' } : null;
var jvPPv = (use_PPv_jvgrep === true)
  ? { 'op': 'ppv', 'lock': '-n -r', 'add': ' --color=always -iGI -B1', 'complist': 'JVGREPOPTION.TXT' } : null;

//マークなしのときの選択対象(")で括るように
var markless = '"..\\%*name(C,%FD)"';

/////////////////////////////////

var arg = { 'listfile': PPx.Arguments(0), 'cmd': PPx.Arguments(1), 'output': PPx.Arguments(2) };
var ppxid = PPx.Extract('%n');
var dogrep = function() {
  switch(arg.cmd + arg.output) {
    case 'grepLF':    return grLF;
    case 'grepPPv':   return grPPv;
    case 'rgLF':      return rgLF;
    case 'rgPPv':     return rgPPv;
    case 'jvgrepLF':  return jvLF;
    case 'jvgrepPPv': return jvPPv;
  }
}();

var reload_opt = (arglen === 4) ? PPx.Arguments(3) : null;
var check_Mxxx = PPx.Extract('%*getcust(M_grep)').split('\u000D\u000A');
if (check_Mxxx.length === 3 || reload_opt === '1') {
  if (use_LF_grep === true) {
    PPx.Execute('*setcust M_grep:LF_grep=*string i,cmd=grep %%: *string i,gopt=' + grLF.lock + grLF.add +
      ' %%: *string e,lock=' + grLF.lock + ' %%: *string e,add=' + grLF.add + ' %%: *string e,list=' + grLF.complist +
      ' %%: *string e,flen=' + grLF.lock.length + ' %%: *string e,blen=' + grLF.lock.length + grLF.add.length +
      ' %%: *string i,output=LF');
  } else {
    PPx.Execute('*deletecust "M_grep:LF_grep"');
  }
  if (use_PPv_grep === true) {
    PPx.Execute('*setcust M_grep:PPv_grep=*string i,cmd=grep %%: *string i,gopt=' + grPPv.lock + grPPv.add +
      ' %%: *string e,lock=' + grPPv.lock + ' %%: *string e,add=' + grPPv.add + ' %%: *string e,list=' + grPPv.complist +
      ' %%: *string e,flen=' + grPPv.lock.length + ' %%: *string e,blen=' + grPPv.lock.length + grPPv.add.length +
      ' %%: *string i,output=PPv');
  } else {
    PPx.Execute('*deletecust "M_grep:PPv_grep"');
  }
  if (use_LF_rg === true) {
    PPx.Execute('*setcust M_grep:LF_rg=*string i,cmd=rg %%: *string i,gopt=' + rgLF.lock + rgLF.add +
      ' %%: *string e,lock=' + rgLF.lock + ' %%: *string e,add=' + rgLF.add + ' %%: *string e,list=' + rgLF.complist +
      ' %%: *string e,flen=' + rgLF.lock.length + ' %%: *string e,blen=' + rgLF.lock.length + rgLF.add.length +
      ' %%: *string i,output=LF');
  } else {
    PPx.Execute('*deletecust "M_grep:LF_rg"');
  }
  if (use_PPv_rg === true) {
    PPx.Execute('*setcust M_grep:PPv_rg=*string i,cmd=rg %%: *string i,gopt=' + rgPPv.lock + rgPPv.add +
      ' %%: *string e,lock=' + rgPPv.lock + ' %%: *string e,add=' + rgPPv.add + ' %%: *string e,list=' + rgPPv.complist +
      ' %%: *string e,flen=' + rgPPv.lock.length + ' %%: *string e,blen=' + rgPPv.lock.length + rgPPv.add.length +
      ' %%: *string i,output=PPv');
  } else {
    PPx.Execute('*deletecust "M_grep:PPv_rg"');
  }
  if (use_LF_jvgrep === true) {
    PPx.Execute('*setcust M_grep:LF_jvgrep=*string i,cmd=jvgrep %%: *string i,gopt=' + jvLF.lock + jvLF.add +
      ' %%: *string e,lock=' + jvLF.lock + ' %%: *string e,add=' + jvLF.add + ' %%: *string e,list=' + jvLF.complist +
      ' %%: *string e,flen=' + jvLF.lock.length + ' %%: *string e,blen' + jvLF.lock.length + jvLF.add.length +
      ' %%: *string i,output=LF');
  } else {
    PPx.Execute('*deletecust "M_grep:LF_jvgrep"');
  }
  if (use_PPv_jvgrep === true) {
    PPx.Execute('*setcust M_grep:PPv_jvgrep=*string i,cmd=jvgrep %%: *string i,gopt=' + jvPPv.lock + jvPPv.add +
      ' %%: *string e,lock=' + jvPPv.lock + ' %%: *string e,add=' + jvPPv.add + ' %%: *string e,list=' + jvPPv.complist +
      ' %%: *string e,flen=' + jvPPv.lock.length + ' %%: *string e,blen' + jvPPv.lock.length + jvPPv.add.length +
      ' %%: *string i,output=PPv');
  } else {
    PPx.Execute('*deletecust "M_grep:PPv_jvgrep"');
  }
}

// optionボタンの設定
PPx.Execute('*string i,Edit_OptionCmd=*string i,gopt=%%*input("%%se"lock"%%se"add""' +
  ' -title:"Option  ※%%se"lock"は外さないこと※" -mode:e -select:%%se"flen",%%se"blen"' +
  ' -k *completelist /set /file:"%%\'list\'\\%%se"list"")' +
  ' %%: *setcaption [%%si"output"] %%si"cmd" %%si"gopt"  ※\\=\\\\\\\\');

// 検索文字の入力とエスケープ処理
var str = function (esc) {
  try {
    PPx.Execute('*string i,gopt=' + dogrep.lock + dogrep.add);
    return esc = PPx.Extract('%*script(%\'scr\'%\\compCode.js,' +
      '"iOs",' +
      '"""%%",' +
      '"[' + arg.output + '] ' + arg.cmd + ' %%si""gopt"" ※\\=\\\\\\\\",' +
      '"*execute %%%%%%%%M_grep,!' + arg.output + '_' + arg.cmd + '")');
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
}();

var tPath = (PPx.EntryMarkCount) ? '%#FCB' : markless;

if (PPx.Extract('%si"output"') === 'PPv') {
  // 一時的にキャレットモードに変更
  PPx.Execute('*linecust tmod,KV_main:CLOSEEVENT,*setcust XV_tmod=%*getcust(XV_tmod) %%: *linecust tmod,KV_main:CLOSEEVENT,');
  PPx.Execute('*setcust XV_tmod=1');
  // grepの結果をPPvの標準入力で受け取る
  PPx.Execute('*run -noppb -min %si"cmd" %si"gopt" "' + str + '" ' + tPath +
    ' | %0ppvw -bootid:w -esc -document -k *string p,grep=1 %%: *find "' + str + '"');
} else {
  // grepの結果をutf16lbで出力
  PPx.Execute('%Obn %si"cmd" %si"gopt" "' + str + '" ' + tPath + ' | %Os nkf -w16B > "' + arg.listfile + '"');

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

