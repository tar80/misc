//!*script
/* 状況に応じたファイルコピーの設定 */
//
// PPx.Arguments(0) = 0:detail | 1:quick | >=2:link
// %'work'=workspace
// -comcmdはフォーカス制御

'use strict';

const arg = (PPx.Arguments.length) ? PPx.Arguments(0)|0 : 0;
const filePaths = PPx.Extract('%#;FDCN').split(';');
const fileNames = PPx.Extract('%#;FCN').split(';');
const fileCount = fileNames.length;
const opPath = PPx.Extract('%2');
const opParentExt = PPx.GetFileInformation(opPath) || 'no';
// 送り先振り分け
const cmd = (obj => {
  switch (opParentExt) {
    // 反対窓あり
    case ':DIR':
      obj = (arg === 0)
        ? { act: 'copy', opt: '-renamedest:on' }
        : { act: '!copy', opt: '-min' };
      obj.dest = opPath;
      obj.post = '-compcmd *ppc -r -noactive';
      return obj;
    // リストファイル
    case ':XLF':
      obj = (arg === 0)
        ? { act: 'copy', opt: '-renamedest:on' }
        : { act: '!copy', opt: '-min' };
      obj.dest = opPath;
      obj.post = '';
      return obj;
    // 反対窓なし
    case 'no':
      obj.act = 'copy';
      obj.opt = '';
      obj.dest = '%\'work\'%\\';
      obj.post = `-compcmd *ppc -pane:~ %%hd0 -k *jumppath -entry:${fileNames[0]}`;
      return obj;
    default:
      PPx.Echo('送り先が非対象ディレクトリ');
      PPx.Quit(1);
  }
})();

if (arg >= 2) {
  // シンボリックリンク
  cmd.dest = PPx.Extract(`%*input("${cmd.dest}" -title:"リンク先" -mode:d)%\\`) || PPx.Quit(1);
  ((value, isDir) => {
    for (let [i, l] = [0, fileCount]; i < l; i++) {
      // 対象がディレクトリなら/Dオプション付加
      isDir = (PPx.GetFileInformation(filePaths[i]) === ':DIR') ? '/D ' : '';
      value.push(`"${isDir}${cmd.dest}${fileNames[i]} ${filePaths[i]}"`);
    }
    // パスに空白を含むと失敗する
    return PPx.Execute(`%On *ppb -runas -c FOR %%%%i IN (${value.join(',')}) DO mklink %%%%~i`);
  })([], '');
} else if (PPx.DirectoryType >= 62) {
  // 書庫なら解凍
  PPx.Execute(`%u7-zip64.dll,e -aou -hide "%1" -o%"解凍先  ※重複>リネーム,DIR>展開"%{${cmd.dest}%} %@`);
} else {
  PPx.Execute(`%Oi *ppcfile ${cmd.act}, ${cmd.dest}, ${cmd.opt} -qstart -nocount -preventsleep -same:0 -sameall -undolog ${cmd.post}`);
}

