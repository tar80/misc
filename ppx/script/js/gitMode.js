//!*script
/* input_dockを起動してgitモードを開始 */
var ckwID = PPx.Extract('%*findwindowclass(CkwWindowClass)');
if (ckwID == 0) {
  PPx.Execute('%Oi *CHECKBRANCH');
} else {
  PPx.Execute('cd %FD');
  PPx.Execute('%Os *shownormal %*findwindowclass(CkwWIndowClass)');
}

PPx.Execute('%Oi *focus');
var dock = PPx.Extract('%*getcust(X_dock:CBA_T)');
if (!dock) { PPx.Execute('%Os *dock add,t,input K_git'); }
PPx.Execute('%Oi *dock focus,t,K_git');
PPx.Execute('%Os *wait 300,2');
if (PPx.EntryMarkCount != 0) {
  var marks = PPx.Extract('%#;FC');
  PPx.Execute('%Os *jumppath /refreshcache');
  PPx.Execute('%Os *markentry o:dx;' + marks);
} else {
  PPx.Execute('%Os *jumppath /savelocate /refreshcache');
}
PPx.Execute('%Os %k"APPS i');
