//!*script
// PPv上からファイル削除
// *PPVUD=ユーザーコマンド
var dirExt = PPx.GetFileInformation(PPx.Extract('%FD'));
var fileExt = PPx.GetFileInformation(PPx.Extract('%FDC'));
if(!fileExt && (dirExt == ':PKZIP' || dirExt == ':RAR')){
  PPx.Execute('%\"ファイル操作\" %Q\"書庫から削除します\" %:%u7-zip64.dll,d -hide %FD %FC');
  //PPx.Execute('*PPVUD DOWN');
} else{
  PPx.Execute('%\"ファイル操作\" %Q\"表示中のエントリを削除します\" %: %Oa *file !safedelete,%FDC,%*name\(H,%1\)\\,/qstart /min /nocount /retry:0 /error:0 /backup /undolog');
}
