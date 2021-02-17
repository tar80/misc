//!*script
/* 状況に応じたファイル移動の設定 */
//
// PPx.Arguments() = (0)有:quick
// -compcmdはフォーカス制御

'use strict';

const opPath = PPx.Extract('%2');
const cursor = PPx.Extract('%R');
// 送り先を設定
const cmd = ((pre) => {
  if (!PPx.GetFileInformation(opPath)) {
    pre = {act: 'move', opt: '', post: `-compcmd *ppc -pane:~ -k *jumppath %%hd0 -entry:${cursor}`};
    pre.dest = '%\'work\'%\\';
  } else {
    pre = (PPx.Arguments.length == 0) ?
      {act: 'move', opt: '-renamedest:on', post: `-compcmd *execute ~,*jumppath %%hd0 -entry ${cursor}`}:
      {act: '!move', opt: '-min', post: `-compcmd *ppc -r -noactive -k *execute ~,*jumppath %%hd0 -entry ${cursor}`};
    pre.dest = opPath;
  }
  return pre;
})();

// 送り元の属性に応じて振り分け
switch (PPx.DirectoryType) {
// 書庫
  case 63:
  case 64:
  case 96:
    PPx.Execute(`%u7-zip64.dll,x -aos -hide "%1" -o%"解凍先"%{${cmd.dest}%} %@`);
    break;
  // リストファイル
  case 4:
    PPx.Execute(`*ppcfile ${cmd.act}, ${cmd.dest}, ${cmd.opt} -qstart -nocount -preventsleep -same:5 -sameall -undolog -compcmd %%K"@^\\D"`);
    break;
  // その他
  default:
    PPx.Execute(`*ppcfile ${cmd.act}, ${cmd.dest}, ${cmd.opt} -qstart -nocount -preventsleep -same:0 -sameall -undolog ${cmd.post}`);
    break;
}

