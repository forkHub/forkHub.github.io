mulai();
let jmlKlik = 0;

function mouseKlik() {
	jmlKlik++;
}

function update() {
	bl();
	tulis("Pencet Mouse dan gerakkan: ", 10, 20);
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
