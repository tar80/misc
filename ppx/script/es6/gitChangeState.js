﻿//!*script
/* マークしたファイルの背景色を操作 */
//
// PPx.Arguments() = (0)1:stage|0:unstage, (1)number
// number = 0:メッセージ, 1:削除, 2:通常, 3:不明, 4:更新, 5:追加
// ↑これらの番号はマークの色が上書きされるので注意

'use strict';

const argState = ((arg = []) => {
  if (PPx.Arguments.length == 2) {
    arg[0] = (PPx.Arguments(0) == '2') ? '??' : (PPx.Arguments(0) == '1' ? 'M ' : ' M');
    arg[1] = PPx.Arguments(1)|0;
  } else {
    PPx.Quit(1);
  }
  return [arg[0], arg[1]];
})();
const pos = PPx.EntryIndex;

PPx.EntryFirstMark;
do {
  PPx.EntryComment = argState[0];
  PPx.EntryState = argState[1];
  PPx.EntryMark = 0;
}while( PPx.EntryFirstMark != 0 );

PPx.EntryIndex = pos;
