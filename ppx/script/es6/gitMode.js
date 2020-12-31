//!*script
/* input_dockを起動してgitモードを開始 */
'use strict';
(PPx.Extract('%NBA') != '')
  ? PPx.Execute('*shownormal %NBA %: *focus')
  : PPx.Execute('*CHECKBRANCH');

const dock = PPx.Extract('%Oi %*getcust(X_dock:CBA_T)');
if (!dock) { PPx.Execute('%Oi *dock add,t,input K_git'); }
PPx.Execute('%Oi *dock focus,t,K_git');
// アプリケーションメニューからGIT用コマンドリストを選択
PPx.Execute('%Oi *dock sendkey,t,K_git,APPS 9');
// マーク状態を復元
const resMark = (() => {
  if (PPx.EntryMarkCount) {
    return `*markentry o:dx;${PPx.Extract('%#;FC')}`;
  }else {
    return '*unmarkentry';
  }
})();
PPx.Execute('*jumppath /savelocate /refreshcache');
PPx.Execute(resMark);
