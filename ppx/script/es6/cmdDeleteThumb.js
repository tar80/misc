//!*script
/* サムネイルのキャッシュ削除 */

'use strict';

let i;
const l = PPx.EntryDisplayCount;

for (i = 0; i < l; i++) {
  if (PPx.Entry(i).Size) {
    PPx.Execute(`*delete "${PPx.Entry(i).Name}:thumbnail.jpg"`);
  }
}
