//!*script
// �T���l�C���̃L���b�V���폜
for (var i = 0; i < PPx.EntryAllCount; i++) {
  if (PPx.Entry(i).Size != 0){
    PPx.Execute('*delete "'+PPx.Entry(i).Name+':thumbnail.jpg"');
  }
}