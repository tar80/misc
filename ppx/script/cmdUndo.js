//!*script
// undo���s���Ƀ��O���ɓ��e�\��
var bu = PPx.Extract('%*getcust(X_save)');
var sr = new ActiveXObject('ADODB.Stream');
sr.type = 2;
sr.charset = 'utf-16';
sr.open();
sr.loadFromFile(PPx.extract("%0") + "\\" + bu + "\\PPXUNDO.LOG");
var str = sr.readText(-1).replace(/\w*\s(.*)\n(.*)/, '$2\ndest    $1','im');

PPx.SetPopLineMessage(str);
PPx.Execute('*ppcfile !Undo /min /nocount');
PPx.Quit(1);
