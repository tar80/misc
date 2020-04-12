//!*script
/* ブランチの変更 */
'use strict';
// PPxのエイリアス(ターミナル呼び出し)
PPx.Execute('termppx');
// git branchの状態をテキストに書き出す
PPx.Execute('*execute C,git branch | sed -e s/\' \'*// > %\'repoppx\'%\\list\\GITBRANCH.TXT');
// 一行編集で選択したブランチに移動して、PPxのステータス行に反映する
PPx.Execute('*execute C,git checkout %*input(-title:"checkout branch" -mode:e -k *wait 200,2 %%: *completelist -file:%\'repoppx\'%\\list\\GITBRANCH.TXT) %%: git rev-parse --abbrev-ref HEAD | xargs %0pptrayw -c *setcust _user:u_git_branch=');
PPx.Execute('*wait 500, 2');
PPx.Execute('%K"@F5');
