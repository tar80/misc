//!*script
/* PPv上からファイル削除 */

'use strict';

const cdExt = PPx.GetFileInformation(PPx.Extract('%FD'));
const cdFileExt = PPx.GetFileInformation(PPx.Extract('%FDC'));

if (!cdFileExt && (cdExt == ':PKZIP' || cdExt == ':RAR')) {
  PPx.Execute('%"ファイル操作" %Q"書庫から削除します" %: %u7-zip64.dll,d -hide %FD %FC');
  // PPx.Execute('*PPVUD DOWN'); // *PPVUD=ユーザーコマンド
} else {
  PPx.Execute( `
%"ファイル操作" %Q"表示中のエントリを削除します" %: \
%Oa *file !safedelete,%FDC,%*name(HP,%1)%'trash'%,-qstart -min -nocount -retry:0 -error:0 -backup -undolog \
-compcmd *linemessage safedelete.`);
}

