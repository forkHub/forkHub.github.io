mulai();

let asap = muatAnimasi("asap", 100, 300);
ukuranGambar(asap, 200, 600);
asap.x = 0;

let asap2 = muatAnimasi("asap2", 32, 100);
ukuranGambar(asap2, 200, 600);
asap2.x = 400;

let frame = 0;

function update() {
	bl();
  
	frame++;
	if (frame >= 8) {
		frame = 0;
	}
	
	asap.frame = frame;
	asap2.frame = frame;
	
	stempel(asap);
	stempel(asap2);
}
