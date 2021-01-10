//!*script
/* 対象ヒストリを初期化 */
//
// PPx.Arguments() = 初期化するヒストリ

'use strict';

const arg = (() => {
  return (PPx.Arguments.length)
    ? PPx.Arguments()
    : PPx.Quit(-1);
})();

let i = 0;
let str = true;

while (str) {
  str = PPx.Extract('%hh' + i);
  if (str == '') { break; }
  PPx.Execute(`*deletehistory ${arg},${i}`);
  i++;
}

PPx.SetPopLineMessage(`delete ${arg}`);
