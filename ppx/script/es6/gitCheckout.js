//!*script
/* ブランチの変更と表示の更新 */
// git branchを変更してPPcを更新
'use strict';
const branchList = [];
try {
  branchList.push(PPx.Arguments(0));
} catch (e) {
  PPx.Echo('引数が異常');
  PPx.Quit(1);
}

PPx.Execute(`%Os *execute C,@git branch | sed -e s/' '*// > ${branchList}`);
PPx.Execute('%Os *wait 200,1');
PPx.Execute('%Os *focus C');
// 一行編集で選択したブランチに移動して、PPxのステータス行に反映する
PPx.Execute(`%Os *execute C,git checkout %*input(-title:"checkout branch" -mode:e -k *completelist -file:${branchList}) %: *wait 200,1 %: *execute C,*CHECKBRANCH`);
PPx.Execute('%Os *wait 200, 2');
// マーク状態を復元
const resMark = (() => {
  if (PPx.EntryMarkCount != 0) {
    return `*markentry o:dx;${PPx.Extract('%#;FC')}`;
  }else {
    return '*unmarkentry';
  }
})();
PPx.Execute('%Os *jumppath /savelocate /refreshcache');
PPx.Execute(`%Os ${resMark}`);
