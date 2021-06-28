//!*script
/* 引数で与えられたパスの階層を一つ上へ補完 */
//
// PPx.Arguments(0) = 補完候補ファイルパス

'use strict';

const editStr = (() => {
  const str = PPx.Extract('%*edittext');
  const rep = new RegExp('[",]', 'g');
  const esc = { '"': '""', ',': '@#' };
  return str.replace(rep, c => esc[c]);
})();

const argTempFile = (PPx.Arguments.length)
  ? PPx.Arguments(0)
  : PPx.Extract('%\'temp\'%\\ppx_comppath.txt');

/* コマンドと基準パスの分離整形 */
const arrStr = editStr.replace(/^([^\\]*\s)?(.*\\)(?!$).*/, (match, p1, p2) => {
  return (p2.indexOf('"') === 0)
    ? [p1, '"', p2.slice(1)]
    : [p1, '', p2];
}).split(',');

if (arrStr[2] === undefined) {
  arrStr[0] = (/ /.test(arrStr[0]))
    ? arrStr[0].replace(/^([^\\]*)\s.*/, '$1')
    : arrStr[0].replace(/.*/, '');
} else if (PPx.Extract('%W').slice(0,10) === 'Jumppath..') {
  PPx.Execute(`*execute C,*whereis -path:"${arrStr[2]}" -mask:"a:d" -dir:on -subdir:off -listfile:${argTempFile} -name`);
  PPx.Execute(`*completelist -file:${argTempFile}`);
}

PPx.Result = `"${arrStr.join('').replace('@#',',')}"`;
