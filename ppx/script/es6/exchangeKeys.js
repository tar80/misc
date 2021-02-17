//!*script
/* キーバインドの一時保存と復元 */
//
// PPx.Arguments(0) = (1):キー保存 | (0):キー復元
// PPx.Arguments(1) = 保存用項目(M_xxx)のxxx部分
// PPx.Arguments(2) = KC_main等対象とする項目名。指定できる項目には制限を設けてあります。スクリプト内配列(types)参照
// PPx.Arguments(3) = 変更するキー。書式: "A,B,C,\D,^E,^\F" のように,か;で区切って"で括る
//
// 登録ex) exchangeKeys.js,1,test,KC_main,"A;\B;^C;F1,'!','\'"
// 解除ex) exchangeKeys.js,0,test,KC_main,"A;\B;^C;F1,'!','\'"
//
// _Userに、u_keys_${title}=${argKeys}が登録される
// ※LEFT = @LEFT のような'='を使う書式は、LEFT , %K"@LEFTに変換されます

'use strict';

const process = PPx.Arguments(0)|0;
const title   = PPx.Arguments(1);
const argType = PPx.Arguments(2);
const argKeys = PPx.Arguments(3).split(/,|;/);
const types = ['KC_main', 'KC_incs', 'K_edit', 'K_ppe', 'K_lied', 'K_tree', 'KB_edit', 'KV_main', 'KV_page', 'KV_crt', 'KV_img'];

const block = [];

types.forEach(t => { if (t == argType) block.push(t); });

if (block == '') {
  PPx.Echo('第3引数の値が不正です');
  PPx.Quit(-1);
}

if (process) {
  argKeys.forEach(value => {
    const contents = PPx.Extract(`%OC %*getcust(${block}:${value})`);
    const avoidCnts = contents.replace(/%/g, '%%%%');

    if (contents == '') {
      PPx.Execute(`*setcust M_${title}:${value}=%%%%mByExchangeKeys %%%%K"@${value}`);
    } else {
      const is = (contents.slice(0,1) == '@' || contents.match(/^[a-zA-Z]*$/)) ? '%%%%K"' : '';

      PPx.Execute(`%OC *setcust M_${title}:${value}=${is}${avoidCnts}`);
    }
  });
  PPx.Execute(`*setcust _User:u_keys_${title}=${argKeys}`);

} else {
  const emptykeys = [];

  argKeys.forEach(value => {
    const exe = PPx.Extract(`%%OC%OC %*getcust(M_${title}:${value})`);

    if (exe.indexOf('ByExchangeKeys') != -1) {
      PPx.execute(`*deletecust ${block}:${value}`);
    } else {
      (exe != '')
        ? PPx.Execute(`*setcust ${block}:${value},${exe}`)
        : emptykeys.push(value);
    }
  });

  if (emptykeys != '') { PPx.SetPopLineMessage(`未登録キー: ${emptykeys.join(',')}`); }

  PPx.Execute(`*deletecust "M_${title}"`);
  PPx.Execute(`*deletecust _User:u_keys_${title}`);
  PPx.Execute('%K"@LOADCUST');
}

