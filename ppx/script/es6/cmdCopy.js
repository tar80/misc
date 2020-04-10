//!*script
/* 状況に応じたファイルコピーの設定 */
// PPx.Arguments() = [0]0:detail | 1:quick | >=2:link
// %'work'=workspace
'use strict';
const arg = (() => {
  try {
    return PPx.Arguments(0)|0;
  } catch (e) {
    PPx.Echo(e);
    PPx.Quit(-1);
  }
})();
const filePath = PPx.Extract('%FDC');
const fileName = PPx.Extract('%FC');
const opPath = PPx.Extract('%~FD');
let cmd = [];

// 送り先を設定
switch (PPx.GetFileInformation(opPath)) {
case ':DIR':
case ':XLF':
  cmd = (arg == 0)
    ? {act: 'copy', opt: '-renamedest:on'}
    : {act: '!copy', opt: '-min'};
  cmd.dest = opPath;
  break;
case '':
  cmd = {act: 'copy', opt: ''};
  cmd.dest = '%\'work\'%\\';
  break;
default:
  PPx.Echo('非対象ディレクトリ');
  PPx.Quit(1);
}

// シンボリックリンク
if (arg >= 2) {
  cmd.dest = PPx.Extract(`%*input("${cmd.dest}" -title:"リンク先" -mode:d)%\\`);
  if (cmd.dest) {
    // 対象がディレクトリなら/Dオプション付加
    cmd.opt = (PPx.GetFileInformation(filePath) == ':DIR') ? '/D' : '';
    PPx.Execute(`%Orn *ppb -runas -c mklink ${cmd.opt} ${cmd.dest}${fileName} ${filePath}`);
  }
  // 送り元が書庫なら解凍
} else if (PPx.DirectoryType >= 62) {
  PPx.Execute(`%u7-zip64.dll,e -aou -hide "%1" -o%"解凍先  ※重複>リネーム,DIR>展開"%{${cmd.dest}%} %@`);
} else {
  PPx.Execute(`*ppcfile ${cmd.act}, ${cmd.dest}, ${cmd.opt} -mask:size:<1m -qstart -nocount -preventsleep -same:0 -sameall -undolog -compcmd *ppcfile !copy, ${cmd.dest}, -min -mask:size:>=1m -qstart -nocount -preventsleep -same:0 -sameall -undolog -burst:on -compcmd:*focus`);
}
