let brush;
async function Start() {
    Graphics(640, 480);
    FPS(60);
    brush = await LoadImage('./gbr/brush.png');
    MidHandle(brush);
}
async function Loop() {
    if (InputDrag()) {
        DrawImage(brush, InputX(), InputY());
    }
}
