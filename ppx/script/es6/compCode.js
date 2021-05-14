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

const argLength = PPx.Arguments.length;

if (argLength < 2) {
  PPx.Echo('引数が足りません');
  PPx.Quit(-1);
}

// 現在の編集モードを参照
const currentEditmode = (() => {
  let historyType = 'g';
  const reg = new RegExp('PP[BCV]\\[');
  if (!reg.test(PPx.Extract('%W'))) {
    historyType = PPx.Extract('%*editprop(whistory)') || historyType;
  }
  return historyType;
})();

const edit = {
  chr: PPx.Arguments(1),
  title: (argLength > 2) ? (PPx.Arguments(2) || 'compCode..') : 'compCode..',
  precmd: (argLength > 3) ? PPx.Arguments(3) : '',
  zero: PPx.Arguments(0),
  type: function () { return this.zero.charAt(0); },
  mode: function () {
    const keys = 'gnmshdcfuxUXREOS';
    return (keys.indexOf(this.zero.charAt(1)) !== 0) ? this.zero.substr(1) : currentEditmode;
  }
};

edit.code = {
  'i': () => `%*input("%*selecttext" -title:"${edit.title}" -mode:${edit.mode()} -k ${edit.precmd})`,
  's': () => '%*selecttext',
  'e': () => '%*selecttext'
}[edit.type()]();

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
const charCount = (() => {
  let count = [];
  for (const value of charArray) {
    count.push(edit['chr'].counter(value, countMax));
  }
  return count;
})();

// 配列からオブジェクトを生成
const bsNum = [];
// const esc = charArray.reduce((chr, value, index) => {
//   // 例外処理
//   const escExcpt = ((ele, num) => {
//     if (ele !== '\\') {
//       return charCount[num] * 2;
//     } else {
//       bsNum[0] = num;
//       return charCount[num];
//     }
//   });
//   chr[value] = value.repeat(escExcpt(value, index));
//   return chr;
// }, {});
const esc = charArray.reduce((chr, value, index) => {
  chr[value] = value.repeat(function (ele, num) {
    // 例外処理
    if (ele !== '\\') {
      return charCount[num] * 2;
    } else {
      bsNum[0] = num;
      return charCount[num];
    }
  }(value, index));
  return chr;
}, {});

if (bsNum !== -1) { charArray[bsNum] = '\\\\'; }

const regStr = `[${charArray.join('')}]`;
const rep = new RegExp(regStr, 'g');

PPx.Result = code.replace(rep, (c) => esc[c]);

