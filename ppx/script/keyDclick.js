//!*script
/* ダブルクリックPPV呼び出し用 */
// PPx.Arguments(0)=none|image|doc|movie
// PPc[X]は画像専用

var ext = (PPx.Arguments.Length ? PPx.Arguments(0) : 'none');
switch (PPx.Extract(PPx.WindowIDName)) {
  case 'C_X':
    var ppcId = PPx.Extract("%NC");
    // タイトルバーなし
    PPx.Execute('%Oix *setcust X_win:V=B100000000');
    //PPx.Execute('*topmostwindow %NVA,1');
    break;
  default:
    var ppcId = PPx.Extract("%NC#");
    // タイトルバーあり
    PPx.Execute('%Oi *setcust X_win:V=B000000000');
    PPx.Execute('*linecust NoMask,KV_main:CLOSEEVENT,*execute C,*maskentry');
    // ファイルの種類でフィルタ
    if (ext == 'image') {
      var maskExt = [".jpg", ".jpeg", ".bmp", ".png", ".gif", ".vch", ".edg"];
      PPx.Execute('*maskentry path:,' + maskExt);
      PPx.Execute('%Oi *setcust XV_imgD:VZ=-2,4');
      // PPx.Execute('%Oi %0..\\MassiGra\\MassiGra.exe /user="ppx" %R');
      // PPx.Execute('%Oi *fitwindow ' + ppcId + ',%*findwindowclass(TF811202_MassiGra_Main)');
      // PPx.Quit(1);
    } else if (ext == 'doc') {
      var maskExt = [".txt", ".ini", ".js", ".log", ".cfg", ".html", ".ahk", ".md"];
      PPx.Execute('*maskentry path:,' + maskExt);
    } else if (ext == 'movie') {
      // PPxのエイリアス(ターミナル呼び出し)
      PPx.Execute('termppx');
      PPx.Execute('%0..\\mplayer\\mplayer.exe -framedrop -geometry %*windowrect(%N.,l):%*windowrect(%N.,t) -vf dsize=%*windowrect(%N.,w):%*windowrect(%N.,h):0 %FDC -loop 0');
      PPx.Quit(1);
    };
    break;
};
// ※ver1.66_書庫内でモジュールを呼ぶとエラーが出る対策に*wait挟んでファイルを開く
PPx.Execute('%Oi *ppv -r -checkeredpattern:on -bootid:Z -k *fitwindow ' + ppcId);
PPx.Execute('*wait 10,1');
PPx.Execute('%v');
