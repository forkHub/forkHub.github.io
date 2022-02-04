let snow = Dim(100);
snow.forEach((snow) => {
    snow.x = Math.random() * 120;
    snow.y = Math.random() * 160;
});
async function Start() {
    Graphics(120, 160);
}
async function Loop() {
    snow.forEach((item) => {
        if (moveDown(item))
            return;
        if (moveRight(item))
            return;
        if (moveLeft(item))
            return;
        item.y = 0;
        item.x = Math.floor(Math.random() * 120);
    });
}
function moveLeft(snow) {
    let pixel;
    if (snow.y >= 159)
        return false;
    pixel = GetPixel(snow.x - 1, snow.y + 1);
    if (pixel[0] > 0) {
        return false;
    }
    drawSnow(-1, 1, snow);
    return true;
}
function moveRight(snow) {
    let pixel;
    if (snow.y >= 159)
        return false;
    pixel = GetPixel(snow.x + 1, snow.y + 1);
    if (pixel[0] > 0) {
        return false;
    }
    drawSnow(1, 1, snow);
    return true;
}
function moveDown(snow) {
    let pixel;
    if (snow.y >= 159)
        return false;
    pixel = GetPixel(snow.x, snow.y + 1);
    if (pixel[0] > 0) {
        return false;
    }
    drawSnow(0, 1, snow);
    return true;
}
function drawSnow(xAdd, yAdd, snow) {
    Color(0, 0, 0, 1);
    SetPixel(snow.x, snow.y);
    snow.x += xAdd;
    snow.y += yAdd;
    Color(255, 255, 255, 1);
    SetPixel(snow.x, snow.y);
}
