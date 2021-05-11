//!*script
/* 引数で指定された情報を返す */
//
// PPx.Arguments(0) = filetype | exists | getpath | myrepo | shapecode | LDC | lfnames
// PPx.Arguments(1) = パスを指定したい場合など必要に応じて指定

var arg = PPx.Arguments(0);

var cmd = {
  // ファイルタイプ判別
  'filetype': (function () {
    var getext = PPx.GetFileInformation(PPx.Extract('%R')).slice(1);
    return (getext === '') ? '---' : getext;
  }),
  // 存在確認 要第2引数
  'exists': (function () {
    if (PPx.Arguments.length < 2) {
        PPx.Echo('引数を指定してください\u000A○  単一のパス(%FDCなど)\u000A×   複数のパス(%#FDCなど)');
      PPx.Quit(-1);
    }
    var fso = PPx.CreateObject('Scripting.FileSystemObject');
    var fdc = PPx.Arguments(1);
    return fso.FileExists(fdc)|0 + fso.FolderExists(fdc)|0;
  }),
  // 反対窓の有無でパスを変える
  'getpath': (function () {
    var tPath = (PPx.Pane.Count === 2) ? '%2%\\' : '%\'work\'%\\';
    return PPx.Extract(tPath);
  }), 
  // メインレポジトリ
  'myrepo': (function () {
    return PPx.Extract('%1').indexOf(PPx.Extract('%\'myrepo\''));
  }),
  // 改行を含むPPxコマンドマクロを整形
  'shapecode': (function () {
    return PPx.Extract('%OC %*edittext').split('\u000D\u000A').join('\u000D\u000A ');
  }),
  // リンクならリンク先を、実体があればそのままのパスを返す
  // ※返すパスはスペース区切りの複数のパス
  'LDC': (function () {
    var fdc = PPx.Extract('%#;FDC').split(';');
    var ldc = [];
    for (var i = 0, l = fdc.length; i < l; i++) {
      ldc.push(function () { return PPx.Extract('%*linkedpath(' + fdc[i] + ')') || fdc[i]; }());
    }
    return ldc.join(' ');
  }),
  // listfileのエントリ名をそのまま返す
  // ※返すパスはスペース区切りの複数のパス
  'lfnames': (function () {
      if (PPx.EntryMarkCount === 0) { PPx.Entry.Mark = 1; }
      var objEntry = PPx.Entry;
      objEntry.FirstMark;
      var fn = '';
      for (var i = 0,l = PPx.EntryMarkCount; i < l; i++) {
        fn += objEntry.Name + ' ';
        objEntry.NextMark;
      }
   return fn;
  })
}

try {
  PPx.Result = cmd[arg]();
} catch (e) {
  PPx.Result = PPx.Extract('%*js(PPx.Result = PPx.' + arg + ';)') || 'no match.';
}

