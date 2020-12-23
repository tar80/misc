//!*script
/* 引数で指定された変数を返す */
// PPx.Arguments() = [0]filetype | exists | getpath | repository
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
case 'getpath': // 反対窓の有無に応じてパスを返す
  {
    const tPath = (PPx.Pane.Count == 2) ? '%2%\\' : '%\'work\'%\\';
    PPx.Result = PPx.Extract(tPath);
  }
  break;
case 'repository':
  PPx.Result = PPx.Extract('%1%\\').indexOf(PPx.Extract('%\'repo\'%\\'));
  break;
default:
  PPx.Result = PPx.Extract(`%*js(PPx.Result = PPx.${arg};)`);
  // PPx.Quit(1);
}
