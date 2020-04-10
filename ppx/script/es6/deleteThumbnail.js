//!*script
/* サムネイルのキャッシュ削除 */
'use strict';
for (let [i, l] = [0, PPx.EntryDisplayCount]; i < l; i++) {
  if (PPx.Entry(i).Size) {
    PPx.Execute(`*delete "${PPx.Entry(i).Name}:thumbnail.jpg"`);
  }
}
