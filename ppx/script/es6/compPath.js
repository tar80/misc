//!*script
/* 引数で与えられたパスの階層を一つ上へ補完 */
//
// PPx.Arguments(0) = 補完候補ファイルパス

'use strict';

const editStr = PPx.Extract('%*edittext');

if (!PPx.Arguments.length) { PPx.Result = editStr; }

const argTempFile = PPx.Arguments(0);
/* コマンドと基準パスの分離整形 */
const str = editStr.replace(/^([^\\]*\s)?(.*\\)(?!$).*/, (match, p1, p2) => {
  return (p2.indexOf('"') === 0)
    // 対象がコマンドを含む場合
    ? [p1, '"', p2.slice(1)]
    // 対象がパスのみの場合
    : [p1, '', p2];
}).split(',');

if (PPx.Extract('%W').slice(0,10) === 'Jumppath..') {
  PPx.Execute(`*execute C,*whereis -path:"${str[2]}" -mask:"a:d" -dir:on -subdir:off -listfile:${argTempFile} -name`);
  PPx.Execute(`*completelist -file:${argTempFile}`);
}

if (str[2] === undefined) { str[0] = str[0].replace(/[a-zA-Z]:\\/, ''); }

PPx.Result = str.join('');

