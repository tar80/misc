//!*script
//
/* TABキーで窓移動 */

'use strict';

const xID = PPx.WindowIDName.split('_');
const tPPx = (xID[0] == 'C') ? 'V' : 'C';
const sync = PPx.Extract(`%*extract(C${xID[1]},"%%*js(PPx.Result=PPx.SyncView;)")`)|0;

// syncviewがonならPPc/PPv間でフォーカスをトグル
if (sync > 0) {
  PPx.Execute(`*focus ${tPPx}_${xID[1]}`);
  PPx.Quit(1);
}

// PPbを省いた起動リストを取得
const xList = ( x => {
  x = PPx.Extract('%*ppxlist()').split(',');
  return x.filter(value => value.indexOf('B_') != 0);
})();

xList.sort((a, b) =>  a < b ? -1 : 1);

let tID = xList[xList.indexOf(xID.join('_')) + 1];

if (xList[1] > 1 && PPx.Pane.Count != 1) {
  if (!tID || tID == 'csA') {
  // リストの端なら最初に戻る
    tID = xList[2];
  }
  PPx.Execute(`*focus ${tID}`);
} else {
  // 一枚表示なら反対窓起動
  PPx.Execute('%K"@F6"');
}

