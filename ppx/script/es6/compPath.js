﻿//!*script
/* 引数で与えられたパスの階層を一つ上へ補完 */
// PPx.Arguments() = 補完候補ファイルパス

'use strict';
const editStr = PPx.Extract('%*edittext');
try {
  const arg = PPx.Arguments(0);
  const str = [];
  /* コマンドと基準パスの分離整形 */
  editStr.replace(/^([^\\]*\s)?(.*\\)(?!$).*/, (match, p1, p2) => {
    if (p2.indexOf('"') == 0) {
      // 対象がコマンドを含む場合
      str.push(p1, '"', p2.slice(1));
    } else {
      // 対象がパスのみの場合
      str.push(p1, '', p2);
    }
  });
  if (PPx.Extract('%W').slice(0,10) == 'Jumppath..') {
    PPx.Execute(`*whereis -path:${str[2]} -mask:"a:d" -dir:on -subdir:off -listfile:${arg} -name`);
    PPx.Execute(`*completelist -file:${arg}`);
  }
  PPx.Result = str.join('');
} catch (e) {
  PPx.Result = editStr;
}
