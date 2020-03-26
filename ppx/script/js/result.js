//!*script
/* 引数で指定された情報を返す */
// PPx.Arguments(0)=case

var getext;    // file_extension
var tPath;

switch (PPx.Arguments(0)) {
case 'filetype':
  getext = PPx.GetFileInformation(PPx.Extract('%R')).slice(1);
  PPx.Result = (getext == '')
    ? '---'
    : getext;
  break;
case 'makepath': // 反対窓の有無に応じてパスを返す
  tPath = (PPx.Pane.Count == 2)
    ? '%2%\\'
    : '%\'work\'%\\';
  PPx.Result = PPx.Extract(tPath);
  break;
case 'repository':
  PPx.Result = PPx.Extract('%1%\\').indexOf(PPx.Extract('%\'repo\'%\\'));
  break;
default:
  PPx.Quit(1);
  break;
}
