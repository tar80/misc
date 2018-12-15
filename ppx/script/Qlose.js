//!*script
// いろんなケースの窓終了処理
// 参照元:http://hoehoetukasa.blogspot.com/2014/05/blog-post_20.html
if(PPx.Extract('%1').match(/aux:\/\/.+/)){
  PPx.Execute('*execute CY,%j\"%*getcust(_User:pk1)');
  PPx.Execute('*closeppx CY %:*closeppx BA');
  PPx.Quit(1);
}
if(PPx.SyncView != 0){
  PPx.SyncView = 0;
  PPx.Quit(1);
}
for(var i = 90; i > 64; i--){
  ppvid = 'V' + String.fromCharCode(i);
  if(PPx.Extract('%N' + ppvid).match(/.+/)){
    PPx.Execute('\%K' + ppvid + ',\"@Q\"');
    PPx.Quit(1);
  }
} if(PPx.Pane.Tab.Count >= '2'){
  PPx.Execute('\%KC,\"@Q\"');
  PPx.Quit(1);
} else{
  for (var i = 90; i > 64; i--) { //zからAまで
    var ppcid = 'C' + String.fromCharCode(i);
    if(PPx.Extract('%N' + ppcid).match(/.+/)) {
      if(ppcid == 'CX' && PPx.Extract("%*getcust\(X_win:CX\)").slice(6,7) == 0){
        PPx.Execute('*setcust XC_mvUD=1,1,4,B0010,5,B0011 %:*setcust XC_celD=_AUTO,_AUTO,3,7 %: *customize XC_page=1');
      }
      /*    if(ppcid == 'CB'){
        PPx.Execute('*execute CB,*viewstyle \"詳細\(&A\)\"');
      } if(ppcid == 'CA'){
        PPx.Execute('*execute CA,*viewstyle \"詳細\(&A\)\"');
      }*/
      PPx.Execute('\%K' + ppcid + ',\"@Q\"');
      PPx.Quit(1);
    }
  }
}
