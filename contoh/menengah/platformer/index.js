let char;
let velY = 0;
let velX = 2;
let diLantai = false;
let accY = .1;
let ubinAr = [];
let ubinTertabrak;
let data;

char = muatGambar("moon.png");
char.x = 32;
char.y = 32;
char.height = 32;
char.width = 32;
data = [
	"111111111111111111111111111111111111",
	"1        1                     1",
	"1        1                     1",
	"1   1    1          11111     11",
	"1   1    1         1        1111",
	"111111111111111111111111111111111111",
];

for (let baris = 0; baris < data.length; baris++) {
	for (let kolom = 0; kolom < data[baris].length; kolom++) {
		if (data[baris].charAt(kolom) != ' ') {
			let t = muatGambar("box.png");
			t.frameW = 32;
			t.frameH = 32;
			t.width = 32;
			t.height = 32;
			t.x = kolom * 32;
			t.y = baris * 32;
			ubinAr.push(t);
		}
	}
}


function keyboardDipencet() {
	if (tombolDitahan('ArrowUp')) {
		if (diLantai) {
			velY = -4;
			char.y += velY;
			resolveUp();
			diLantai = false;
		}
	}
}

function update() {
	velY += accY;
	char.y += clamp(velY, -31, 31);
	if (velY > 0) {
		diLantai = false;
		checkUbin();
		if (ubinTertabrak) {
			char.y = ubinTertabrak.y - 32;
			velY = 1;
			diLantai = true;
		}
	}
	else {
		checkAtas();
	}
	if (tombolDitahan("ArrowRight")) {
		char.x += velX;
		if (checkUbin()) {
			char.x = ubinTertabrak.x - 32;
		}
	}
	if (tombolDitahan("ArrowLeft")) {
		char.x -= velX;
		if (checkUbin())
			char.x = ubinTertabrak.x + 32;
	}
	Cls();
	ubinAr.forEach((tile) => {
		stempel(tile);
	});
	stempel(char);
	debug();
}

function checkAtas() {
	if (checkUbin()) {
		char.y = ubinTertabrak.y + 32;
		velY = 1;
	}
}

function checkUbin() {
	ubinTertabrak = null;
	for (let i = 0; i < ubinAr.length; i++) {
		if (gambarTabrakan(char, ubinAr[i])) {
			ubinTertabrak = ubinAr[i];
			return true;
		}
	}
	return false;
}

function debug() {
	posisiTeks(0, 10);
	tulis("char.grid x " + posGrid(char.x) + "/char x " + char.x);
	tulis("char.grid y " + posGrid(char.y) + "/char y " + char.y);
	tulis("char on floor: " + diLantai);
	if (ubinTertabrak)
		tulis("collided tile " + ubinTertabrak.x + "/" + ubinTertabrak.y);
}

function posGrid(x) {
	return Math.floor(x / 32);
}

function clamp(n, min, max) {
	if (n < min)
		return min;
	if (n > max)
		return max;
	return n;
}
