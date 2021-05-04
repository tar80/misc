//!*script
/* 引数で指定された情報を返す */
//
// PPx.Arguments(0) = filetype | exists | getpath | myrepo | shapecode | LDC | lfnames
// PPx.Arguments(1) = パスを指定したい場合など必要に応じて指定

'use strict';

const arg = PPx.Arguments(0);

PPx.Result = (() => {
  switch (arg) {
    case 'filetype':
    // ファイルタイプ判別
    {
      const getExt = PPx.GetFileInformation(PPx.Extract('%R')).slice(1);
      return (getExt == '') ? '---' : getExt;
    }
    case 'exists':
    // 存在確認 要第2引数
    {
      if (PPx.Arguments.length < 2) {
        PPx.Echo('引数を指定してください\u000A○  単一のパス(%FDCなど)\u000A×   複数のパス(%#FDCなど)');
        PPx.Quit(-1);
      }
      const fso = PPx.CreateObject('Scripting.FileSystemObject');
      const fdc = PPx.Arguments(1);
      return fso.FileExists(fdc)|0 + fso.FolderExists(fdc)|0;
    }
    case 'getpath':
    // 反対窓の有無でパスを変える
    {
      const tPath = (PPx.Pane.Count == 2) ? '%2%\\' : '%\'work\'%\\';
      return PPx.Extract(tPath);
    }
    case 'myrepo':
    // メインレポジトリ
      return PPx.Extract('%1').indexOf(PPx.Extract('%\'myrepo\''));
    case 'shapecode':
    // 改行を含むPPxコマンドマクロを整形
      return PPx.Extract('%OC %*edittext').split('\u000D\u000A').join('\u000D\u000A ');
    case 'LDC':
    // リンクならリンク先を、実体があればそのままのパスを返す
    // ※返すパスはスペース区切りの複数のパス
    {
      const fdc = PPx.Extract('%#;FDC').split(';');
      const ldc = [];
      for (const entry of fdc) {
        ldc.push((() => { return PPx.Extract(`%*linkedpath(${entry})`) || entry; })());
      }
      return ldc.join(' ');
    }
    case 'lfnames':
    // listfileのエントリ名をそのまま返す
    // ※返すパスはスペース区切りの複数のパス
    {
      if (PPx.EntryMarkCount === 0) { PPx.Entry.Mark = 1; }
      const objEntry = PPx.Entry;
      let fn = '';
      objEntry.FirstMark;
      for (let i = 0,l = PPx.EntryMarkCount; i < l; i++) {
        fn += objEntry.Name + ' ';
        objEntry.NextMark;
      }
      return fn;
    }
    default:
      return PPx.Extract(`%*js(PPx.Result = PPx.${arg};)`);
  }
})();
