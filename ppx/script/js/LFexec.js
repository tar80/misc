//!*script
/* リストファイルから取得した情報をコマンドに渡す */
//
// PPx.Arguments(0) = 実行するコマンドライン名
// PPx.Arguments(1) ＝1:重複パスの実行
//
// コマンドラインは、 オブジェクトcmd[]内に記述する
// 変数は、ファイルパス= path, ショートネーム= shortname,
// 行数= number, 重複パス実行= duplicate, 検索語= search_wordで指定

if (!PPx.Arguments.length) {
  PPx.Echo('引数が足りません');
  PPx.Quit(-1);
}

var arg = { 'cmd': PPx.Arguments(0), 'exeDup': (PPx.Arguments.length != 2) ? 0 : PPx.Arguments(1)|0 };
var cmd = {};
// 関数の引数には(path, shortname, number, duplicate)が指定できる
// returnより前の部分は初回のみ実行される
cmd['gvim'] = function () {
  return function (path, shortname, number) {
  PPx.Execute('%Oi gvim --remote-tab-silent +"' + number + '-1 /' + search_word + '/ " "' + path + '"');
  PPx.Execute('*wait 100,1');
  };
};

cmd['ppv'] = function () {
  return function (path) {
  PPx.Execute('%Oi *ppv -r -bootid:C ' + path);
  PPx.Execute('*wait 100,1');
  };
};

cmd['sed'] = function () {
  var rep = PPx.Extract('"s#%*script(%\'scr\'%\\compCode.js,"is","""%%","[検索文字#置換文字] ※\\=\\\\\\\\")#g"');
  return function (path, shortname, number, duplicate) {
  if (!duplicate) { PPx.Execute('%Oi copy ' + path + ' ' + path + '_back'); }
    PPx.Echo('rep:' + rep + 'num:' + number + 'path:' + path)
  PPx.Execute('%Oi sed -i -r ' + number + rep + ' ' + path);
  };
};

var objEntry = PPx.Entry;
// ヘッダ情報から検索語を取得
var search_word = (function () {
  var word = '';
  var reg = /result\s=>\s(.*)/;
  for (var i = 0, l = PPx.EntryDisplayCount; i < l; i++) {
    var isMatch = objEntry(i).Comment.match(reg);
    if (isMatch) {
      word = String(isMatch[1]).replace(/\\\(/g, '(');
      break;
    }
  }
  return word;
})();

// コマンド実行初回
var exec = cmd[arg.cmd]();

var markEntry = PPx.Extract('%#;FDC').split(';');
var markCount = PPx.EntryMarkCount;
// マークの有無でループの初期値を設定
var n = (markCount !== 0) ? 1 : 0;
// ShortNameチェック用
var reg = new RegExp(/^[0-9]*/);
// 重複エントリチェック用
var exist = {};

var fso = PPx.CreateObject('Scripting.FileSystemObject');

PPx.Entry.Index = objEntry.FirstMark;

for (var i = n; i <= markCount; i++) {
  // 空白行の判定
  if (fso.FileExists(objEntry.Name)) {
    // フルパスの取得
    var entryPath = markEntry[i - n];
    //  ShortNameの取得
    var entrySN = objEntry.ShortName;
    // ShortNameを数値と見なして取得
    var entryNum = (reg.test(entrySN)) ? entrySN|0 : 1;
    // 重複エントリの判別
    var entryDup = (function (isDup) {
      isDup = (exist[entryPath]) ? true : false;
      exist[entryPath] = true;
      return isDup;
    })();

    // 同一パスを判別してコマンドに渡す
    if (arg.exeDup === 1 || !entryDup) {
      // コマンド実行
      exec(entryPath, entrySN, entryNum, entryDup);
    }
  }
  objEntry.NextMark;
}

