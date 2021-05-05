//!*script
/* リストファイルの並び、コメント、マーク状態を保存 */
//
// リストファイルの書式は、*makelistfile -basic に順する

'use strict';

// 取得するヘッダ情報の最大行数
const reserveHeader = 5;

//【.】【..】を考慮
const sNum = (() => {
  const tdir = PPx.Extract('%*getcust(XC_tdir)').split(',');
  return Number(tdir[0]) + Number(tdir[1]);
})();

// リストの並び
const ArrEntry = [];

for (let [i, l] = [sNum, PPx.EntryDisplayCount]; i < l; i++) {
  let ObjEntry = PPx.Entry(i);
  (ObjEntry.Name === ObjEntry.ShortName)
    ? ArrEntry.push(ObjEntry.name)
    : ArrEntry.push(`${ObjEntry.Name}","${ObjEntry.ShortName}`);
}

const listpath = PPx.Extract('%FDV');
const fso = PPx.CreateObject('Scripting.FileSystemObject');
let fsoTlist = fso.OpenTextFile(listpath, 1, false, -1);

// ファイルに保存されている並び
const entryInfo = [];

while (!fsoTlist.AtEndOfStream) { entryInfo.push(fsoTlist.ReadLine()); }

// 保存用の並び
const result = [];

// ヘッダを取得
for (let [i, l] = [0, Math.min(reserveHeader, entryInfo.length)]; i < l; i++) {
  if (entryInfo[0].indexOf(';') === 0) { result[i] = entryInfo.splice(0, 1); }
}

// リスト上の並びをlistfileの形式で取得し直す
{
  let res, cmt, mark, hl, ArrRes;

  ArrEntry.forEach((element, index) => {

    // ファイルからエントリと一致する行情報を取得
    res = entryInfo.find(d => d.indexOf(element) !== -1);
    ArrRes = res.split(',');
    cmt = PPx.Entry(index + sNum).Comment.replace(/"/g,'""');
    mark = (PPx.Entry(index + sNum).Mark) ? 1 : 0;
    hl = PPx.Entry(index + sNum).Highlight;

    result.push((ArrRes.length < 6)
      ? res.replace(/(.*)/, `"$1","",A:H0,C:0.0,L:0.0,W:0.0,S:0.0,H:${hl},M:${mark},T:"${cmt}"`)
      : `${ArrRes.splice(0, 6)},H:${hl},M:${mark},T:"${cmt}"`);
  });
}

// PPc側で保持されている更新内容をリセット
PPx.Execute('%K"@F5');

// 置換結果を書き出してutf16leで上書き
fsoTlist = fso.OpenTextFile(listpath, 2, true, -1);
fsoTlist.Write(result.join('\u000D\u000A') + '\u000D\u000A');

fsoTlist.Close();

if (PPx.DirectoryType === 4) { PPx.Execute('*wait 100,1 %: %K"@F5"'); }

