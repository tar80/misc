//!*script
// 新規独立窓呼び出し
// 参照元:http://hoehoetukasa.blogspot.com/2014/05/blog-post_20.html
for (var i = 67; i < 91; i++) {
  var ppcid = String.fromCharCode(i);
  if (PPx.Extract('%NC' + ppcid).match(/[^.+]/));
  PPx.Execute('*ppc -single -mps -bootid:' + ppcid + ' %1');
  PPx.Quit(1);
}

/*
if(PPx.Pane.Count == 1){
    if (PPx.Extract("%*getcust\(X_win:CA\)").slice(6,7) == 1){ // 現在窓のスクロールバーの位置を取得
        PPx.Execute("*execute CA,%M?layoutmenu,!p");
    } if (PPx.Extract("%*getcust\(X_win:CB\)").slice(6,7) == 1){ // 次の窓のスクロールバーの位置を取得
        PPx.Execute("*setcust X_win:CB=B001100001");
    }
    PPx.Execute('*pane focus CA');
    PPx.Execute('*pane closeleft');
    PPx.Execute('*pane closeright');
    PPx.Execute('*ppc -bootid:B -r');
} else  PPx.Execute('*ppc -single -sps %1');
 */
