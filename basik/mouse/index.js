"use strict";

let clickCtr = 0;

function Start() {
	Graphics(640, 480);
}

function MouseClick() {
	if (MouseButton() == 0)
		clickCtr++;
}

function Update() {
	//clear screen
	Cls();
	TextPos(0, 10);
	WriteLn("Mouse left button: ");
	WriteLn("");
	WriteLn("is down: " + MouseIsDown(0));
	WriteLn("tap count: " + clickCtr);
	WriteLn("last button: " + MouseButton());
	WriteLn("x: " + MouseX());
	WriteLn("y: " + MouseY());
	WriteLn("drag start x: " + MouseDragStartX(0));
	WriteLn("drag start y: " + MouseDragStartY(0));
	WriteLn("dragged x: " + MouseDraggedX(0));
	WriteLn("dragged y: " + MouseDraggedY(0));
	WriteLn("is dragged: " + MouseIsDragged(0));
}
