let kotak = muatGambar("kotak.png");
kotak.tipeDrag = 3;
kotak.x = 160;
kotak.y = 120;
kotak.pusatX = 16;
kotak.pusatY = 16;

function update() {
	bersihkanLayar();

	stempel(kotak);
	posisiTeks(10, 20);
	tulis("Drag dimana saja untuk menggerakkan kotak");
}
