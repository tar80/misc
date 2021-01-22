//!*script
/* リストファイルを保存 */

  //【.】【..】を考慮
var sNum = function () {
  var tdir = PPx.Extract('%*getcust(XC_tdir)').split(',');
  return Number(tdir[0]) + Number(tdir[1]);
}();

var entry = [];

// リストの並びを取得
for (var i = sNum, l = PPx.EntryDisplayCount; i < l; i++) {
  var ObjEntry = PPx.Entry(i);

  (ObjEntry.Name == ObjEntry.ShortName)
    ? entry.push(ObjEntry.name)
    : entry.push(ObjEntry.Name + '","' + ObjEntry.ShortName);
}

var listpath = PPx.Extract('%FDV');

var fso = PPx.CreateObject('Scripting.FileSystemObject');
var fsoTlist = fso.OpenTextFile(listpath, 1, false, -1);

var detail = [];

// ファイルに保存されている並びを取得
while (!fsoTlist.AtEndOfStream) {
  detail.push(fsoTlist.ReadLine());
}

var result = [];

//ヘッダ情報を取得
for (var i = Math.min(5, detail.length); i--;) {
  if (!detail[i].indexOf(';')) { result[i] = detail.splice(i, 1); }
}

// リスト上の並びをlistfileの形式で取得し直す

for (var i = 0, l = detail.length; i < l; i++) {
  var d = detail[i];

  if (d.indexOf(entry[i]) != -1) {
    var res = function () {
      var cmt = PPx.Entry(i + sNum).Comment.replace(/"/g,'""');
      var mark = (PPx.Entry(i + sNum).Mark) ? 1 : 0;
      var arr = d.split(',');

      return (arr.length < 7)
        ? d.replace(/(.*)/, '"$1","",A:H0,C:0.0,L:0.0,W:0.0,S:0.0,M:' + mark + ',T:"' + cmt + '"')
        : arr.splice(0, 7) + ',M:' + mark + ',T:"' + cmt + '"';
    }();
    result.push(res);
  }
}

// PPc側で保持されている更新内容をリセット
PPx.Execute('%K"@F5');

// 置換結果を書き出してutf16leで上書き
fsoTlist = fso.OpenTextFile(listpath, 2, true, -1);
fsoTlist.Write(result.join('\u000D\u000A') + '\u000D\u000A');

fsoTlist.Close();

if (PPx.DirectoryType == 4) { PPx.Execute('*wait 300,1 %K"@F5"'); }

