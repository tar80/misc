//!*script
/* 同階層の隣合うディレクトリに移動 */
/* 同階層の隣合う同じ拡張子の仮想ディレクトリに移動 */
// PPx.Arguments() = [0]0:preview|1:next [1]tempfilepath
// 参照元:http://hoehoetukasa.blogspot.com/2014/01/ppx_29.html
'use strict';
const arg = (() => {
  try {
    return [PPx.Arguments(0), PPx.Arguments(1)];
  } catch (e) {
    PPx.Execute(`*linemessage !"${e}`);
    PPx.Quit(1);
  }
})();
let cd = {};

PPx.Extract('%FDVN').replace(/^(.*)\\((.*\.)?(?!$)(.*))/, (match, p1, p2, p3, p4) => {
  cd = {
    path: `${match}\\`,
    par:  p1,
    name: p2,
    ext:  `.${p4.toLowerCase()}`
  };
  return cd;
});

switch (PPx.DirectoryType) {
case 1:
  // 属性を考慮してリスト作成
  PPx.Execute(`*whereis -path:"${cd.par}%\\" -mask:"a:d+s-" -dir:on -subdir:off -listfile:${arg[1]} -name`);
  break;
case 4:
case 63:
case 64:
case 96:
  // 拡張子を考慮してリスト作成
  PPx.Execute(`*whereis -path:"${cd.par}%\\" -mask:${cd.ext} -subdir:off -listfile:${arg[1]} -name`);
  cd.path = cd.path.slice(0, -1);
  break;
default:
  PPx.SetPopLineMessage('!"Not supported.');
  PPx.Quit(1);
  break;
}

const fso = PPx.CreateObject('Scripting.FileSystemObject');

(arg[0] == 0)
  ? move_path(-1, 1, 'top')
  : move_path(1, -1, 'bottom');

/* パス移動を実行する関数 */
function move_path(valA, valB, termMessage) {
  // パスリストからパスを取得
  const pathList = [];
  const fsoTempfile = fso.OpenTextFile(arg[1], 1, false, -1);
  do {
    try {
      pathList.push(fsoTempfile.ReadLine());
    } catch (e) {
      PPx.Execute('*linemessage !"not found.');
      PPx.Quit(1);
    }
  } while (!fsoTempfile.AtEndOfStream);
  fsoTempfile.Close();

  if (pathList.length == 1) {
    PPx.Execute('*linemessage !"not found.');
  } else {
    // リストを名前順でソート
    pathList.sort((a, b) => (a.toLowerCase() < b.toLowerCase()) ? valA : valB);
    // 対象エントリ名を取得
    const i = pathList.indexOf(cd.path);
    const targetPath = pathList[Math.max(i - 1, 0)];
    // 端ならメッセージを表示
    // if (pathList[i - 2] === undefined) {
    //   PPx.SetPopLineMessage(`!"<${termMessage}>`);
    // }
    if (pathList[i - 1] !== undefined) {
      PPx.Execute(`*jumppath "${targetPath}"`);
    } else {
      // 端ならメッセージを表示
      PPx.SetPopLineMessage(`!"<${termMessage}>`);
    }
  }
}
