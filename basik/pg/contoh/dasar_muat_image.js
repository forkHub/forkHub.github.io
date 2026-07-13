mulai();

let bg = muatGambar("bg_bintang.jpg");
let bintang = muatGambar("bintang");

let roket = muatGambar("roket");
roket.panjang = 100;
roket.lebar = 200;
roket.rotasi = 45;
roket.x = 160;
roket.y = 120;

function update() {
	stempel(bg);
	
	bintang.x = 100;
	bintang.y = 100;
	stempel(bintang);
	
	bintang.x = 400;
	bintang.y = 300;
	stempel(bintang);
	
	bintang.x = 600;
	bintang.y = 250;
	stempel(bintang);
	
	bintang.x = 600;
	bintang.y = 400;
	stempel(bintang);
	
	stempel(roket);
}
