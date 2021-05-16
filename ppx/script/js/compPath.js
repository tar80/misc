//!*script
/* 引数で与えられたパスの階層を一つ上へ補完 */
//
// PPx.Arguments(0) = 補完候補ファイルパス

if (!PPx.Arguments.length) {
  PPx.Echo('引数が足りません');
  PPx.Quit(-1);
}

var editStr = (function () {
  var str = PPx.Extract('%*edittext');
  var rep = new RegExp('[",]', 'g');
  var esc = { '"': '""', ',': '@#' };
  return str.replace(rep, (function (c) { return esc[c]; }));
})();

var argTempFile = PPx.Arguments(0);

/* コマンドと基準パスの分離整形 */
var arrStr = editStr.replace(/^([^\\]*\s)?(.*\\)(?!$).*/, function (match, p1, p2) {
  return (p2.indexOf('"') === 0)
    ? [p1, '"', p2.slice(1)]
    : [p1, '', p2];
}).split(',');

if (arrStr[2] === undefined) {
  arrStr[0] = (/ /.test(arrStr[0]))
    ? arrStr[0].replace(/^([^\\]*)\s.*/, '$1')
    : arrStr[0].replace(/.*/, '');
} else if (PPx.Extract('%W').slice(0,10) === 'Jumppath..') {
  PPx.Execute('*execute C,*whereis -path:"' + arrStr[2] + '" -mask:"a:d" -dir:on -subdir:off -listfile:' + argTempFile + ' -name');
  PPx.Execute('*completelist -file:' + argTempFile);
}

PPx.Result = '"' + arrStr.join('').replace('@#', ',') + '"';

