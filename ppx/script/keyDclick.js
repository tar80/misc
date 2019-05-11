//!*script
// ダブルクリックPPV呼び出し用
// PPc[X]は画像専用
var filePath = PPx.Extract('%FDC');
var ext = PPx.Arguments.Length? PPx.Arguments(0): 'none';
switch(PPx.Extract(PPx.WindowIDName)){
  case 'C_X':
    var ppcId = PPx.Extract("%N");
  PPx.Execute('%Oix *setcust X_win:V=B100000000');
  //PPx.Execute('*topmostwindow %NVA,1');
  break;
  default:
    var ppcId = PPx.Extract("%N.");
  PPx.Execute('%Oi *setcust X_win:V=B000000000');
  PPx.Execute('*linecust NoMask,KV_main:CLOSEEVENT,*execute C,*maskentry');
    if(ext == 'image'){
      var maskExt = [".jpg",".jpeg",".bmp",".png",".gif",".vch",".edg",".afd"];
      PPx.Execute('*maskentry ' + maskExt + ',!p:*');
      PPx.Execute('%Oi *setcust XV_imgD:VZ=-2,4');
      if(ext == 'doc'){
        var mackExt = [".txt",".ini",".js",".log",".cfg",".html",".ahk",".md"];
        PPx.Execute('*maskentry ' + maskExt + ',!p:*');
        break;
    }
  }
}
// ※ver1.66_書庫内でモジュールを呼ぶとエラーが出る対策に*wait挟んでファイルを開く
PPx.Execute('%Oi *ppv -r -checkeredpattern:on -bootid:Z -k *fitwindow ' + ppcId + '%:*wait 10,1 %:%v%R');
