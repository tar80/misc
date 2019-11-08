//!*script
/* TABキーで窓移動 */
// PPx.Arguments(0)=ppc|ppv ;実行元
// 参照元:http://hoehoetukasa.blogspot.com/2014/05/ppv.html

// 引数に応じて移動先を決定する
try {
  var ppxChar = (PPx.Arguments(0) === 'ppc')
    ? ['C', 'V']
    : ['V', 'C'];
} catch (e) {
  PPx.Echo(e);
  PPx.Quit(-1);
};
// 実行元のPPxIDを文字コードに変換
var tID = PPx.Extract('%n').slice(1);
var ppxNum = tID.charCodeAt(0) + 1;
// syncviewがonならPPc/PPv間でフォーカスをトグル
if (PPx.SyncView) {
  PPx.Execute('*focus ' + ppxChar[1] + tID);
  PPx.Quit(1);
};
// 実行元より後のIDがあればフォーカス
move_focus(ppxNum,ppxChar[0]);
//  実行元がPPcであればPPv、PPvであればPPcにフォーカス
move_focus(65, ppxChar[1]);
// どちらも無ければ通常のTabの動作
PPx.Execute('%K"@F6"');

/* (実行元より)アルファベット順で後のターゲットがあればフォーカスを移す関数 */
function move_focus(num,tChar) {
  for (var i = num; i < 91; i =(i+1)|0) {
    var tID = String.fromCharCode(i);
    if (PPx.Extract('%N' + tChar + tID)) {
      PPx.Execute('*focus ' + tChar + tID);
      PPx.Quit(1);
    };
  };
};
