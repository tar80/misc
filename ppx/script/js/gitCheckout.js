//!*script
/* ブランチの変更 */
// git branchを変更してENTERにリストの更新を仕組む
if (PPx.Extract('%*edittext') == '') { PPx.Execute('*insert "branch "'); }
PPx.Execute('%Os *ppb -c git branch | peco | xargs %0ppcw -r -k *string i,branch=');
if (!PPx.Extract('0%si"branch"')) { PPx.Quit(-1); }
PPx.Execute('*insert %si"branch"');

// マーク状態を復元
var resMark = function () {
  if (PPx.EntryMarkCount) {
    return '*markentry o:dx;' + PPx.Extract('%#;FC');
  }else {
    return '*unmarkentry';
  }
}();
PPx.Execute('*linecust gitcheckout,K_git:ENTER,*string i,branch= %%: %%Oi *ppb -c *CHECKBRANCH %%: *wait 300,2 %%: *jumppath /savelocate /refreshcache %%: ' + resMark);
