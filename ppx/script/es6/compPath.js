//!*script
/* 引数で与えられたパスの階層を一つ上へ補完 */
//
// PPx.Arguments(0) = 補完候補ファイルパス

'use strict';

if (!PPx.Arguments.length) {
  PPx.Echo('引数が足りません');
  PPx.Quit(-1);
}

const editStr = (str => {
  const rep = new RegExp('[",]', 'g');
  const esc = { '"': '""', ',': '@#' };
  return str.replace(rep, (c) => esc[c]);
})(PPx.Extract('%*edittext'));

const argTempFile = PPx.Arguments(0);

/* コマンドと基準パスの分離整形 */
const str = editStr.replace(/^([^\\]*\s)?(.*\\)(?!$).*/, (match, p1, p2) => {
  return (p2.indexOf('"') === 0)
    ? [p1, '"', p2.slice(1)]
    : [p1, '', p2];
}).split(',');

if (str[2] === undefined) {
  str[0] = (/ /.test(str[0]))
    ? str[0].replace(/^([^\\]*)\s.*/, '$1')
    : str[0].replace(/.*/, '');
} else if (PPx.Extract('%W').slice(0,10) === 'Jumppath..') {
  PPx.Execute(`*execute C,*whereis -path:"${str[2]}" -mask:"a:d" -dir:on -subdir:off -listfile:${argTempFile} -name`);
  PPx.Execute(`*completelist -file:${argTempFile}`);
}

PPx.Result = `"${str.join('').replace('@#',',')}"`;

