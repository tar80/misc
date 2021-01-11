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
// アプリケーションメニューからGIT用コマンドリストを選択
PPx.Execute('%Oi *dock sendkey,t,K_git,APPS 9');

// マーク状態を復元
var resMark = function () {
  var filepath = PPx.Extract('%#FC').split(' ');
  var filename = [];

  for (var i = 1, l = filepath.length; i <= l; i++) {
    filename.push(PPx.Extract('%*name(C,' + filepath[i] + ')'));
  }

  return (PPx.EntryMarkCount)
    ? '*markentry o:dex;' + filename.join(';')
    : '*unmarkentry';
}();

PPx.Execute('*wait 500,2');
PPx.Execute('*jumppath /savelocate /refreshcache');
PPx.Execute(resMark);

