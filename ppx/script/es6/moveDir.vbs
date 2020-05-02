'!*script
' 同階層の隣合うディレクトリに移動
' 同階層の隣合う同じ拡張子の仮想ディレクトリに移動
' PPx.Arguments(0)=1:preview|無:next
' 参照元:http://hoehoetukasa.blogspot.com/2014/01/ppx_29.html
''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
Dim fso
Dim fsoCurrent
Dim fsoParent

Dim strCdir     'カレントディレクトリパス
Dim strCdirName 'カレントディレクトリ名
Dim strVdir     '仮想ディレクトリパス
Dim strExt
Dim strThis

Dim objRegExp

Dim match
Dim objMatch

Dim f
DIm arrayList
Dim objItems

Set fso = PPx.CreateObject("Scripting.FileSystemObject")

strCdir = PPx.Extract("%FDVN")

Set objRegExp = new regexp
objRegExp.Pattern = "^(.*)\\((.*\.)?(?!$)(.*))"

Set objMatch = objRegExp.Execute(strCdir)

For Each match In objMatch
  strVdir     = match.SubMatches(0)
  strCdirName = match.SubMatches(1)
  strExt      = Lcase(match.SubMatches(3))
Next

Select Case PPx.DirectoryType
  Case 1
    Set fsoCurrent = fso.GetFolder(strCdir)
    ' 親ディレクトリがルートなら終了
    If fsoCurrent.IsRootFolder Then
      PPx.SetPopLineMessage("!"">>root")
      PPx.Quit(1)
    End If
    Set fsoParent = fsoCurrent.ParentFolder
    Set objItems = fsoParent.SubFolders
    ' 属性を考慮してリストに追加
    For Each f In objItems
      Set strThis =fso.GetFolder(fso.BuildPath(fsoParent.Path, f.Name))
      If strThis.Attributes <= 17 Then
        arrayList = arrayList + f.Name + " "
      End If
    Next
  Case 4, 63, 64, 96
    Set fsoParent = fso.GetFolder(strVdir)
    Set objItems = fsoParent.Files
    '   拡張子を考慮してリストに追加
    For Each f In objItems
      strThis = Lcase(fso.GetExtensionName(fso.BuildPath(fsoParent.Path, f.Name)))
      If strThis = strExt Then
        arrayList = arrayList + f.Name + " "
      End If
    Next
  Case Else
    PPx.SetPopLineMessage("!""非対応ディレクトリ")
    PPx.Quit(1)
End Select

Dim run
If PPx.Arguments.length Then
  run = MoveDir(-1, "top")
Else
  run = MoveDir(1, "bottom")
End If

' 引数に応じて移動先パスを決める関数
Function MoveDir(a, termMessage)
  Dim strTarget
  Dim i

  arrayList = Split(arrayList)

  For i = 0 To Ubound(arrayList)
    If arrayList(i) = strCdirName Then
      Exit For
    End If
  Next

  If i + a < 0 Or i + a + 1 > Ubound(arrayList) Then
    PPx.SetPopLineMessage("!"">>" + termMessage)
    PPx.Quit(1)
  Else
    strTarget = arrayList(i + a)
    PPx.Execute("*jumppath " + fso.BuildPath(fsoParent.Path, strTarget))
  End If
End Function
