let data = `
Graphics(300, 300);

let img;
let frame = 0;

async function Start() {
    img = await LoadAnimImage('./gbr/exp2_0.png', 64, 64);
    ResizeImage(img, 256, 256);
}

async function Loop() {
    Cls();
    frame = ((frame % 8) + 1);
    DrawImage(img, 0, 0, frame - 1);
}
`;
document.body.querySelector('div.snipet').innerHTML = data;