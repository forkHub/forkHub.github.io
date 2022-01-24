//DECLARE GLOBAL VARIABLE:
//==========================
let img;
let frame = 0;
let slide = 0;

//START THE PROGRAM:
//==================
async function Start() {
    Graphics(300, 300);
    img = await LoadAnimImage("./gbr/exp2_0.png", 64, 64);
    ResizeImage(img, 120, 120);
}

//LOOP:
//=====
async function Loop() {
    Cls();
    frame = ((frame % 8) + 1);
    slide = (slide % 120) + 5;
    TileImage(img, 0, 0, 0);
    TileImage(img, slide, slide, frame - 1);
}
