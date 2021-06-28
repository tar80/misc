//!*script
/* 同階層の隣合うディレクトリに移動 */
/* 同階層の隣合う同じ拡張子の仮想ディレクトリに移動 */
//
// PPx.Arguments(0) = 0:preview|1:next
// PPx.Arguments(1) = tempfilepath
// 参照元:http://hoehoetukasa.blogspot.com/2014/01/ppx_29.html

'use strict';

if (PPx.Arguments.length !== 2) { throw new Error('引数が異常'); }

const arg = { 'action': PPx.Arguments(0)|0, 'filepath': PPx.Arguments(1) };
const msg = (m => {
  PPx.SetPopLineMessage(`!"${m}`);
  PPx.Quit(1);
});
const current = (() => {
  let res = {};
  PPx.Extract('%FDVN').replace(/^(.*)\\((.*\.)?(?!$)(.*))/, (match, p1, p2, p3, p4) => {
    res = {
      path: `${match}\\`,
      pwd:  p1,
      name: p2,
      ext:  `.${p4.toLowerCase()}`
    };
    return;
  });

  (res.pwd === undefined) && msg('<<Root>>');

  return res;
})();

switch (PPx.DirectoryType) {
  case 0:
    break;
  case 1:
  // 属性を考慮してリスト作成
    PPx.Execute(`*whereis -path:"${current.pwd}%\\" -mask:"a:d+s-" -dir:on -subdir:off -listfile:${arg.filepath} -name`);
    break;
  case 4:
  case 63:
  case 64:
  case 96:
  // 拡張子を考慮してリスト作成
    PPx.Execute(`*whereis -path:"${current.pwd}%\\" -mask:${current.ext} -subdir:off -listfile:${arg.filepath} -name`);
    current.path = current.path.slice(0, -1);
    break;
  default:
    msg('Not supported.');
    break;
}

(arg.action === 0)
  ? MovePath(-1, 1, 'Top')
  : MovePath(1, -1, 'Bottom');

// パス移動を実行する関数
function MovePath(valA, valB, termMessage) {
  const fso = PPx.CreateObject('Scripting.FileSystemObject');
  const fsoTempfile = fso.OpenTextFile(arg.filepath, 1, false, -1);

  fsoTempfile.AtEndOfLine && msg('Empty.');

  // パスリストからパスを取得
  const pathList = [];

  while (!fsoTempfile.AtEndOfStream) {
    pathList.push(fsoTempfile.ReadLine());
  }

  fsoTempfile.Close();

  if (pathList.length === 1) {
    msg('Not found.');
  } else {
    // リストを名前順でソート
    pathList.sort((a, b) => (a.toLowerCase() < b.toLowerCase()) ? valA : valB);

    // 対象エントリ名を取得
    const i = pathList.indexOf(current.path);
    const targetPath = pathList[Math.max(i - 1, 0)];

    // 端ならメッセージを表示
    if (pathList[i - 2] === undefined) {
      PPx.SetPopLineMessage(`!"<${termMessage}>`);
    }

    if (pathList[i - 1] !== undefined) {
      PPx.Execute(`*jumppath "${targetPath}"`);
    }
  }
}

