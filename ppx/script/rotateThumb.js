//!*script
// ���X�g�\���؂�ւ�
if(PPx.Extract('%n') == 'CX'){
  if(PPx.DirectoryType >= 62){
    PPx.Execute('*RotateExecute ViewStyleC,*viewstyle "����:��(&M)",*viewstyle "����:��(&M)"');
  } else{
    PPx.Execute('*RotateExecute ViewStyleB,*viewstyle "�摜:��(&P)",*viewstyle "�摜:��(&P)",*viewstyle "�摜:��(&P)"');
    PPx.Quit(1);
  }
}
switch(PPx.Extract(PPx.DirectoryType)){
case '4':
  PPx.Execute('*RotateExecute ViewStyleA,*viewstyle -temp ���X�g:���O(&L),*viewstyle -temp ���X�g:�s�\��(&L)');
  break;
default:
  PPx.Execute('*RotateExecute ViewStyleA,*viewstyle -temp ����(&T) %%:*sortentry &T:�t��,*viewstyle -temp �T���l�C��:��(&T) %%:*sortentry &D:�W��,*viewstyle -temp �T���l�C��:��(&T),*viewstyle �A�C�R��(&I)');
  break;
}
/*
if(PPx.Extract('%n') == 'CX'){
  if(PPx.DirectoryType >= 62){
    PPx.Execute('*RotateExecute ViewStyleC,*viewstyle "����:��(&M)",*viewstyle "����:��(&M)"');
  } else{
    PPx.Execute('*RotateExecute ViewStyleB,*viewstyle "�摜:��(&P)",*viewstyle "�摜:��(&P)",*viewstyle "�摜:��(&P)"');
  }
} else{
  PPx.Execute('*RotateExecute ViewStyleA,*viewstyle "�ꗗ:���O(&A)",*viewstyle "�T���l�C��:��(&T)",*viewstyle "�T���l�C��:��(&T)",*viewstyle "�A�C�R��(&I)"');
}
 */