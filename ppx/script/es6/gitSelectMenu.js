//!*script
/* gitレポジトリを判別してメニューを開く */

'use strict';

const canSkip = PPx.Extract('%si"check_repo"');
const popMenu = {
  'isRepo': () => PPx.Execute('%M_Cgit,G'),
  'notRepo': () => PPx.Execute('%M_CgitN,G')
};

if (canSkip) {
  popMenu[canSkip]();
  PPx.Quit(1);
}

// ディレクトリ移動時にスキップフラグを折る
PPx.Execute(`%OC *linecust gitmenu,KC_main:LOADEVENT,*string i,check_repo= %%: *linecust gitmenu,KC_main:LOADEVENT,
            %K"@LOADCUST"`);

const fso = PPx.CreateObject('Scripting.FileSystemObject');
let objWD = fso.GetFolder(PPx.Extract('%FD'));

// レポジトリのルートを取得
do {
  const isGitRoot = fso.BuildPath((objWD), '.git');
  if (fso.FolderExists(isGitRoot)) {
    PPx.Execute('*string i,check_repo=isRepo');
    popMenu['isRepo']();
    break;
  }

  objWD = objWD.ParentFolder;

  if (objWD.IsRootFolder) {
    PPx.Execute('*string i,check_repo=notRepo');
    popMenu['notRepo']();
  }
} while (!objWD.IsRootFolder);

