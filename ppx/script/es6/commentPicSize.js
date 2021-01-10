//!*script
/* リスト内エントリの画像サイズをコメントに記載 */

'use strict';

const filePath = PPx.Extract('%1%\\00_INDEX.txt');
const WxH = [];
const rep = new RegExp(/[\s\S]*大きさ\s*:‪(\d*\sx\s\d*)‬[\s\S]*/,'g');

const fso = PPx.CreateObject('Scripting.FileSystemObject');
const fsoText = fso.OpenTextFile(filePath, 2, true);

// 画像サイズ取得
for (let [i, l] = [0, PPx.EntryDisplayCount]; i < l; i++) {
  const objEntry = PPx.Entry(i);

  if (objEntry.Name.match(/.(bmp|jpg|jpeg|png|gif)$/i)) {
    WxH.push(objEntry.name + '\t' + objEntry.Information.replace(rep, '$1'));
  }
}

fsoText.WriteLine(WxH.join('\u000D\u000A'));
fsoText.Close();

