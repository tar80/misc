//!*script
// ���X�g�̉摜�T�C�Y���R�����g�ɋL��
// 16�s�ځAPsize�͊��ɍ��킹�ďC��
PPx.Execute('%\"CommentPictSize\"%Q\"���X�g�ɉ摜�T�C�Y��\�������Ă�������\"');

var fso = PPx.CreateObject("Scripting.FileSystemObject");
var cDir = PPx.Extract('%1%\\');
strCreateFile = fso.BuildPath(cDir,"00_INDEX.txt");
fso.CreateTextFile(strCreateFile);
var pList = fso.OpenTextFile(strCreateFile,2,true);

for (var i = 0; i < PPx.EntryAllCount; i++) {
  if (PPx.Entry(i).Name.match(/.(bmp|jpg|jpeg|png|gif)$/i)) {
    var entryName = PPx.Entry(i).Name;
    var entryinfo = PPx.Entry(i).Information;
    var Psize = entryinfo.replace(/[\s\S]*�傫��\s:(\d*\sx\s\d*)[\s\S]*/g,'$1');
    var str = entryName + "\t" + Psize;
    pList.WriteLine(str);
  }
}
pList.Close();
