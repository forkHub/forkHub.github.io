"use strict";

let box;

function Start() {
	Graphics(320, 240);

	//load image
	box = LoadImage("../imgs/box.png");
	//set image properties
	box.dragType = 2;
	box.x = 160;
	box.y = 120;
	box.handleX = 16;
	box.handleY = 16;
}

//game loop
function Update() {
	//clear screen
	Cls();
	DrawImage(box);
	Write("Drag the box to rotate the box");
}
