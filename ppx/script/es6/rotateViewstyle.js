//!*script
/* リストビューの表示切り替え */
'use strict';
const dirType = PPx.Extract(PPx.DirectoryType);
const listView = (PPx.WindowIDName == 'C_X') ? 'CX' : dirType;

switch (listView) {
case 'CX':
  (dirType >= 62)
    ? PPx.Execute(`%OC *RotateExecute u_rotate_styleC,
      *setcust XC_ocig=2,0,1,0,0,256,1 %: *viewstyle "漫画:小(&M)",
      *setcust XC_ocig=2,0,1,0,0,256,0 %: *viewstyle "漫画:大(&M)"`)
    : PPx.Execute(`%OC *RotateExecute u_rotate_styleB,
      *setcust xc_ocig=2,0,1,0,0,256,1 %: *viewstyle "画像:小(&P)",
      *setcust XC_ocig=2,0,1,0,0,256,0 %: *viewstyle "画像:中(&P)",
      *setcust XC_ocig=2,0,1,0,0,256,0*%: viewstyle "画像:大(&P)"`);
  break;
case '4':
  PPx.Execute('*RotateExecute u_rotate_styleA, *viewstyle -temp 一覧:名前(&L), *viewstyle -temp 一覧:コメント(&L)');
  break;
  // case '96':
  //   PPx.Execute('*RotateExecute u_rotate_styleA, *maskpath off , *maskpath on');
  //   break;
default:
  {
    const pict = ['jpg', 'jpeg', 'bmp', 'png', 'gif', 'vch', 'edg'];
    if (dirType >= 62 && pict.indexOf(PPx.Extract('%t')) != -1 ) {
      PPx.Execute('*setcust XC_ocig=2,0,1,0,0,256,1');
    } else {
      PPx.Execute('*setcust XC_ocig=2,0,0,0,0,256,1');
    }
  }
  PPx.Execute('*RotateExecute u_rotate_styleA, *viewstyle -temp 日付(&D) %%:*sortentry "&T:日付 降", *viewstyle -temp "サムネイル:小(&T)" %%:*sortentry &D:標準, *viewstyle -temp "サムネイル:中(&T)", *viewstyle アイコン(&I)');
  break;
}
