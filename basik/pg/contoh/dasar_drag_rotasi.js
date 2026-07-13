mulai();
let roket = muatGambar("roket");
roket.tipeDrag = 2;
roket.x = 260;
roket.y = 220;
roket.pusatX = 32;
roket.pusatY = 46;

//game loop
function update() {
	bersihkanLayar();
	stempel(roket);
	posisiTeks(10, 20);
	tulis("Putar roket dengan mouse");
}