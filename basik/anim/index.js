"use strict";
let brush;

function Start() {
	Graphics(320, 240);
	brush = LoadImage("../imgs/fx.png");
	brush.frameW = 32;
	brush.frameH = 100;
	brush.width = 32;
	brush.height = 100;
}

function Update() {
	Cls();
	brush.frame++;
	if (brush.frame >= 8)
		brush.frame = 0;
	DrawImage(brush);
}
