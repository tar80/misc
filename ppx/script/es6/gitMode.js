//!*script
/* input_dockを起動してgitモードを開始 */
'use strict';
const ppbID = PPx.Extract('%NBA');
if (!ppbID) {
  PPx.Execute('%Oa *CHECKBRANCH');
} else {
  PPx.Execute('%Os *shownormal %NBA');
  PPx.Execute('cd %FD');
}

const dock = PPx.Extract('%*getcust(X_dock:CBA_T)');
if (!dock) { PPx.Execute('%Os *dock add,t,input K_git'); }
PPx.Execute('%Os *dock focus,t,K_git');
PPx.Execute('*wait 200,2');
PPx.Execute('%Os *focus');
if (PPx.EntryMarkCount != 0) {
  const marks = PPx.Extract('%#;FC');
  PPx.Execute('%Os %K"@F5');
  PPx.Execute(`*markentry ${marks}`);
} else {
  PPx.Execute('%Os %K"@F5');
}
PPx.Execute('%Os %k"APPS i');
