"use strict";
window.onload = () => {
    Graphics(320, 240);
    char = LoadAnimImage("https://forkhub.github.io/basik/demo/platform/imgs/box.png", 32, 32);
    char.frame = 3;
    char.x = 32;
    char.y = 32;
    let data = [
        "111111111111111111111111111111111111",
        "1            1                     1",
        "1           41                     1",
        "1      1111111          11111     11",
        "1     1      1         1        1111",
        "1            1      1111        1111",
        "1111111      1                     1",
        "1      11    1   11111             1",
        "14       1   1        1           11",
        "141         11           111       1",
        "14                                 1",
        "14   1131111111111   11131111111   1",
        "111111111111111111111111111111111111",
    ];
    for (let row = 0; row < data.length; row++) {
        for (let col = 0; col < data[row].length; col++) {
            if (data[row].charAt(col) != ' ') {
                let t = LoadAnimImage("https://forkhub.github.io/basik/demo/platform/imgs/box.png", 32, 32);
                t.x = col * 32;
                t.y = row * 32;
                tiles.push(t);
            }
        }
    }
    AddListener("update", () => {
        velY += accY;
        char.y += Clamp(velY, -31, 31);
        if (velY > 0) {
            onFloor = false;
            CollideMap();
            if (collidedTile) {
                char.y = collidedTile.y - 32;
                velY = 1;
                onFloor = true;
            }
        }
        else {
            resolveUp();
        }
        if (KeyboardDown("ArrowRight")) {
            char.x += velX;
            if (CollideMap()) {
                char.x = collidedTile.x - 32;
            }
        }
        if (KeyboardDown("ArrowLeft")) {
            char.x -= velX;
            if (CollideMap())
                char.x = collidedTile.x + 32;
        }
        if (KeyboardDown('ArrowUp')) {
            if (onFloor) {
                velY = -4;
                char.y += velY;
                resolveUp();
                onFloor = false;
            }
        }
        Basik.Camera.x = char.x - 32 * 4;
        Basik.Camera.y = char.y - 32 * 2;
        Cls();
        tiles.forEach((item) => {
            DrawImage(item);
        });
        DrawImage(char);
    });
};
let char;
let velY = 0;
let velX = 2;
let onFloor = false;
let accY = .1;
let tiles = [];
let collidedTile;
function resolveUp() {
    if (CollideMap()) {
        char.y = collidedTile.y + 32;
        velY = 1;
    }
}
function CollideMap() {
    collidedTile = null;
    for (let i = 0; i < tiles.length; i++) {
        if (ImageCollide(char, tiles[i])) {
            collidedTile = tiles[i];
            return true;
        }
    }
    return false;
}
