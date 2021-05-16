//!*script
/* キーバインドの一時保存・設定と復元 */
//
// PPx.Arguments(0) = (1):キー保存 | (0):キー復元
// PPx.Arguments(1) = 対象とするキー設定ファイルのパス
//
// 登録ex) exchangeKeys.js,1,path\customkeys.cfg
// 解除ex) exchangeKeys.js,0,path\customkeys.cfg
//
// ※PPx内部に【M_設定ファイル名】のメニュー項目が一時保存されます
//
// キー設定ファイル作成時の注意点
// 1.UTF-8で保存してください。他の文字コードは読めません
// 2.対象にできる項目は変数keybinds内で示された項目のみです。また、
// 【 項目名  スペース  =  スペース  { 】 の形式でないと失敗します。コメントは付けてもOK
//    ex) KC_main = {
//        KV_main = { ;comment
// 3.キーバインドのExShiftキー、Altキー、Ctrlキー、Shiftキーは~&^\の順番で書く必要があります
//    ex) ○: ~&^\A, &^\A, &^A, ^\A
//        ×: \^&~A, ^\&A, ^&A, \^A
// 4.CTRL+0やCTRL+Jなど特定のキーはPPx内部で^V_Hxxの型に変換されて記憶されているようです
//   CTRL+0の場合、^V_H30としないと復元に失敗します
// 5.'"'キーと'%'キーはエラーが出るのでいまのところ対象外です

'use strict';

if (PPx.Arguments.length < 2) {
  PPx.Echo('引数が足りません');
  PPx.Quit(-1);
}

const targetPath = PPx.Arguments(1);
const title = PPx.Extract(`%*name(X,${targetPath})`);
const checkDup = PPx.Extract(`%*getcust(M_${title})`).split('\u000A').length;
const keybinds = ['KC_main', 'KC_incs', 'K_edit', 'K_ppe', 'K_lied', 'K_tree', 'KB_edit', 'KV_main', 'KV_page', 'KV_crt', 'KV_img'];

const st = PPx.CreateObject('ADODB.stream');
st.Open;
st.Type = 2;
st.Charset = 'UTF-8';
st.LoadFromFile(targetPath);
const stCnts = st.ReadText(-1).split('\u000A');
st.Close;

const setKeys = (() => {
  let header;
  const arrKey = [];

  for (const value of stCnts) {
    if (/^[^\s]*\s=\s{.*/.test(value) === true) {
      header = value.replace(/^([^\s]*)\s.*/, '$1');
      if (keybinds.indexOf(header) === -1) {
        PPx.Echo(`${header}のキー登録は許可されていません`);
        PPx.Quit(-1);
      }
    } else if (/^[^\s]*\s*[=,].*/.test(value) === true) {
      arrKey.push({ 'key': header, 'cmd': value.replace(/^([^\s]*)\s.*/, (match, p1) => p1.replace(/\\'/g, '\\\'')) });
    }
  }
  return arrKey;
})();

if (setKeys[0].key === undefined) {
  PPx.Echo('項目名が設定されていません');
  PPx.Quit(-1);
}

({
  '1': () => {
    if (checkDup > 3) {
      PPx.SetPopLineMessage(`${title}は適用済みです`);
      PPx.Quit(-1);
    }

    const reg = new RegExp(/^[a-zA-Z]*$/);

    for (const value of setKeys) {
      const cnts = PPx.Extract(`%OC %*getcust(${value.key}:${value.cmd})`);
      if (cnts === '') {
        PPx.Execute(`*setcust M_${title}:${value.key}:${value.cmd}=%%mNotExist %%K"@${value.cmd}`);
      } else {
        if (cnts.slice(0,1) === '@' || reg.test(cnts)) {
          PPx.Execute(`*setcust M_${title}:${value.key}:${value.cmd}=%%mSepEQ %%K"${cnts}`);
        } else {
          const escCnts = cnts.replace(/%/g, '%%');
          PPx.Execute(`%OC *setcust M_${title}:${value.key}:${value.cmd}=${escCnts}`);
        }
      }
    }
    PPx.Execute(`*setcust @${targetPath}`);
  },
  '0': () => {
    if (checkDup <= 3) {
      PPx.SetPopLineMessage(`${title}は登録されていません`);
      PPx.Quit(-1);
    }

    const emptykeys = [];

    for (const value of setKeys) {
      const cnts = PPx.Extract(`%OC %*getcust(M_${title}:${value.key}:${value.cmd})`);
      if (cnts === '') {
        emptykeys.push(value);
      } else if (~cnts.indexOf('mNotExist')) {
        PPx.execute(`*deletecust ${value.key}:${value.cmd}`);
      } else if (~cnts.indexOf('mSepEQ')) {
        PPx.Execute(`*setcust ${value.key}:${value.cmd}=${cnts.replace('%K"', '')}`);
      } else {
        const escCnts = cnts.replace(/%/g, '%%');
        PPx.Execute(`%OC *setcust ${value.key}:${value.cmd},${escCnts}`);
      }
    }
    if (emptykeys.length !== 0) { PPx.SetPopLineMessage(`未登録キー: ${emptykeys.join(',')}`); }
    PPx.Execute(`*deletecust "M_${title}"`);
    PPx.Execute('%K"@LOADCUST');
  }
})[PPx.Arguments(0)]();

