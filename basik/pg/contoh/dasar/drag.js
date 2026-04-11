buatKanvas(800, 600);

let box = muatGambar("kotak.png");
box.x = 400;
box.y = 300;
box.tipeDrag = 1;

function update() {
	bersihkanLayar();
	stempel(box);
	debugMouse();
}

function debugMouse() {
	posisiTeks(0, 20);
	tulis("Gerakkan kotak dengan cara menggesernya dengan mouse");
	tulis("");
	tulis("Gambar ditekan: " + box.ditekan);
	tulis("Gambar di drag: " + box.didrag);
	tulis("Gambar drag mulai x " + box.dragAwalX + "/drag mulai y " + box.dragAwalY);
	tulis("Gambar x " + box.x);
	tulis("Gambar y " + box.y);
}
