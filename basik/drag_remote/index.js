"use strict";
let box;

function Start() {
	Graphics(320, 240);

	box = LoadImage("../imgs/box.png");
	box.dragType = 3;
	box.x = 160;
	box.y = 120;
	box.handleX = 16;
	box.handleY = 16;
}

//game loop
function Update() {
	//clear screen
	Cls();

	//draw image
	DrawImage(box);
	StrokeColor(0, 0, 0, 0);
	TextPos(0, 10);
	Write("Drag anywhere to move the box");
}
