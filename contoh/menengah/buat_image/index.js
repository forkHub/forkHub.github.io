let img = buatGambar(48, 48);
img.x = 160;
img.y = 120;
console.log(img);
console.log(img.kanvas);
let ctx1 = img.kanvas.getContext('2d');
ctx1.beginPath();
warnaGaris(0, 0, 0, 100);
ctx1.rect(0, 0, 48, 48);
ctx1.moveTo(24, 24);
ctx1.arc(24, 24, 20, 0, Math.PI * 2);
ctx1.stroke();

function update() {
    bersihkanLayar();
    stempel(img);
}
