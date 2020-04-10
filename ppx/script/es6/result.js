//!*script
/* 引数で指定された情報を返す */
// PPx.Arguments() = [0]filetype | makepath | repository
'use strict';
switch (PPx.Arguments(0)) {
case 'filetype':
  {
    const getExt = PPx.GetFileInformation(PPx.Extract('%R')).slice(1);
    PPx.Result = (getExt == '') ? '---' : getExt;
  }
  break;
case 'makepath': // 反対窓の有無に応じてパスを返す
  {
    const tPath = (PPx.Pane.Count == 2) ? '%2%\\' : '%\'work\'%\\';
    PPx.Result = PPx.Extract(tPath);
  }
  break;
case 'repository':
  PPx.Result = PPx.Extract('%1%\\').indexOf(PPx.Extract('%\'repo\'%\\'));
  break;
default:
  PPx.Quit(1);
}
