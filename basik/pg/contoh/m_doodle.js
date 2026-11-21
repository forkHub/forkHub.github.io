mulai();

let brush = muatGambar("brush");
pusatGambar(brush, 8, 8);

tulis("Drag pelan-pelan untuk menggambar", 10, 20);

function update() {
	if (mouseDitahan()) {
		posisiGambar(brush, mouseX(), mouseY());
		stempel(brush);
	}
}
