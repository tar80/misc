//!*script
'use strict';
/* 編集中テキストの補完。関数コマンド(%*)使用時、",%が消費される問題の対策 */
// PPx.Arguments(0) = "i":%*input(), "s":%*selecttext() ,"e":%*edittext()
// PPx.Arguments(1) = """", "%%", "\\"  ex)全部の場合 """%%\\" ※ダブルクオーテーションは最初に指定すること
const arg = (() => {
  try {
    return [PPx.Arguments(0), PPx.Arguments(1)];
  } catch (e) {
    PPx.Echo(e);
    PPx.Quit(-1);
  }
})();

switch(arg[0]) {
case 'i':
  arg[0] = '%*input()';
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
// PPx.Echo(PPx.Extract('%*edittext()').replace(rep, (c) => esc[c]));
PPx.Result = PPx.Extract(`${arg[0]}`).replace(rep, (c) => esc[c]);
