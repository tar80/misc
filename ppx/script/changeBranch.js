//!*script
// ブランチの変更
PPx.Execute('termppx');
PPx.Execute('git branch | sed -e s/\' \'*// > %\'repoppx\'%\\list\\GITBRANCH.TXT');
PPx.Execute('*wait 300,1');
PPx.Execute('git checkout %*input(-title:"checkout branch" -mode:e -k *completelist /file:%\'repoppx\'%\\list\\GITBRANCH.TXT) %:git rev-parse --abbrev-ref HEAD | xargs %0ppcw -r -k *setcust _user:u_git_branch=');
PPx.Execute('*wait 200,1');
PPx.Execute('%K"@F5');



