//!*script
/* input_dockを起動してgitモードを開始 */
var ckwID = PPx.Extract('%*findwindowclass(CkwWindowClass)');
if (ckwID != 0) {
  PPx.Execute('cd %FD %: *shownormal %*findwindowclass(CkwWIndowClass)');
} else {
  PPx.Execute('%Oai termppx');
  PPx.Execute('%Oi *CHECKBRANCH');
}
PPx.Execute('*focus');

var dock = PPx.Extract('%Oi %*getcust(X_dock:CBA_T)');
if (!dock) { PPx.Execute('%Oi *dock add,t,input K_git'); }
PPx.Execute('%Oi *dock focus,t,K_git');
PPx.Execute('%Oi *wait 300 %: %k"APPS 9');
// マーク状態を復元
var resMark = function () {
  if (PPx.EntryMarkCount != 0) {
    return '*markentry o:dx;' + PPx.Extract('%#;FC');
  }else {
    return '*unmarkentry';
  }
}();
PPx.Execute('*jumppath /savelocate /refreshcache');
PPx.Execute(resMark);
