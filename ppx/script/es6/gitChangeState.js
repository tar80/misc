//!*script
/* マークしたファイルの背景色を操作 */
//
// PPx.Arguments() = (0):number
// number = 0:メッセージ, 1:削除, 2:通常, 3:不明, 4:更新, 5:追加
// ↑これらの番号はマークの色が上書きされるので注意

'use strict';

const argState = (PPx.Arguments.length) ? PPx.Arguments(0)|0 : PPx.Quit(1);
const pos = PPx.EntryIndex;

PPx.EntryFirstMark;
do {
  PPx.EntryState = argState;
  PPx.EntryMark = 0;
}while( PPx.EntryFirstMark != 0 );

PPx.EntryIndex = pos;
