//!*script
/* 初期化後再設定 */

'use strict';

const pwd = PPx.Extract('%FD');
PPx.Execute('PPCUSTW CD %\'cfg\'%\\Px_@user.cfg -mask:"_User" %&');
PPx.Execute('PPCUSTW CINIT %&');
PPx.Execute(`*closeppx C* %: *wait 100,2 %: *cd ${pwd} %: PPCUSTW CA %FDC`);
