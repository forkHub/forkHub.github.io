let brush = muatGambar("fx.png");
brush.panjangFrame = 32;
brush.lebarFrame = 100;
brush.panjang = 32;
brush.lebar = 100;

function update() {
	bersihkanLayar();
	brush.frame++;
	if (brush.frame >= 8) {
		brush.frame = 0;
	}
	stempel(brush);
}
