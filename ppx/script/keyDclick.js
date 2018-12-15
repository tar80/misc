//!*script
// ダブルクリックPPV呼び出し用
// PPc[X]は画像専用
var ppvpath = PPx.Extract('%FDC');

if(PPx.WindowIDName == "C_X"){
  PPx.Execute('%Oix *setcust X_win:V=B100000000');
  //PPx.Execute('*topmostwindow %NVA,1');
} else{
  if (PPx.Extract('%*extract(C\"%%t\")').match(/(JPG|JPEG|GIF|PNG|BMP|EDG|APD)$/i)){
    PPx.Execute('%Oi *setcust X_win:V=B000000000 %:*setcust XV_imgD:VY=-2,4');
    PPx.Execute('*maskentry .bmp,.jpg,.jpeg,.png,.gif,.vch,.edg,.apd,a:d-'); //※a: =attribute:
  } else{
    PPx.Execute('%Oi *setcust X_win:V=B000000000');
    PPx.Execute('*maskentry .%t,.txt,.ini,.js,.log,.cfg,.html,.URL,a:d-'); 
  }
  PPx.Execute('*linecust NoMask,KV_main:CLOSEEVENT,*execute C,*maskentry');
}
PPx.Execute('*ppv -r -checkeredpattern:on -bootid:A '+ ppvpath + ' -k *fitwindow %N.');
