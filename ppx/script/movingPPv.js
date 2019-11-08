//!*script
/* カーソル位置を考慮してPPvの位置を移動する */
// %si"vState"=1:連動ビューON|2:PPvがPPcに重なっている状態

var ppvState = PPx.Extract('%si"vState"')|0;
if (ppvState == 2)
  PPx.Quit(1);

var ppvID = PPx.Extract('%N');
var mouseX = PPx.Extract('%*extract(C,"%%*cursorpos(x)")')|0;
var posW = PPx.Extract('%*windowrect(' + ppvID + ',w)')|0;

/* カーソル位置を考慮してPPvを上下左右に移動する関数 */
var moving_pos_LRUD = function () {
  var posH = 730 - PPx.Extract('%*windowrect(' + ppvID + ',h)')|0;
  var mouseY = PPx.Extract('%*extract(C,"%%*cursorpos(y)")')|0;
  if (mouseX <= 512) {
    posW = (posW < 512)
      ? 512
      : 1024 - posW;
    (mouseY <= 370)
    // 右上
      ? PPx.Execute('*windowposition ' + ppvID + ',' + posW + ',' + posH)
    // 右下
      : PPx.Execute('*windowposition ' + ppvID + ',' + posW + ',0');
  } else {
    posW = (posW < 512)
      ? 512 - posW
      : 0;
    (mouseY <= 370)
    // 左上
      ? PPx.Execute('*windowposition ' + ppvID + ',' + posW + ',' + posH)
    // 左下
      : PPx.Execute('*windowposition ' + ppvID + ',' + posW + ',0');
  };
};
/* カーソル位置を考慮してPPvを左右に移動する関数 */
var moving_pos_LR = function () {
  var posH = PPx.Extract('%*windowrect(' + ppvID + ',t)')|0
  posH = (posH < 80)
    ? posH
    : 80;
  if (mouseX <= 500) {
    posW = (posW < 512)
      ? 512
      : 1024 - posW;
    // 右
    PPx.Execute('*windowposition ' + ppvID + ',' + posW + ',' + posH)
  } else {
    posW = (posW < 512)
      ? 512 - posW
      : 0;
    // 左
    PPx.Execute('*windowposition ' + ppvID + ',0,' + posH)
  };
};
moving_pos_LR();
// moving_pos_LRUD();
