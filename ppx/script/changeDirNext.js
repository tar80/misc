//!*script
// ���K�w�ׂ̗̃f�B���N�g���Ɉړ�
// �Q�ƌ�:http://hoehoetukasa.blogspot.com/2014/01/ppx_29.html
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
for(var i = 0, l = flds.length; i < l; i++){
  if(flds[i] == currentDir.Name)
    break;
}
// ���̃f�B���N�g�����擾
var nextDir = flds[Math.min(i + 1, l - 1)];
// �ŏI�f�B���N�g��
if(flds[i + 2] == undefined) PPx.SetPopLineMessage('!">>end');
PPx.Execute('*jumppath "' + fso.BuildPath(fso.GetParentFolderName(fn), nextDir) + '"');

/*
  for(var item in flds){
  if(flds[item] == currentDir.Name)
    break;
}
var nextDir = flds[Math.min(item + 1,flds.length)];
if(flds[item + 2] == undefined) PPx.SetPopLineMessage('!">>end');
PPx.Execute('*jumppath "' + fso.BuildPath(fso.GetParentFolderName(fn), nextDir) + '"');
// �����ƁAitem + 1 �����܂������Ȃ����R���킩��܂���
  */