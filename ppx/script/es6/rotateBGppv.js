//!*script
/* PPvに背景画像を設定 */
'use strict';
const tID = PPx.Extract('%n');
let type = PPx.Extract(`%*getcust(X_bg:T_${tID})`);
let path;
if (type == 0) {
  [type, path] = [1, PPx.Extract('%FDC')];
  PPx.Execute('*sound C:\\Windows\\Media\\speech on.wav');
} else {
  [type, path] = [0, ''];
  PPx.Execute('*sound C:\\Windows\\Media\\windows Information bar.wav');
}
PPx.Execute(
  `*setcust X_bg:P_${tID}=${path}
   *setcust X_bg:T_${tID}=${type}`
);
