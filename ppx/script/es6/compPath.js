//!*script
/* 引数で与えられたパスの階層を一つ上へ補完 */
// PPx.Arguments() = [0]編集中のパス [1]補完候補ファイルパス
'use strict';
const arg = [];
try {
  arg.push(PPx.Arguments(0), PPx.Arguments(1));
  if (PPx.Extract('%W').slice(0,10) == 'Jumppath..') {
    PPx.Execute(`*whereis -path:${str_comp()[2]} -mask:"a:d" -dir:on -subdir:off -listfile:${arg[1]} -name`);
    PPx.Execute(`*completelist -file:${arg[1]}`);
  }
  PPx.Result = str_comp().join('');
} catch (e) {
  PPx.Result = PPx.Arguments(0);
}

/* コマンドと基準パスの分離整形 */
function str_comp() {
  const str = [];
  arg[0].replace(/^([^\\]*\s)?(.*\\)(?!$).*/, function (match, p1, p2) {
    if (p2.indexOf('"') === 0) {
      // 対象がコマンドを含む場合
      str.push(p1, '"', p2.slice(1));
    } else {
      // 対象がパスのみの場合
      str.push(p1, '', p2);
    }
  });
  return str;
}
