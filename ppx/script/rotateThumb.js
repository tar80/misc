//!*script
// リスト表示切り替え
if(PPx.Extract('%n') == 'CX'){
  if(PPx.DirectoryType >= 62){
    PPx.Execute('*RotateExecute ViewStyleC,*viewstyle "漫画:小(&M)",*viewstyle "漫画:大(&M)"');
  } else{
    PPx.Execute('*RotateExecute ViewStyleB,*viewstyle "画像:小(&P)",*viewstyle "画像:中(&P)",*viewstyle "画像:大(&P)"');
    PPx.Quit(1);
  }
}
switch(PPx.Extract(PPx.DirectoryType)){
case '4':
  PPx.Execute('*RotateExecute ViewStyleA,*viewstyle -temp リスト:名前(&L),*viewstyle -temp リスト:行表示(&L)');
  break;
default:
  PPx.Execute('*RotateExecute ViewStyleA,*viewstyle -temp 時刻(&T) %%:*sortentry &T:逆順,*viewstyle -temp サムネイル:小(&T) %%:*sortentry &D:標準,*viewstyle -temp サムネイル:中(&T),*viewstyle アイコン(&I)');
  break;
}
/*
if(PPx.Extract('%n') == 'CX'){
  if(PPx.DirectoryType >= 62){
    PPx.Execute('*RotateExecute ViewStyleC,*viewstyle "漫画:小(&M)",*viewstyle "漫画:大(&M)"');
  } else{
    PPx.Execute('*RotateExecute ViewStyleB,*viewstyle "画像:小(&P)",*viewstyle "画像:中(&P)",*viewstyle "画像:大(&P)"');
  }
} else{
  PPx.Execute('*RotateExecute ViewStyleA,*viewstyle "一覧:名前(&A)",*viewstyle "サムネイル:小(&T)",*viewstyle "サムネイル:中(&T)",*viewstyle "アイコン(&I)"');
}
 */