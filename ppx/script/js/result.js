//!*script
/* 引数で指定された情報を返す */
//
// PPx.Arguments(0) = filetype | exists | getpath | myrepo | shapecode | LDC | lfnames
// PPx.Arguments(1) = パスを指定したい場合など必要に応じて指定

var argVar = PPx.Arguments(0);
var set = {};

// ファイルタイプ判別
set['filetype'] = function () {
  var getExt = PPx.GetFileInformation(PPx.Extract('%R')).slice(1);
  return (getExt === '') ? '---' : getExt;
};

// 存在確認 要第2引数
set['exists'] = function () {
  if (PPx.Arguments.length < 2) {
    PPx.Echo('引数を指定してください\u000A○  単一のパス(%FDCなど)\u000A×   複数のパス(%#FDCなど)');
    PPx.Quit(-1);
  }
  var fso = PPx.CreateObject('Scripting.FileSystemObject');
  var argPath = PPx.Arguments(1);
  return fso.FileExists(argPath)|0 + fso.FolderExists(argPath)|0;
};

// 反対窓の有無でパスを変える
set['getpath'] = function () {
  var targetPath = (PPx.Pane.Count === 2) ? '%2%\\' : '%\'work\'%\\';
  return PPx.Extract(targetPath);
};

// メインレポジトリ
set['myrepo'] = function () {
  return PPx.Extract('%1').indexOf(PPx.Extract('%\'myrepo\''));
};

// 改行を含むPPxコマンドマクロを整形
set['shapecode'] = function () {
  return PPx.Extract('%OC %*edittext').split('\u000D\u000A').join('\u000D\u000A ');
};

// リンクならリンク先を、実体があればそのままのパスを返す
// ※返すパスはスペース区切りの複数のパス
set['LDC'] = function () {
  var arrEntries = PPx.Extract('%#;FDC').split(';');
  var arrLdc = [];
  for (var i = 0, l = arrEntries.length; i < l; i++) {
    arrLdc.push(function () { return PPx.Extract('%*linkedpath(' + arrEntries[i] + ')') || arrEntries[i]; }());
  }
  return arrLdc.join(' ');
};

// listfileのエントリ名をそのまま返す
// ※返すパスはスペース区切りの複数のパス
set['lfnames'] = function () {
  var flag = 0;
  if (PPx.EntryMarkCount === 0) {
    PPx.Entry.Mark = 1;
    flag = 1;
  }
  var objEntry = PPx.Entry;
  var fn = '';
  objEntry.FirstMark;
  for (var i = 0, l = PPx.EntryMarkCount; i < l; i++) {
    fn += objEntry.Name + ' ';
    objEntry.NextMark;
  }
  if (flag === 1) { PPx.Entry.Mark = 0; }
  return fn;
};

try {
  PPx.Result = set[argVar]();
} catch (e) {
  PPx.Result = PPx.Extract('%*js(PPx.Result = PPx.' + argVar + ';)') || 'no match.';
}

