//!*script
/* リストビューの表示切り替え */

var dirType = PPx.Extract(PPx.DirectoryType);
var viewStyle = (PPx.WindowIDName == 'C_X')
  ? ['CX', dirType]
  : [dirType, ''];
switch (viewStyle[0]) {
  case 'CX':
    (viewStyle[1] >= 62)
      ? PPx.Execute('*RotateExecute u_rotate_styleC, *viewstyle "漫画:小(&M)", *viewstyle "漫画:大(&M)"')
      : PPx.Execute('*RotateExecute u_rotate_styleB, *viewstyle "画像:小(&P)", *viewstyle "画像:中(&P)", *viewstyle "画像:大(&P)"');
    break;
  case '4':
    PPx.Execute('*RotateExecute u_rotate_styleA, *viewstyle -temp 一覧:名前(&L), *viewstyle -temp 一覧:コメント(&L)');
    break;
  default:
    PPx.Execute('*RotateExecute u_rotate_styleA, *viewstyle -temp 日付(&D) %%:*sortentry "&T:日付 降", *viewstyle -temp "サムネイル:小(&T)" %%:*sortentry &D:標準, *viewstyle -temp "サムネイル:中(&T)", *viewstyle アイコン(&I)');
    break;
};
