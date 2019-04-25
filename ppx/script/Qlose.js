//!*script
// いろんなケースの窓終了処理
// 参照元:http://hoehoetukasa.blogspot.com/2014/05/blog-post_20.html
if(PPx.Extract('%1').match(/aux:\/\/.+/)){
  PPx.Execute('*execute CY,%j"%*getcust(_User:pk1)');
  PPx.Execute('*closeppx CY %:*closeppx BA');
  PPx.Quit(1);
}
for(var i = 90; i >= 65; i--){
  var id = String.fromCharCode(i);
  if(PPx.Extract('%NV' + id)){
    PPx.SyncView = 0;
    PPx.Execute('*closeppx V' + id);
    PPx.Quit(1);
  }
}
/*
if(PPx.Pane.Tab.Count >= '2'){
  PPx.Execute('%KC,"@Q"');
  PPx.Quit(1);
} else{
*/
for (i = 90; i >= 65; i--) {
  id = String.fromCharCode(i);
  if(PPx.Extract('%NC' + id)) {
    if(id == 'X') PPx.Execute('*setcust XC_celD=_AUTO,_AUTO,3,7');
    PPx.Execute('*closeppx C' + id);
    PPx.Quit(1);
  }
}

