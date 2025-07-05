"use strict";

let char;
let velY = 0;
let velX = 2;
let onFloor = false;
let accY = .1;
let tiles = [];
let collidedTile;
let data;

function Start() {
	Graphics(320, 240);
	char = LoadImage("../imgs/moon.png");
	char.x = 32;
	char.y = 32;
	char.height = 32;
	char.width = 32;
	data = [
		"111111111111111111111111111111111111",
		"1        1                     1",
		"1        1                     1",
		"1   1    1          11111     11",
		"1   1    1         1        1111",
		"111111111111111111111111111111111111",
	];
	for (let row = 0; row < data.length; row++) {
		for (let col = 0; col < data[row].length; col++) {
			if (data[row].charAt(col) != ' ') {
				let t = LoadImage("../imgs/Box.png");
				t.frameW = 32;
				t.frameH = 32;
				t.width = 32;
				t.height = 32;
				t.x = col * 32;
				t.y = row * 32;
				tiles.push(t);
			}
		}
	}
}

function KeyboardDown() {
	if (KeyboardIsDown('ArrowUp')) {
		if (onFloor) {
			velY = -4;
			char.y += velY;
			resolveUp();
			onFloor = false;
		}
	}
}

function Update() {
	velY += accY;
	char.y += clamp(velY, -31, 31);
	if (velY > 0) {
		onFloor = false;
		getCollidedTile();
		if (collidedTile) {
			char.y = collidedTile.y - 32;
			velY = 1;
			onFloor = true;
		}
	}
	else {
		resolveUp();
	}
	if (KeyboardIsDown("ArrowRight")) {
		char.x += velX;
		if (getCollidedTile()) {
			char.x = collidedTile.x - 32;
		}
	}
	if (KeyboardIsDown("ArrowLeft")) {
		char.x -= velX;
		if (getCollidedTile())
			char.x = collidedTile.x + 32;
	}
	Cls();
	tiles.forEach((tile) => {
		DrawImage(tile);
	});
	DrawImage(char);
	debug();
}

function resolveUp() {
	if (getCollidedTile()) {
		char.y = collidedTile.y + 32;
		velY = 1;
	}
}

function getCollidedTile() {
	collidedTile = null;
	for (let i = 0; i < tiles.length; i++) {
		if (ImageCollide(char, tiles[i])) {
			collidedTile = tiles[i];
			return true;
		}
	}
	return false;
}

function debug() {
	TextPos(0, 10);
	WriteLn("char.grid x " + gridPos(char.x) + "/char x " + char.x);
	WriteLn("char.grid y " + gridPos(char.y) + "/char y " + char.y);
	WriteLn("char on floor: " + onFloor);
	if (collidedTile)
		WriteLn("collided tile " + collidedTile.x + "/" + collidedTile.y);
}

function gridPos(x) {
	return Math.floor(x / 32);
}

function clamp(n, min, max) {
	if (n < min)
		return min;
	if (n > max)
		return max;
	return n;
}
