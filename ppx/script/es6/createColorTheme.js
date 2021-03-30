//!*script
//
// 1.色設定が上書きされるのでバックアップを取っておく
// 2.https://windowsterminalthemes.dev/ で気に入った色テーマを"Get theme"する
// 3.クリップボードに設定がコピーされるのでそのままこのスクリプトを実行

'use strict';

/////////* 初期設定 *////////////

// 設定ファイルを作成する場所
const tPath = PPx.Extract('%\'cfg\'%\\theme');

// 色設定を適用するPPxアプリケーション
const apply_ppc = false;
const apply_ppv = false;
const apply_ppb = false;

/* 色設定
  使用できる色は以下20色
  暗い色:    BLACK, RED, GREEN, YELLOW, BLUE, PURPLE, CYAN, WHITE
  明るい色: BBLACK,BRED,BGREEN,BYELLOW,BBLUE,BPURPLE,BCYAN,BWHITE
  背景: BG, 通常色: FG, 選択項目背景: SEL_BG, カーソル: CUR
*/

// PPc
const background = 'C_back = BG';
const foreground = 'C_mes = FG';
const tree  = 'CC_tree = FG,BG';
const tip   = 'C_tip = BWHITE,BBLUE';
const log   = 'CC_log = GREEN,BG';
//                      message,".","..",label,dir,system,hidden,readonly,normal,archive,link,virtual,enc,special
const entry = 'C_entry = BGREEN,_AUTO,_AUTO,RED,CYAN,BRED,BBLACK,BGREEN,BWHITE,BBLUE,BPURPLE,BBLACK,RED,PURPLE';
const eInfo = 'C_eInfo = GREEN,RED,_AUTO,_AUTO,BLUE,BBLUE,SEL_BG,CUR,CUR,SEL_BG,_AUTO,BBLACK,_AUTO,BBLUE,BGREEN,BYELLOW,BCYAN,BPURPLE,BRED,BWHITE,_AUTO';

// PPv
const edgeline  = 'CV_boun = _AUTO';
const linecur   = 'CV_lcsr = CUR';
const linenum   = 'CV_lnum = CYAN,PURPLE';
const special   = 'CV_lbak = BPURPLE,BPURPLE,BPURPLE';
const ctrl      = 'CV_ctrl = YELLOW';
const linefmt   = 'CV_lf   = YELLOW';
const tab       = 'CV_tab  = YELLOW';
const space     = 'CV_spc  = PURPLE';
const link      = 'CV_link = BLUE';
const synbol    = 'CV_syn  = BPURPLE,BYELLOW';
const vcolor    = 'CV_char = BBLACK,BRED,BGREEN,BBLUE,BYELLOW,BCYAN,BPURPLE,BWHITE,_AUTO,RED,GREEN,BLUE,YELLOW,CYAN,PURPLE,WHITE';

// PPb
const bcolor = 'CB_pals=BBLACK,BRED,BGREEN,BBLUE,BYELLOW,BCYAN,BPURPLE,BWHITE,_AUTO,RED,GREEN,BLUE,YELLOW,CYAN,PURPLE,WHITE';

//////////////////// ////////////

const clip = PPx.Clipboard.toLowerCase().replace(/#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/g,'H$3$2$1');
if (clip.slice(0,2) !== '{\n') {
  PPx.Echo('クリップボードから色情報を取得できませんでした');
  PPx.Quit(1);
}

const objColor = JSON.parse(clip);

const getCfg = ((t, e = ['A_color = {']) => {
  for (const key of Object.keys(objColor)) {
    switch (key) {
      case 'name': t = objColor[key].replace(' ', '-');
        break;
      case 'background': e.push(`BG = ${objColor[key]}`.toUpperCase());
        break;
      case 'foreground': e.push(`FG = ${objColor[key]}`.toUpperCase());
        break;
      case 'selectionbackground' : e.push(`SEL_BG = ${objColor[key]}`.toUpperCase());
        break;
      case 'cursorcolor': e.push(`CUR = ${objColor[key]}`.toUpperCase());
        break;
      default: e.push(`${key} = ${objColor[key]}`.replace('bright', 'b').toUpperCase());
    }
  }
  return { 'title': t, 'ele': e };
})();
getCfg.ele.push('}');

if (PPx.Execute(`%"テーマの生成"%Q"${getCfg.title} を生成します"`) !== 0) { PPx.Quit(1); }

if (PPx.Extract(`%*result(exists,${tPath})`) === '0') { PPx.Execute(`*makedir ${tPath}`); }

PPx.Execute(`*setcust M_theme:${getCfg.title}=*setcust @${tPath}%\\${getCfg.title}.cfg`);

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

const cfgEle = JSON.stringify(getCfg.ele).slice(2, -2).replace(/","/g, '\u000D\u000A');

const st = PPx.CreateObject('ADODB.stream');
st.Open;
st.Type = 2;
st.Charset = 'UTF-8';
st.WriteText(cfgEle);
st.SaveToFile(`${tPath}\\${getCfg.title}.cfg`, 2);
st.Close;
