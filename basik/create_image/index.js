"use strict";

let img;

function Start() {
	Graphics(320, 240);

	img = CreateImage(48, 48);
	img.x = 160;
	img.y = 120;
	let ctx1 = img.canvas.getContext('2d');
	ctx1.beginPath();
	StrokeColor(0, 0, 0, 100);
	ctx1.rect(0, 0, 48, 48);
	ctx1.moveTo(24, 24);
	ctx1.arc(24, 24, 20, 0, Math.PI * 2);
	ctx1.stroke();
}

function Update() {
	Cls();
	DrawImage(img);
}
