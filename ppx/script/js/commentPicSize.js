//!*script
/* リストの画像サイズをコメントに記載 */

var fs = PPx.CreateObject('Scripting.FileSystemObject');
var filePath = PPx.Extract('%1%\\00_INDEX.txt');
var tList = fs.OpenTextFile(filePath, 2, true);
// アクティブな窓の表示状態を取得
var listView = PPx.Extract('%*getcust(xc_celf:' + PPx.Extract('%n').slice(1) + ')');
// 情報取得のため一時的に表示を変更
PPx.Execute('%Os *customize XC_celF:' + PPx.Extract('%n').slice(1) + '=U"大きさ",0');
// 画像情報取得
for (var i = 0, l = PPx.EntryDisplayCount; i < l; i = (i+1)|0) {
  if (PPx.Entry(i).Name.match(/.(bmp|jpg|jpeg|png|gif)$/i)) {
    var entryName = PPx.Entry(i).Name;
    var entryInfo = PPx.Entry(i).Information;
    var Psize = entryInfo.replace(/[\s\S]*\*Size:(\d*x\d*)[\s\S]*/g,'$1');
    var str = entryName + '\t' + Psize;
    tList.WriteLine(str);
  }
}
tList.Close();
// 表示を戻す
PPx.Execute('*customize XC_celF:' + PPx.Extract('%n').slice(1) + '=' + listView);
