//!*script
// ���K�w�ׂ̗̃f�B���N�g���Ɉړ�
// �Q�ƌ�:http://hoehoetukasa.blogspot.com/2014/01/ppx_29.html
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
for(i = 0; i < flds.length; i++){
  if(flds[i] == currentDir.Name)
    break;
}
// ���̃t�H���_���擾
nextDir = flds[Math.min(i+1, flds.length-1)];
// �ŏI�t�H���_
if(flds[i+2] == undefined) PPx.SetPopLineMessage('>|');
PPx.Execute('*jumppath "' + fso.BuildPath(fso.GetParentFolderName(fn), nextDir) + '"');
