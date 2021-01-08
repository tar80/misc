//!*script
/* ブランチの変更 */
// git branchを変更してENTERにリストの更新を仕組む

'use strict';

PPx.Execute('%Os *ppb -c git branch | peco | xargs %0ppcw -r -k *string i,branch=');

// 中止の処理
if (!PPx.Extract('%si"branch"')) { PPx.Quit(-1); }
PPx.Execute('*ifmatch 0,0%*edittext %: *insert "branch "');
PPx.Execute('*insertsel %si"branch"');
PPx.Execute('*string i,branch=');

// マーク状態を復元
const resMark = (() => {
  if (PPx.EntryMarkCount) {
    return `*markentry o:dx;${PPx.Extract('%#;FC')}`;
  }else {
    return '*unmarkentry';
  }
})();

PPx.Execute(`*linecust gitcheckout,K_git:ENTER,%%Oin *ppb -c *CHECKBRANCH %%: *wait 300,2 %%:\
  *jumppath /savelocate /refreshcache %%: ${resMark}`);

