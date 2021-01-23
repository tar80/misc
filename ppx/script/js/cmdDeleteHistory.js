//!*script
/* 対象ヒストリを初期化 */
//
// PPx.Arguments() = 初期化するヒストリ

var arg = (PPx.Arguments.length)
    ? PPx.Arguments()
    : PPx.Quit(-1);

if (PPx.Execute('%"履歴の削除"%Q"ヒストリ【 ' + arg + ' 】を全削除します"') != 0) { PPx.Quit(1); }

var str = true;

while (str != '') {
  str = PPx.Extract('%h' + arg + '0');
  PPx.Execute('*deletehistory ' + arg + ',0');
}

PPx.SetPopLineMessage('delete ' + arg);
