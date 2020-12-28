//!*script
/* 一括サムネイル設定 */
// PPx.Arguments() = (0)表示形式(MC_celS), (1)サムネイル候補画像リストパス

'use strict';
const arg = (() => {
  try {
    return [ PPx.Arguments(0), PPx.Arguments(1) ];
  } catch(e) {
    PPx.Echo(e);
    PPx.Quit(1);
  }
})();
const pictPath = PPx.Extract(`%*input(-title:"サムネイル画像の選択" -mode:e -k *completelist -file:"${arg[1]}")`);
PPx.Execute(`%Oi *viewstyle -temp "${arg[0]}" %: *wait 100`);
PPx.EntryFirstMark;
const l = PPx.EntryMarkCount;
for (let i = 0; i < l; i++) {
  PPx.Execute(`*setentryimage ${pictPath} -save`);
  PPx.EntryNextMark;
}

