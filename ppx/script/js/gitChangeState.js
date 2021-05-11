//!*script
/* マークしたファイルの背景色を操作 */
//
// PPx.Arguments(0) = 0:unstage |1:stage |2:untrack |3:partofstage
// PPx.Arguments(1) = 0:メッセージ |1:削除 |2:通常 |3:不明 |4:更新 |5:追加
// ↑これらの番号はマークの色が上書きされるので注意

if (PPx.Arguments.length < 2) {
  PPx.Echo('引数が足りません');
  PPx.Quit(1);
}

var argState = (function (m) {
  m = {
    '3': 'MM',
    '2': '??',
    '1': '@ ',
    '0': ' @'
  };
  return { 'mark': m[PPx.Arguments(0)], 'number': PPx.Arguments(1)|0 };
})();

var pos = PPx.EntryIndex;

PPx.EntryFirstMark;

do {
  if (~argState.mark.indexOf('@')) {
    var chr = PPx.Entry.Comment.replace(' ','');
    PPx.EntryComment = (chr === '??') ? 'A ' : argState.mark.replace('@', chr);
  } else {
    argState.mark;
  }
  PPx.EntryState = argState.number;
  PPx.EntryMark = 0;
} while (PPx.EntryFirstMark !== 0);

PPx.EntryIndex = pos;
