//!*script
/* input_dockを起動してgitモードを開始 */
var ckwID = PPx.Extract('%*findwindowclass(CkwWindowClass)');
if (ckwID == 0) {
  PPx.Execute('%Oai termppx');
  PPx.Execute('*CHECKBRANCH');
} else {
  PPx.Execute('cd %FD %: *shownormal %*findwindowclass(CkwWIndowClass)');
}

PPx.Execute('*focus');
var dock = PPx.Extract('%*getcust(X_dock:CBA_T)');
if (!dock) { PPx.Execute('%Os *dock add,t,input K_git'); }
PPx.Execute('%Oi *dock focus,t,K_git');
// PPx.Execute('*wait 300,2');
// if (PPx.EntryMarkCount != 0) {
//   var marks = PPx.Extract('%#;FC');
//   PPx.Execute('*jumppath /refreshcache');
//   PPx.Execute('*markentry o:dx;' + marks);
// } else {
//   PPx.Execute('*jumppath /savelocate /refreshcache');
// }
PPx.Execute('%k"APPS 9');
