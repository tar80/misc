//!*script
/* ブランチの変更 */
//
// git branchを変更してENTERにリストの更新を仕組む

PPx.Execute('*ppb -c git branch | peco | xargs %0ppcw -r -k *string i,branch=');

// 中止の処理
if (!PPx.Extract('%si"branch"')) { PPx.Quit(-1); }

// PPx.Execute('*ifmatch 0,0%*edittext %: *insert "checkout "');
// PPx.Execute('*insertsel %si"branch"');
// PPx.Execute('*string i,branch=');
// PPx.Execute('*focus');

// マーク状態を復元
// var resMark = function () {
//   var filepath = PPx.Extract('%#;FC').split(';');
//   var filename = [];
//
//   for (var i = 0, l = filepath.length - 1; i <= l; i++) {
//     filename.push(PPx.Extract('%*name(C,' + filepath[i] + ')'));
//   }
//
//   return (PPx.EntryMarkCount)
//     ? '*markentry o:dex;' + filename.join(';')
//     : '*unmarkentry';
// }();
//
// PPx.Execute('*linecust gitcheckout,K_git:ENTER,%%Oin *ppb -c *CHECKBRANCH %%: *wait 500,2 %%: *jumppath /savelocate /savelocate /refreshcache %%: ' + resMark);
