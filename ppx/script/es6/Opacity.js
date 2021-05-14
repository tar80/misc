//!*script
/* 背景透過用 */
//
// PPx.Arguments(0) = 0-100 ;透過度

'use strict';
const targetID = (PPx.WindowIDName == ('C_A'||'C_B') && PPx.Pane.Count <= 2) ? 'n#' : 'n';

if (PPx.Arguments.length) {
  PPx.Execute(`*customize X_bg:O_%${targetID} = ${PPx.Arguments(0)}`);
} else {
  const soft = 80;  // 透過弱
  const hard = 60;  // 透過強
  PPx.Execute(`*RotateCustomize X_bg:O_%%${targetID}, 100, ${soft} ,${hard}`);
}

