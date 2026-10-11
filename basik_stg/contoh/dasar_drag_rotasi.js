mulai();
let roket = muatGambar("roket");
roket.tipeDrag = 2;
posisiGambar(roket, 260, 220);
pusatGambar(roket, 32, 46);

//game loop
function update() {
	bl();
	stempel(roket);
	tulis("Putar roket dengan mouse", 10, 20);
}