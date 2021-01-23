//!*script
/* input_dockを起動してgitモードを開始 */

'use strict';

(PPx.Extract('%NBA') != '')
  ? PPx.Execute('*shownormal %NBA %: *focus')
  : PPx.Execute('*CHECKBRANCH');

const dock = PPx.Extract('%Oi %*getcust(X_dock:CBA_T)');

if (!dock) { PPx.Execute('%Oi *dock add,t,input K_git'); }

PPx.Execute('%Oi *dock focus,t,K_git');
PPx.Execute('*wait 500,2');

// アプリケーションメニューからGIT用コマンドリストを選択
PPx.Execute('*dock sendkey,t,K_git,APPS 9');

// マーク状態を復元
// const resMark = (() => {
//   const filepath = PPx.Extract('%#;FC').split(';');
//   const filename = [];
//
//   filepath.forEach(value => {
//     filename.push(PPx.Extract(`%*name(C,${value})`));
//   });
//
//   return (PPx.EntryMarkCount)
//     ? `*markentry o:dex;${filename.join(';')}`
//     : '*unmarkentry';
// })();
//
// PPx.Execute('*jumppath /savelocate /refreshcache');
// PPx.Execute(resMark);

