//!*script
/* リストビューの表示切り替え */
'use strict';
const dirType = PPx.Extract(PPx.DirectoryType);
const listView = (PPx.WindowIDName == 'C_X') ? 'CX' : dirType;

switch (listView) {
case 'CX':
  {
    if (dirType >= 62) {
      PPx.Execute('*RotateExecute u_rotate_styleC,\
      "*setcust XC_ocig=2,0,1,0,0,256,1 %%: *viewstyle ""画像:中縦(&H)""",\
      "*setcust XC_ocig=2,0,1,0,0,256,0 %%: *viewstyle ""画像:特縦(&H)"""');
    } else {
      const imgSize = PPx.Entry.Information.replace(/[\s\S]*大きさ\s:\D*(\d*)\sx\s(\d*)[\s\S]*/g, '$1,$2').split(',');
      const str = (imgSize[0] - imgSize[1] < 0)
        ? '縦(&H)'
        : '(&W)';
      PPx.Execute(`*RotateExecute u_rotate_styleB,\
        "*setcust XC_ocig=2,0,1,0,0,256,1 %%: *viewstyle ""画像:小(&W)""",\
        "*setcust XC_ocig=2,0,1,0,0,256,1 %%: *viewstyle ""画像:中${str}""",\
        "*setcust XC_ocig=2,0,1,0,0,256,2 %%: *viewstyle ""画像:大${str}"""`);
    }
  }
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
