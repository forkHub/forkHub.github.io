//DECLARE GLOBAL VARIABLE
let img; //img object
let imgX = 100; //img x position
let imgY = 100; //img y position
let imgDrag = false; //img is dragged or not
let imgDragX = 100; //img x position when dragged
let imgDragY = 100; //img y position when dragged
//START PROGRAM
async function Start() {
    Graphics(320, 240);
    img = await LoadImage("./gbr/box.png");
    RotateImage(img, 30);
    MidHandle(img);
    Color(255, 255, 255, 1);
}
//LOOOP
async function Loop() {
    Cls();
    //if input is pressed (mouse/touch)
    if (InputDown()) {
        //if input position collide with image
        if (ImageDotCollide(img, imgX, imgY, InputX(), InputY())) {
            imgDrag = true;
            imgDragX = imgX;
            imgDragY = imgY;
        }
    }
    else {
        imgDrag = false;
        imgX = imgDragX;
        imgY = imgDragY;
    }
    if (InputDrag() && imgDrag) {
        imgDragX = imgX + InputDragX();
        imgDragY = imgY + InputDragY();
    }
    DrawImage(img, imgDragX, imgDragY);
}
