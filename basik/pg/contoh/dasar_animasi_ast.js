mulai();
let ast = muatAnimasi("astronot.png", 74, 134);
ast.lebar=600;
ast.panjang=400;
stempel(ast);
let ctr = 0;
console.log(ast);

function update() {
  ctr++;
  if (ctr > 20) {
    ctr = 0;
    ast.frame++;
    if (ast.frame > 3) {
      ast.frame = 0;
    }
  }
  
  bersihkanLayar();
  stempel(ast);
}
