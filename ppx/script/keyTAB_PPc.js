//!*script
// TABで窓移動PPc用
// 参照元:http://hoehoetukasa.blogspot.com/2014/05/ppv.html
// 実行元のppcIdを文字コードに変換
var ppcNum = PPx.Extract('%n').slice(1).charCodeAt(0) + 1;
var tID = PPx.Extract('%n').slice(1);
// syncviewがonならPPvをフォーカス
if(PPx.SyncView !=0){
  PPx.Execute('*focus V' + tID);
  PPx.Quit(1);
}
// 実行元より後のPPcがあればフォーカス
change_focus(ppcNum,'C');
// PPvがあればフォーカス
change_focus(65,'V');
// どちらも無ければ通常のTabの動作
PPx.Execute('%K"@F6"');
// (実行元より)アルファベット順で後のターゲットがあればフォーカスを移す
function change_focus(num,tChar){
  for(var i = num; i < 91; i =(i+1)|0){
    var tID = String.fromCharCode(i);
    if(PPx.Extract('%N' + tChar + tID)){
      PPx.Execute('*focus ' + tChar + tID);
      PPx.Quit(1);
    }
  }
}
