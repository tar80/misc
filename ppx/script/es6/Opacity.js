﻿//!*script
/* 背景透過用 */
// PPx.Arguments() = [0]0-100 ;透過度
'use strict';
const tID = (() => {
  return (PPx.WindowIDName == ('C_A'||'C_B') && PPx.Pane.Count <= 2) ? 'n#' : 'n';
})();

if (PPx.Arguments.length) {
  PPx.Execute(`*customize X_bg:O_%${tID} = ${PPx.Arguments(0)}`);
  PPx.Execute('*setcust _User:u_opa=0');
} else {
  const soft = 80;  // 透過弱
  const hard = 60;  // 透過強
  PPx.Execute(`*RotateExecute u_opa, *customize X_bg:O_%${tID} =100, *customize X_bg:O_%${tID} = ${soft}, *customize X_bg:O_%${tID} = ${hard}`);
}