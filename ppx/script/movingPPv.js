//!*script
/* カーソル位置を考慮してPPvの位置を移動する */

// %si"vState"=1(除外対象)、PPvが2枚以上で終了
var omit = PPx.Extract('0%*extract(C,%%si"vState")')|0;
var vCount = PPx.Extract('%*ppxlist(+V)');
if ((omit == 1) || (vCount > 1))
  PPx.Quit(1);

// 画面サイズ
var displayX = 1024;
var displayY = 740;
var _displayX = (displayX / 2);
var _displayY = (displayY / 2);

var vID = PPx.WindowIDName;
var mouseX = PPx.Extract('%*extract(C,"%%*cursorpos(x)")')|0;
/* カーソル位置を考慮してPPvを上下左右に移動する関数 */
var moving_pos_LRUD = function () {
  var posW = displayX - PPx.Extract('%*windowrect(' + vID + ',w)')|0;
  var posH = displayY - PPx.Extract('%*windowrect(' + vID + ',h)')|0;
  var mouseY = PPx.Extract('%*extract(C,"%%*cursorpos(y)")')|0;
  if (mouseX <= _displayX) {
    (mouseY <= _displayY)
    // カーソル左上
      ? PPx.Execute('*windowposition ' + vID + ',' + posW + ',' + posH)
    // 左下
      : PPx.Execute('*windowposition ' + vID + ',' + posW + ',0');
  } else {
    (mouseY <= _displayY)
    // 右上
      ? PPx.Execute('*windowposition ' + vID + ',0,' + posH)
    // 右下
      : PPx.Execute('*windowposition ' + vID + ',0,0');
  };
};
/* カーソル位置を考慮してPPvを左右に移動する関数 */
var moving_pos_LR = function () {
  var posW = PPx.Extract('%*windowrect(' + vID + ',w)')|0;
  var posH = PPx.Extract('%*windowrect(' + vID + ',t)')|0;
  posH = (posH < 80)
    ? posH
    : 80;
  if (mouseX <= _displayX) {
    posW = (posW < _displayX)
      ? _displayX
      : displayX - posW;
    // 左
    PPx.Execute('*windowposition ' + vID + ',' + posW + ',' + posH)
  } else {
    posW = (posW < _displayX)
      ? _displayX - posW
      : 0;
    // 右
    PPx.Execute('*windowposition ' + vID + ',' + posW + ',' + posH)
  };
};
var cID = PPx.Extract('%*extract(C,"%%n")');
(cID == 'CX')
  ? moving_pos_LRUD()
  : moving_pos_LR();
