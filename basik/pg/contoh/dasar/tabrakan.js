buatKanvas(800, 600);

let box = muatGambar("kotak.png");
box.panjang = 75;
box.x = 100;
box.y = 150;
box.pusatY = 16;

let box2 = muatGambar("kotak.png");
box2.panjang = 75;
box2.x = 200;
box2.y = 150;
box2.pusatY = 16;

function update() {
	box.rotasi += 5;
	box2.rotasi += 2;
	bersihkanLayar();

	stempel(box);
	stempel(box2);

	let col = gambarTabrakan(box, box2);

	posisiTeks(0, 20);
	tulis("Status Tabrakan: " + col);
}
