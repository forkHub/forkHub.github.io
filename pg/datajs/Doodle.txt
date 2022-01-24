/*
 * Simple doodle exampla
 * use mouse/touch to draw something on screen
 *
*/

//DECLARE GLOBAL VARIABLE:
//========================
let brush;

//START THE PROGRAM:
//==================
async function Start() {
	Graphics(640, 480);
	FPS(60);
	brush = await LoadImage('./gbr/brush.png');
	MidHandle(brush);
}

//LOOP:
//=====
async function Loop() {
	if (InputDrag()) {
		DrawImage(brush, InputX(), InputY());
	}
}
