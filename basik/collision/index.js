"use strict";

let box;
let box2;

function Start() {
	Graphics(400, 300);

	box = LoadImage("../imgs/box.png");
	box.width = 75;
	box.x = 100;
	box.y = 150;
	box.handleY = 16;

	box2 = LoadImage("../imgs/box.png");
	box2.width = 75;
	box2.x = 200;
	box2.y = 150;
	box2.handleY = 16;
}

//game loop
function Update() {
	box.rotation += 5;
	box2.rotation += 2;
	//clear screen
	Cls();

	//draw image
	DrawImage(box);
	DrawImage(box2);

	let col = ImageCollide(box, box2);
	Write("Collided: " + col);
}
