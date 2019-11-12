//!*script
/* IDの後方からPPx終了 */

// AUX窓があれば終了
if (PPx.Extract('%1').match(/aux:\/\/.+/)) {
  PPx.Execute('*execute CY, %j"%*getcust(_User:pk1)');
  PPx.Quit(1);
};

var xList = PPx.Extract('%*ppxlist(-)').split(',');
xList.sort(function (a, b) {
  return a < b ? 1 : -1;
  return 0;
});
var tID = xList.join(',').slice(0, 3);
if (tID.indexOf('V_') == 0) {
  // PPx.Execute('*setcust X_win:V=B000000001');
  var sync = PPx.Extract('%*extract(C,"%%*js(PPx.Result=PPx.SyncView;)")')|0;
  if (sync != 0) {
  PPx.SyncView = 0;
    if (PPx.Extract('%si"vSize') != 0) {
    PPx.Execute('*setcust _WinPos:V' + tID.slice(2) + '=%si"vSize"');
    PPx.Execute('*string i,vSize=');
  };
    PPx.Quit(1);
  };
} else if (tID == 'C_X')
        PPx.Execute('*setcust XC_celD=_AUTO,_AUTO,3,7');
PPx.Execute('*closeppx ' + tID);

// // 連動ビューがあれば終了
// PPx.Execute('*string i,vState=');
// var sync = PPx.Extract('%*extract(C,"%%*js(PPx.Result=PPx.SyncView;)")')|0;
// if (sync > 0) {
//   PPx.SyncView = 0;
//   PPx.Execute('%KV' + PPx.WindowIDName.slice(2) + ',"@Q"');
//   PPx.Execute('*setcust X_win:V=B000000001');
//   PPx.Quit(1);
// };
// // PPvがあれば終了
// close_target('V');
// // PPcがあれば終了
// close_target('C');
//
// /* 起動状態のPPxIDを取得する関数 */
// function load_id(tChar) {
//   var idList = [];
//   for (var i = 90; i >= 65; i = (i-1)|0) {
//     var id = String.fromCharCode(i);
//     if (PPx.Extract('%N' + tChar + id))
//       idList.push(tChar + id);
//   };
//   return idList;
// };
// /* 起動状態のPPxIdを降順に閉じる関数 */
// function close_target(tChar) {
//   var xID = load_id(tChar);
//   for (var item in xID) {
//     if (xID[item].slice(0,1) == tChar) {
//       if (xID[item] == 'CX')
//         PPx.Execute('*setcust XC_celD=_AUTO,_AUTO,3,7');
//       PPx.Execute('*closeppx ' + xID[item]);
//       PPx.Quit(1);
//     };
//   };
// };
