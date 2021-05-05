//!*script
//
/* TABキーで窓移動 */

'use strict';

const x = (() => {
  const w = PPx.WindowIDName;
  const s = (w.substr(0, 1) === 'C') ? 'V' : 'C';
  return { 'winid': w, 'syncwin': s, 'id': w.substr(-1, 1) };
})();
const sync = PPx.Extract(`%*extract(C${x.id}"%%*js(PPx.Result=PPx.SyncView;)")`)|0;

// syncviewがonならPPc/PPv間でフォーカスをトグル
if (sync > 0) {
  PPx.Execute(`*focus ${x.syncwin}_${x.id}`);
  PPx.Quit(1);
}

// PPbを省いた起動リストを取得
const xList = (() => {
  const xl = PPx.Extract('%*ppxlist()').split(',');
  return xl.filter(v => v.indexOf('B_') !== 0);
})();

xList.sort((a, b) =>  a < b ? -1 : 1);

let tID = xList[xList.indexOf(x.winid) + 1];

if (xList[1] > 1 && PPx.Pane.Count !== 1) {
  // リストの端なら最初に戻る
  if (!tID || tID === 'csA') { tID = xList[2]; }
  PPx.Execute(`*focus ${tID}`);
} else {
  // 一枚表示なら反対窓起動
  PPx.Execute('%K"@F6"');
}

