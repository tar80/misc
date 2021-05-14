//!*script
/* PPvに背景画像を設定 */

'use strict';

const targetID = PPx.Extract('%n');

PPx.Execute(
  '*RotateExecute u_rotate_PPvBG,' +
  `"*setcust X_bg:P_${targetID}="" ""` +
  ` %%: *setcust X_bg:T_${targetID}=0` +
  ' %%: *sound C:\\Windows\\Media\\windows Information bar.wav",' +
  `"*setcust X_bg:P_${targetID}=%FDCN` +
  ` %%: *setcust X_bg:T_${targetID}=1` +
  ' %%: *sound C:\\Windows\\Media\\speech on.wav"'
);
