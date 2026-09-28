mulai();

let bola = muatGambar("bola");
pusatGambar(bola, 32, 32);
let vx = 3;
let vy = 0;
let grav = 0.1;

function update() {
  	vy += grav;
	bola.x += vx;
	bola.y += vy;
	
	if (bola.x > 768) {
		bola.x = 768;
		vx = -3;
	}
	
	if (bola.x < 32) {
		bola.x = 32;
		vx = 3;
	}
	
	if (bola.y < 32) {
		bola.y = 32;
		vy = 4;
	}
	
	if(bola.y > 568) {
		bola.y = 568;
		vy = -10;
	}
	
	bersihkanLayar();
	stempel(bola);
}
