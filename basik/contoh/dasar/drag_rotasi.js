buatKanvas(800, 600);

let box = muatGambar("kotak.png");
box.tipeDrag = 2;
box.x = 160;
box.y = 120;
box.pusatX = 16;
box.pusatY = 16;

//game loop
function update() {
	bersihkanLayar();
	stempel(box);
	posisiTeks(0, 20);
	tulis("Putar kotak dengan mouse");
}