//!*script
/* gitmode */

/////////* 初期設定 *////////////

// git diffの該当行前後に残す行数
var diff_contents = 1;
// gitのリストをまとめておくディレクトリ
var listDir = PPx.Extract('%\'list\'%\\git');
// 取得するリストの名前 ※拡張子は自動で付与される
var gStatus = 'gitstatus';
var gDiff   = 'gitdiff';

/////////////////////////////////

// PPc側の更新情報をリセット
PPx.Execute('*jumppath');

var wd = PPx.Extract('%FD');
var fso = PPx.CreateObject('Scripting.FileSystemObject');

// ディレクトリがなければ作る
if (fso.FolderExists(listDir) === false) { PPx.Execute('*makedir ' + listDir); }

// レポジトリのルートを取得
var gi = function () {
  var objWD = fso.GetFolder(wd);

  do {
    var isRoot = fso.BuildPath((objWD), '.git');
    if (fso.FolderExists(isRoot)) {
      return { 'root': String(objWD) };
    }
    objWD = objWD.ParentFolder;
    if (objWD.IsRootFolder) {
      PPx.SetPopLineMessage('!"not a repository.');
      PPx.Quit(-1);
    }
  } while (!objWD.IsRootFolder);
}();

var pathStat = fso.BuildPath(listDir, gStatus + '.xgit');
var pathDiff = fso.BuildPath(listDir, gDiff + '.patch');
var fso;

// ログの取得
var Make_status = function () {
  var result = function (str) {
    str = ';ListFile,;Base=' + gi.root + '|1,;git-status';
    return str.split(',');
  }();

  PPx.Execute('%Oa git status --porcelain -uall >' + pathStat + ' %&');
  var st = PPx.CreateObject('ADODB.stream');
  st.Mode = 3;
  st.Type = 2;
  st.Charset = 'UTF-8';
  st.LineSeparator = 10;
  st.Open;
  st.LoadFromFile(pathStat);
  st.Position = 0;
  do {
    st.ReadText(-2).replace(/^(.)(.)\s(.*)/, function (match, p1, p2, p3) {
      var p4 = function (setColorNum) {
        setColorNum = { ' ': 1, 'D': 5, '!': 3 };
        for (var key in setColorNum) {
          if (p2.indexOf(key) !== -1) {
            return setColorNum[key]
          }
        }
        return 8;
      }();
      result.push('"' + p3 + '","",A:H' + p4 + ',C:0.0,L:0.0,W:0.0,S:0.0,R:0.0,H:0,M:0,T:"' + p1 + p2 + '"');
    });
  } while (!st.EOS);
  st.Close;

  st.Open;
  st.WriteText(result.join('\u000D\u000A'));
  st.SaveToFile(pathStat, 2);
  st.Close;
  st;
  return;
};

var Make_diff = function () {
  PPx.Execute('%Oa git diff -U' + diff_contents + ' --diff-filter=AM --no-prefix --color-words HEAD^ >' + pathDiff + ' %&');
  return;
};

var setup = function (bn) {
  PPx.Execute('*string i,ps=' + pathStat);
  PPx.Execute('*string i,pd=' + pathDiff);
  PPx.Execute('%Oa git rev-parse --abbrev-ref HEAD | %0pptrayw -c *execute C,*string i,oBranch=%%*stdin(utf8) %%&');
  return;
};

setup();
Make_status();
Make_diff();

PPx.Execute('%Oa- *jumppath ' + pathStat + ' -savelocate %: *viewstyle -temp gitstatus');

if (PPx.Extract('%si"gr"') === '') {
  PPx.Execute('*setcust _User:u_git_branch=%si"oBranch"');
  PPx.Execute('*script %\'scr\'%\\exchangeKeys.js,1,%\'cfg\'%\\zz3GitKeysL.cfg');
}

PPx.Execute('*string i,gr=' + gi.root);
