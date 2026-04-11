let kotak = muatGambar("kotak.png");
kotak.x = 400;
kotak.y = 300;
kotak.tipeDrag = 1;

function update() {
	bersihkanLayar();
	stempel(kotak);
	debugMouse();
}

function debugMouse() {
	posisiTeks(0, 20);
	tulis("Gerakkan kotak dengan cara menggesernya dengan mouse");
	tulis("");
	tulis("Gambar ditekan: " + kotak.ditekan);
	tulis("Gambar di drag: " + kotak.didrag);
	tulis("Gambar drag mulai x " + kotak.dragAwalX + "/drag mulai y " + kotak.dragAwalY);
	tulis("Gambar x " + kotak.x);
	tulis("Gambar y " + kotak.y);
}
