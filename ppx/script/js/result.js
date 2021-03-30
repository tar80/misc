//!*script
/* 引数で指定された情報を返す */
//
// PPx.Arguments(0) = filetype | exists | getpath | myrepo | shapecode | LDC
// PPx.Arguments(1) = %FDCなど複数回スクリプトを実行したい場合に指定

var arg = PPx.Arguments(0);
var fdc;

switch (arg) {
  case 'filetype':
    var getext = PPx.GetFileInformation(PPx.Extract('%R')).slice(1);

    PPx.Result = (getext === '') ? '---' : getext;
    break;
  case 'exists':
    if (PPx.Arguments.length < 2) {
      PPx.Echo('引数に%FDCを指定してください');
      PPx.Quit(-1);
    }
    var fso = PPx.CreateObject('Scripting.FileSystemObject');
    fdc = PPx.Arguments(1);
    PPx.Result = fso.FileExists(fdc)|0 + fso.FolderExists(fdc)|0;
    break;
  case 'getpath': // 反対窓の有無に応じてパスを返す
    var tPath = (PPx.Pane.Count == 2) ? '%2%\\' : '%\'work\'%\\';

    PPx.Result = PPx.Extract(tPath);
    break;
  case 'myrepo':
    PPx.Result = PPx.Extract('%1%\\').indexOf(PPx.Extract('%\'myrepo\'%\\'));
    break;
  case 'shapecode':
    PPx.Result = PPx.Extract('%OC %*edittext').split('\r\n').join('\r\n ');
    break;
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
      ldc.push(function() { return PPx.Extract('%*linkedpath(' + fdc[i] + ')') || fdc[i]; }());
    }
    PPx.Result = ldc.join(' ');
    break;
  // case 'lfname':
  //   {
  //     PPx.Result = PPx.Entry.Name;
  //   }
  //   break;
  default:
    PPx.Result = PPx.Extract('%*js(PPx.Result = PPx.' + arg + ';)');
    break;
}

