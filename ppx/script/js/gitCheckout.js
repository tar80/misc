//!*script
/* ブランチの変更と表示の更新 */
// git branchを変更してPPcを更新
try {
    var branchList = PPx.Arguments(0);
  } catch (e) {
    PPx.Echo('引数が異常');
    PPx.Quit(1);
  }

// PPxのエイリアス(ターミナル呼び出し)
PPx.Execute('%Oai termppx');
// git branchの状態をテキストに書き出す
PPx.Execute('*execute C,@git branch | sed -e s/\' \'*// > ' + branchList);
PPx.Execute('*wait 300,1');
// 一行編集で選択したブランチに移動して、PPxのステータス行に反映する
PPx.Execute('%Os *execute C,git checkout %*input(-title:"checkout branch" -mode:e -k *completelist -file:' + branchList + ') %: *wait 300 %: *execute C,*CHECKBRANCH');
PPx.Execute('*wait 200, 2');
// PPx.Execute('*execute C,%%K"@F5');
// マーク状態を復元
var resMark = function () {
  if (PPx.EntryMarkCount != 0) {
    return '*markentry ' + PPx.Extract('%#;FC');
  }else {
    return '*unmarkentry';
  }
}();
PPx.Execute('*jumppath /savelocate /refreshcache');
PPx.Execute(resMark);
