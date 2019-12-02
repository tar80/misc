//!*script
/* 状況に応じたファイルコピーの設定 */
// PPx.Arguments(0)=0:detail|1:quick|>=2:link
// %'work'=workspace
'use strict';
var tDir;
var opDir = PPx.Extract('%2');
var filePath = PPx.Extract('%FDC');
var fileName = PPx.Extract('%FC');
var mlOpt;    // mklink_option
try {
  var arg = PPx.Arguments(0)|0;
} catch (e) {
  PPx.Echo(e);
  PPx.Quit(-1);
};
var cmdOpt = (arg == 0)
  ? ['copy', '-renamedest:on']
  : ['!copy', '-min'];

// 送り先を設定
switch (PPx.GetFileInformation(opDir)) {
  case ':DIR':
  case ':XLF':
    tDir = opDir;
    break;
  case '':
    tDir = "%'work'%\\";
    cmdOpt = ['copy', ''];
    break;
  default:
    PPx.Echo('非対象ディレクトリ');
    PPx.Quit(1);
    break;
};
// シンボリックリンク
if (arg >= 2) {
  tDir = PPx.Extract('%*input("' + tDir +'" -title:"コピー先" -mode:d)%*addchar(\\)');
  if (tDir) {
    // 対象がディレクトリなら/Dオプション付加
    mlOpt = (PPx.GetFileInformation(filePath) == ':DIR')
      ? '/D '
      : '';
    PPx.Execute('%Orn *ppb -runas -c mklink ' + mlOpt + tDir + fileName + ' ' + filePath);
  }
  // 送り元が書庫なら解凍
} else if (PPx.DirectoryType >= 62) {
  PPx.Execute('%u7-zip64.dll,e -aou -hide "%1" -o%"解凍先  ※重複リネーム,DIR展開"%{' + tDir + '%} %@');
} else {
  PPx.Execute('*ppcfile ' + cmdOpt[0] + ',' + tDir + ',' + cmdOpt[1] + ' -mask:size:<1m -qstart -nocount -preventsleep -same:0 -sameall -undolog -compcmd *ppcfile !copy,' + tDir + ',-min -mask:size:>=1m -qstart -nocount -preventsleep -same:0 -sameall -undolog -burst:on');
};
