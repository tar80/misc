//!*script
/* リストファイルの並び、コメント、マーク状態を保存 */
//
// ※リストファイルの書式は、*makelistfile -basic に順する

'use strict';

// 取得するヘッダ情報の最大行数
const reserveHeader = 5;

//【.】【..】を考慮
const sNum = (() => {
  const tdir = PPx.Extract('%*getcust(XC_tdir)').split(',');
  return Number(tdir[0]) + Number(tdir[1]);
})();

// リストの並び, 削除された行
const arrEntry = [];
const delEntry = [];

for (let [i, l] = [sNum, PPx.EntryDisplayCount]; i < l; i++) {
  let objEntry = PPx.Entry(i);
  if (objEntry.state === 1) {
    arrEntry.push('delete');
    delEntry.push(i - sNum);
  } else {
    (objEntry.Name === objEntry.ShortName)
      ? arrEntry.push(objEntry.Name)
      : arrEntry.push(`${objEntry.Name}","${objEntry.ShortName}`);
  }
}

const listpath = PPx.Extract('%FDV');
const fso = PPx.CreateObject('Scripting.FileSystemObject');
let fsoTlist = fso.OpenTextFile(listpath, 1, false, -1);

// ファイルに保存されている並び
let infoEntry = [];

while (!fsoTlist.AtEndOfStream) { infoEntry.push(fsoTlist.ReadLine()); }
// 削除された行情報を追加
for (const num of delEntry) { infoEntry.splice(num, 0, 'delete'); }

// 保存用の並び
const result = (() => {
  const r = [];
  // ヘッダを取得
  for (let [i, l] = [0, Math.min(reserveHeader, infoEntry.length)]; i < l; i++) {
    if (infoEntry[0].indexOf(';') === 0) { r[i] = infoEntry.splice(0, 1); }
  }
  return r;
})();

// リスト上の並びをlistfileの形式で取得し直す
arrEntry.forEach((element, index) => {
  if (element === 'delete') { return; }

  // ファイルからエントリと一致する行情報を取得
  let res = infoEntry.find(data => ~data.indexOf(element));
  let arrRes = res.split(',');
  let cmt = PPx.Entry(index + sNum).Comment.replace(/"/g,'""');
  let mark = (PPx.Entry(index + sNum).Mark) ? 1 : 0;
  let hl = PPx.Entry(index + sNum).Highlight;

  result.push((arrRes.length < 6)
    ? res.replace(/(.*)/, `"$1","",A:H0,C:0.0,L:0.0,W:0.0,S:0.0,H:${hl},M:${mark},T:"${cmt}"`)
    : `${arrRes.splice(0, 6)},H:${hl},M:${mark},T:"${cmt}"`);
});

// PPc側で保持されている更新内容をリセット
PPx.Execute('%K"@F5');

// 置換結果を書き出してutf16leで上書き
fsoTlist = fso.OpenTextFile(listpath, 2, true, -1);
fsoTlist.Write(result.join('\u000D\u000A') + '\u000D\u000A');

fsoTlist.Close();

if (PPx.DirectoryType === 4) { PPx.Execute('*wait 100,1 %: %K"@F5"'); }
