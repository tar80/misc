//!*script
/* PPV呼び出し */
// PPx.Arguments() = [0]image | doc | movie
// PPc[X]は画像専用
'use strict';
const ppcId = (PPx.Pane.length != 0)
  ? PPx.Extract('%NC#')
  : PPx.Extract('%NC');
const type = {
  doc:   ['.txt', '.ini', '.js', '.log', '.cfg', '.html', '.ahk', '.md', '.vbs' ,'.json'],
  image: ['.jpg', '.jpeg', '.bmp', '.png', '.gif', '.vch', '.edg'],
  movie: ['.3gp', '.avi' ,'.flv', '.mp4', '.mpg', '.qt', '.ebml', '.webm'],
};
const filetype = PPx.Extract('.%t').toLowerCase();
const selType = [];

Object.keys(type).forEach(function (key) {
  type[key].find(ext => {
    if (ext == filetype) {
      selType.push(key);
      return;
    }
  });
});

const maskExt = (() => {
  try {
    return Object.values(type[selType]);
  } catch (e) {
    PPx.Execute('%K"@^i');
    PPx.Execute('*wait 10,1');
    PPx.Execute('*focus エントリ情報');
    PPx.Quit(1);
  }
})();
// 拡張子別の処理
const Expand_ext = function() {
  switch (selType) {
  case 'image':
    PPx.Execute('%Oi *setcust XV_imgD:VZ=-2,4');
    break;
  case 'movie':
    PPx.Execute('%On *ppb -c %0..\\mplayer\\mplayer.exe -framedrop -geometry %*windowrect(%N.,l):%*windowrect(%N.,t) -vf dsize=%*windowrect(%N.,w):%*windowrect(%N.,h):0 %FDC -loop 0');
    break;
  default:
  }
};

if (PPx.WindowIDName == 'C_X') {
  // タイトルバーなし
  PPx.Execute('%Oix *setcust X_win:V=B100000000');
  //PPx.Execute('*topmostwindow %NVA,1');
} else {
  // タイトルバーあり
  PPx.Execute('%Oi *setcust X_win:V=B000000000');
  PPx.Execute('*linecust no_mask,KV_main:CLOSEEVENT,*execute C,*maskentry');
  Expand_ext();
}

PPx.Execute('*string i,vState=1');
// ※ver1.66_書庫内にて直接PPvでファイルを開くとエラーが出る対策に*wait挟んでファイルを開く
PPx.Execute(`%Oi *ppv -r -checkeredpattern:on -bootid:Z -k *fitwindow ${ppcId}`);
PPx.Execute('*wait 10,1');
PPx.Execute('%v');
PPx.Execute(`*maskentry path:,${maskExt}`);
