//!*script
// TAB�ő��ړ�PPv�p
// �Q�ƌ�:http://hoehoetukasa.blogspot.com/2014/05/ppv.html
// ���s����PPvID�𕶎��R�[�h�ɕϊ�
var useppv = PPx.Extract('%n').slice(1).charCodeAt(0) + 1;
// ���s��PPv���A���t�@�x�b�g���Ō��PPv������΃t�H�[�J�X���ڂ�
for(var i = useppv; i < 91; i++){
  var ppvid = String.fromCharCode(i);
  if(PPx.Extract('%NV' + ppvid).match(/.+/)){
    PPx.Execute('*focus V' + ppvid);
    PPx.Quit(1);
  }
}
// �������PPc�Ƀt�H�[�J�X
for(i = 65; i < 91; i++){
  var ppcid = String.fromCharCode(i);
  if(PPx.Extract('%NC' + ppcid).match(/.+/)){
    PPx.Execute('*focus C' + ppcid);
    PPx.Quit(1);
  }
}