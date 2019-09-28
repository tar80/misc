//!*script
/* 状況に応じたファイルコピーの設定 */
// PPx.Arguments(0)=0:detail|1:quick
// %'work'=workspace

var opDir = PPx.Extract('%2');
var tDir; //対象DIRパス
var filePath = PPx.Extract('%FDC');
var fileName = PPx.Extract('%FC');
var pathState = (PPx.Arguments(0) == 0 ? ['copy', ''] : ['!copy', '-min']);
// 送り先を設定
switch (PPx.GetFileInformation(opDir)) {
  case ':DIR':
  case ':XLF':
    tDir = opDir;
    break;
  case '':
    tDir = PPx.Extract("%\'work\'").replace("/\//g,'\\'");
    var pathState = ['copy', ''];
    break;
  default:
    PPx.Echo('対象がディレクトリではありません');
    PPx.Quit(1);
    break;
};
// シンボリックリンク
if (PPx.Arguments(0) >= 2) {
  var tDir = PPx.Extract('%*input("' + tDir +'" -title:"コピー先" -mode:d)%*addchar(\\)');
  if (tDir) {
    // 対象がディレクトリなら/Dオプション付加
    var att = (PPx.GetFileInformation(filePath) == ':DIR' ? '/D ' : '');
    PPx.Execute('%Orn *ppb -runas -c mklink ' + att + tDir + fileName + ' ' + filePath);
  };
  // 送り元が書庫なら解凍
} else if (PPx.DirectoryType >= 62) {
  PPx.Execute('%u7-zip64.dll,e -aou -hide "%1" -o%"解凍先  ※重複リネーム,DIR展開"%{' + tDir + '%} %@');
} else {
  // 5mbyte以上ならバーストモード
  var mSize = (PPx.EntryMarkCount == 0 ? PPx.EntrySize : PPx.EntryMarkSize);
  var bst = (mSize > 5242880 ? 'on' : 'off');
  PPx.Execute('*ppcfile ' + pathState[0] + ',' + tDir + ',' + pathState[1] + ' -qstart -nocount -preventsleep -same:7 -sameall -burst:' + bst);
};
