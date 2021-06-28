//!*script
/* カーソル位置を考慮してPPvの位置を移動する */

'use strict';

{
  // %sp"vState" = 1;(除外対象)、PPvが2枚以上で中止
  const omit = PPx.Extract('0%*extract(C,%%sp"vState")')|0;
  const vCount = PPx.Extract('%*ppxlist(+V)');

  if (omit !== 0 || vCount > 1) { PPx.Quit(1); }
}

// 画面サイズ
const displayX = 1366;
const _displayX = (displayX / 2 - 10);
const ppvID = PPx.WindowIDName;
const mouseX = PPx.Extract('%*extract(C,"%%*cursorpos(x)")')|0;

const posW = (w => {
  w = PPx.Extract(`%*windowrect(${ppvID},w)`)|0;
  return (mouseX <= (_displayX - 100))
    ? (w < _displayX) ? _displayX : displayX - w  // left
    : (w < _displayX) ? _displayX - w : 0;        // right
})();

const posH = (h => {
  h = PPx.Extract(`%*windowrect(${ppvID},t)`)|0;
  return (h < 80) ? h : 80;
})();

PPx.Execute(`*windowposition ${ppvID},${posW},${posH}`);
