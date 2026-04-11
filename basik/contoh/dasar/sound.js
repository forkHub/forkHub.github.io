let jmlSoundBerakhir = 0;
let sound = muatSuara("sound.mp3");

function mouseKlik() {
	console.log('mainkan suara');
	mainkanSuara(sound);
}

function suaraSelesai() {
	jmlSoundBerakhir++;
}

function update() {
	bersihkanLayar();
	posisiTeks(0, 20);
	tulis("klik untuk mendengarkan suara");
	tulis("");
	tulis("jml sound selesai " + jmlSoundBerakhir);
}
