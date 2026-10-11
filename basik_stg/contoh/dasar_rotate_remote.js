mulai();
let roket = muatGambar("roket");
roket.tipeDrag = 4;
posisiGambar(roket, 320, 240);
pusatGambar(roket, 16, 16);

function update() {
	bl();
	stempel(roket);
	tulis("Drag dimana saja untuk memutar roket", 10, 20);
}
