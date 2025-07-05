"use strict";

let box;

function Start() {
	Graphics(320, 240);
	box = LoadImage("../imgs/box.png");
	box.x = 160;
	box.y = 120;
	box.dragType = 1;
}

function Update() {
	Cls();
	DrawImage(box);
	debugMouse();
}

function debugMouse() {
	TextPos(0, 10);
	WriteLn("Drag the image");
	WriteLn("");
	WriteLn("Image pressed " + box.down);
	WriteLn("Image is dragged " + box.dragged);
	WriteLn("Image drag start x " + box.dragStartX + "/drag start y " + box.dragStartY);
	WriteLn("Image x " + box.x);
	WriteLn("Image y " + box.y);
}
