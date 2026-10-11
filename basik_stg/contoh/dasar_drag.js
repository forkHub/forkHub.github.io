mulai();
let roket = muatGambar("roket");
posisiGambar(roket, 400, 300);
roket.tipeDrag = 1;

function update() {
	bl();
	stempel(roket);
	tulis("Geser roket dengan mouse", 10, 20);
}
