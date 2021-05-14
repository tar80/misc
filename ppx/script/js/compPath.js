//!*script
/* 引数で与えられたパスの階層を一つ上へ補完 */
//
// PPx.Arguments(0) = 補完候補ファイルパス

if (!PPx.Arguments.length) {
  PPx.Echo('引数が足りません');
  PPx.Quit(-1);
}

var editStr = (function (str) {
  var rep = new RegExp('[",]', 'g');
  var esc = { '"': '""', ',': '@#' };
  return str.replace(rep, (function (c) { return esc[c]; }));
})(PPx.Extract('%*edittext'));

var argTempFile = PPx.Arguments(0);

/* コマンドと基準パスの分離整形 */
var getStr = editStr.replace(/^([^\\]*\s)?(.*\\)(?!$).*/, function (match, p1, p2) {
  return (p2.indexOf('"') === 0)
    ? [p1, '"', p2.slice(1)]
    : [p1, '', p2];
}).split(',');

if (getStr[2] === undefined) {
  getStr[0] = (/ /.test(getStr[0]))
    ? getStr[0].replace(/^([^\\]*)\s.*/, '$1')
    : getStr[0].replace(/.*/, '');
} else if (PPx.Extract('%W').slice(0,10) === 'Jumppath..') {
  PPx.Execute('*execute C,*whereis -path:"' + getStr[2] + '" -mask:"a:d" -dir:on -subdir:off -listfile:' + argTempFile + ' -name');
  PPx.Execute('*completelist -file:' + argTempFile);
}

PPx.Result = '"' + getStr.join('').replace('@#', ',') + '"';

