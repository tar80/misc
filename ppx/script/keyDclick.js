//!*script
// ダブルクリックPPV呼び出し用
// PPc[X]は画像専用
var vpath = PPx.Extract('%FDC');

switch(PPx.Extract(PPx.WindowIDName)){
case 'C_X':
  PPx.Execute('%Oix *setcust X_win:V=B100000000');
  //PPx.Execute('*topmostwindow %NVA,1');
  break;
default:
  var ext = PPx.Extract(".%t");
  var arc = [".zip",".7z"];
  var image = [".jpg",".jpeg",".bmp",".png",".gif",".vch",".edg",".afd"];
  var doc = [".txt",".ini",".js",".log",".cfg",".html",".ahk",".md"];

  PPx.Execute('*linecust NoMask,KV_main:CLOSEEVENT,*execute C,*maskentry');
  for(var item in arc){
    if(arc[item] == ext){
      PPx.Execute('%K"@C_DIR');
      PPx.Quit(1)
      }
    }
  for(var item in image){
    if(image[item] == ext){
      PPx.Execute('%Oi *setcust X_win:V=B000000000 %:*setcust XV_imgD:VY=-2,4');
      PPx.Execute('*maskentry ' + image + ',!p:*');
    }
  }
  for(var item in doc){
    if(doc[item] == ext){
      PPx.Execute('%Oi *setcust X_win:V=B000000000');
      PPx.Execute('*maskentry ' + doc + ',!p:*');
    }
  }
  break;
}
PPx.Execute('*ppv -r -checkeredpattern:on -bootid:A '+ vpath + ' -k *fitwindow %N.');


/* else{
  if(PPx.Extract(PPx.Arguments(0)).match(/(JPG|JPEG|GIF|PNG|BMP|VCH|EDG|APD)$/i)){
    PPx.Execute('%Oi *setcust X_win:V=B000000000 %:*setcust XV_imgD:VY=-2,4');
    PPx.Execute('*maskentry .bmp,.jpg,.jpeg,.png,.gif,.vch,.edg,.apd,!p:*');
  } else if(PPx.Extract(PPx.Arguments(0)).match(/(7z|zip)$/i)){
      PPx.Execute('%K"@C_DIR');
    PPx.Quit(1)
  } else{
    PPx.Execute('%Oi *setcust X_win:V=B000000000');
    PPx.Execute('*maskentry .%t,.txt,.ini,.js,.log,.cfg,.html,.URL,!p:*');
  }
  PPx.Execute('*linecust NoMask,KV_main:CLOSEEVENT,*execute C,*maskentry');
}
PPx.Execute('*ppv -r -checkeredpattern:on -bootid:A '+ vpath + ' -k *fitwindow %N.');
 */
