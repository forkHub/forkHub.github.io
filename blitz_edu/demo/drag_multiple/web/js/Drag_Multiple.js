//DECLARE GLOBAL VARIABLE
let imgX = 100; //img x position
let imgY = 100; //img y position
let imgDrag = false; //img is dragged or not
let imgDragX = 100; //img x position when dragged
let imgDragY = 100; //img y position when dragged
//define data structure for drag image 
let imgObj = {
    img: null,
    x: 0,
    y: 0,
    isDrag: false,
    dragX: 0,
    dragY: 0
};
let imgAr = Dim(10, imgObj);
//START PROGRAM
async function Start() {
    Graphics(320, 240);
    let img = await LoadImage("./gbr/box.png");
    for (let i = 0; i < imgAr.length; i++) {
        let item = imgAr[i];
        item.x = Math.floor(Math.random() * 320 - 32);
        item.y = Math.floor(Math.random() * 240 - 32);
        item.dragX = item.x;
        item.dragY = item.y;
        item.img = CopyImage(img);
        RotateImage(item.img, Math.floor(Math.random() * 360));
    }
    Color(255, 255, 255, 1);
}
//LOOOP
async function Loop() {
    Cls();
    handleInput();
    for (let i = 0; i < imgAr.length; i++) {
        DrawImage(imgAr[i].img, imgAr[i].dragX, imgAr[i].dragY);
    }
}
function handleInput() {
    //if input is pressed (mouse/touch)
    if (InputDown()) {
        let draggedImg = null;
        //get current dragged image
        for (let i = 0; i < imgAr.length; i++) {
            if (imgAr[i].isDrag) {
                draggedImg = imgAr[i].img;
            }
        }
        //if there already dragged image, don't take new image
        if (!draggedImg) {
            //if input position collide with image
            for (let i = 0; i < imgAr.length; i++) {
                if (ImageDotCollide(imgAr[i].img, imgAr[i].x, imgAr[i].y, InputX(), InputY())) {
                    imgAr[i].isDrag = true;
                    imgAr[i].dragX = imgAr[i].x;
                    imgAr[i].dragY = imgAr[i].y;
                    break;
                }
            }
        }
    }
    else {
        for (let i = 0; i < imgAr.length; i++) {
            imgAr[i].isDrag = false;
            imgAr[i].x = imgAr[i].dragX;
            imgAr[i].y = imgAr[i].dragY;
        }
    }
    if (InputDrag()) {
        for (let i = 0; i < imgAr.length; i++) {
            if (imgAr[i].isDrag) {
                imgAr[i].dragX = imgAr[i].x + InputDragX();
                imgAr[i].dragY = imgAr[i].y + InputDragY();
            }
        }
    }
}
