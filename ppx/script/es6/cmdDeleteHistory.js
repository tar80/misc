//!*script
/* 対象ヒストリを初期化 */
//
// PPx.Arguments() = 初期化するヒストリ

'use strict';

const arg = (PPx.Arguments.length)
  ? PPx.Arguments()
  : PPx.Quit(-1);

let str = true;

while (str) {
  str = PPx.Extract('%hh0');
  if (str == '') { break; }
  PPx.Execute(`*deletehistory ${arg},0`);
}

PPx.SetPopLineMessage(`delete ${arg}`);
