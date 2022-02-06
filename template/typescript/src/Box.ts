let img: IBuffer;
let posX: number = 0;
let posY: number = 0;
let vx: number = 3;
let vy: number = 2;

async function Start(): Promise<void> {
	Graphics(320, 240);
	img = await LoadImage("./img/box.png");
	ResizeImage(img, 16, 16);
	MidHandle(img);
}

async function Loop(): Promise<void> {
	Cls();

	posX += vx;
	posY += vy;

	if (posX > 320) vx = -vx;
	if (posX < 0) vx = -vx;
	if (posY > 240) vy = -vy;
	if (posY < 0) vy = -vy;

	DrawImage(img, posX, posY);
}