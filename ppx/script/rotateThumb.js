//!*script
// ���X�g�\���؂�ւ�
if(PPx.Extract('%n') == 'CX'){
if(PPx.DirectoryType == 96){
  PPx.Execute('*RotateExecute ViewStyleC,*viewstyle "���揬(&M)",*viewstyle "�����(&M)"');
  } else{
    PPx.Execute('*RotateExecute ViewStyleB,*viewstyle "�摜��(&S)",*viewstyle "�摜��(&M)",*viewstyle "�摜��(&L)"');
  }
} else{
  PPx.Execute('*RotateExecute ViewStyleA,*viewstyle "�ꗗ1(&A)",*viewstyle "�T���l�C����(&T)",*viewstyle "�T���l�C����(&T)",*viewstyle "�A�C�R��(&I)"');
}
