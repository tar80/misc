//!*script
/* 編集文字列の補完。コマンド使用時、"%が消費される問題の対策 */
//
// PPx.Arguments(0) = "i":%*input() | "s":%*selecttext()  | "e":%*edittext()
// 二文字目以降があればeditmodeに設定する。
// ※二文字目がREOSの場合、三文字目が必要になる。
// 例) "iOh" => *input(-mode:Oh)
//
// PPx.Arguments(1) = ここで記述した文字が補完される。
// 【",%,\】は二文字以上の偶数個で指定する。
// 【"】は記述した半分の数が戻る。【%,\】は記述したそのままの数が戻る。
// アルファベットと数字を引数にした場合、単純に数が倍になる。カンマは使えない。
// 例)引数,"abcABC122333""%%%%\\\\\\"と記述したとき、abcABC123"%\ -> aabbccAABBCC112222333333"%%%%\\\\\\
//
// PPx.Arguments(2) = "inputタイトル":引数なしなら"compCode.."が代入される
// PPx.arguments(3) = command: %*input()のオプション-k 以降に実行するコマンド

'use strict';

const len = PPx.Arguments.length;

if (len < 2) {
  PPx.Echo('引数が足りません');
  PPx.Quit(-1);
}

// 現在の編集モードを参照
const defType = (!PPx.Extract('%W').match('PP[BCV]\\['))
  ? (PPx.Extract('%*editprop(whistory)')) || 'g'
  : 'g';

const edit = {
  chr: PPx.Arguments(1),
  title: (len > 2) ? PPx.Arguments(2) : 'compCode..',
  precmd: (len > 3) ? PPx.Arguments(3) : '',
  zero: PPx.Arguments(0),
  type: function () { return this.zero.charAt(0); },
  mode: function () {
    const keys = 'gnmshdcfuxUXREOS';
    return (keys.indexOf(this.zero.charAt(1)) !== 0) ? this.zero.substr(1) : defType;
  }
};

switch (edit.type()) {
  case 'i':
    edit.code = `%*input("%*selecttext" -title:"${edit.title}" -mode:${edit.mode()} -k ${edit.precmd})`;
    break;
  case 's':
    edit.code = '%*selecttext';
    break;
  case 'e':
    edit.code = '%*edittext';
    break;
  default:
    PPx.Echo('引数が異常');
    PPx.Quit(-1);
}

const code = PPx.Extract(edit.code) || PPx.Quit(-1);

// String内のseqと同じ文字数をカウント。最大max回
String.prototype.counter = function (seq, max) {
  let i = this.split(seq).length - 1;
  return (i < max) ? i : max;
};
// 重複した文字をまとめて配列にする
const charArray = Array.from(new Set(edit.chr));
const countMax = 4;

// 同じ文字数のカウント
const charCount = ((cc = []) => {
  for (const value of charArray) {
    cc.push(edit['chr'].counter(value, countMax));
  }
  return cc;
})();

// 配列からオブジェクトを生成
const bsNum = [];
const esc = charArray.reduce((chr, value, index) => {
  chr[value] = value.repeat(Esc_excp(value, index));
  return chr;
}, {});
// 例外処理
function Esc_excp (ele, num) {
  if (ele !== '\\') {
    return charCount[num] * 2;
  } else {
    bsNum[0] = num;
    return charCount[num];
  }
}
if (bsNum !== -1) { charArray[bsNum] = '\\\\'; }

const regStr = `[${charArray.join('')}]`;
const rep = new RegExp(regStr, 'g');

PPx.Result = code.replace(rep, (c) => esc[c]);

