//!*script
/* リストビューの表示切り替え */

var dirType = PPx.Extract(PPx.DirectoryType);
var listView = (PPx.WindowIDName == 'C_X') ? 'CX' : dirType;
// var imgSize = new Array(2);
// var str;
// PPx.Entry.Information.replace(/[\s\S]*\*Size:(\d*)x(\d*)[\s\S]*/g, function (match, p1, p2) {
//   imgSize = [p1, p2];
//   str = (imgSize[0] - imgSize[1] < 0)
//   ? "縦(&H)"
//   : "(&W)";
// });

switch (listView) {
  case 'CX':
    if (dirType >= 62) {
      PPx.Execute(
'*RotateExecute u_rotate_styleC,\
"*viewstyle ""画像:中縦(&H)""",\
"*viewstyle ""画像:特縦(&H)"""');
    } else {
      PPx.Execute('%Osn *ppb -c file %R | xargs %0ppcw -r -bootid:X -noactive -k *string i,str=');
      var imgSize = PPx.Extract('%si"str"').replace(/.*,\s([0-9]{1,6})\s?x\s?([0-9]{1,6}),\s.*$/, '$1,$2').split(',');
      var str = (imgSize[0] - imgSize[1] < 0)
        ? '縦(&H)' : '(&W)';
      PPx.Execute(
'*RotateExecute u_rotate_styleB,\
"*viewstyle ""画像:小(&W)""",\
"*viewstyle ""画像:中' + str + '""",\
"*viewstyle ""画像:大' + str + '"""');
    }
    break;
  case '4':
    PPx.Execute('*RotateExecute u_rotate_styleA, *viewstyle -temp "リストファイル(&L)", *viewstyle -temp 一覧:コメント(&@)');
    break;
    // case '96':
    //   PPx.Execute('*RotateExecute u_rotate_styleA, *maskpath off , *maskpath on');
    //   break;
  default:
    if (dirType >= 62) {
      var pict = 'jpg ,jpeg ,bmp ,png ,gif ,vch ,edg';
      if (pict.indexOf(PPx.Extract('%t')) !== -1 ) {
        PPx.Execute('*RotateExecute u_rotate_styleA, *viewstyle -temp "サムネイル:小(&T)", *viewstyle -temp "サムネイル:中(&T)", *viewstyle -temp "書庫(&A)"');
        PPx.Quit(1);
      }
      PPx.Execute('*RotateExecute u_rotate_styleA, *viewstyle -temp "アイコン(&;)", *viewstyle -temp "書庫(&A)"');
    } else {
      PPx.Execute('*RotateExecute u_rotate_styleA, *viewstyle -temp "一覧:コメント(&@)" %%:*sortentry "&T:日付 降", *viewstyle -temp "サムネイル:小(&T)" %%:*sortentry &R:標準, *viewstyle -temp "サムネイル:中(&T)", *viewstyle -temp "アイコン(&;)"');
    }
    break;
}
