//!*script
/* リストファイルから取得した情報をコマンドに渡す */
//
// PPx.Arguments() = (0)実行するコマンドライン名, (1)1＝重複パスの実行
//
// コマンドラインは、 オブジェクトExe_edit()内に記述する
// 変数は、ファイルパス= path, ショートネーム= shortname,
// 行数= number, 重複パス実行= duplicate, 検索語= search_wordで指定

if (!PPx.Arguments.length) {
  PPx.Echo('引数が足りません');
  PPx.Quit(-1);
}

var arg = { 'cmd': PPx.Arguments(0), 'exeDup': (PPx.Arguments.length != 2) ? 0 : PPx.Arguments(1)|0 };
var rep = [];
var exe_edit = {
  // 関数の引数には(path, shortname, number, duplicate)が指定できる
  'gvim': (function (path, shortname, number) {
    PPx.Execute('%Oi gvim --remote-tab-silent +"' + number + '-1 /' + search_word + '/ " "' + path + '"');
    PPx.Execute('*wait 100,1');
    return;
  }),
  'ppv': (function (path) {
    PPx.Execute('%Oi *ppv -r -bootid:C ' + path);
    PPx.Execute('*wait 100,1');
    return;
  }),
  'sed': (function (path, shortname, number, duplicate) {
    if (typeof rep[0] === 'undefined') {
      rep[0] = PPx.Extract('"s#%*script(%\'scr\'%\\compCode.js,"is","""%%","[検索文字#置換文字] ※\\=\\\\\\\\")#g"');
    }
    if (!duplicate) { PPx.Execute('%Oi copy ' + path + ' ' + path + '_back'); }

    PPx.Execute('%Oi sed -i -r ' + number + rep[0] + ' ' + path);
    return;
  })
};

var fso = PPx.CreateObject('Scripting.FileSystemObject');

var markEntry = PPx.Extract('%#;FDC').split(';');
var markCount = PPx.EntryMarkCount;
// マークの有無でループの初期値を設定
var n = (markCount !== 0) ? 1 : 0;

var exist = {};
var entryPath, entrySN, entryNum, entryDup;
var objEntry = PPx.Entry;
// ヘッダ情報から検索語を取得
var search_word = (function () {
  var w = '';
  var reg = /result\s=>\s(.*)/;
  for (var i = 0, l = PPx.EntryDisplayCount; i < l; i++) {
    var t = objEntry(i).Comment.match(reg);
    if (t) {
      w = String(t[1]).replace(/\\\(/g, '(');
      break;
    }
  }
  return w;
})();

var reg = new RegExp(/^[0-9]*/);
PPx.Entry.Index = objEntry.FirstMark;

for (var i = n; i <= markCount; i++) {
  // 空白行の判定
  if (fso.FileExists(objEntry.Name)) {
    // フルパスの取得
    entryPath = markEntry[i - n];

    //  ShortNameの取得
    entrySN = objEntry.ShortName;

    // ShortNameを数値と見なして取得
    entryNum = (reg.test(entrySN)) ? entrySN|0 : 1;

    // 重複エントリの判別
    entryDup = (function (isDup) {
      isDup = (exist[entryPath]) ? true : false;
      exist[entryPath] = true;
      return isDup;
    })();

    // 同一パスを判別してコマンドに渡す
    if (arg.exeDup === 1 || !entryDup) {
      exe_edit[arg.cmd](entryPath, entrySN, entryNum, entryDup);
    }
  }
  objEntry.NextMark;
}

