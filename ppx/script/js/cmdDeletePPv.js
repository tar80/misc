//!*script
/* PPv上からファイル削除 */

var pwdExt = PPx.GetFileInformation(PPx.Extract('%FD'));
var entryExt = PPx.GetFileInformation(PPx.Extract('%FDC'));

// 書庫
if (!entryExt && (pwdExt === ':PKZIP' || pwdExt === ':RAR')) {
  PPx.Execute('%"ファイル操作"%Q"書庫から削除します" %: %u7-zip64.dll,d -hide %FD %FC');
  PPx.Quit(1);
}

PPx.Execute(
  '%"ファイル操作"%Q"表示中のエントリを削除します"' +
  ' %: %Oa *file !safedelete,%FDC,%*name(HP,%1)%\'trash\'%,' +
  ' -qstart -min -nocount -retry:0 -error:0 -backup -undolog' +
  ' -compcmd *linemessage safedelete.'
);

