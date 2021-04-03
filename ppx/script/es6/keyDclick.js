//!*script
/* PPV呼び出し */
//
// PPx.Arguments() = (0)image | doc | movie
// PPc[X]は画像専用

'use strict';

const type = {
  doc:   ['.txt', '.ini', '.js', '.log', '.cfg', '.html', '.ahk', '.md', '.vbs', '.json'],
  image: ['.jpg', '.jpeg', '.bmp', '.png', '.gif', '.vch', '.edg'],
  movie: ['.3gp', '.avi', '.flv', '.mp4', '.mpg', '.qt', '.ebml', '.webm']
};

const filetype = PPx.Extract('.%t').toLowerCase();
const selType = [];

for (const item in type) {
  if (type[item].indexOf(filetype) != -1) { selType.push(item); }
}

const maskExt = type[selType];

if (typeof maskExt == 'undefined') {
  PPx.Execute('%K"@^i');
  PPx.Execute('*wait 10,1');
  PPx.Execute('*focus エントリ情報');
  PPx.Quit(1);
}

// 拡張子別の処理
const Expand_ext = function () {
  switch (selType) {
    case 'image':
      PPx.Execute('*setcust XV_imgD:VZ=-2,4');
      break;
    case 'movie':
      PPx.Execute('%On *ppb -c %0..\\mplayer\\mplayer.exe -framedrop -geometry %*windowrect(%N.,l):%*windowrect(%N.,t) -vf dsize=%*windowrect(%N.,w):%*windowrect(%N.,h):0 %FDC -loop 0');
      PPx.Quit(1);
      break;
    default:
      if (PPx.DirectoryType >= 63) {
        if (PPx.Execute('%"書庫内ファイル"%Q"PPvで開きますか？"') != 0) { PPx.Quit(1); }
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
  PPx.Execute('*linecust mask,KV_main:CLOSEEVENT,*execute C,*maskentry');
  Expand_ext();
}

PPx.Execute('*string i,vState=1');
PPx.Execute('*setcust X_vpos=3');
PPx.Execute('*ppvoption id z %K"@N');
PPx.Execute(`*maskentry path:,${maskExt}`);

