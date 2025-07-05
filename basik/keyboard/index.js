"use strict";

let downCtr = 0;
let upCtr = 0;

function Start() {
	Graphics(640, 480);
}

function KeyboardDown() {
	downCtr++;
}

function KeyboardUp() {
	upCtr++;
}

//game loop
function Update() {
	//clear screen
	Cls();
	TextPos(0, 10);
	WriteLn("Press any key");
	WriteLn("");
	WriteLn("is down: " + KeyboardIsDown());
	WriteLn("last key: " + LastKey());
	WriteLn("down ctr: " + downCtr);
	WriteLn("up ctr: " + upCtr);
}
