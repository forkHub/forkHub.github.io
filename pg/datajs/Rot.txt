//DECLARE GLOBAL VARIABLE:
//==========================
let img;
let frame = 0;
let deg = 0;

//START THE PROGRAM:
//==================
async function Start() {
	Graphics(300, 300);
	img = await LoadImage("./gbr/kotak.png");
	ResizeImage(img, 250, 250);
	MidHandle(img);
	RotateImage(img, 30);
	DrawImage(img);
}

//LOOP:
//=====
async function Loop() {
	Cls();
	deg++;
	deg = deg % 360;
	RotateImage(img, deg);
	DrawImage(img, 150, 150);
}
