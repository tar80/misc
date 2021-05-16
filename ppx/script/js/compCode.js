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

var argLength = PPx.Arguments.length;

if (argLength < 2) {
  PPx.Echo('引数が足りません');
  PPx.Quit(-1);
}

// 現在の編集モードを参照
var currentEditmode = (function () {
  var historyType = 'g';
  var reg = new RegExp('PP[BCV]\\[');
  if (!reg.test(PPx.Extract('%W'))) {
    historyType = PPx.Extract('%*editprop(whistory)') || historyType;
  }
  return historyType;
})();

var edit = {
  chr: PPx.Arguments(1),
  title: (argLength > 2) ? (PPx.Arguments(2) || 'compCode..') : 'compCode..',
  precmd: (argLength > 3) ? PPx.Arguments(3) : '',
  zero: PPx.Arguments(0),
  type: function () { return this.zero.charAt(0); },
  mode: function () {
    var keys = 'gnmshdcfuxUXREOS';
    return (keys.indexOf(this.zero.charAt(1)) !== 0) ? this.zero.substr(1) : currentEditmode;
  }
};

var code = PPx.Extract(function () {
  try {
    return {
      'i': function () { return '%*input("%*selecttext" -title:"' + edit.title + '" -mode:' + edit.mode() + ' -k ' + edit.precmd + ')'; },
      's': function () { return '%*selecttext'; },
      'e': function () { return '%*edittext'; }
    }[edit.type()]();
  } catch (e) {
    PPx.Echo('引数が異常');
    PPx.Quit(-1);
  }
})() || PPx.Quit(-1);

// String内のseqと同じ文字数をカウント。最大max回
String.prototype.counter = function (seq, max) {
  var i = this.split(seq).length - 1;
  return (i < max) ? i : max;
};

// Stringを引数回リピート
String.prototype.repeat = function (count) { return Array(count * 1 + 1).join(this); };

// 重複した文字をまとめて配列にする
var charArray = (function (array) {
  var exist = {};
  var result = [];

  for (var i = 0, l = array.length; i < l; i++) {
    var tmp = array[i];

    if (!exist[tmp]) {
      exist[tmp] = true;
      result.push(tmp);
    }
  }
  return result;
}(edit['chr'].split('')));

// 同じ文字数のカウント
var countMax = 4;
var charCount = (function () {
  var count = [];
  for (var i = 0, l = charArray.length; i < l; i++) {
    count.push(edit['chr'].counter(charArray[i], countMax));
  }
  return count;
})();

// 配列からオブジェクトを生成
var bsNum = [];
var esc = (function () {
  var chr = [];
  for (var i = 0, l = charArray.length; i < l; i++) {
    chr[charArray[i]] = charArray[i].repeat(function (ele, num) {
      // 例外処理
      if (ele !== '\\') {
        return charCount[num] * 2;
      } else {
        bsNum[0] = num;
        return charCount[num];
      }
    }(charArray[i], i));
  }
  return chr;
})();

if (bsNum !== -1) { charArray[bsNum] = '\\\\'; }

var regStr = '[' + charArray.join('') + ']';
var rep = new RegExp(regStr, 'g');

PPx.Result = code.replace(rep, function (c) { return esc[c]; });

