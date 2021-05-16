//!*script
/* PPV呼び出し */

// サムネ画像専用全画面PPcID ※不要なら空('')にする
var fullsizeID = 'C_X';

var type = {
  doc:   '.txt,.ini,.js,.log,.cfg,.html,.ahk,.md,.vbs,.json,.vim',
  image: '.jpg,.jpeg,.bmp,.png,.gif,.vch,.edg',
  movie: '.3gp,.avi,.flv,.mp4,.mpg,.qt,.ebml,.webm'
};

var filetype = PPx.Extract('.%t').toLowerCase();
var maskExt = (function () {
  for (var item in type) {
    if (~type[item].indexOf(filetype)) { return type[item]; }
  }
})();

if (maskExt === undefined) {
  PPx.Execute('*linecust editc,K_edit:FIRSTEVENT,*editmode -modify:silent %%: *linecust editc,K_edit:FIRSTEVENT');
  PPx.Execute('%K"@^i');
  PPx.Execute('*wait 10,1');
  PPx.Execute('*topmostwindow %*findwindowclass(PPeditW),1');
  PPx.Execute('*focus エントリ情報');
  PPx.Quit(1);
}

// 種別の処理
var ExpandExt = function () {
  switch (maskExt) {
    case 'image':
      PPx.Execute('*setcust XV_imgD:VZ=-2,4');
      break;
    case 'movie':
      PPx.Execute('%On *ppb -c %0..\\mplayer\\mplayer.exe -framedrop -geometry %*windowrect(%N.,l):%*windowrect(%N.,t) -vf dsize=%*windowrect(%N.,w):%*windowrect(%N.,h):0 %FDC -loop 0');
      PPx.Quit(1);
      break;
    default:
      if (PPx.DirectoryType >= 63 && PPx.Execute('%"書庫内ファイル"%Q"PPvで開きますか？"') !== 0) {
        PPx.Quit(1);
      }
  }
};

if (PPx.WindowIDName === fullsizeID) {
  // タイトルバーなし
  PPx.Execute('%Ox *setcust X_win:V=B100000000');
  PPx.Execute('*linecust keyenter,KV_main:CLOSEEVENT,*setcust X_vpos=%*getcust(X_vpos)');
  //PPx.Execute('*topmostwindow %NVA,1');
} else {
  // タイトルバーあり
  PPx.Execute('*setcust X_win:V=B000000000');
  PPx.Execute('*linecust keyenter,KV_main:CLOSEEVENT,*setcust X_vpos=%*getcust(X_vpos) %%: *execute C,*maskentry');
  ExpandExt();
}

// Moving_PPv停止 ※movingPPv.jsを導入していなければ不要
PPx.Execute('*string i,vState=1');
// PPcに被せて表示
PPx.Execute('*setcust X_vpos=3');
// PPv[z]を呼び出し元PPcと連動
PPx.Execute('*ppvoption id z %K"@N');
// maskを設定
PPx.Execute('*maskentry path:,' + maskExt);

