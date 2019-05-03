//!*script
// TABで窓移動PPv用
// 参照元:http://hoehoetukasa.blogspot.com/2014/05/ppv.html
// 実行元のPPvIDを文字コードに変換
var ppvNum = PPx.Extract('%n').slice(1).charCodeAt(0) + 1;
// PPvがあればフォーカス
change_focus(ppvNum,'V');
// なければPPcにフォーカス
change_focus(65,'C');
// 実行元PPvよりアルファベット順で後のPPvがあればフォーカスを移す
function change_focus(num,tChar){
  for(var i = num; i < 91; i++){
    var tID = String.fromCharCode(i);
    if(PPx.Extract('%N' + tChar + tID)){
      PPx.Execute('*focus ' + tChar + tID);
      PPx.Quit(1);
    }
  }
}
