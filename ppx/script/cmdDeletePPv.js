//!*script
// *PPVUD=���[�U�[�R�}���h
var dType = PPx.GetFileInformation(PPx.Extract("%FD"));
var fType = PPx.GetFileInformation(PPx.Extract("%FDC"));
if(fType == "" && (dType == ":PKZIP" || dType == ":RAR")){
  PPx.Execute('%\"�t�@�C������\" %Q\"���ɂ���폜���܂�\" %:%u7-zip64.dll,d -hide %FD %FC');
  //PPx.Execute('*PPVUD DOWN');
} else{
  PPx.Execute('%\"�t�@�C������\" %Q\"�\�����̃G���g�����폜���܂�\" %: %Oa *file !safedelete,%FDC,%*name\(H,%1\)\\,/qstart /min /nocount /retry:0 /error:0 /backup /undolog');
}
