//!*script
/* 引数で指定された情報を返す */
//
// PPx.Arguments() = (0)filetype | exists | getpath | myrepo | shapecode

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
      const fso = PPx.CreateObject('Scripting.FileSystemObject');
      const path = PPx.Extract('%FDC');
      PPx.Result = fso.FileExists(path)|0 + fso.FolderExists(path)|0;
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
  // case 'lfname':
  //   {
  //     PPx.Result = PPx.Entry.Name;
  //   }
  //   break;
  default:
    PPx.Result = PPx.Extract(`%*js(PPx.Result = PPx.${arg};)`);
}
