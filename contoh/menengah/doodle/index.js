let brush = muatGambar("brush.png");
brush.handleX = 8;
brush.handleY = 8;

function update() {
	if (mouseDitahan()) {
		brush.x = mouseX();
		brush.y = mouseY();
		stempel(brush);
	}
	bersihkanLayar(0, 600, 800, 600);
	posisiTeks(0, 550);
	tulis("Drag to draw");
}
