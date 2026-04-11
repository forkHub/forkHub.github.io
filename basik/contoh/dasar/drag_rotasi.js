let kotak = muatGambar("kotak.png");
kotak.tipeDrag = 2;
kotak.x = 160;
kotak.y = 120;
kotak.pusatX = 16;
kotak.pusatY = 16;

//game loop
function update() {
	bersihkanLayar();
	stempel(kotak);
	posisiTeks(0, 20);
	tulis("Putar box dengan mouse");
}