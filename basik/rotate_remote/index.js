"use strict";

let box;

function Start() {
	Graphics(320, 240);
	box = LoadImage("../imgs/box.png");
	box.dragType = 4;
	box.x = 160;
	box.y = 120;
	box.handleX = 16;
	box.handleY = 16;
}

function Update() {
	Cls();
	DrawImage(box);
	Write("Drag anywhere to rotate the box");
}
