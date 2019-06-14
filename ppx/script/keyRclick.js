﻿//!*script
// 右クリックメニュー拡張子判別
// PPx.Arguments(0)=M_Ccr|M_FileMOVE|M_FileCOPY
var cDir = PPx.Extract('%1');
if(cDir.match(/aux:.*/)){
  PPx.Execute('%M_Caux');
  PPx.Quit(1);
}
var ext = PPx.GetFileInformation(PPx.Extract("%R")).slice(1) == 'DIR'? 'DIR' :PPx.Extract('%t').toLowerCase();
var result = "none";
var select = "S";
// 拡張子判別
switch(ext){
  case '7z':
  case 'cab':
  case 'lzh':
  case 'msi':
  case 'rar':
  case 'zip':
    var result = "arc";
    var select = "W";
    break;
  case 'bmp':
  case 'edg':
  case 'gif':
  case 'jpeg':
  case 'jpg':
  case 'png':
  case 'vch':
    var result = "image";
    var select = "L";
    break;
  case 'ahk':
  case 'ini':
  case 'cfg':
  case 'js':
  case 'json':
  case 'log':
  case 'md':
  case 'txt':
  case 'vim':
    var result = "doc";
    var select = "R";
    break;
  case 'DIR':
    var result = "dir";
    var select = "W";
    break;
}
if(PPx.Arguments(0) == 'M_Ccr'){
  divide_menu('J','O')
} else{
  var select = PPx.Arguments(0) == 'M_FileMOVE'? 'M': 'C';
  divide_menu(select,select);
}
function divide_menu(list,arc){
  switch(PPx.DirectoryType){
    case 4:
      PPx.Execute('*setcust M_Clist:Ext = ??M_U' + result + ' %:%M_Clist,' + list);
      break;
    case 80:
      PPx.Execute('%M_Chttp');
      break;
    case 62:
    case 64:
    case 96:
      PPx.Execute('%M_Carc,' + arc);
      break;
    default:
      PPx.Execute('*setcust M_Ccr:Ext = ??M_U' + result + ' %:%' + PPx.Arguments(0) + ',' + select);
      break;
  }
}

