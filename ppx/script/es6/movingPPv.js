//!*script
/* カーソル位置を考慮してPPvの位置を移動する */
'use strict';
{
  // %si"vState" = 1;(除外対象)、PPvが2枚以上で中止
  const omit = PPx.Extract('0%*extract(C,%%si"vState")')|0;
  const vCount = PPx.Extract('%*ppxlist(+V)');

  if (omit == 1 || vCount > 1) {
    PPx.Quit(1);
  }
}
// 画面サイズ
const displayX = 1366;
const _displayX = (displayX / 2 - 10);
const vID = PPx.WindowIDName;
const mouseX = PPx.Extract('%*extract(C,"%%*cursorpos(x)")')|0;
const posW = (() => {
  const w = PPx.Extract(`%*windowrect(${vID},w)`)|0;
  if (mouseX <= (_displayX - 100)) {
  // 左
    return (w < _displayX) ? _displayX : displayX - w;
  } else {
  // 右
    return (w < _displayX) ? _displayX - w : 0;
  }
})();
const posH = (() => {
  const h = PPx.Extract(`%*windowrect(${vID},t)`)|0;
  return (h < 80) ? h : 80;
})();

PPx.Execute(`*windowposition ${vID},${posW},${posH}`);
