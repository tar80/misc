//!*script
// TAB�ő��ړ�PPc�p
// �Q�ƌ�:http://hoehoetukasa.blogspot.com/2014/05/ppv.html
// ���s����PPcID�𕶎��R�[�h�ɕϊ�
var useppc = PPx.Extract('%n').slice(1).charCodeAt(0) + 1;
// ���s��PPc���A���t�@�x�b�g���Ō��PPc������΃t�H�[�J�X���ڂ�
for(var i = useppc; i < 91; i++){
  var ppcid = String.fromCharCode(i);
  if(PPx.Extract('%NC' + ppcid).match(/.+/)){
    PPx.Execute('*focus C' + ppcid);
    PPx.Quit(1);
  }
}
// �������PPv�Ƀt�H�[�J�X
for(i = 65; i < 91; i++){
  var ppvid = String.fromCharCode(i);
  if(PPx.Extract('%NV' + ppvid).match(/.+/)){
    PPx.Execute('*focus V' + ppvid);
    PPx.Quit(1);
  }
}
// PPv��������Βʏ��Tab�̓���
PPx.Execute('%K"@F6"');
