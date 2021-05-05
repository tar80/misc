//!*script
/* GitRepositoryのルートパスをリスト化 */

'use strict';

// パスを記述 区切り[;]
const repository_path = 'C:\\bin\\HOME;C:\\bin\\repository;C:\\bin\\Scoop';
const listfile_name = 'GITREPOSITORIES.TXT';
const listfile_path = PPx.Extract(`%'list'%\\${listfile_name}`);

PPx.Execute(`*whereis -mask:a:dh,".git" -path:"${repository_path}" -dir -name -listfile:"${listfile_path}" %&`);

const fso = PPx.CreateObject('Scripting.FileSystemObject');
let fsoTlist = fso.OpenTextFile(listfile_path, 1, false, -1);
const result = [];

do {
  result.push(fsoTlist.ReadLine().replace(/(.*)\\\.git\\/, '$1'));
} while (!fsoTlist.AtEndOfStream);

fsoTlist = fso.OpenTextFile(listfile_path, 2, true, -1);
fsoTlist.Write(result.join('\u000D\u000A'));
fsoTlist.Close();

PPx.Execute(`*execute C,*linemessage Update  ${listfile_name}`);

