let img;
let frame = 0;
async function Start() {
    Graphics(300, 300);
    img = await LoadAnimImage('./gbr/exp2_0.png', 64, 64);
    ResizeImage(img, 256, 256);
}
async function Loop() {
    Cls();
    frame = ((frame % 8) + 1);
    DrawImage(img, 0, 0, frame - 1);
}
