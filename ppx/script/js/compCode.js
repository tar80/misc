//!*script
/* 編集文字列の補完。コマンド使用時、"%が消費される問題の対策 */
//
// PPx.Arguments(0) = "i":%*input(), "s":%*selecttext() ,"e":%*edittext()
// 二文字目以降があればeditmodeに設定する。例) "iOh" => *input(-mode:Oh)
//
// PPx.Arguments(1) = ここで記述した文字が補完される。
// 【",%,\】は二文字以上の偶数個で指定する。
// 【"】は記述した半分の数が戻る。【%,\】は記述したそのままの数が戻る。
// アルファベットと数字を引数にした場合、単純に数が倍になる。カンマは使えない。
// 例)引数,"abcABC122333""%%%%\\\\\\"と記述したとき、abcABC123"%\ -> aabbccAABBCC112222333333"%%%%\\\\\\
//
// PPx.Arguments(2) = "inputタイトル":引数なしなら"compCode.."が代入される

var len = PPx.Arguments.length;

if (!len || len < 2) {
  PPx.Echo('引数が足りません');
    PPx.Quit(-1);
}

var arg = [PPx.Arguments(0), PPx.Arguments(1)];
var keys = 'gnmshdcfuxUXREOS';

var edit = {
  type: arg[0].charAt(0),
  title: (len > 2) ? PPx.Arguments(2) : 'compCode..',
  mode: function (key) {
    return (keys.indexOf(arg[0].charAt(1)) != 0)
    ? arg[0].substr(1)
    : 'e';
  }
};

switch(edit.type) {
case 'i':
  edit.code = '%*input("%*selecttext" -title:"' + edit.title + '" -mode:' + edit.mode() + ')';
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

// String内のseqと同じ文字数をカウント。最大max回
String.prototype.counter = function (seq, max) {
  var i = this.split(seq).length - 1;
  return (i < max) ? i : max;
};

// Stringを引数回リピート
String.prototype.repeat = function (count) { return Array (count * 1 + 1).join(this); };

var charArray = removeDupChar(arg[1].split(''));
var charCount = [];

// 同じ文字数のカウント
for (var i = 0, l = charArray.length; i < l; i++) {
  charCount.push(arg[1].counter(charArray[i], 4));
}

var bsNum = [];

// 配列からオブジェクトを生成
var esc = {};

esc = function Make_obj () {
  for (var i = 0, l = charArray.length; i < l; i++) {
    esc[charArray[i]] = charArray[i].repeat(Esc_excp(charArray[i], i));
  }
  return esc;
}();

// 例外処理
function Esc_excp (ele, num) {
  if (ele != '\\') {
   return charCount[num] * 2;
  } else {
    bsNum[0] = num;
  return charCount[num];
  }
}

if (bsNum != -1) { charArray[bsNum] = '\\\\'; }

var regStr = '[' + charArray.join('') + ']';
var rep = new RegExp(regStr, 'g');

PPx.Result = PPx.Extract(edit.code).replace(rep, function (c) { return esc[c]; });

/* 重複した文字をまとめて配列にする関数 */
function removeDupChar (array) {
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
};

