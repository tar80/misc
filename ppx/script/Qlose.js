//!*script
/* 優先度を決めてPPx終了 */

// AUX窓があれば終了
if (PPx.Extract('%1').match(/aux:\/\/.+/)) {
  PPx.Execute('*execute CY, %j"%*getcust(_User:pk1)');
  PPx.Quit(1);
};
// 連動ビューがあれば終了
if (PPx.SyncView) {
  PPx.SyncView = 0;
  PPx.Execute('%KV%*getcust(_others:SyncViewID), "@Q"');
  PPx.Execute('*setcust X_win:V=B000000001 %: *setcust _others:-|SyncViewID=');
  PPx.Quit(1);
};
// PPvがあれば終了
close_target('V');
// PPcがあれば終了
close_target('C');

/* 起動状態のPPxIDを取得する関数 */
function get_id(str) {
  var array = [];
  for (var i = 90; i >= 65; i = (i-1)|0) {
    var id = String.fromCharCode(i);
    if (PPx.Extract('%N' + str + id))
      array.push(str + id);
  };
  return array;
};
/* 起動状態のPPxIdを降順に閉じる関数 */
function close_target(tChar) {
  var ppxId = get_id(tChar);
  for (var item in ppxId) {
    if (ppxId[item].slice(0,1) == tChar) {
      if (ppxId[item] == 'CX')
        PPx.Execute('*setcust XC_celD=_AUTO,_AUTO,3,7');
      PPx.Execute('*closeppx ' + ppxId[item]);
      PPx.Quit(1);
    };
  };
};
