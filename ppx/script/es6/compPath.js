//!*script
/* 引数で与えられたパスの階層を一つ上へ補完 */
// PPx.Arguments() = [0]編集中のパス [1]起動時選択モードON
'use strict';
const arg = (() => {
  try {
    return PPx.Arguments(0);
  } catch (e) {
    PPx.Quit(1);
  }
})();

// コマンドと基準パスの分離整形
let str = [];
arg.replace(/^([^\\]*\s)?(.*\\)(?!$).*/, (match, p1, p2) => {
  str = [p1, '', p2];
  // 対象がパスのみの場合
  // if (typeof str[0] === 'undefined')
  //   str[0] = '';
  // 対象にコマンドを含む場合
  if (str[2].indexOf('"') === 0) {
    str[1, 2] = ['"', str[2].slice(1)];
  }
  return str;
});

// 補完したパスのサブディレクトリの数を取得
const fs = PPx.CreateObject('Scripting.FileSystemObject');
const fs_dirCount = (() => {
  try {
    return fs.GetFolder(str[2]).SubFolders.Count;
  } catch (e) {
    PPx.Execute('%k"^a');
    PPx.Quit(-1);
  }
})();
const sendKeys = fs_dirCount == 1 ? '@F2@F4' : '@F2@TAB@UP';

PPx.Execute(`*replace ${str.join('')}`);
PPx.Execute(`%K"${sendKeys}`);
// 起動時のパス全選択
if (PPx.Arguments.Count == 2) PPx.Execute('%K"@^a');
