mulai();
let box = muatGambar("kotak.png");
box.panjang = 75;
box.pusatY = 16;

let box2 = muatGambar("kotak.png");
box2.panjang = 75;
box2.pusatY = 16;

function update() {
	putarGambar(box, 5);
	putarGambar(box2, 2);
	bl();

	stempel(box, 100, 150);
	stempel(box2, 200, 150);

	let status = gambarTabrakan(box, box2);

	tulis("Status Tabrakan: " + status, 0, 20);
}
