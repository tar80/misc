//!*script
/* 引数で指定された変数を返す */
// PPx.Arguments(0)=case
var arg = PPx.Arguments(0);
var getext;    // file_extension
var tPath;

switch (arg) {
case 'filetype':
  getext = PPx.GetFileInformation(PPx.Extract('%R')).slice(1);
  PPx.Result = (getext == '') ? '---' : getext;
  break;
case 'getpath': // 反対窓の有無に応じてパスを返す
  tPath = (PPx.Pane.Count == 2) ? '%2%\\' : '%\'work\'%\\';
  PPx.Result = PPx.Extract(tPath);
  break;
case 'repository':
  PPx.Result = PPx.Extract('%1%\\').indexOf(PPx.Extract('%\'repo\'%\\'));
  break;
case 'conline':
  PPx.Result = PPx.Extract('%*edittext').replace(/\r\n/g, ' %: ');
  break;
default:
  PPx.Result = PPx.Extract('%*js(PPx.Result = PPx.' + arg + ';)');
  break;
}
