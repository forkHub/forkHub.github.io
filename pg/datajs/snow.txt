//DECLARE GLOBAL VARIABLE:
//==========================

let snow = Dim(100);	//create array of snow

//initialize snow position
snow.forEach((snow) => {
	snow.x = Math.random() * 120;
	snow.y = Math.random() * 160;
});

//START THE PROGRAM:
//==================
async function Start() {
	//set screen resolution
	Graphics(120, 160);

	//clear screen with black color
	Cls();
}

//LOOP:
//=====
async function Loop() {

	//iterate snow
	snow.forEach((item) => {

		if (moveDown(item))
			return;
		if (moveRight(item))
			return;
		if (moveLeft(item))
			return;

		//snow cannot move, return to top
		item.y = 0;
		item.x = Math.floor(Math.random() * 120);
	});
}

//move left, return true if it can move
function moveLeft(snow) {
	let pixel;

	if (snow.y >= 159)
		return false;

	pixel = GetPixel(snow.x - 1, snow.y + 1);
	if (pixel[0] > 0) {
		return false;
	}

	drawSnow(-1, 1, snow);
	return true;
}

//move right, return true if it can
function moveRight(snow) {
	let pixel;

	if (snow.y >= 159)
		return false;

	pixel = GetPixel(snow.x + 1, snow.y + 1);
	if (pixel[0] > 0) {
		return false;
	}

	drawSnow(1, 1, snow);
	return true;
}

//move down
function moveDown(snow) {
	let pixel;

	if (snow.y >= 159)
		return false;
	pixel = GetPixel(snow.x, snow.y + 1);

	if (pixel[0] > 0) {
		return false;
	}

	drawSnow(0, 1, snow);
	return true;
}

//draw the snow
function drawSnow(xAdd, yAdd, snow) {

	//remove prev position
	Color(0, 0, 0, 1);
	SetPixel(snow.x, snow.y);

	//move the snow
	snow.x += xAdd;
	snow.y += yAdd;

	//draw snow in new position
	Color(255, 255, 255, 1);
	SetPixel(snow.x, snow.y);
}