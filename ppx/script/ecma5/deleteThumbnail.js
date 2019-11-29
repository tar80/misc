//!*script
/* サムネイルのキャッシュ削除 */
'use strict';
for (var i = 0, l = PPx.EntryDisplayCount; i < l; i = (i+1)|0) {
  if (PPx.Entry(i).Size) {
    PPx.Execute('*delete "' + PPx.Entry(i).Name + ':thumbnail.jpg"');
  }
};
