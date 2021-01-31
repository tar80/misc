﻿//!*script
/* リストファイルから取得した情報をコマンドに渡す */
//
// PPx.Arguments() = (0)実行するコマンドライン名, (1)1＝重複パスの実行
//
// コマンドラインは、 function Exe_edit()内に記述する
// 変数は、ファイルパス= ${path}, ショートネーム= ${shortname}, 行数= ${number}で指定。``で全体を括る

'use strict';

if (!PPx.Arguments.length) {
  PPx.Echo('引数が足りません');
  PPx.Quit(-1);
}

const arg = [PPx.Arguments(0), (PPx.Arguments.length != 2) ? 0 : PPx.Arguments(1)|0];
const rep = [];

function Exe_edit (path, shortname, number, duplicate) {
  switch(arg[0]) {
  case 'gvim':
    // ヘッダ情報から検索語を取得
    rep[0] = ((m) => {
      const regexp = /result\s=>\s(.*)/;
      m = ObjEntry(0).Comment.replace(/\\\(/g, '(');
      m = m.match(regexp) || '';
      return m[1];
    })();

    PPx.Execute(`%Oi gvim --remote-tab-silent +"${number}-1 /${rep[0]}/" "${path}"`);
    PPx.Execute('*wait 100,1');
    break;
  case 'ppv':
    PPx.Execute(`%Oi *ppv -bootid:C ${path}`);
    PPx.Execute('*wait 100,1');
    break;
  case 'sed':
    if (typeof rep[0] == 'undefined') {
      rep[0] = PPx.Extract('"s#%*script(%\'scr\'%\\compCode.js,"is","""%%","[検索文字#置換文字] ※\\=\\\\\\\\")#g"');
    }

    if (!duplicate) { PPx.Execute(`%Oi copy ${path} ${path}_back`); }

    PPx.Execute(`%Oi sed -i -r ${number}${rep[0]} ${path}`);
    break;
  default:
    break;
  }
}

const fso = PPx.CreateObject('Scripting.FileSystemObject');

const markEntry = PPx.Extract('%#;FDC').split(';');
const markCount = PPx.EntryMarkCount;
// マークの有無でループの初期値を設定
const n = (markCount != 0) ? 1 : 0;

let exist = {};
let entryPath, entrySN, entryNum, entryDup;
const ObjEntry = PPx.Entry;

PPx.Entry.Index = ObjEntry.FirstMark;

for (let i = n; i <= markCount; i++) {
  // 空白行の判定
  if (fso.FileExists(ObjEntry.Name)) {
    // フルパスの取得
    entryPath = markEntry[i - n];

    // ShortNameの取得
    entrySN = ObjEntry.ShortName;

    // ShortNameを数値と見なして取得
    entryNum = (entrySN.match(/^[0-9]*/) != null) ? entrySN|0 : 1;

    // 重複エントリの判別
    entryDup = ((isDup) => {
      isDup = (exist[entryPath]) ? true : false;
      exist[entryPath] = true;
      return isDup;
    })();

    // 同一パスを判別してコマンドに渡す
    if (arg[1] == 1 || !entryDup) {
      Exe_edit(entryPath, entrySN, entryNum, entryDup);
    }
  }
  ObjEntry.NextMark;
}
