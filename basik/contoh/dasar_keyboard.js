mulai();
let jmlTekan = 0;
let jmlLepas = 0;

function keyboardDitekan() {
	jmlTekan++;
}

function keyboardDilepas() {
	jmlLepas++;
}

function update() {
	bl();
	tulis("Tekan tombol keyboard mana saja", 10, 20);
	tulis("");
	tulis("tombol sedang ditahan: " + tombolDitahan());
	tulis("tombol terakhir: " + tombolEvent());
	tulis("jumlah tombol dipencet: " + jmlTekan);
	tulis("jumlah tombol dilepas: " + jmlLepas);
}
