//!*script
/* 状況に応じたファイルコピーの設定 */
//
// PPx.Arguments()= (0)0:detail | 1:quick | >=2:link
// %'work'=workspace
// -comcmdはフォーカス制御

var arg = (PPx.Arguments.length) ? PPx.Arguments(0)|0 : 0;
var cdFilePath = PPx.Extract('%FDC');
var cdFileName = PPx.Extract('%FC');
var opDir = PPx.Extract('%2');
var tDir;
var mlOpt;    // mklink_option
var post;

var cmdOpt = (arg == 0)
  ? ['copy', '-renamedest:on']
  : ['!copy', '-min'];

// 送り先を設定
switch (PPx.GetFileInformation(opDir)) {
  case ':DIR':
    tDir = opDir;
    post = '-compcmd *ppc -r -noactive';
    break;
  case ':XLF':
    tDir = opDir;
    post = '';
    break;
  case '':
    tDir = '%\'work\'%\\';
    cmdOpt = ['copy', ''];
    post = '-compcmd *ppc -pane:~ %%hd0 -k *jumppath -entry:' + cdFileName
    ;
    break;
  default:
    PPx.Echo('非対象ディレクトリ');
    PPx.Quit(1);
    break;
}

// シンボリックリンク
if (arg >= 2) {
  tDir = PPx.Extract('%*input("' + tDir +'" -title:"コピー先" -mode:d)%\\');

  if (tDir) {
    // 対象がディレクトリなら/Dオプション付加
    mlOpt = (PPx.GetFileInformation(cdFilePath) == ':DIR') ? '/D ' : '';
    PPx.Execute('%Orn *ppb -runas -c mklink ' + mlOpt + tDir + cdFileName + ' ' + cdFilePath);
  }
  // 送り元が書庫なら解凍
} else if (PPx.DirectoryType >= 62) {
  PPx.Execute('%u7-zip64.dll,e -aou -hide "%1" -o%"解凍先  ※重複リネーム,DIR展開"%{' + tDir + '%} %@');
} else {
  PPx.Execute('*ppcfile ' + cmdOpt[0] + ',' + tDir + ',' + cmdOpt[1] + ' -qstart -nocount -preventsleep -same:0 -sameall -undolog ' + post);
}
