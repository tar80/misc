//!*script
/* grep結果をリストファイルに出力 */
//
// PPx.Arguments() = (0)出力ファイル

'use strict';

/////////* 初期設定 *////////////

// ripgrepを使うならrg
const grep_cmd = 'rg';

// grep_option 配列の一番目は固定。二番目以降を変更
const grepOpt = (grep_cmd != 'rg')
  ? ['-nH', 'irEC1', 'GREPOPTION.TXT'] // grep
  : ['-n --no-heading --color never', ' -Li -C1', 'RGOPTION.TXT']; // ripgrep

const markless = '"..\\%*name(C,%FD)"';      //マークなしのときの選択対象(")で括るように

/////////////////////////////////

if (!PPx.Arguments.length) {
  PPx.Echo('引数が足りません');
  PPx.Quit(-1);
}

const argResFile =  PPx.Arguments(0);

// optionボタンの設定
PPx.Execute(`*string i,gopt=${grepOpt[0]}${grepOpt[1]}`);
PPx.Execute(`*string i,Edit_OptionCmd=*string i,gopt=%%*input("%%si"gopt"" -title:"Option  ※${grepOpt[0]}は外さないこと※" -mode:e -select:${grepOpt[0].length},100 -k *completelist /set /file:"%%'list'\\${grepOpt[2]}") %%: *setcaption ${grep_cmd} %%si"gopt" ※\\=\\\\\\\\`);

// 検索文字の入力とエスケープ処理
const str = (esc => {
  try {
    return esc = PPx.Extract(`%*script(%'scr'%\\compCode.js,"iOs","""%%","${grep_cmd} ${grepOpt[0]}${grepOpt[1]}  ※\\=\\\\\\\\")`);
  } catch (e) {
    PPx.Execute('*string i,gopt=');
    PPx.Echo(e);
    PPx.Quit(-1);
  } finally {
    if (esc == '') {
      PPx.Execute('*string i,gopt=');
      PPx.Quit(-1);
    }
  }
})();

const tPath = (PPx.EntryMarkCount) ? '%#FCB' : markless;

// const pDir = PPx.Extract('%FD').replace(/\\/g, '\\\\\\\\');
// const dirType = PPx.DirectoryType;

// PPx.Execute(`*run -noppb -cmd -min -wait:later ${grep_cmd} %si"gopt" "${str}" ${tPath} | sed -r 's/^(.*)[:-]([0-9]*)([:-])(.*)/"\\1","\\2",A:H"\\3",C:0.0,L:0.0,W:0.0,S:0.0,M:0,T:"\\4"/' | awk 'BEGIN {print ";ListFile\\r\\n;Base=${pDir}|${dirType}\\r\\n\\"file\\",\\"line\\",A:H5,C:0.0,L:0.0,W:0.0,S:0.0,M:0,T:\\"result: ${str}\\""} {print $0}' | %Os nkf -w16L > ${argResFile} %: *wait -run`);

// grepの結果をutf16lbで出力
PPx.Execute(`%Obn ${grep_cmd} %si"gopt" "${str}" ${tPath} | %Os nkf -w16B > ${argResFile}`);

// リストの整形
const fso = PPx.CreateObject('Scripting.FileSystemObject');
const pDir = PPx.Extract('%FD');
const dirType = PPx.DirectoryType;
const result = [`;ListFile\u000D\u000A;Base=${pDir}|${dirType}\u000D\u000A"file","line",A:H5,C:0.0,L:0.0,W:0.0,S:0.0,R:0.0,H:0,M:0,T:"result => ${str}"`];
let fsoTlist = fso.OpenTextFile(argResFile, 1, false, -1);

while (!fsoTlist.AtEndOfStream) {
  // fsoTlist.ReadLine().replace(/^([^-:]*)[-:](\d*)([-:])\d*\s*(.*)/, (match, p1, p2, p3, p4) => {
  fsoTlist.ReadLine().replace(/^([^-:]*)[-:](\d*)([-:])\s*(.*)/, (match, p1, p2, p3, p4) => {
    p1 = (p1 == '') ? p3 : p1.replace(/^\.\.\\.*\//, '');
    p3 = (p3.indexOf(':') != -1) ? 0 : 3;
    p4 = p4.replace(/"/g, '""');
    result.push(`"${p1}","${p2}",A:H${p3},C:0.0,L:0.0,W:0.0,S:0.0,R:0.0,H:0,M:0,T:"${p4}"`);
  });
}

// 置換結果を書き出して上書き
fsoTlist = fso.OpenTextFile(argResFile, 2, true, -1);
fsoTlist.Write(result.join('\u000D\u000A'));
fsoTlist.Close();

