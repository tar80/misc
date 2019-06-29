//!*script
// PPx.Arguments(0)=case
switch (PPx.Arguments(0)) {
  case 'version':
    PPx.Result = PPx.PPxVersion;
    break;
  case 'syncview':
    PPx.Result = PPx.Syncview;
    break;
  case 'markcount':
    PPx.Result = PPx.EntryMarkCount;
    break;
  case 'panecount':
    PPx.Result = PPx.Pane.Count;
    break;
  case 'dirtype':
    PPx.Result = PPx.DirectoryType;
    break;
  case 'filetype':
    var getext = PPx.GetFileInformation(PPx.Extract("%R")).slice(1);
    PPx.Result = getext == "" ? "---" : getext;
    break;
  case 'makepath':
    var path = PPx.Pane.Count == 2 ? "%2%\\" : "%'work'%\\";
    PPx.Result = PPx.Extract(path);
    break;
  case 'repository':
    //if(PPx.Entry(0).Name == ".git") PPx.Result = 1;
    PPx.Extract("%1%\\").indexOf(PPx.Extract("%'repo'%\\")) >= 0 ? PPx.Result = 1 : PPx.Result = 0;
    break;
    /*
  case 'oppdirtype':
    PPx.Result = PPx.GetFileInformation(PPx.Extract("%2"));
    break;
    */
}
