mulai();
let jmlSoundBerakhir = 0;
let sound = muatSuara("sound.mp3");

function mouseKlik() {
	mainkanSuara(sound);
}

function suaraSelesai() {
	jmlSoundBerakhir++;
}

function update() {
	bl();	
	tulis("klik untuk mendengarkan suara", 10, 20);
	tulis("");
	tulis("jml sound selesai " + jmlSoundBerakhir);
}
