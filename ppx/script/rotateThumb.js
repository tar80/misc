//!*script
// リスト表示切り替え
if(PPx.Extract('%n') == 'CX'){
  if(PPx.DirectoryType >= 62){
    PPx.Execute('*RotateExecute u_rotate_styleC,*viewstyle "漫画:小(&M)",*viewstyle "漫画:大(&M)"');
  } else{
    PPx.Execute('*RotateExecute u_rotate_styleB,*viewstyle "画像:小(&P)",*viewstyle "画像:中(&P)",*viewstyle "画像:大(&P)"');
    PPx.Quit(1);
  }
}
switch(PPx.Extract(PPx.DirectoryType)){
case '4':
  PPx.Execute('*RotateExecute u_rotate_styleA,*viewstyle -temp 一覧:名前(&L),*viewstyle -temp 一覧:日付(&L)');
  break;
default:
  PPx.Execute('*RotateExecute u_rotate_styleA,*viewstyle -temp 日付(&D) %%:*sortentry &T:逆順,*viewstyle -temp サムネイル:小(&T) %%:*sortentry &D:標準,*viewstyle -temp サムネイル:中(&T),*viewstyle アイコン(&I)');
  break;
}
/*
if(PPx.Extract('%n') == 'CX'){
  if(PPx.DirectoryType >= 62){
    PPx.Execute('*RotateExecute u_rotate_styleC,*viewstyle "漫画:小(&M)",*viewstyle "漫画:大(&M)"');
  } else{
    PPx.Execute('*RotateExecute u_rotate_styleB,*viewstyle "画像:小(&P)",*viewstyle "画像:中(&P)",*viewstyle "画像:大(&P)"');
  }
} else{
  PPx.Execute('*RotateExecute u_rotate_styleA,*viewstyle "一覧:名前(&A)",*viewstyle "サムネイル:小(&T)",*viewstyle "サムネイル:中(&T)",*viewstyle "アイコン(&I)"');
}
 */
