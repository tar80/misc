//!*script
//
// 1.色設定が上書きされるのでバックアップを取っておく
// 2.https://windowsterminalthemes.dev/ で気に入った色テーマを"Get theme"する
// 3.クリップボードに設定がコピーされるのでそのままこのスクリプトを実行
// {
//   "name": "3024 Night",
//   "black": "#090300",
//   "red": "#db2d20",
//   "green": "#01a252",
//   "yellow": "#fded02",
//   "blue": "#01a0e4",
//   "purple": "#a16a94",
//   "cyan": "#b5e4f4",
//   "white": "#a5a2a2",
//   "brightBlack": "#5c5855",
//   "brightRed": "#e8bbd0",
//   "brightGreen": "#3a3432",
//   "brightYellow": "#4a4543",
//   "brightBlue": "#807d7c",
//   "brightPurple": "#d6d5d4",
//   "brightCyan": "#cdab53",
//   "brightWhite": "#f7f7f7",
//   "background": "#090300",
//   "foreground": "#a5a2a2",
//   "selectionBackground": "#4a4543",
//   "cursorColor": "#a5a2a2"
// }
/////////* 初期設定 *////////////

// 設定ファイルを作成する場所
var tPath = PPx.Extract('%\'cfg\'%\\theme');

// 色設定を適用するPPxアプリケーション
var apply_ppc = false;
var apply_ppv = false;
var apply_ppb = false;

/* 色設定
  使用できる色は以下20色
  暗い色:    BLACK, RED, GREEN, YELLOW, BLUE, PURPLE, CYAN, WHITE
  明るい色: BBLACK,BRED,BGREEN,BYELLOW,BBLUE,BPURPLE,BCYAN,BWHITE
  背景: BG, 通常色: FG, 選択項目背景: SEL_BG, カーソル: CUR
*/

// PPc
var background = 'C_back = BG';
var foreground = 'C_mes = FG';
var tree  = 'CC_tree = FG,BG';
var tip   = 'C_tip = BWHITE,BBLUE';
var log   = 'CC_log = GREEN,BG';
//                      message,".","..",label,dir,system,hidden,readonly,normal,archive,link,virtual,enc,special
var entry = 'C_entry = BGREEN,_AUTO,_AUTO,RED,CYAN,BRED,BBLACK,BGREEN,BWHITE,BBLUE,BPURPLE,BBLACK,RED,PURPLE';
var eInfo = 'C_eInfo = GREEN,RED,_AUTO,_AUTO,BLUE,BBLUE,SEL_BG,CUR,CUR,SEL_BG,_AUTO,BBLACK,_AUTO,BBLUE,BGREEN,BYELLOW,BCYAN,BPURPLE,BRED,BWHITE,_AUTO';

// PPv
var edgeline  = 'CV_boun = _AUTO';
var linecur   = 'CV_lcsr = CUR';
var linenum   = 'CV_lnum = CYAN,PURPLE';
var special   = 'CV_lbak = BPURPLE,BPURPLE,BPURPLE';
var ctrl      = 'CV_ctrl = YELLOW';
var linefmt   = 'CV_lf   = YELLOW';
var tab       = 'CV_tab  = YELLOW';
var space     = 'CV_spc  = PURPLE';
var link      = 'CV_link = BLUE';
var synbol    = 'CV_syn  = BPURPLE,BYELLOW';
var vcolor    = 'CV_char = BBLACK,BRED,BGREEN,BBLUE,BYELLOW,BCYAN,BPURPLE,BWHITE,_AUTO,RED,GREEN,BLUE,YELLOW,CYAN,PURPLE,WHITE';

// PPb
var bcolor = 'CB_pals=BBLACK,BRED,BGREEN,BBLUE,BYELLOW,BCYAN,BPURPLE,BWHITE,_AUTO,RED,GREEN,BLUE,YELLOW,CYAN,PURPLE,WHITE';

//////////////////// ////////////

var clip = PPx.Clipboard.toLowerCase().replace(/#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/g,'H$3$2$1');
(function (v) {
  var fLine = v.slice(0,2).replace(/[\r\n]/, '@');
  if (fLine !== '{@') {
    PPx.Echo('クリップボードから色情報を取得できませんでした');
    PPx.Quit(1);
  }
})(clip);

var getCfg = (function() {
  var t;
  var e = ['A_color = {'];
  var arrColor = clip.split('\u000A');
  var cnts = {
    'name': (function (v) { return t = arrColor[v].replace(' ', '-').slice(0,-1); }),
    'background': (function (v) { return e.push('BG = ' + arrColor[v].toUpperCase()); }),
    'foreground': (function (v) { return e.push('FG = ' + arrColor[v].toUpperCase()); }),
    'selectionbackground': (function (v) { return e.push('SEL_BG = ' + arrColor[v].toUpperCase()); }),
    'cursorcolor': (function (v) { return e.push('CUR = ' + arrColor[v].toUpperCase()); })
  };
  for (var i = 1, l = arrColor.length; i < l; i++) {
    var m = arrColor[i].match(/^[\s]*(.*):\s(.*)/);
    m[1] = m[1].replace(/"/g, '');
    m[2] = m[2].replace(/"/g, '').slice(0,-1);
    try {
      cnts[m[1]](m[2]);
      } catch (err) {
        e.push(m[1].toUpperCase() + ' = ' + m[2].replace('bright', 'b').toUpperCase());
      }
  }
  return { 'title': t, 'ele': e };
})();
getCfg.ele.push('}');

if (PPx.Execute('%"テーマの生成"%Q"' + getCfg.title + ' を生成します"') !== 0) { PPx.Quit(1); }

if (PPx.Extract('%*result(exists,' + tPath + ')') === '0') { PPx.Execute('*makedir ' + tPath); }

PPx.Execute('*setcust M_theme:' + getCfg.title + '=*setcust @' + tPath + '%\\' + getCfg.title + '.cfg');

if (apply_ppc === true) {
  getCfg.ele.push(background);
  getCfg.ele.push(foreground);
  getCfg.ele.push(tree);
  getCfg.ele.push(tip);
  getCfg.ele.push(log);
  getCfg.ele.push(entry);
  getCfg.ele.push(eInfo);
}

if (apply_ppv === true) {
  getCfg.ele.push(edgeline);
  getCfg.ele.push(linecur);
  getCfg.ele.push(linenum);
  getCfg.ele.push(special);
  getCfg.ele.push(ctrl);
  getCfg.ele.push(linefmt);
  getCfg.ele.push(tab);
  getCfg.ele.push(space);
  getCfg.ele.push(link);
  getCfg.ele.push(synbol);
  getCfg.ele.push(vcolor);
}

if (apply_ppb === true) {
  getCfg.ele.push(bcolor);
}

var cfgEle = getCfg.ele.join('\u000D\u000A');

var st = PPx.CreateObject('ADODB.stream');
st.Open;
st.Type = 2;
st.Charset = 'UTF-8';
st.WriteText(cfgEle);
st.SaveToFile(tPath + '\\' + getCfg.title + '.cfg', 2);
st.Close;
