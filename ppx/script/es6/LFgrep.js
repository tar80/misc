//!*script
/* grep結果をリストファイルに出力 */
//
// PPx.Arguments() = (0)出力ファイル, (1)使用するgrepコマンド, (2)1:オプションの再登録

'use strict';

const arglen = PPx.Arguments.length;

if (!arglen) {
  PPx.Echo('引数が足りません');
  PPx.Quit(-1);
}


/////////* 初期設定 *////////////

// 使用するコマンド
const use_grep = false;
const use_ripgrep = true;
const use_jvgrep = true;

// grep_option lockは固定。addの値を変更
// ※addの記述はハイフン(-)で始まる場合スペースを１つ入れる
// grep
const gr = (use_grep === true) ? { 'lock': '-nH', 'add': 'irEC1 --color=never', 'complist': 'GREPOPTION.TXT' } : null;
// ripgrep
const rg = (use_ripgrep === true) ? { 'lock': '-n --no-heading', 'add': ' --color never -Li -C1', 'complist': 'RGOPTION.TXT' } : null;
// jvgrep
const jv = (use_jvgrep === true) ? { 'lock': '-n -r', 'add': ' --color=never -iGI -B1', 'complist': 'JVGREPOPTION.TXT' } : null;

//マークなしのときの選択対象(")で括るように
const markless = '"..\\%*name(C,%FD)"';

/////////////////////////////////

const arg = { 'listfile': PPx.Arguments(0), 'cmd': PPx.Arguments(1) };
const dogrep = (arg.cmd === 'grep') ? gr : (arg.cmd === 'rg') ? rg : jv;
{
  const reload_opt = (() => { return ( arglen === 3) ? PPx.Arguments(2) : null; })();
  const check_Mxxx = PPx.Extract('%*getcust(M_grepLF)').split('\u000D\u000A');
  if (check_Mxxx.length === 3 || reload_opt === '1') {
    if (use_grep === true) {
      PPx.Execute(`*setcust M_grepLF:grep=*string i,cmd=grep %%: *string i,gopt=${gr.lock}${gr.add} %%: \
      *string e,lock=${gr.lock} %%: *string e,add=${gr.add} %%: *string e,list=${gr.complist} %%: \
      *string e,flen=${gr.lock.length} %%: *string e,blen=${gr.lock.length + gr.add.length}`);
    } else {
      PPx.Execute('*deletecust "M_grepLF:grep"');
    }
    if (use_ripgrep === true) {
      PPx.Execute(`*setcust M_grepLF:rg=*string i,cmd=rg %%: *string i,gopt=${rg.lock}${rg.add} %%: \
      *string e,lock=${rg.lock} %%: *string e,add=${rg.add} %%: *string e,list=${rg.complist} %%: \
      *string e,flen=${rg.lock.length} %%: *string e,blen=${rg.lock.length + rg.add.length}`);
    } else {
      PPx.Execute('*deletecust "M_grepLF:rg"');
    }
    if (use_jvgrep === true) {
      PPx.Execute(`*setcust M_grepLF:jvgrep=*string i,cmd=jvgrep %%: *string i,gopt=${jv.lock}${jv.add} %%: \
      *string e,lock=${jv.lock} %%: *string e,add=${jv.add} %%: *string e,list=${jv.complist} %%: \
      *string e,flen=${jv.lock.length} %%: *string e,blen${jv.lock.length + jv.add.length}`);
    } else {
      PPx.Execute('*deletecust "M_grepLF:jvgrep"');
    }
  }
}

// optionボタンの設定
PPx.Execute('*string i,Edit_OptionCmd=*string i,gopt=%%*input("%%se"lock"%%se"add"" \
  -title:"Option  ※%%se"lock"は外さないこと※" -mode:e -select:%%se"flen",%%se"blen" \
  -k *completelist /set /file:"%%\'list\'\\%%se"list"") %%: *setcaption %%si"cmd" %%si"gopt" ※\\=\\\\\\\\');

// 検索文字の入力とエスケープ処理
const str = (esc => {
  try {
    PPx.Execute(`*string i,gopt=${dogrep.lock}${dogrep.add}`);
    return esc = PPx.Extract(`%*script(%'scr'%\\compCode.js,"iOs","""%%","${arg.cmd} %%si""gopt"" ※\\=\\\\\\\\", \
      "*string e,px=LF %%%%: *execute %%%%%%%%M_grepLF,!${arg.cmd}")`);
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

const tPath = (PPx.EntryMarkCount) ? '%#FCB' : markless;

// const pDir = PPx.Extract('%FD').replace(/\\/g, '\\\\\\\\');
// const dirType = PPx.DirectoryType;

// PPx.Execute(`*run -noppb -cmd -min -wait:later ${grep_cmd} %si"gopt" "${str}" ${tPath} | sed -r 's/^(.*)[:-]([0-9]*)([:-])(.*)/"\\1","\\2",A:H"\\3",C:0.0,L:0.0,W:0.0,S:0.0,M:0,T:"\\4"/' | awk 'BEGIN {print ";ListFile\\r\\n;Base=${pDir}|${dirType}\\r\\n\\"file\\",\\"line\\",A:H5,C:0.0,L:0.0,W:0.0,S:0.0,M:0,T:\\"result: ${str}\\""} {print $0}' | %Os nkf -w16L > ${arg.listfile} %: *wait -run`);

// grepの結果をutf16lbで出力
PPx.Execute(`%Obn %si"cmd" %si"gopt" "${str}" ${tPath} | %Os nkf -w16B > ${arg.listfile}`);

// リストの整形
const fso = PPx.CreateObject('Scripting.FileSystemObject');
const pDir = PPx.Extract('%FD');
const dirType = PPx.DirectoryType;
const result = [`;ListFile\u000D\u000A;Base=${pDir}|${dirType}\u000D\u000A"file","line",A:H5,C:0.0,L:0.0,W:0.0,S:0.0,H:0,M:0,T:"result => ${str}"`];
let fsoTlist = fso.OpenTextFile(arg.listfile, 1, false, -1);

while (!fsoTlist.AtEndOfStream) {
  // fsoTlist.ReadLine().replace(/^([^-:]*)[-:](\d*)([-:])\d*\s*(.*)/, (match, p1, p2, p3, p4) => {
  fsoTlist.ReadLine().replace(/^([^-:]*)[-:](\d*)([-:])\s*(.*)/, (match, p1, p2, p3, p4) => {
    p1 = (p1 == '') ? p3 : p1.replace(/^\.\.\\.*\//, '');
    p3 = (p3.indexOf(':') != -1) ? 0 : 3;
    p4 = p4.replace(/"/g, '""');
    result.push(`"${p1}","${p2}",A:H${p3},C:0.0,L:0.0,W:0.0,S:0.0,H:0,M:0,T:"${p4}"`);
  });
}

// 置換結果を書き出して上書き
fsoTlist = fso.OpenTextFile(arg.listfile, 2, true, -1);
fsoTlist.Write(result.join('\u000D\u000A'));
fsoTlist.Close();

