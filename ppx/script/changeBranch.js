//!*script
/* ブランチの変更 */

// PPxのエイリアス(ターミナル呼び出し)
PPx.Execute('termppx');
// git branchの状態をテキストに書き出す
PPx.Execute('%Ons *ppb -c git branch | sed -e s/\' \'*// > %\'temp\'%\\GITBRANCH.TXT');
PPx.Execute('*focus C');
// 一行編集で選択したブランチに移動して、PPxのステータス行に反映する
PPx.Execute('git checkout %*input(-title:"git checkout" -mode:e -k *completelist /file:%\'temp\'%\\GITBRANCH.TXT) %: git rev-parse --abbrev-ref HEAD | xargs %0pptrayw -c *setcust _user:u_git_branch=');
PPx.Execute('*wait 400, 1');
PPx.Execute('%K"@F5');
