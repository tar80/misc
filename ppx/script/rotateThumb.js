//!*script
// リスト表示切り替え
if(PPx.Extract('%n') == 'CX'){
if(PPx.DirectoryType == 96){
  PPx.Execute('*RotateExecute ViewStyleC,*viewstyle "漫画小(&M)",*viewstyle "漫画大(&M)"');
  } else{
    PPx.Execute('*RotateExecute ViewStyleB,*viewstyle "画像小(&S)",*viewstyle "画像中(&M)",*viewstyle "画像大(&L)"');
  }
} else{
  PPx.Execute('*RotateExecute ViewStyleA,*viewstyle "一覧1(&A)",*viewstyle "サムネイル小(&T)",*viewstyle "サムネイル中(&T)",*viewstyle "アイコン(&I)"');
}
