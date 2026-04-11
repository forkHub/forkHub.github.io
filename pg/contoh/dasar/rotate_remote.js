buatKanvas(800, 600);

let box = muatGambar("kotak.png");
box.tipeDrag = 4;
box.x = 320;
box.y = 240;
box.pusatX = 16;
box.pusatY = 16;

function update() {
	bersihkanLayar();
	stempel(box);
	posisiTeks(0, 20);
	tulis("Drag dimana saja untuk memutar kotak");
}
