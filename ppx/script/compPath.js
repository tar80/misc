//!*script
/* 基準パスのサブディレクトリを取得する */
// PPx.Arguments(0)=基準文字列, (1)=補完候補ファイル
// 参照元:http://hoehoetukasa.blogspot.com/2018/11/ppx_7.html

try {
  var arg = [PPx.Arguments(0), PPx.Arguments(1)];
  var str = [];
  // コマンドと基準パスの分離整形
  arg[0].replace(/^([^\\]*\s)?(.*\\)(?!$).*/, rep);
  make_list(arg[1], str[2]);
  PPx.Result = str.join('');
} catch (e) {
  PPx.Result = arg[0];
};

/* 置換整形した文字列を取得する関数 */
function rep(match, p1, p2) {
  str = [p1, '', p2];
  if (typeof str[0] === 'undefined')
    str[0] = '';
  if (str[2].indexOf('"') === 0) {
    str[1] = '"';
    str[2] = str[2].slice(1);
  };
  return str;
};
/* 補完リストを作成する関数 */
function make_list(filepath, targetpath) {
  var fs = PPx.CreateObject('Scripting.FileSystemObject');
  var fs_file = fs.OpenTextFile(filepath, 2, true, -1);
  var fs_dir = fs.GetFolder(targetpath);
  var list = [];
  var e = new Enumerator(fs_dir.SubFolders);
  for (e.moveFirst(); !e.atEnd(); e.moveNext()) {
    list.push(fs.GetFolder(fs.BuildPath(fs_dir.Path, e.item().Name)) + "\\");
  };
  fs_file.Write(list.join('\r\n'));
  fs_file.Close();
};


