//!*script
/* リストビューの表示切り替え */

'use strict';

const dirType = PPx.DirectoryType;
const listView = (PPx.WindowIDName == 'C_X') ? 'CX' : dirType;

switch (listView) {
  case 'CX':
    {
      if (dirType >= 62) {
        PPx.Execute(`
*RotateExecute u_rotate_styleC,\
"*viewstyle ""画像:中縦(&H)""",\
"*viewstyle ""画像:特縦(&H)"""`);
      } else {
        const imgSize = PPx.Entry.Information.replace(/[\s\S]*大きさ\s:\D*(\d*)\sx\s(\d*)[\s\S]*/g, '$1,$2').split(',');
        const str = (imgSize[0] - imgSize[1] < 0) ? '縦(&H)' : '(&W)';

        PPx.Execute(`
*RotateExecute u_rotate_styleB,\
"*viewstyle ""画像:小(&W)""",\
"*viewstyle ""画像:中${str}""",\
"*viewstyle ""画像:大${str}"""`);
      }
    }
    break;
  case '4':
    PPx.Execute('*RotateExecute u_rotate_styleA, *viewstyle -temp &LISTFILE, *viewstyle -temp 一覧:コメント(&@)');
    break;
  // case '96':
  //   PPx.Execute('*RotateExecute u_rotate_styleA, *maskpath off , *maskpath on');
  //   break;
  default:
    {
      const pict = ['jpg', 'jpeg', 'bmp', 'png', 'gif', 'vch', 'edg'];

      if (dirType >= 62) {
        if (pict.indexOf(PPx.Extract('%t')) !== -1 ) {
          PPx.Execute('*RotateExecute u_rotate_styleA, *viewstyle -temp "サムネイル:小(&T)", *viewstyle -temp "サムネイル:中(&T)", *viewstyle -temp "書庫(&A)"');
          PPx.Quit(1);
        }
        PPx.Execute('*RotateExecute u_rotate_styleA, *viewstyle -temp "アイコン(&;)", *viewstyle -temp "書庫(&A)"');
      } else {
        PPx.Execute('*RotateExecute u_rotate_styleA, *viewstyle -temp "一覧:コメント(&@)" %%:*sortentry "&T:日付 降", *viewstyle -temp "サムネイル:小(&T)" %%:*sortentry &R:標準, *viewstyle -temp "サムネイル:中(&T)", *viewstyle -temp "アイコン(&;)"');
      }
    }
    break;
}
