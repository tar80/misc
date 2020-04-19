'!*script
' 基準パスのサブディレクトリを取得する
' PPx.Arguments(0)=基準文字列, (1)=補完候補ファイルパス
' 参照元:http://hoehoetukasa.blogspot.com/2018/11/ppx_7.html
'======================================================================
Dim strArg
If PPx.Arguments.Count = 2 Then
  strArg = Array(PPx.Arguments(0), PPx.Arguments(1))
Else
  PPx.Result = PPx.Arguments(0)
  PPx.Quit(1)
End If

' コマンドと基準パスの分離整形
Dim objRegExp
Set objRegExp = new regexp
objRegExp.Pattern = "^([^\\]*\s)?(.*\\)(?!$).*"

Dim match
Dim objMatch
Dim strMatch
Set objMatch = objRegExp.Execute(strArg(0))

For Each match in objMatch
  strMatch = Array(match.SubMatches(0), match.SubMatches(1))
Next

' 置換の成否で分岐
If IsEmpty(strMatch) = 0 Then
  Dim strLine
  If InStr(1, strMatch(1), """",1) = 0 Then
    strLine = Array(strMatch(0), "", strMatch(1))
  Else
    strLine = Array(strMatch(0), """", Mid(strMatch(1), 2))
  End If

  If PPx.Extract("%W") = "Jumppath.." Then
    Dim fso
    Dim fsoLoadFile
    Dim fsoCompPath
    Dim objItems
    Set fso = PPx.CreateObject("Scripting.FileSystemObject")
    Set fsoLoadFile = fso.OpenTextFile(strArg(1), 2, true, -1)
    Set fsoCompPath = fso.GetFolder(strLine(2))
    Set objItems = fsoCompPath.SubFolders

    Dim pathList
    Dim f
    For Each f In objItems
      pathList = pathList + fso.GetFolder(fso.BuildPath(fsoCompPath, f.Name)) + "\" + vbCrLf
    next

    fsoLoadFile.Write(pathList)
    fsoLoadFile.Close()
  End If
  PPx.Result = Join(strLine, "")
Else
  PPx.Result = PPx.Arguments(0)
End If
