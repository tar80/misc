//!*script
/* PPV呼び出し */
// PPx.Arguments() = [0]image | doc | movie
// PPc[X]は画像専用

var maskExt = [];
var ppcId = (PPx.Pane.length != 0)
  ? PPx.Extract('%NC#')
  : PPx.Extract('%NC');

/* 拡張子別の処理をする関数 */
var expand_ext = function () {
  var ext;
  try {
    ext = PPx.Arguments(0);
  } catch (e) {
    ext = 'default';
  } finally {
  switch (ext) {
    case 'image':
      maskExt = ['.jpg', '.jpeg', '.bmp', '.png', '.gif', '.vch', '.edg'];
      PPx.Execute('*setcust XV_imgD:VZ=-2,4');
      // PPx.Execute('%Oi %0..\\MassiGra\\MassiGra.exe /user="ppx" %R');
      // PPx.Execute('%Oi *fitwindow ' + ppcId + ',%*findwindowclass(TF811202_MassiGra_Main)');
      // PPx.Quit(1);
      break;
    case 'doc':
      maskExt = ['.txt', '.ini', '.js', '.log', '.cfg', '.html', '.ahk', '.md'];
      break;
    case 'movie':
      PPx.Execute('%On *ppb -c %0..\\mplayer\\mplayer.exe -framedrop -geometry %*windowrect(%N.,l):%*windowrect(%N.,t) -vf dsize=%*windowrect(%N.,w):%*windowrect(%N.,h):0 %FDC -loop 0');
      PPx.Quit(1);
    break;
    default:
    }
  }
};

if (PPx.WindowIDName == 'C_X') {
    // タイトルバーなし
    PPx.Execute('%Ox *setcust X_win:V=B100000000');
    //PPx.Execute('*topmostwindow %NVA,1');
} else {
    // タイトルバーあり
    PPx.Execute('*setcust X_win:V=B000000000');
    PPx.Execute('*linecust no_mask,KV_main:CLOSEEVENT,*execute C,*maskentry');
    expand_ext();
}

PPx.Execute('*string i,vState=1');
PPx.Execute('*execinarc %: *ppv -r -checkeredpattern:on -bootid:Z "%R" -k *fitwindow ' + ppcId);
PPx.Execute('*maskentry path:,' + maskExt);
PPx.Execute('%J"%*extract(VZ"%%R")"');
