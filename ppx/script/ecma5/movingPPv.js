﻿//!*script
/* カーソル位置を考慮してPPvの位置を移動する */
'use strict';
// %si"vState"=1(除外対象)、PPvが2枚以上で中止
var omit = PPx.Extract('0%*extract(C,%%si"vState")')|0;
var vCount = PPx.Extract('%*ppxlist(+V)');

if ((omit == 1) || (vCount > 1)) {
  PPx.Quit(1);
}

// 画面サイズ
var displayX = 1366;
var _displayX = (displayX / 2 - 10);
var vID = PPx.WindowIDName;
var mouseX = PPx.Extract('%*extract(C,"%%*cursorpos(x)")')|0;
/* カーソル位置を考慮してPPvを左右に移動する関数 */
var moving_pos_LR = function () {
  var posW = PPx.Extract('%*windowrect(' + vID + ',w)')|0;
  var posH = PPx.Extract('%*windowrect(' + vID + ',t)')|0;
  posH = (posH < 80)
    ? posH
    : 80;
  if (mouseX <= (_displayX - 100)) {
    // 左
    posW = (posW < _displayX)
      ? _displayX
      : displayX - posW;
  } else {
    // 右
    posW = (posW < _displayX)
      ? _displayX - posW
      : 0;
  }
  PPx.Execute('*windowposition ' + vID + ',' + posW + ',' + posH);
};

moving_pos_LR();
