//!*script
// *PPVUD=���[�U�[�R�}���h
var dt = PPx.GetFileInformation(PPx.Extract("%FD"));
var ft = PPx.GetFileInformation(PPx.Extract("%FDC"));
if(ft == "" && (dt == ":PKZIP" || dt == ":RAR")){
  PPx.Execute('%\"�t�@�C������\" %Q\"���ɂ���폜���܂�\" %:%u7-zip64.dll,d -hide %FD %FC');
  //PPx.Execute('*PPVUD DOWN');
} else{
  PPx.Execute('%\"�t�@�C������\" %Q\"�\�����̃G���g�����폜���܂�\" %: %Oa *file !safedelete,%FDC,%*name\(H,%1\)\\,/qstart /min /nocount /retry:0 /error:0 /backup /undolog');
}
