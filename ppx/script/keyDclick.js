//!*script
// ダブルクリックPPV呼び出し用
// PPc[X]は画像専用
var fp = PPx.Extract('%FDC');
var ppcid;

switch(PPx.Extract(PPx.WindowIDName)){
case 'C_X':
  ppcid = PPx.Extract("%N");
  PPx.Execute('%Oix *setcust X_win:V=B100000000');
  //PPx.Execute('*topmostwindow %NVA,1');
  break;
default:
  ppcid = PPx.Extract("%N.");
  var ext = PPx.Extract(".%t").toLowerCase();
  var arc = [".zip",".7z"];
  var image = [".jpg",".jpeg",".bmp",".png",".gif",".vch",".edg",".afd"];
  var doc = [".txt",".ini",".js",".log",".cfg",".html",".ahk",".md"];
  var type = arc.concat(image, doc);
  PPx.Execute('%Oi *setcust X_win:V=B000000000');
  PPx.Execute('*linecust NoMask,KV_main:CLOSEEVENT,*execute C,*maskentry');
  for(var item in type){
    if(arc[item] == ext){
      PPx.Execute('%K"@C_DIR');
      PPx.Quit(1);
    }
    if(image[item] == ext){
      PPx.Execute('*setcust XV_imgD:VY=-2,4');
      PPx.Execute('*maskentry ' + image + ',!p:*');
    }
    if(doc[item] == ext){
      PPx.Execute('%Oi *setcust X_win:V=B000000000');
      PPx.Execute('*maskentry ' + doc + ',!p:*');
    }
  }
  break;
}
// ※ver1.66_書庫内でモジュールを呼ぶとエラーが出る対策に*wait挟んでファイルを開く
PPx.Execute('%Oi *ppv -r -checkeredpattern:on -bootid:A -k *fitwindow ' + ppcid + '%:*wait 10,1 %:%v%R');
