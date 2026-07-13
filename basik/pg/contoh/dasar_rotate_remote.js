mulai();
let roket = muatGambar("roket");
roket.tipeDrag = 4;
roket.x = 320;
roket.y = 240;
roket.pusatX = 16;
roket.pusatY = 16;

function update() {
	bersihkanLayar();
	stempel(roket);
	posisiTeks(0, 20);
	tulis("Drag dimana saja untuk memutar kotak");
}
