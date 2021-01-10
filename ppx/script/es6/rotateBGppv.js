//!*script
/* PPvに背景画像を設定 */

'use strict';

const tID = PPx.Extract('%n');

PPx.Execute(
  `*RotateExecute u_rotate_PPvBG, "*setcust X_bg:P_${tID}="" "" %%: *setcust X_bg:T_${tID}=0 %%:\
   *sound C:\\Windows\\Media\\windows Information bar.wav"\
  ,"*setcust X_bg:P_${tID}=%FDCN %%: *setcust X_bg:T_${tID}=1 %%:\
   *sound C:\\Windows\\Media\\speech on.wav"`
);
