let kotak = muatGambar("kotak.png");
kotak.panjang = 75;
kotak.x = 100;
kotak.y = 150;
kotak.pusatY = 16;

let kotak2 = muatGambar("kotak.png");
kotak2.panjang = 75;
kotak2.x = 200;
kotak2.y = 150;
kotak2.pusatY = 16;

function update() {
	kotak.rotasi += 5;
	kotak2.rotasi += 2;
	bersihkanLayar();

	stempel(kotak);
	stempel(kotak2);

	let col = gambarTabrakan(kotak, kotak2);

	posisiTeks(0, 20);
	tulis("Status Tabrakan: " + col);
}
