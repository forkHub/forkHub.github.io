"use strict";

let box;

function Start() {
	//set graphics. We are working with 320x240 resolution
	Graphics(320, 240);

	//load image
	box = LoadImage("../imgs/box.png");
	//set image proerties
	box.width = 20;
	box.height = 20;
	box.rotation = 45;
	box.x = 160;
	box.y = 120;
	box.handleX = 10;
	box.handleY = 10;
}

//game loop
function Update() {
	//clear screen
	Cls();

	//draw image
	DrawImage(box);
}
