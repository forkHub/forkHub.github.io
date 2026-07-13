mulai();

let asap = muatAnimasi("asap.png", 100, 300);
asap.lebar=600;
asap.panjang=200;
asap.x = 0;

let asap2 = muatAnimasi("asap2.png", 32, 100);
asap2.lebar=600;
asap2.panjang=200;
asap2.x = 400;

let frame = 0;

function update() {
	bersihkanLayar();
  
	frame++;
	if (frame >= 8) {
		frame = 0;
	}
	
	asap.frame = frame;
	asap2.frame = frame;
	
	stempel(asap);
	stempel(asap2);
}
