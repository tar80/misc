//!*script
/* 引数で指定された情報を返す */
//
// PPx.Arguments(0) = filetype | exists | getpath | myrepo | shapecode | LDC | lfnames
// PPx.Arguments(1) = パスを指定したい場合など必要に応じて指定

'use strict';

const argVar = PPx.Arguments(0);
const set = {};

// ファイルタイプ判別
set['filetype'] = () => {
  const getExt = PPx.GetFileInformation(PPx.Extract('%R')).slice(1);
  return (getExt === '') ? '---' : getExt;
};

// 存在確認 要第2引数
// o: %FDC, x: %#FDC
set['exists'] = () => {
  const argPath = (PPx.Arguments.length < 2) ? 0 : PPx.Arguments(1);
  const fso = PPx.CreateObject('Scripting.FileSystemObject');
  return fso.FileExists(argPath) + fso.FolderExists(argPath);
};

// 反対窓の有無でパスを変える
set['getpath'] = () => {
  const targetPath = (PPx.Pane.Count === 2) ? '%2%\\' : '%\'work\'%\\';
  return PPx.Extract(targetPath);
};

// メインレポジトリ
set['myrepo'] = () => {
  return PPx.Extract('%1').indexOf(PPx.Extract('%\'myrepo\''));
};

// 改行を含むPPxコマンドマクロを整形
set['shapecode'] = () => {
  return PPx.Extract('%OC %*edittext').split('\u000D\u000A').join('\u000D\u000A ');
};

// リンクならリンク先を、実体があればそのままのパスを返す
// ※返すパスはスペース区切りの複数のパス
set['LDC'] = () => {
  const arrEntries = PPx.Extract('%#;FDC').split(';');
  const arrLdc = [];
  for (const entry of arrEntries) {
    arrLdc.push((() => { return PPx.Extract(`%*linkedpath(${entry})`) || entry; })());
  }
  return arrLdc.join(' ');
};

// listfileのエントリ名をそのまま返す
// ※返すパスはスペース区切りの複数のパス
set['lfnames'] = () => {
  let flag = 0;
  if (PPx.EntryMarkCount === 0) {
    PPx.Entry.Mark = 1;
    flag = 1;
  }
  const objEntry = PPx.Entry;
  let fn = '';
  objEntry.FirstMark;
  for (let [i, l] = [0, PPx.EntryMarkCount]; i < l; i++) {
    fn += objEntry.Name + ' ';
    objEntry.NextMark;
  }
  if (flag === 1) { PPx.Entry.Mark = 0; }
  return fn;
};

try {
  PPx.Result = set[argVar]();
} catch (e) {
  PPx.Result = PPx.Extract(`%*js(PPx.Result = PPx.${argVar};)`) || 'no match';
}

