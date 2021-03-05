//!*script
/* 引数で指定された情報を返す */
//
// PPx.Arguments(0) = filetype | exists | getpath | myrepo | shapecode | LDC
// PPx.Arguments(1) = %FDCなど複数回スクリプトを実行したい場合に指定

'use strict';

const arg = PPx.Arguments(0);

switch (arg) {
  case 'filetype':
    {
      const getExt = PPx.GetFileInformation(PPx.Extract('%R')).slice(1);
      PPx.Result = (getExt == '') ? '---' : getExt;
    }
    break;
  case 'exists':
    {
      if (PPx.Arguments.length < 2) {
        PPx.Echo('引数に%FDCを指定してください');
        PPx.Quit(-1);
      }
      const fso = PPx.CreateObject('Scripting.FileSystemObject');
      const fdc = PPx.Arguments(1);
      PPx.Result = fso.FileExists(fdc)|0 + fso.FolderExists(fdc)|0;
    }
    break;
  case 'getpath':
    {
      const tPath = (PPx.Pane.Count == 2) ? '%2%\\' : '%\'work\'%\\';
      PPx.Result = PPx.Extract(tPath);
    }
    break;
  case 'myrepo':
    PPx.Result = PPx.Extract('%1%\\').indexOf(PPx.Extract('%\'myrepo\'%\\'));
    break;
  case 'shapecode':
    PPx.Result = PPx.Extract('%OC %*edittext').split('\r\n').join('\r\n ');
    break;
  case 'LDC':
    {
      // if (PPx.Arguments.length < 2) {
      //   PPx.Echo('引数に%FDCを指定してください');
      //   PPx.Quit(-1);
      // }
      // const fdc = PPx.Arguments(1);
      // PPx.Result = PPx.Extract(`%*linkedpath(${fdc})`) || fdc;
      const fdc = PPx.Extract('%#;FDC').split(';');
      const ldc = [];
      for (const entry of fdc) {
        ldc.push((() => { return PPx.Extract(`%*linkedpath(${entry})`) || entry; })());
      }
      PPx.Result = ldc.join(' ');
    }
    break;
  // case 'lfname':
  //   {
  //     PPx.Result = PPx.Entry.Name;
  //   }
  //   break;
  default:
    PPx.Result = PPx.Extract(`%*js(PPx.Result = PPx.${arg};)`);
}
