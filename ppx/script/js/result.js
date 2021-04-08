//!*script
/* 引数で指定された情報を返す */
//
// PPx.Arguments(0) = filetype | exists | getpath | myrepo | shapecode | LDC | lfnames
// PPx.Arguments(1) = パスを指定したい場合など必要に応じて指定

var arg = PPx.Arguments(0);
var fdc;

switch (arg) {
  // ファイルタイプ判別
  case 'filetype':
    var getext = PPx.GetFileInformation(PPx.Extract('%R')).slice(1);

    PPx.Result = (getext === '') ? '---' : getext;
    break;
  // 存在確認 要第2引数
  case 'exists':
    if (PPx.Arguments.length < 2) {
        PPx.Echo('引数を指定してください\u000A○  単一のパス(%FDCなど)\u000A×   複数のパス(%#FDCなど)');
      PPx.Quit(-1);
    }
    var fso = PPx.CreateObject('Scripting.FileSystemObject');
    fdc = PPx.Arguments(1);
    PPx.Result = fso.FileExists(fdc)|0 + fso.FolderExists(fdc)|0;
    break;
  // 反対窓の有無でパスを変える
  case 'getpath':
    var tPath = (PPx.Pane.Count === 2) ? '%2%\\' : '%\'work\'%\\';

    PPx.Result = PPx.Extract(tPath);
    break;
  // メインレポジトリ
  case 'myrepo':
    PPx.Result = PPx.Extract('%1%\\').indexOf(PPx.Extract('%\'myrepo\'%\\'));
    break;
  // 改行を含むPPxコマンドマクロを整形
  case 'shapecode':
    PPx.Result = PPx.Extract('%OC %*edittext').split('\u000D\u000A').join('\u000D\u000A ');
    break;
  // リンクならリンク先を、実体があればそのままのパスを返す
  // ※返すパスはスペース区切りの複数のパス
  case 'LDC':
    // if (PPx.Arguments.length < 2) {
    //   PPx.Echo('引数に%FDCを指定してください');
    //   PPx.Quit(-1);
    // }
    // var fdc = PPx.Arguments(1);
    // PPx.Result = PPx.Extract(`%*linkedpath(${fdc})`) || fdc;
    fdc = PPx.Extract('%#;FDC').split(';');
    var ldc = [];
    for (var i = 0, l = fdc.length; i < l; i++) {
      ldc.push(function () { return PPx.Extract('%*linkedpath(' + fdc[i] + ')') || fdc[i]; }());
    }
    PPx.Result = ldc.join(' ');
    break;
  // listfileのエントリ名をそのまま返す
  // ※返すパスはスペース区切りの複数のパス
  case 'lfnames':
      if (PPx.EntryMarkCount === 0) { PPx.Entry.Mark = 1; }
      var objEntry = PPx.Entry;
      objEntry.FirstMark;
      var fn = '';
      for (var i = 0,l = PPx.EntryMarkCount; i < l; i++) {
        fn += objEntry.Name + ' ';
        objEntry.NextMark;
      }
      PPx.Result = fn;
    break;
  default:
    PPx.Result = PPx.Extract('%*js(PPx.Result = PPx.' + arg + ';)');
    break;
}

