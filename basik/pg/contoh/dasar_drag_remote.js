mulai();
let roket = muatGambar("roket");
posisiGambar(roket, 400, 300);
roket.tipeDrag = 3;

function update() {
	bl();
	stempel(roket);
	tulis("Gerakkan roket dengan cara menggeser mouse di mana saja", 10, 20);
}
