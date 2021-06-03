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
const cmd = {
  ':DIR': function () {
    const obj = (arg === 0)
      ? { act: 'copy', opt: '-renamedest:on' }
      : { act: '!copy', opt: '-min' };
    this.act = obj.act;
    this.opt = obj.opt;
    this.dest = opPath;
    this.post = '-compcmd *ppc -r -noactive';
    return this;
  },
  ':XLF': function () {
    const obj = (arg === 0)
      ? { act: 'copy', opt: '-renamedest:on' }
      : { act: '!copy', opt: '-min' };
    this.act = obj.act;
    this.opt = obj.opt;
    this.dest = opPath;
    this.post = '';
    return this;
  },
  'no': function () {
    this.act = 'copy';
    this.opt = '';
    this.dest = '%\'work\'%\\';
    this.post = `-compcmd *ppc -pane:~ %%hd0 -k *jumppath -entry:${fileNames[0]}`;
    return this;
  }
};

try {
  cmd[opParentExt]();
} catch (e) {
  PPx.Echo('非対象ディレクトリ');
  PPx.Quit(1);
}
// const cmd = (obj => {
//   switch (opParentExt) {
//     case ':DIR':
//       obj = (arg === 0)
//         ? { act: 'copy', opt: '-renamedest:on' }
//         : { act: '!copy', opt: '-min' };
//       obj.dest = opPath;
//       obj.post = '-compcmd *ppc -r -noactive';
//       return obj;
//     case ':XLF':
//       obj = (arg === 0)
//         ? { act: 'copy', opt: '-renamedest:on' }
//         : { act: '!copy', opt: '-min' };
//       obj.dest = opPath;
//       obj.post = '';
//       return obj;
//     case 'no':
//       obj.act = 'copy';
//       obj.opt = '';
//       obj.dest = '%\'work\'%\\';
//       obj.post = `-compcmd *ppc -pane:~ %%hd0 -k *jumppath -entry:${fileNames[0]}`;
//       return obj;
//     default:
//       PPx.Echo('非対象ディレクトリ');
//       PPx.Quit(1);
//   }
// })();

// シンボリックリンク
if (arg >= 2) {
  cmd.dest = PPx.Extract(`%*input("${cmd.dest}" -title:"リンク先" -mode:d)%\\`) || PPx.Quit(1);
  ((value, isDir) => {
    for (let i = 0; i < fileCount; i++) {
      // 対象がディレクトリなら/Dオプション付加
      isDir = (PPx.GetFileInformation(filePaths[i]) === ':DIR') ? '/D ' : '';
      value.push(`"${isDir}${cmd.dest}${fileNames[i]} ${filePaths[i]}"`);
    }
    // パスに空白を含むと失敗する
    return PPx.Execute(`%On *ppb -runas -c FOR %%%%i IN (${value.join(',')}) DO mklink %%%%~i`);
  })([], '');
  // 書庫なら解凍
} else if (PPx.DirectoryType >= 62) {
  PPx.Execute(`%u7-zip64.dll,e -aou -hide "%1" -o%"解凍先  ※重複>リネーム,DIR>展開"%{${cmd.dest}%} %@`);
} else {
  PPx.Execute(`%Oi *ppcfile ${cmd.act}, ${cmd.dest}, ${cmd.opt} -qstart -nocount -preventsleep -same:0 -sameall -undolog ${cmd.post}`);
}

