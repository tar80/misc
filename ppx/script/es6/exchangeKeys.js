//!*script
/* キーバインドの一時保存と復元 */
//
// PPx.Arguments(0) = (1):キー保存 | (0):キー復元
// PPx.Arguments(1) = 保存用項目(M_xxx)のxxx部分
// PPx.Arguments(2) = 対象とするキー設定ファイルのパス
//
// 登録ex) exchangeKeys.js,1,ck,path\customkeys.cfg
// 解除ex) exchangeKeys.js,0,ck,path\customkeys.cfg
//
// ※キー設定ファイルはUTF-8を対象としています。他の文字コードは読めません
// ※キー設定ファイルには、必ずKC_mainなどの項目名が必要で、
// 【 項目名  スペース1つ  =  スペース1つ  { 】 の形式でないと失敗します。コメントは付けてもOK
// ex)
// XC_main = { ;Comment
// A , cmd
// B = @B
// }
// ※LEFT = @LEFT のような'='を使う書式は、LEFT , %K"@LEFTに変換されます
// ※キーバインド中のAltキー、Ctrlキー、Shiftキーは正しい順番(&^\)で書く必要があります
// ex) ○: &^\A, &^A, &\A
//     ×: ^\&A, ^&A, \&A

'use strict';

const process = PPx.Arguments(0)|0;
const title = PPx.Arguments(1);
const tPath = PPx.Arguments(2);

if (PPx.Arguments.length < 2) {
  PPx.Echo('引数が足りません');
  PPx.Quit(-1);
}

const st = PPx.CreateObject('ADODB.stream');
st.Type = 2;
st.Charset = 'UTF-8';
st.Open();
st.LoadFromFile(tPath);
const stCnts = st.ReadText(-1).split('\u000A');
st.Close;

const getKeys = [];
let header;

for (const value of stCnts) {
  if (value.search(/^[^\s]*\s=\s{.*/) == 0) {
    header = value.replace(/^([^\s]*)\s.*/, '$1');
  } else if (!value.search(/^[^\s]*\s*[=,].*/)) {
    getKeys.push([header, value.replace(/^([^\s]*)\s.*/, (match, p1) => {
      return p1.replace(/\\'/g, '\\\'');
    })
    ]);
  }
}

if (getKeys[0][0] === undefined) {
  PPx.Echo('項目名が設定されていません');
  PPx.Quit(1);
}

if (process) {
  for (const value of getKeys) {
    const contents = PPx.Extract(`%OC %*getcust(${value[0]}:${value[1]})`);
    const avoidCnts = contents.replace(/%/g, '%%%%');

    if (contents == '') {
      PPx.Execute(`*setcust M_${title}:${value[0]}:${value[1]}=%%%%mByExchangeKeys %%%%K"@${value[1]}`);
    } else {
      const is = (contents.slice(0,1) == '@' || contents.match(/^[a-zA-Z]*$/)) ? '%%%%K"' : '';
      PPx.Execute(`%OC *setcust M_${title}:${value[0]}:${value[1]}=${is}${avoidCnts}`);
    }
  }
} else {
  const emptykeys = [];
  for (const value of getKeys) {
    const exe = PPx.Extract(`%%OC%OC %*getcust(M_${title}:${value[0]}:${value[1]})`);
    if (exe.indexOf('ByExchangeKeys') != -1) {
      PPx.execute(`*deletecust ${value[0]}:${value[1]}`);
    } else {
      (exe != '') ?
        PPx.Execute(`*setcust ${value[0]}:${value[1]},${exe}`):
        emptykeys.push(value);
    }
  }
  if (emptykeys != '') { PPx.SetPopLineMessage(`未登録キー: ${emptykeys.join(',')}`); }
  PPx.Execute(`*deletecust "M_${title}"`);
  PPx.Execute('%K"@LOADCUST');
}

