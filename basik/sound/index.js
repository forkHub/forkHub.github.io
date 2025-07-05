"use strict";

let sound;
let soundEndCtr = 0;

function Start() {
	//set graphics. We are working with 320x240 resolution
	Graphics(320, 240);
	//load sound
	sound = LoadSound("../imgs/sound.mp3");
}

function MouseClick() {
	console.log('play sound');
	PlaySound(sound);
}

function SoundEnded() {
	console.log(LastSound());
	soundEndCtr++;
}

function Update() {
	Cls();
	TextPos(0, 10);
	WriteLn("Click to play");
	WriteLn("");
	WriteLn("end ctr " + soundEndCtr);
}
