mulai();

let brush = muatGambar("brush.png");
brush.handleX = 8;
brush.handleY = 8;

posisiTeks(10, 20);
tulis("Drag pelan-pelan untuk menggambar");

function update() {
	if (mouseDitahan()) {
		brush.x = mouseX();
		brush.y = mouseY();
		stempel(brush);
	}
}
