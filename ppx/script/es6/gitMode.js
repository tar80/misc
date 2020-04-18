//!*script
/* input_dockを起動してgitモードを開始*/
'use strict';
const ppbID = PPx.Extract('%NBA');
if (!ppbID) {
  PPx.Execute('*CHECKBRANCH');
  PPx.Execute('*wait 200,2');
} else {
  PPx.Execute('%Os *shownormal %NBA');
}
PPx.Execute('%Os *focus C');

const dock = PPx.Extract('%*getcust(X_dock:CBA_T)');
if (!dock) {
  PPx.Execute('%Os *dock add,t,input K_git');
}
PPx.Execute('%Os *dock focus,t,K_git');
// PPx.Execute('*wait 10');
PPx.Execute('%Os %K"@F5');
PPx.Execute('%k"APPS i');
