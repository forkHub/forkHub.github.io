"use strict";
window.onload = () => {
    console.log('start');
    var door_screen_x, image, door_x, counter;

    // Describe this function...
    function log() {

        /*Set Text position to x %1 y %2*/
        ha.be.Teks.Goto(0, 10);

        /*WriteLn %1*/
        ha.be.Teks.WriteLn(('Image position: ' + String(ImageXPosition(image))));

        /*WriteLn %1*/
        ha.be.Teks.WriteLn(('Input x:' + String((ImageXPosition(image)) + (InputX()))));
    }

    // Describe this function...
    function get_door_pos() {
        door_screen_x = (ImageXPosition(image)) + door_x;

        /*📝 %1*/
        //'if the position is on the left of screen';
        counter = 0;
        while (door_screen_x < 0) {
            door_screen_x = door_screen_x + (Width(image));
            counter = (typeof counter === 'number' ? counter : 0) + 1;

            /*Log %1*/
            console.log(('counter ' + String(counter)));
            if (counter > 20) {
                break;
            }
        }

        /*📝 %1*/
        //'if the position is on the right of screen';
        counter = 0;
        while (door_screen_x > 320) {
            door_screen_x = door_screen_x - (Width(image));
            counter = (typeof counter === 'number' ? counter : 0) + 1;

            /*Log %1*/
            console.log(('counter ' + String(counter)));
            if (counter > 20) {
                break;
            }
        }

        /*Pause*/
        debugger;
    }



    /*🛩️ Start %1 width: %2 height: %3 %4*/
    Graphics(320, 240,);
    image = (LoadImage('./imgs/masjid.jpg'));

    /*Image %1 set drag mode to %2*/
    ha.be.Spr.DragMode(image, 3);
    door_x = 1000;
    door_screen_x = 0;

    ;


    /*⏱️ update %1 %2 %3*/
    function update() {
        get_door_pos();

        /*Cls*/
        Cls();

        /*TileImage: %5 image %1 x: %2 y: %3 frame: %4*/
        Tile(image, (ImageXPosition(image)), 0, 0,);
        log();
    };

    let __update; // = update || Update || UPDATE as any;
    if (typeof update === "function")
        __update = update;
    if (typeof Update === "function")
        __update = Update;
    if (typeof UPDATE === "function")
        __update = UPDATE;
    console.log(__update);
    let __updater = () => {
        if (__update) {
            __update();
        }
        requestAnimationFrame(__updater);
    };
    requestAnimationFrame(__updater);
};