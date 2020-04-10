//!*script
/* 状況に応じたファイル移動の設定 */
// PPx.Arguments() = [0]有:quick
'use strict';
const opPath = PPx.Extract('%2');
let cmd = []; //[0]dest,[1]option

// 対象パスを設定
if (!PPx.GetFileInformation(opPath)) {
  cmd = {act: 'move', opt: ''};
  cmd.dest = '%\'work\'%\\';
} else {
  cmd = (PPx.Arguments.length == 0)
    ? {act: 'move', opt: '-renamedest:on'}
    : {act: '!move', opt: '-min'};
  cmd.dest = opPath;
}

// カレントディレクトリの属性に応じて処理を分岐
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
  PPx.Execute(`*ppcfile ${cmd.act}, ${cmd.dest}, ${cmd.opt} -qstart -nocount -preventsleep -same:0 -sameall -undolog`);
  break;
}
