//!*script
/* メモの書き込みと更新 */
// PPx.Arguments() = [0]case('write'ならメモ書き込み、それ以外ならメモ更新) [1]filepath [2]color
var arg = function() {
  try {
    return [PPx.Arguments(0), PPx.Arguments(1), PPx.Arguments.length];
  } catch (e) {
    PPx.Echo(e);
    PPx.Quit(-1);
  }
}();
var dirType = PPx.DirectoryType;
var fso = PPx.CreateObject('Scripting.FileSystemObject');
var fsoTlist;

switch (arg[0]) {
// メモの書き込み
case 'write':
  var memoStr = function () {
    var tempstr;
    try {
      // エスケープ処理済みの文字列を読み込む
      return tempstr = PPx.Extract('"%*script(%\'scr\'%\\compCode.js,"i","""%%","memo..")"');
    } catch (e) {
      PPx.Echo(e);
      PPx.Quit(-1);
    } finally {
      if (tempstr == '""') { PPx.Quit(-1); }
    }
  }();
  var dirType = PPx.DirectoryType;
  var tPath = (dirType == 4) ? PPx.Extract('%FVD') : arg[1];
  // 日付の色付け
  var dColor = (arg[2] != 3 ) ? '0' : PPx.Arguments(2)|0;
  // メモをListfileの形式に置き換える
  var str = PPx.Extract('"%*now","",M:0,A:H' + dColor + ',T:' + memoStr);
  fsoTlist = fso.OpenTextFile(tPath, 8, true, -1);
  fsoTlist.WriteLine(str);
  if (dirType == 4) {
    PPx.Execute('*wait 300,1 %K"@F5"');
  }
  break;
  // メモの更新状態を保存
default:
  // リストの並びを取得
  var sNum = function () {
    var tdir = PPx.Extract('%*getcust(XC_tdir)').split(',');
    return Number(tdir[0]) + Number(tdir[1]);
  }();
  var date = [];
  for (var i = 0 + sNum, l = PPx.EntryDisplayCount; i < l; i++) {
    date.push(PPx.entry(i).name);
  }

  var memofile = PPx.Extract('%FDV');
  var detail = [];
  // ファイルに保存されている並びを取得
  fsoTlist = fso.OpenTextFile(memofile, 1, false, -1);
  while (!fsoTlist.AtEndOfStream) {
    detail = detail + '\u000A' + fsoTlist.ReadLine();
  }
  detail = detail.split('\u000A');

  var result = [';ListFile'];
  // リスト上の並びをlistfileの形式で取得し直す
  for (var i = 0, l = date.length; i < l; i++) {
    getlist(date[i], i);
  }
  // PPc側で保持されている更新内容をリセット
  PPx.Execute('%K"@F5');
  // 置換結果を書き出してutf16leで上書き
  fsoTlist = fso.OpenTextFile(memofile, 2, true, -1);
  fsoTlist.Write(result.join('\u000D\u000A') + '\u000D\u000A');
  break;
}
fsoTlist.Close();
if (dirType == 4) {
  PPx.Execute('*wait 300,1 %K"@F5"');
}

/* リストの状態をlistfileの形式で取得し直す関数 */
function getlist ( target, index ) {
  for (var i = 2, l = detail.length; i < l; i++) {
    if (detail[i].search(target) != -1) {
      var res = function ( mark ) {
        var cmt = PPx.Entry(index + sNum).Comment.replace(/"/g,'""');
        var d = detail[i];
        d = (d.search(',Size,') != -1)
          ? d.replace(/(.*),T:".*(,Size.*)/, '$1,T:"' + cmt + '"$2')
          : d.replace(/(.*),T:".*/, '$1,T:"' + cmt + '"');
        mark = (PPx.Entry(index + sNum).Mark)
          ? d.replace(/((.*?,){2}).*(A:H\d.*)/, '$1M:1,$3')
          : d.replace(/((.*?,){2}).*(A:H\d.*)/, '$1M:0,$3');
        return mark;
      }();
      result.push(res);
    }
  }
}
