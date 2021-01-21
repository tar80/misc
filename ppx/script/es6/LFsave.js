//!*script
/* リストファイルを保存 */

'use strict';

//【.】【..】を考慮
const sNum = (() => {
  const tdir = PPx.Extract('%*getcust(XC_tdir)').split(',');
  return Number(tdir[0]) + Number(tdir[1]);
})();

const entry = [];

// リストの並びを取得
for (let [i, l] = [sNum, PPx.EntryDisplayCount]; i < l; i++) {
  let ObjEntry = PPx.Entry(i);

  (ObjEntry.Name == ObjEntry.ShortName)
    ? entry.push(ObjEntry.name)
    : entry.push(`${ObjEntry.Name}","${ObjEntry.ShortName}`);
}

const listpath = PPx.Extract('%FDV');

const fso = PPx.CreateObject('Scripting.FileSystemObject');
let fsoTlist = fso.OpenTextFile(listpath, 1, false, -1);

const detail = [];

// ファイルに保存されている並びを取得
while (!fsoTlist.AtEndOfStream) {
  detail.push(fsoTlist.ReadLine());
}

const result = [];

//ヘッダ情報を取得
for (let i = Math.min(5, detail.length); i--;) {
  if (!detail[i].indexOf(';')) { result[i] = detail.splice(i, 1); }
}

// リスト上の並びをlistfileの形式で取得し直す
{
  const l = detail.length;
  let res, cmt, mark, d, arr;

  entry.forEach((element, index) => {
    for (let i = 0; i < l; i++) {
      d = detail[i];

      if (d.indexOf(element) != -1) {
        res = (() => {
          cmt = PPx.Entry(index + sNum).Comment.replace(/"/g,'""');
          mark = (PPx.Entry(index + sNum).Mark) ? 1 : 0;
          arr = d.split(',');

          return (arr.length < 7)
            ? d.replace(/(.*)/, `"$1","",A:H0,C:0.0,L:0.0,W:0.0,S:0.0,M:${mark},T:"${cmt}"`)
            : `${arr.splice(0, 7)},M:${mark},T:"${cmt}`;
        })();
        result.push(res);
      }
    }
  });
}

// PPc側で保持されている更新内容をリセット
PPx.Execute('%K"@F5');

// 置換結果を書き出してutf16leで上書き
fsoTlist = fso.OpenTextFile(listpath, 2, true, -1);
fsoTlist.Write(result.join('\u000D\u000A') + '\u000D\u000A');

fsoTlist.Close();

if (PPx.DirectoryType == 4) { PPx.Execute('*wait 100,1 %K"@F5"'); }

