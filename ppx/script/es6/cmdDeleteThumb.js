//!*script
/* サムネイルのキャッシュ削除 */

'use strict';

for (let i = PPx.EntryDisplayCount; i--;) {
  if (PPx.Entry(i).Size) {
    PPx.Execute(`*delete "${PPx.Entry(i).Name}:thumbnail.jpg"`);
  }
}
