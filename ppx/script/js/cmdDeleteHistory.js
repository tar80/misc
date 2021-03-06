﻿//!*script
/* 対象ヒストリを初期化 */
//
// PPx.Arguments(0) = 1:履歴をバックアップ
// 引数を付けると、X_save%\@history_?_back.txtが保存される

var saveHistory = (!PPx.Arguments.length) ? false : true;
var targetHistory = PPx.Extract('%*editprop(whistory)');
var targetType = {
  g: '汎用', n: '数値', m: 'マスク', s: '検索', h: 'コマンド',
  d: 'ディレクトリ', c: 'ファイル名', f: 'フルパス',
  u: 'ユーザ1', U: 'ユーザ1', x: 'ユーザ2', X: 'ユーザ2'
}[targetHistory];

if (targetType === undefined) {
  PPx.Execute('%"履歴の削除"%I"該当する履歴がありません');
  PPx.Quit(1);
} else if (PPx.Execute('%"履歴の削除"%Q"' + targetType + 'ヒストリを全削除します"') !== 0) {
  PPx.Quit(1);
}

if (saveHistory) {
  PPx.Execute(
    '*run -min -wait:later' +
    ' ppcustw HD %*getcust(X_save)%\\@history_' + targetHistory + '_back.txt -format:2 -mask:' + targetHistory +
    ' %: *wait -run'
  );
}

var historyItem = true;

while (historyItem !== '') {
  historyItem = PPx.Extract('%h' + targetHistory + '0');
  PPx.Execute('*deletehistory ' + targetHistory + ',0');
}

PPx.SetPopLineMessage('delete ' + targetHistory);

