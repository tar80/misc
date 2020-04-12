//!*script
/* リスト内エントリの画像サイズをコメントに記載 */
'use strict';
const filePath = PPx.Extract('%1%\\00_INDEX.txt');
const rep = new RegExp(/[\s\S]*大きさ\s*:‪(\d*\sx\s\d*)‬[\s\S]*/,'g');

const fso = PPx.CreateObject('Scripting.FileSystemObject');
const fsoText = fso.OpenTextFile(filePath, 2, true);
const WxH = [];

// 画像サイズ取得
for (let [i, l] = [0, PPx.EntryDisplayCount]; i < l; i++) {
  const entry = PPx.Entry(i);
  if (entry.Name.match(/.(bmp|jpg|jpeg|png|gif)$/i)) {
    WxH.push(entry.name + '\t' + entry.Information.replace(rep, '$1'));
  }
}
fsoText.WriteLine(WxH.join('\r\n'));
fsoText.Close();
