mulai();
let ast = muatAnimasi("astronot_spr", 74, 134);
ukuranGambar(ast, 400, 600);
let ctr = 0;

function update() {
  ctr++;
  if (ctr > 20) {
    ctr = 0;
    ast.frame++;
    if (ast.frame > 3) {
      ast.frame = 0;
    }
  }
  
  bl();
  stempel(ast);
}
