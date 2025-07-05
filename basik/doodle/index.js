"use strict";
let brush;

function Start() {
	Graphics(320, 240);
	brush = LoadImage("../imgs/brush.png");
	brush.handleX = 8;
	brush.handleY = 8;
}

function Update() {
	if (MouseIsDown()) {
		brush.x = MouseX();
		brush.y = MouseY();
		DrawImage(brush);
	}
	Cls(0, 200, 320, 240);
	TextPos(0, 210);
	Write("Drag to draw");
}
