//!*script
/* input_dockを起動してgitモードを開始 */
'use strict';
PPx.Execute('%Oai *CHECKBRANCH');
PPx.Execute('*shownormal %NBA');
PPx.Execute('*focus');

const dock = PPx.Extract('%*getcust(X_dock:CBA_T)');
if (!dock) { PPx.Execute('%Oi *dock add,t,input K_git'); }
PPx.Execute('%Oi *dock focus,t,K_git');
// アプリケーションメニューからGIT用コマンドリストを選択
PPx.Execute('%k"APPS 9');
PPx.Execute('*wait 200,2');
if (PPx.EntryMarkCount != 0) {
  const marks = PPx.Extract('%#;FC');
  PPx.Execute('*jumppath /savelocate /refreshcache');
  PPx.Execute(`*markentry o:dx;${marks}`);
} else {
  PPx.Execute('*jumppath /savelocate /refreshcache');
}
