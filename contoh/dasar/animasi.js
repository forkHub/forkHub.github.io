let brush = muatAnimasi("fx.png", 32, 100);
stempel(brush);

function update() {
	bersihkanLayar();
	brush.frame++;
	if (brush.frame >= 8) {
		brush.frame = 0;
	}
	stempel(brush);
}
