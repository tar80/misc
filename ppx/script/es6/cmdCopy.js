//!*script
/* 状況に応じたファイルコピーの設定 */
// PPx.Arguments() = [0]0:detail | 1:quick | 2以上:link
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
const cdFilePath = PPx.Extract('%FDC');
const cdFileName = PPx.Extract('%FC');
const opPath = PPx.Extract('%2');

// 送り先振り分け
const cmd = (() => {
  let pre = {};
  switch (PPx.GetFileInformation(opPath)) {
  case ':DIR':
    pre = (arg == 0)
      ? {act: 'copy', opt: '-renamedest:on'}
      : {act: '!copy', opt: '-min'};
    pre.dest = opPath;
    pre.post = '-compcmd *ppc -r -noactive';
    return pre;
  case ':XLF':
    pre = (arg == 0)
      ? {act: 'copy', opt: '-renamedest:on'}
      : {act: '!copy', opt: '-min'};
    pre.dest = opPath;
    pre.post = '';
    return pre;
  case '':
    pre = {act: 'copy', opt: ''};
    pre.dest = '%\'work\'%\\';
    pre.post = '-compcmd *ppc -pane:~ %%hd0';
    return pre;
  default:
    PPx.Echo('非対象ディレクトリ');
    PPx.Quit(1);
  }
})();

// シンボリックリンク
if (arg >= 2) {
  cmd.dest = PPx.Extract(`%*input("${cmd.dest}" -title:"リンク先" -mode:d)%\\`);
  if (cmd.dest) {
    // 対象がディレクトリなら/Dオプション付加
    cmd.opt = (PPx.GetFileInformation(cdFilePath) == ':DIR') ? '/D' : '';
    PPx.Execute(`%Orn *ppb -runas -c mklink ${cmd.opt} ${cmd.dest}${cdFileName} ${cdFilePath}`);
  }
  // 書庫なら解凍
} else if (PPx.DirectoryType >= 62) {
  PPx.Execute(`%u7-zip64.dll,e -aou -hide "%1" -o%"解凍先  ※重複>リネーム,DIR>展開"%{${cmd.dest}%} %@`);
} else {
  PPx.Execute(`%Oi *ppcfile ${cmd.act}, ${cmd.dest}, ${cmd.opt} -qstart -nocount -preventsleep -same:0 -sameall -undolog ${cmd.post}`);
}
