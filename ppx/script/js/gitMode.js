//!*script
/* input_dockを起動してgitモードを開始*/
var ckwID = PPx.Extract('%*findwindowclass(CkwWindowClass)');
if (ckwID == 0) {
  PPx.Execute('%Oai termppx');
  PPx.Execute('%Os *CHECKBRANCH');
  PPx.Execute('%Os *wait 200,1');
} else {
  PPx.Execute('%Os *shownormal %*findwindowclass(CkwWIndowClass)');
  PPx.Execute('cd %FD');
}
PPx.Execute('%Os *focus C');

var markEnt = PPx.Extract('%#;FC');
var dock = PPx.Extract('%*getcust(X_dock:CBA_T)');
if (!dock) {
  PPx.Execute('%Os *dock add,t,input K_git');
}
PPx.Execute('%Os *dock focus,t,K_git');
PPx.Execute('%Os *wait 100,2');
PPx.Execute('%Os %K"@F5');
PPx.Execute('*markentry ' + markEnt);
PPx.Execute('%Os %k"APPS i');
