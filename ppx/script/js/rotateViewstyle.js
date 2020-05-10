//!*script
/* リストビューの表示切り替え */

var dirType = PPx.Extract(PPx.DirectoryType);
var listView = (PPx.WindowIDName == 'C_X') ? 'CX' : dirType;

switch (listView) {
case 'CX':
  (dirType >= 62)
    ? PPx.Execute('%Os *RotateExecute u_rotate_styleC,\
      "*setcust XC_ocig=2,0,1,0,0,256,1 %%: *viewstyle ""漫画:小(&M)""",\
      "*setcust XC_ocig=2,0,1,0,0,256,0 %%: *viewstyle ""漫画:大(&M)"""')
    : PPx.Execute('%Os *RotateExecute u_rotate_styleB,\
      "*setcust XC_ocig=2,0,1,0,0,256,1 %%: *viewstyle ""画像:小(&P)""",\
      "*setcust XC_ocig=2,0,1,0,0,256,0 %%: *viewstyle ""画像:中(&P)""",\
      "*setcust XC_ocig=2,0,1,0,0,256,0 %%: *viewstyle ""画像:大(&P)"""');
    PPx.Execute('*wait 100');
    PPx.Execute('%K"@F5"');
  break;
case '4':
PPx.Execute('*RotateExecute u_rotate_styleA, *viewstyle -temp 一覧:名前(&L), *viewstyle -temp 一覧:コメント(&L)');
  break;
// case '96':
//   PPx.Execute('*RotateExecute u_rotate_styleA, *maskpath off , *maskpath on');
//   break;
default:
  if (dirType >= 62) {
    var pict = ['jpg', 'jpeg', 'bmp', 'png', 'gif', 'vch', 'edg'];
    for (var item in pict) {
      if (pict[item] == PPx.Extract('%t')) { PPx.Execute('*setcust XC_ocig=2,0,1,0,0,256,1'); }
    }
  } else {
    PPx.Execute('*setcust XC_ocig=2,0,0,0,0,256,1');
  }
  PPx.Execute('*RotateExecute u_rotate_styleA, *viewstyle -temp 日付(&D) %%:*sortentry "&T:日付 降", *viewstyle -temp "サムネイル:小(&T)" %%:*sortentry &D:標準, *viewstyle -temp "サムネイル:中(&T)", *viewstyle アイコン(&I)');
  break;
}
