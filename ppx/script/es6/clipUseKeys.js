//!*script
/* ppxキーバインド設定ファイルから使用キーを抽出 */
//
// 抽出したい設定ファイルにカーソルを合わせてスクリプトを実行すると
// 抽出したキーがクリップボードに入ります
// clipコマンドが利用できる環境が必要になります
// ※clipがない場合は*replaceなどを使えば対応できると思います
// おまけ的に作った簡易なものなのでコメントなど複雑な記述があると読めません
// 対応する書式は以下のようになります。スペースを含まないと取得できません
// ○key , cmd
// ○key = cmd
// ×key,cmd

'use strict';

const tPath = PPx.Extract('%1%\\%R');

const st = PPx.CreateObject('ADODB.stream');
st.Type = 2;
st.Charset = 'UTF-8';
st.Open();
st.LoadFromFile(tPath);

const objCnts = st.ReadText(-1).split('\u000A');

st.Close;

// キーバインドの項目名を削る
// Object.values(objCnts).filter((value, index) => {
//   if (value.match(/^\w*_\w*\s*=\s*{.*/)) { delete objCnts[index]; }
// });

const getKeys = [];

Object.values(objCnts).forEach((value) => {
  if (!value.search(/^[^\s]*\s*[=,].*/)) {
    getKeys.push(value.replace(/^([^\s]*)\s.*/, '$1'));
  }
});

function comp(str) {
  const regStr = `[${str}]`;
  const rep = new RegExp(regStr, 'g');
  const esc = { '^': '^^^^', '\\': '\\\\', '\'': '\\\'' };
  return getKeys.join(',').replace(rep, (c) => esc[c]);
}

PPx.Execute(`%Obn echo ${comp('\\^')}  ${comp('\\\\^\'')} | clip`);

