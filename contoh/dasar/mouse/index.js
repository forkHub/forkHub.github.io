let jmlKlik = 0;

function mouseKlik() {
	jmlKlik++;
}

function update() {
	//clear screen
	bersihkanLayar();
	posisiTeks(10, 20);
	tulis("Pencet Mouse dan gerakkan: ");
	tulis("");
	tulis("ditahan: " + mouseDitahan());
	tulis("jml Klik: " + jmlKlik);
	tulis("x: " + mouseX());
	tulis("y: " + mouseY());
	tulis("drag awal x: " + mouseDragAwalX());
	tulis("drag awal y: " + mouseDragAwalY());
	tulis("drag x: " + mouseDragX());
	tulis("drag y: " + mouseDragY());
	tulis("sedang didrag: " + mouseDidrag());
}
