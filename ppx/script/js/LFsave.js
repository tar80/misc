//!*script
/* リストファイルの並び、コメント、マーク状態を保存 */
//
// リストファイルの書式は、*makelistfile -basic に順する

// 取得するヘッダ情報の最大行数
var reserveHeader = 5;

//【.】【..】を考慮
var sNum = (function () {
  var tdir = PPx.Extract('%*getcust(XC_tdir)').split(',');
  return Number(tdir[0]) + Number(tdir[1]);
}());

// リストの並び
var arrEntry = [];

for (var i = sNum, l = PPx.EntryDisplayCount; i < l; i++) {
  var objEntry = PPx.Entry(i);
  (objEntry.Name === objEntry.ShortName)
    ? arrEntry.push(objEntry.Name)
    : arrEntry.push(objEntry.Name + '","' + objEntry.ShortName);
}

var listpath = PPx.Extract('%FDV');
var fso = PPx.CreateObject('Scripting.FileSystemObject');
var fsoTlist = fso.OpenTextFile(listpath, 1, false, -1);

// ファイルに保存されている並び
var infoEntry = [];

while (!fsoTlist.AtEndOfStream) { infoEntry.push(fsoTlist.ReadLine()); }

// 保存用の並び
var result = [];

// ヘッダを取得
for (i = 0, l = Math.min(reserveHeader, infoEntry.length); i < l; i++) {
  if (infoEntry[0].indexOf(';') === 0) { result[i] = infoEntry.splice(0, 1); }
}

// リスト上の並びをlistfileの形式で取得し直す
for (var element in arrEntry) {
  var exist = {};
  var index = element|0 + sNum;

  for (i = 0, l = infoEntry.length; i < l; i++) {
    var d = infoEntry[i];

    if (!exist[arrEntry[i]] && ~d.indexOf(arrEntry[element])) {
      exist[arrEntry[element]] = true;
      var arrRes = d.split(',');
      var cmt = PPx.Entry(index).Comment.replace(/"/g, '""');
      var mark = (PPx.Entry(index).Mark) ? 1 : 0;
      var hl = PPx.Entry(index).Highlight;

      result.push((arrRes.length < 6)
        ? d.replace(/(.*)/, '"$1","",A:H0,C:0.0,L:0.0,W:0.0,S:0.0,H:' + hl + ',M:' + mark + ',T:"' + cmt + '"')
        : arrRes.splice(0, 6) + ',H:' + hl + ',M:' + mark + ',T:"' + cmt + '"');
    }
  }
}

// PPc側で保持されている更新内容をリセット
PPx.Execute('%K"@F5');

// 置換結果を書き出してutf16leで上書き
fsoTlist = fso.OpenTextFile(listpath, 2, true, -1);
fsoTlist.Write(result.join('\u000D\u000A') + '\u000D\u000A');

fsoTlist.Close();

if (PPx.DirectoryType === 4) { PPx.Execute('*wait 200,1 %K"@F5"'); }

