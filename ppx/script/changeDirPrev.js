//!*script
// ���K�w�ׂ̗̃f�B���N�g���Ɉړ�
// �Q�ƌ�:http://hoehoetukasa.blogspot.com/2014/01/ppx_29.html
// �e�t�H���_�̎��Ԃ��Ȃ���ΏI��
if(PPx.DirectoryType != 1) PPx.Quit(1);

var fso = PPx.CreateObject("Scripting.FileSystemObject");
var fn = PPx.Extract("%FDN");
var currentDir = fso.GetFolder(fn);

// �e�t�H���_�����[�gor�T�u�t�H���_���Ȃ���ΏI��
if(currentDir.IsRootFolder || currentDir.ParentFolder.SubFolders.count == 1){
  PPx.SetPopLineMessage("�T�u�t�H���_������܂���");
  PPx.Quit(1);
}
// ���K�w�̃t�H���_�̃��X�g���擾
e = new Enumerator(currentDir.ParentFolder.SubFolders);
flds = new Array();
for(e.moveFirst(); !e.atEnd(); e.moveNext()){
  //�t�H���_�������l�����ă��X�g�ɒǉ�
  fuga = fso.GetFolder(fso.BuildPath(currentDir.ParentFolder.Path, e.item().Name));
  if (fuga.Attributes <= 17) flds.push(e.item().Name);
}
// ���O���Ń\�[�g
flds.sort(function(a, b){return a.toLowerCase() > b.toLowerCase()?1:-1;});
for(i = 0; i < flds.length; i++){
  if(flds[i] == currentDir.Name)
    break;
}
// �O�̃t�H���_���擾
prevDir = flds[Math.max(i-1, 0)];
// �ŏ��̃t�H���_
if(flds[i-2] == null) PPx.SetPopLineMessage('|<');
PPx.Execute('*jumppath "' + fso.BuildPath(fso.GetParentFolderName(fn), prevDir) + '"');
