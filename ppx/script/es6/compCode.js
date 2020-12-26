//!*script
'use strict';
/* 編集文字列の補完。コマンド使用時、"%が消費される問題の対策 */
// PPx.Arguments(0) = "i":%*input(), "s":%*selecttext() ,"e":%*edittext()
// PPx.Arguments(1) = """", "%%", "\\"  ex)全部の場合 """%%\\" ※ダブルクオーテーションは最初に指定する
// PPx.Arguments(2) = "inputタイトル":引数なしなら"compCode.."が代入される

const arg = (() => {
  try {
    return [PPx.Arguments(0), PPx.Arguments(1), PPx.Arguments(2)];
  } catch (e) {
    if (PPx.Arguments.length == 2) {
      return [PPx.Arguments(0), PPx.Arguments(1), 'compCode..'];
    } else {
      PPx.Echo(e);
      PPx.Quit(-1);
    }
  }
})();

switch(arg[0]) {
case 'i':
  arg[0] = `%*input("%*selecttext" -title:${arg[2]} -mode:e -k *editmode h)`;
  break;
case 's':
  arg[0] = '%*selecttext';
  break;
case 'e':
  arg[0] = '%*edittext';
  break;
}

const str = `[${arg[1]}]`;
const rep = new RegExp(str, 'g');
const esc = {
  '"': '""',
  '%': '%%',
  '\\': '\\\\'
};
PPx.Result = PPx.Extract(`${arg[0]}`).replace(rep, (c) => esc[c]);
