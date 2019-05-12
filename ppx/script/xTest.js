//!*script
// 変数確認用
// var dp = PPx.Extract('%FD');
// var fp = PPx.Extract('%FDC');
// var fn = PPx.Extract('%FC');
// var odp = PPx.Extract('%2');
// var odn = PPx.Extract('%2%\\%R');
// len test =2;
PPx.Echo(PPx.Extract('%si"ppp"').slice(-13));
// PPx.Echo(PPx.Extract('%si"ppp"').slice(-13,13));
// PPx.SetPopLineMessage(test);
// PPx.SetPopLineMessage(PPx.Extract("%NC"));
//PPx.EntryHighlight = PPx.Arguments(0);
//PPx.Echo(PPx.Extract(PPx.Entry(0).Name));
//ディレクトリの種類
// PPx.Echo(PPx.DirectoryType);
// 書庫のあるディレクトリの抽出
//PPx.SetPopLineMessage(PPx.Extract("%*regexp(\"%FD\",\"s/^(.*)\\\\.*(zip|rar)$/$1/\")"))
// 書庫名の抽出//PPx.SetPopLineMessage(PPx.Extract("%*regexp(\"%FDC\",\"s/^(.*\\\\.*?(zip)).*/$2/\")"))
// コメント
//PPx.Execute("*linemessage %*comment(1)");
// 反対窓カレントディレクトリ
//PPx.SetPopLineMessage(PPx.GetFileInformation(fn))
// PPx ID
//PPx.SetPopLineMessage("IDname:" + PPx.WindowIDName);
// PPx 一枚窓のID
//PPx.SetPopLineMessage("comboIDname:" + PPx.ComboIDName);
// PPx一枚窓の数
//PPx.SetPopLineMessage("combo:" + PPx.GetComboItemCount);
// PPx一枚窓のペイン数
//PPx.SetPopLineMessage("pane:" + PPx.Pane.Count);
// PPx.SetPopLineMessage("tab:" + PPx.Pane.Tab.Count);
//PPx.Echo(PPx.SyncView);
// 汎用一時利用パス
//PPx.Echo(PPx.Extract('%si"ppp"'));
//
//     PPx.Execute('*capturewindow V%si"vID" -pane:~ -selectnoactive');
//     PPx.Execute('*wait 100,1');
    //PPx.Execute('*AHK ActivatePPx.ahk');
    //PPx.Execute('*focus');
 /* else if(PPx.extract('%n') == 'CX'){
    PPx.Execute('*string i,vID=X');
    PPx.Execute('%Oi *setcust X_win:V=B100000000 %:*ppv -r -bootid:%si"vID"');
    PPx.Execute('*topmostwindow %NVX,1');
    PPx.Execute('*ppvoption sync %si"vID"');
  } else{
    PPx.Execute('*string i,vID=Y');
    var ppvid = 'V' + PPx.Extract('%si"vID"');
    PPx.Execute('%Oi *setcust X_win:V=B000000000 %:*ppv -r -bootid:%si"vID"');
    PPx.Execute('*topmostwindow %N' + ppvid + ',1');
    PPx.Execute('*ppvoption sync %si"vID"');
  }*/
