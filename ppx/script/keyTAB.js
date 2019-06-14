//!*script
// TABで窓移動
// PPx.Arguments(0)=ppc|ppv
// 参照元:http://hoehoetukasa.blogspot.com/2014/05/ppv.html
var ppxChar = PPx.Arguments(0) == 'ppc'? ['C','V']: ['V','C'];
var tID = PPx.Extract('%n').slice(1);
// 実行元のPPxIDを文字コードに変換
var ppxNum = tID.charCodeAt(0) + 1;
// syncviewがonならPPvとフォーカスをトグル
if(PPx.Extract('%*getcust(_others:SyncViewID)')){
  PPx.Execute('*focus ' + ppxChar[1] + tID);
  PPx.Quit(1);
}
// 実行元より後のIDがあればフォーカス
change_focus(ppxNum,ppxChar[0]);
//  実行元がPPcであればPPv、PPvであればPPcにフォーカス
change_focus(65,ppxChar[1]);
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
