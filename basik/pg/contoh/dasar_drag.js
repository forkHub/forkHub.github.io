mulai();
let roket = muatGambar("roket");
roket.x = 400;
roket.y = 300;
roket.tipeDrag = 1;

function update() {
	bersihkanLayar();
	stempel(roket);
	debugMouse();
}

function debugMouse() {
	posisiTeks(10, 20);
	tulis("Geser roket dengan mouse");
}
