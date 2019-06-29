//!*script
// 優先度を決めてPPx終了
// AUX窓があれば終了
if (PPx.Extract('%1').match(/aux:\/\/.+/)) {
  PPx.Execute('*execute CY,%j"%*getcust(_User:pk1)');
  PPx.Execute('*closeppx CY %:*closeppx BA');
  PPx.Quit(1);
}
// 連動ビューがあれば終了
if (PPx.SyncView) {
  PPx.SyncView = 0;
  PPx.Execute('%KV%*getcust(_others:SyncViewID),"@Q"');
  PPx.Execute('*setcust X_win:V=B000000001 %:*setcust _others:-|SyncViewID=');
  PPx.Quit(1);
}
// 起動状態のPPxID取得
var ppxId = new Array();
for (var i = 90; i >= 65; i = (i-1)|0) {
  var id = String.fromCharCode(i);
  if (PPx.Extract('%NV' + id)) ppxId.push('V' + id);
  if (PPx.Extract('%NB' + id)) ppxId.push('B' + id);
  if (PPx.Extract('%NC' + id)) ppxId.push('C' + id);
}
// PPvがあれば終了
close_target('V');
// PPbがあれば終了
close_target('B');
// PPcがあれば終了
close_target('C');
// 起動状態のPPxIdを順番に処理
function close_target(tChar) {
  for (var item in ppxId) {
    if (ppxId[item].slice(0,1) == tChar) {
      if (ppxId[item] == 'CX') PPx.Execute('*setcust XC_celD=_AUTO,_AUTO,3,7');
      PPx.Execute('*closeppx ' + ppxId[item]);
      PPx.Quit(1);
    }
  }
}
