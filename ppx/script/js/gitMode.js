//!*script
/* input_dockを起動してgitモードを開始*/
var ckwID = PPx.Extract('%*findwindowclass(CkwWindowClass)');
if (ckwID == 0) {
  PPx.Execute('%Oa termppx');
  PPx.Execute('%Os *CHECKBRANCH');
} else {
  PPx.Execute('%Os *shownormal %*findwindowclass(CkwWIndowClass)');
  PPx.Execute('cd %FD');
}

var dock = PPx.Extract('%*getcust(X_dock:CBA_T)');
if (!dock) { PPx.Execute('%Os *dock add,t,input K_git'); }
PPx.Execute('%Os *dock focus,t,K_git');
PPx.Execute('%Os *wait 300,2');
PPx.Execute('%Os *focus C');
if (PPx.EntryMarkCount != 0) {
  var marks = PPx.Extract('%#;FC');
  PPx.Execute('%Os %K"@F5');
  PPx.Execute('*markentry ' + marks);
} else {
  PPx.Execute('%Os %K"@F5');
}
PPx.Execute('%Os %k"APPS i');
