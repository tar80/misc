//!*script
// ���K�w�ׂ̗̃f�B���N�g���Ɉړ�
// �Q�ƌ�:http://hoehoetukasa.blogspot.com/2014/01/ppx_29.html
// �e�f�B���N�g���̎��Ԃ��Ȃ���ΏI��
if(PPx.DirectoryType != 1) PPx.Quit(1);

var fso = PPx.CreateObject('Scripting.FileSystemObject');
var fn = PPx.Extract('%FDN');
var currentDir = fso.GetFolder(fn);
// �e�f�B���N�g�������[�gor�T�u�f�B���N�g�����Ȃ���ΏI��
if(currentDir.IsRootFolder || currentDir.ParentFolder.SubFolders.count == 1){
  PPx.SetPopLineMessage('!"�T�u�f�B���N�g��������܂���');
  PPx.Quit(1);
}
// ���K�w�̃f�B���N�g���̃��X�g���擾
var e = new Enumerator(currentDir.ParentFolder.SubFolders);
var flds = new Array();
for(e.moveFirst(); !e.atEnd(); e.moveNext()){
  //�f�B���N�g���������l�����ă��X�g�ɒǉ�
  var en = fso.GetFolder(fso.BuildPath(currentDir.ParentFolder.Path, e.item().Name));
  if (en.Attributes <= 17) flds.push(e.item().Name);
}
// ���O���Ń\�[�g
flds.sort(function(a, b){return a.toLowerCase() > b.toLowerCase()? 1: -1;});
for(var item in flds){
  if(flds[item] == currentDir.Name)
    break;
}
// �O�̃f�B���N�g�����擾
var prevDir = flds[Math.max(item - 1, 0)];
// �ŏ��̃f�B���N�g��
if(flds[item - 2] == null) PPx.SetPopLineMessage('!">>top');
PPx.Execute('*jumppath "' + fso.BuildPath(fso.GetParentFolderName(fn), prevDir) + '"');
