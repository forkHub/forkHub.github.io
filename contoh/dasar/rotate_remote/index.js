let kotak = muatGambar("kotak.png");
kotak.tipeDrag = 4;
kotak.x = 320;
kotak.y = 240;
kotak.pusatX = 16;
kotak.pusatY = 16;

function update() {
	bersihkanLayar();
	stempel(kotak);
	posisiTeks(0, 20);
	tulis("Drag dimana saja untuk memutar kotak");
}
