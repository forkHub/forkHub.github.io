mulai();
let roket = muatGambar("roket");
roket.x = 400;
roket.y = 300;
roket.tipeDrag = 3;

function update() {
	bersihkanLayar();
	stempel(roket);
	debugMouse();
}

function debugMouse() {
	posisiTeks(10, 20);
	tulis("Gerakkan roket dengan cara menggeser mouse di mana saja");
}
