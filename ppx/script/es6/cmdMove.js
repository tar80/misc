﻿//!*script
/* 状況に応じたファイル移動の設定 */
//
// PPx.Arguments(0) = 0|無:detail | 1:quick
// -compcmdはフォーカス制御

'use strict';

const order = PPx.Arguments.length && PPx.Arguments(0)|0;
const opPath = PPx.Extract('%2');
// 対象がaux:の場合
// if (/^aux:.*/.test(opPath)) {
//   PPx.Execute('%K"@C"');
//   PPx.Quit(1);
// }

const opParentExt = (() => {
  const res = PPx.GetFileInformation(opPath);
  const aux = new RegExp(/^aux:.*/);
  return res || (aux.test(opPath) ? 'AUX' : null);
})();

const cursorPos = PPx.Extract('%R');
// 送り先を設定
const cmd = (obj => {
  if (!opParentExt) {
    // 反対窓なし
    obj = { act: 'move', opt: '', post: `-compcmd *ppc -pane:~ -k *jumppath %%hd0 -entry:${cursorPos}` };
    obj.dest = '%\'work\'%\\';
  } else {
    // 反対窓あり
    obj = (order === 0)
      ? { act: 'move', opt: '-renamedest:on', post: '' }
      : { act: '!move', opt: '-min', post: '-compcmd *ppc -r -noactive' };
    obj.dest = opPath;
  }
  return obj;
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
    PPx.Execute(
      `*ppcfile ${cmd.act}, ${cmd.dest}, ${cmd.opt}` +
      ' -qstart -nocount -preventsleep -same:5 -sameall -undolog' +
      ' -compcmd %%K"@^\\D"'
    );
    break;
  // その他
  default:
    PPx.Execute(
      `*ppcfile ${cmd.act}, ${cmd.dest}, ${cmd.opt}` +
      ' -qstart -nocount -preventsleep -same:0 -sameall -undolog' +
      ` ${cmd.post}`
    );
    break;
}
