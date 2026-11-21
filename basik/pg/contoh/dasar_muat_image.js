mulai();

let bg = muatGambar("bg_bintang");
let bintang = muatGambar("bintang");

let roket = muatGambar("roket");
ukuranGambar(roket, 100, 200);
roket.rotasi = 45;

function update() {
	stempel(bg);
	stempel(bintang, 100, 100);	
	stempel(bintang, 400, 300);	
	stempel(bintang, 600, 250);
	stempel(bintang, 600, 400);
	stempel(roket, 160, 120);
}
