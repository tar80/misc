//!*script
// TABで窓移動PPv用
// 参照元:http://hoehoetukasa.blogspot.com/2014/05/ppv.html
// 実行元のPPvIDを文字コードに変換
var useppv = PPx.Extract('%n').slice(1).charCodeAt(0) + 1;
// 実行元PPvよりアルファベット順で後のPPvがあればフォーカスを移す
for(var i = useppv; i < 91; i++){
  var ppvid = String.fromCharCode(i);
  if(PPx.Extract('%NV' + ppvid).match(/.+/)){
    PPx.Execute('*focus V' + ppvid);
    PPx.Quit(1);
  }
}
// 無ければPPcにフォーカス
for(i = 65; i < 91; i++){
  var ppcid = String.fromCharCode(i);
  if(PPx.Extract('%NC' + ppcid).match(/.+/)){
    PPx.Execute('*focus C' + ppcid);
    PPx.Quit(1);
  }
}