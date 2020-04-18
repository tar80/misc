//!*script
/* ブランチの変更と表示の更新 */
// git branchを変更してPPcを更新
'use strict';
const branchList = (()=> {
  try {
    return PPx.Arguments();
  } catch (e) {
    PPx.Echo('引数が異常');
    PPx.Quit(1);
  }
})();

PPx.Execute(`%Os *execute C,@git branch | sed -e s/' '*// > ${branchList}`);
PPx.Execute('%Os *wait 200,1');
// 一行編集で選択したブランチに移動して、PPxのステータス行に反映する
PPx.Execute(`%Os *execute C,git checkout %*input(-title:"checkout branch" -mode:e -k *completelist -file:${branchList}) %: *wait 200,2 %: *execute C,*CHECKBRANCH`);
PPx.Execute('%Os *wait 200, 2');
PPx.Execute('%Os *execute C,%%K"@F5');
