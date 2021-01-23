//!*script
/* リストファイルの並び、コメント、マーク状態を保存 */

// 取得するヘッダ情報の最大行数
var reserveHeader = 5;

//【.】【..】を考慮
var sNum = function () {
  var tdir = PPx.Extract('%*getcust(XC_tdir)').split(',');
  return Number(tdir[0]) + Number(tdir[1]);
}();

// リストの並び
var ArrEntry = [];

for (var i = sNum, l = PPx.EntryDisplayCount; i < l; i++) {
  var ObjEntry = PPx.Entry(i);

  (ObjEntry.Name == ObjEntry.ShortName)
    ? ArrEntry.push(ObjEntry.Name)
    : ArrEntry.push(ObjEntry.Name + '","' + ObjEntry.ShortName);
}

var listpath = PPx.Extract('%FDV');

var fso = PPx.CreateObject('Scripting.FileSystemObject');
var fsoTlist = fso.OpenTextFile(listpath, 1, false, -1);

// ファイルに保存されている並び
var entryInfo = [];

while (!fsoTlist.AtEndOfStream) {
  entryInfo.push(fsoTlist.ReadLine());
}

// 保存用の並び
var result = [];

//ヘッダを取得
for (var i = 0, l = Math.min(reserveHeader, entryInfo.length); i < l; i++) {
  if (!entryInfo[0].indexOf(';')) { result[i] = entryInfo.splice(0, 1); }
}

// リスト上の並びをlistfileの形式で取得し直す
var exist, index, cmt, mark, d, arr;

for (var element in ArrEntry) {
  exist = {};
  index = element|0 + sNum;

  for (var i = 0, l = entryInfo.length; i < l; i++) {
    d = entryInfo[i];

    if (!exist[ArrEntry[i]] && d.indexOf(ArrEntry[element]) != -1) {
      exist[ArrEntry[element]] = true;

      arr = d.split(',');

      cmt = PPx.Entry(index).Comment.replace(/"/g, '""');

      mark = (PPx.Entry(index).Mark) ? 1 : 0;

      result.push((arr.length < 7)
        ? d.replace(/(.*)/, '"$1","",A:H0,C:0.0,L:0.0,W:0.0,S:0.0,M:' + mark + ',T:"' + cmt + '"')
        : arr.splice(0, 7) + ',M:' + mark + ',T:"' + cmt + '"');
    }
  }
}

// PPc側で保持されている更新内容をリセット
PPx.Execute('%K"@F5');

// 置換結果を書き出してutf16leで上書き
fsoTlist = fso.OpenTextFile(listpath, 2, true, -1);
fsoTlist.Write(result.join('\u000D\u000A') + '\u000D\u000A');

fsoTlist.Close();

if (PPx.DirectoryType == 4) { PPx.Execute('*wait 200,1 %K"@F5"'); }

