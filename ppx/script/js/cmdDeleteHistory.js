//!*script
/* 対象ヒストリを初期化 */
//
// PPx.Arguments() = (0)1:履歴をバックアップ
// 引数を付けると、X_save%\@history_?_back.txtが保存される

var saveHistory = (!PPx.Arguments.length) ? false : true;
var tHistory = PPx.Extract('%*editprop(whistory)');
var tType = (function (param) {
  var key = 'gnmshdcfuxUX';
  var type = ['汎用','数値','マスク','検索','コマンド','ディレクトリ','ファイル','フルパス','ユーザ1','ユーザ2','ユーザ1','ユーザ2'];
  return type[key.indexOf(param)];
})(tHistory);

if (tType === undefined) {
  PPx.Execute('%"履歴の削除"%I"該当する履歴がありません');
  PPx.Quit(1);
} else if (PPx.Execute('%"履歴の削除"%Q"' + tType + 'ヒストリを全削除します"') !== 0) {
  PPx.Quit(1);
}

if (saveHistory) {
  PPx.Execute('*run -min -wait:later ppcustw HD %*getcust(X_save)%\\@history_' + tHistory + '_back.txt -format:2 -mask:' +tHistory + ' %: *wait -run');
}

var str = true;

while (str !== '') {
  str = PPx.Extract('%h' + tHistory + '0');
  PPx.Execute('*deletehistory ' + tHistory + ',0');
}

PPx.SetPopLineMessage('delete ' + tHistory);

