//!*script
// リストの画像サイズをコメントに記載
// 16行目、Psizeは環境に合わせて修正
PPx.Execute('%\"CommentPictSize\"%Q\"リストに画像サイズを表示させてください\"');

var fso = PPx.CreateObject("Scripting.FileSystemObject");
var cDir = PPx.Extract('%1%\\');
indexPPx = fso.BuildPath(cDir,'00_INDEX.txt');
fso.CreateTextFile(indexPPx);
var tList = fso.OpenTextFile(indexPPx,2,true);

for(var i = 0,l = PPx.EntryAllCount; i < l; i++){
  if(PPx.Entry(i).Name.match(/.(bmp|jpg|jpeg|png|gif)$/i)){
    var entryName = PPx.Entry(i).Name;
    var entryinfo = PPx.Entry(i).Information;
    var Psize = entryinfo.replace(/[\s\S]*大きさ\s:(\d*\sx\s\d*)[\s\S]*/g,'$1');
    var str = entryName + "\t" + Psize;
    tList.WriteLine(str);
  }
}
tList.Close();
