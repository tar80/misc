//!*script
var ext = PPx.GetFileInformation(PPx.Extract("%R")).slice(1) == 'DIR'? 'DIR' :PPx.Extract('%t').toLowerCase();
var arc = ["zip","7z","cab","msi","rar","lzh"];
var image = ["jpeg","jpg","bmp","png","gif","vch","edg","afd"];
var doc = ["txt","ini","cfg","js","md","vim","log","ahk","json"];
var type = arc.concat(image + doc);
var result = "none";
var select = "S";

for(var item in type){
  switch(ext){
    case arc[item]:
      var result = "arc";
      var select = "W";
      break;
    case image[item]:
      var result = "image";
      var select = "L";
      break;
    case doc[item]:
      var result = "doc";
      var select = "R";
      break;
    case 'DIR':
      var result = "dir";
      var select = "W";
  }
}
var typeDir = PPx.DirectoryType;
var cDir = PPx.Extract('%1');
if(cDir.match(/aux:.*/)) PPx.Execute('%M_Caux');
PPx.Arguments(0) == 'M_Ccr'? click_menu(): file_menu();
function click_menu(){
  switch(typeDir){
    case 4:
      PPx.Execute('*setcust M_Clist:Ext = ??M_U' + result + ' %:%M_Clist,J');
      break;
    case 80:
      PPx.Execute('%M_Chttp');
      break;
    case 62:
      PPx.Execute('%M_Carc,O');
      break;
    default:
      PPx.Execute('*setcust M_Ccr:Ext = ??M_U' + result + ' %:%' + PPx.Arguments(0) + ',' + select);
      break;
  }
}
function file_menu(){
  var select = PPx.Arguments(0) == 'M_FileMOVE'? 'M': 'C';
  switch(typeDir){
    case 4:
      PPx.Execute('*setcust M_Clist:Ext = ??M_U' + result + ' %:%M_Clist,' + select);
      break;
    case 80:
      PPx.Execute('%M_Chttp');
      break;
    case 62:
      PPx.Execute('%M_Carc,' + select);
      break;
    default:
      PPx.Execute('*setcust M_Ccr:Ext = ??M_U' + result + ' %:%' + PPx.Arguments(0) + ',' + select);
      break;
  }
}

