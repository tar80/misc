//!*script
/* grep結果をリストファイルに出力 */
//
// PPx.Arguments() = (0)出力ファイル

'use strict';

/////////* 初期設定 *////////////

const grepOpt = 'irEC1';                    // grep option '-nH'は固定される
const markless = '..\\%*name(CB,%FD)';      //マークなしのときの選択対象 %FB(")で括るように

/////////////////////////////////

if (!PPx.Arguments.length) {
  PPx.Echo('引数が足りません');
  PPx.Quit(-1);
}

const argResFile =  PPx.Arguments(0);

// optionボタンの設定
PPx.Execute(`*string i,gopt=-nH${grepOpt}`);
PPx.Execute('*string i,Edit_OptionCmd=*string i,gopt=%%*input("%%si"gopt"" -title:"Option  ※-nHは外さないこと※" -mode:e -select:3,100 -k *completelist /set /file:"%%\'repoppx\'%%\\list\\GREPOPTION.TXT") %%: *setcaption grep %%si"gopt" ※\\=\\\\\\\\');

// 検索文字の入力とエスケープ処理
const str = (esc => {
  try {
    return esc = PPx.Extract(`%*script(%'scr'%\\compCode.js,"iOs","""%%","grep -nH${grepOpt}  ※\\=\\\\\\\\")`);
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

// grepの結果をutf16lbで出力
PPx.Execute(`%Obn grep %si"gopt" "${str}" ${tPath} | %Os nkf -w16B > ${argResFile}`);
PPx.Execute('*string i,gopt=');

// リストの整形
const fso = PPx.CreateObject('Scripting.FileSystemObject');
const pDir = PPx.Extract('%FD');
const result = [`;ListFile\u000D\u000A;Base=${pDir}|4\u000D\u000A"file","line",A:H5,T:"result => ${str}"`];
let fsoTlist = fso.OpenTextFile(argResFile, 1, false, -1);

while (!fsoTlist.AtEndOfStream) {
  fsoTlist.ReadLine().replace(/^([^-:]*)[-:](\d*)([-:])\d*\s*(.*)/, (match, p1, p2, p3, p4) => {
    p1 = p1.replace(/^\.\.\\.*\//, '');
    p3 = (p3.indexOf(':') != -1) ? 0 : 3;
    p4 = p4.replace(/"/g, '""');
    result.push(`"${p1}","${p2}",A:H${p3},T:"${p4}"`);
  });
}

// 置換結果を書き出して上書き
fsoTlist = fso.OpenTextFile(argResFile, 2, true, -1);
fsoTlist.Write(result.join('\u000D\u000A'));
fsoTlist.Close();

