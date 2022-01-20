var ha;
(function (ha) {
    var blitz;
    (function (blitz) {
        class BlWindow {
            windowResize = () => {
                console.debug('window on resize');
                let canvas = blitzConf.canvas.el;
                let cp = blitzConf.canvas.w;
                let cl = blitzConf.canvas.h;
                let wp = window.innerWidth;
                let wl = window.innerHeight;
                let ratio = Math.min((wp / cp), (wl / cl));
                let cp2 = Math.floor(cp * ratio);
                let cl2 = Math.floor(cl * ratio);
                blitzConf.canvas.scaleX = ratio;
                blitzConf.canvas.scaleY = ratio;
                canvas.style.width = cp2 + 'px';
                canvas.style.height = cl2 + 'px';
                canvas.style.top = ((wl - cl2) / 2) + 'px';
                canvas.style.left = ((wp - cp2) / 2) + 'px';
                console.debug('canvas w: ' + canvas.style.width + '/ratio: ' + ratio);
            };
            loop = async () => {
                let _window = window;
                if (typeof _window.Loop == 'function') {
                    await _window.Loop();
                }
            };
            repeat = () => {
                this.loop()
                    .then(() => {
                    setTimeout(() => {
                        requestAnimationFrame(this.repeat);
                    }, 30);
                }).
                    catch((e) => {
                    console.error(e);
                });
            };
        }
        blitz.blWindow = new BlWindow();
    })(blitz = ha.blitz || (ha.blitz = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var blitz;
    (function (blitz) {
        class Image {
            loadImage = async (url) => {
                return new Promise((resolve, reject) => {
                    let image2 = document.createElement('img');
                    image2.onload = () => {
                        resolve(image2);
                    };
                    image2.src = url;
                    image2.onerror = (e) => {
                        reject(e);
                    };
                });
            };
        }
        blitz.image = new Image();
    })(blitz = ha.blitz || (ha.blitz = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var blitz;
    (function (blitz) {
        class Input {
            inputs = [];
            flush() {
                while (this.inputs.length > 0) {
                    this.inputs.pop();
                }
            }
            get(e, inputType) {
                let inputBaru;
                for (let i = 0; i < this.inputs.length; i++) {
                    let input = this.inputs[i];
                    if (input.type == inputType && input.key == e) {
                        inputBaru = input;
                        return inputBaru;
                    }
                }
                return inputBaru;
            }
            baru(e, inputType) {
                let inputBaru = this.get(e, inputType);
                if (!inputBaru) {
                    inputBaru = {
                        key: e,
                        type: inputType,
                        down: [],
                        hit: [],
                        isDown: false,
                        isDrag: false,
                        isHit: false,
                        isTap: false,
                        timerEnd: 0,
                        timerStart: 0,
                        x: 0,
                        xDrag: 0,
                        xStart: 0,
                        y: 0,
                        yDrag: 0,
                        yStart: 0
                    };
                    this.inputs.push(inputBaru);
                    console.log('new input:');
                    console.log(inputBaru);
                }
                return inputBaru;
            }
            BLGetInputPos = (cx, cy, canvasScaleX, canvasScaleY) => {
                let rect = blitzConf.canvas.el.getBoundingClientRect();
                let poslx = Math.floor((cx - rect.x) / canvasScaleX);
                let posly = Math.floor((cy - rect.y) / canvasScaleY);
                return {
                    x: poslx,
                    y: posly
                };
            };
        }
        blitz.input = new Input();
    })(blitz = ha.blitz || (ha.blitz = {}));
})(ha || (ha = {}));
///<reference path="../ha/Window.ts"/>
///<reference path="../ha/Image.ts"/>
///<reference path="../ha/Input.ts"/>
/**
 * IMAGE
 */
const LoadImage = async (url) => {
    let img = await ha.blitz.image.loadImage(url);
    return {
        img: img,
        width: img.naturalWidth,
        height: img.naturalHeight,
        frameH: img.naturalHeight,
        frameW: img.naturalWidth,
        width2: img.naturalWidth,
        height2: img.naturalHeight,
        isAnim: false,
        handleX: 0,
        handleY: 0,
        rotation: 0,
        scaleX: 1,
        scaleY: 1
    };
};
const LoadAnimImage = async (url, w, h) => {
    let img = await ha.blitz.image.loadImage(url);
    return {
        img: img,
        width: img.naturalWidth,
        height: img.naturalHeight,
        frameH: w,
        frameW: h,
        width2: w,
        height2: h,
        isAnim: true,
        handleX: 0,
        handleY: 0,
        rotation: 0,
        scaleX: 1,
        scaleY: 1
    };
};
const DrawImage = (img, x = 0, y = 0, frame = 0) => {
    let ctx = blitzConf.ctxAktif;
    let jmlH;
    let jmlV;
    let frameX;
    let frameY;
    jmlH = Math.floor(img.width / img.frameW);
    jmlV = Math.floor(img.height / img.frameH);
    frameX = (frame % jmlH);
    frameY = Math.floor(frame / jmlV);
    frameX *= img.frameW;
    frameY *= img.frameH;
    frameX = Math.floor(frameX);
    frameY = Math.floor(frameY);
    //TODO:
    //handle rotation, mid handle
    let x2 = Math.floor(x);
    let y2 = Math.floor(y);
    x2 -= (img.handleX);
    y2 -= (img.handleY);
    //rotation
    if (img.rotation != 0) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(img.rotation * (Math.PI / 180));
        ctx.drawImage(img.img, frameX, frameY, img.frameW, img.frameH, -img.handleX, -img.handleY, img.width2, img.height2);
        ctx.restore();
    }
    else {
        ctx.drawImage(img.img, frameX, frameY, img.frameW, img.frameH, x2, y2, img.width2, img.height2);
    }
};
const CreateImage = (w, h, frameW, frameH) => {
    let canvas = document.createElement('canvas');
    let img;
    canvas.width = w;
    canvas.height = h;
    img = {
        width: w,
        height: h,
        img: canvas,
        frameH: frameH,
        frameW: frameW,
        handleX: 0,
        handleY: 0,
        height2: frameH,
        width2: frameW,
        rotation: 0,
        isAnim: false,
        scaleX: 1,
        scaleY: 1
    };
    img.ctx = canvas.getContext('2d');
    //TODO:
    img.isAnim = false;
    return img;
};
const SetBuffer = (buffer) => {
    blitzConf.ctxAktif = buffer.ctx;
};
const TileImage = (img, x = 0, y = 0) => {
};
const HandleImage = (img, x, y) => {
    img.handleX = x;
    img.handleY = y;
};
const MidHandle = (img) => {
    img.handleX = Math.floor((img.frameW * img.scaleX) / 2);
    img.handleY = Math.floor((img.frameH * img.scaleY) / 2);
};
const ScaleImage = (img, xScale = 1, yScale = 1) => {
    img.scaleX = xScale;
    img.scaleY = yScale;
    img.width2 = Math.floor(img.width * img.scaleX);
    img.height2 = Math.floor(img.height * img.scaleY);
};
const ResizeImage = (img, w = 1, h = 1) => {
    img.width2 = Math.floor(w);
    img.height2 = Math.floor(h);
    img.scaleX = img.width2 / img.width;
    img.scaleY = img.height2 / img.height;
};
const RotateImage = (img, degree = 0) => {
    img.rotation = degree;
};
const ImageWidth = () => { };
const ImageHeight = () => { };
const ImageXHandle = () => { };
const ImageYHandle = () => { };
const ImageOverlap = () => { };
const ImageColRect = () => { };
const GetPixel = (x, y) => {
    try {
        let data = blitzConf.ctxAktif.getImageData(x, y, 1, 1).data;
        let hasil = [];
        hasil.push(data[0]);
        hasil.push(data[1]);
        hasil.push(data[2]);
        hasil.push(data[3]);
        return hasil;
    }
    catch (e) {
        console.error(e);
    }
    return [0, 0, 0];
};
const SetColor = (r = 255, g = 255, b = 255, a = 1) => {
    blitzConf.ctxAktif.fillStyle = "rgba(" + r + "," + g + "," + b + "," + (a) + ")";
};
const SetPixel = (x, y) => {
    blitzConf.ctxAktif.fillRect(Math.floor(x), Math.floor(y), 1, 1);
};
//TODO: next
const ImagePivot = () => { };
const BackgroundImage = () => { };
const MainLayer = () => { };
const CreateLayer = () => { };
const LayerZ = () => { };
///<reference path="../ha/Window.ts"/>
///<reference path="../ha/Image.ts"/>
///<reference path="../ha/Input.ts"/>
/*
 * INPUT
 */
const InputHit = (type = "", kode = '0') => {
    kode = kode + '';
    if (type == "") {
        if (BLInput.isHit) {
            BLInput.isHit = false;
            return true;
        }
    }
    else if ((BLInput.isHit) && (BLInput.key == kode) && (BLInput.type == type)) {
        BLInput.isHit = false;
        return true;
    }
    else {
        // console.debug("is hit: " + BLInput.isHit + "/type: " + BLInput.type);
    }
    return false;
};
const InputTap = (type = "", kode = '0') => {
    kode = kode + '';
    if (type == "") {
        if (BLInput.isTap) {
            BLInput.isTap = false;
            return true;
        }
    }
    else if ((BLInput.isTap) && (BLInput.key == kode) && (BLInput.type == type)) {
        BLInput.isTap = false;
        return true;
    }
    else {
        // console.debug("is hit: " + BLInput.isHit + "/type: " + BLInput.type);
    }
    return false;
};
const WaitInput = async (type = '', kode = 0) => {
    return new Promise((resolve, _reject) => {
        let check = () => {
            setTimeout(() => {
                if (InputHit(type, kode)) {
                    resolve();
                }
            }, 0);
        };
        check();
    });
};
const InputX = () => {
    return blitzConf.input.x;
};
const InputY = () => {
    return blitzConf.input.y;
};
const InputType = () => {
    return blitzConf.input.type;
};
const InputDragX = () => {
    return blitzConf.input.yDrag;
};
const InputDragY = () => {
    return blitzConf.input.xDrag;
};
const FlushInput = () => {
    blitzConf.input.isHit = false;
    blitzConf.input.isDown = false;
    blitzConf.input.isDrag = false;
    blitzConf.input.isTap = false;
    ha.blitz.input.flush();
};
const InputKey = () => {
    return blitzConf.input.key;
};
const InputDown = () => {
    return blitzConf.input.isDown;
};
/**
 * 	KEYBOARD
 */
const WaitKey = async (kode = "keyb") => {
    return new Promise((resolve, _reject) => {
        let check = () => {
            setTimeout(() => {
                if (InputHit('keyb', kode)) {
                    resolve();
                }
            }, 0);
        };
        check();
    });
};
//KeyDown
//KeyHit
//
/**
 * MOUSE
 */
//MouseHit
//MouseDown
//MouseMove
//MouseDragX
//MouseDragY
//MouseUp
/**
 * INTERFACE
*/
///<reference path="../ha/Window.ts"/>
///<reference path="../ha/Image.ts"/>
///<reference path="../ha/Input.ts"/>
/*
 * 	GRAPHICS
 */
const Graphics = (width = 320, height = 240, gl = true, pixel = true) => {
    let canvas = blitzConf.canvas;
    canvas.el.width = width;
    canvas.el.height = height;
    canvas.el.style.width = 320 + 'px';
    canvas.el.style.height = 240 + 'px';
    canvas.w = width;
    canvas.h = height;
    canvas.gl = gl;
    canvas.pixel = pixel;
    if (gl) {
        blitzConf.canvas.el.classList.add('gl');
    }
    else {
        blitzConf.canvas.el.classList.remove('gl');
    }
    if (pixel) {
        blitzConf.canvas.el.classList.add('pixel');
    }
    ha.blitz.blWindow.windowResize();
};
const Cls = (r = 0, g = 0, b = 0, alpha = 1) => {
    let ctx = blitzConf.ctxAktif;
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
    ctx.fillRect(0, 0, blitzConf.canvas.w, blitzConf.canvas.h);
};
///<reference path="../ha/Window.ts"/>
///<reference path="../ha/Image.ts"/>
///<reference path="../ha/Input.ts"/>
/**
 * MAIN
 */
// declare function Start(): Promise<void>;
// declare function Loop(): Promise<void>;
var blitzConf = {
    canvas: {
        el: null,
        ctx: null,
        w: 320,
        h: 240,
        pixel: true,
        gl: true,
        scaleX: 1,
        scaleY: 1
    },
    input: {
        down: [],
        hit: [],
        isDrag: false,
        xDrag: 0,
        xStart: 0,
        yDrag: 0,
        yStart: 0,
        isDown: false,
        isTap: false,
        timerEnd: 0,
        timerStart: 0,
        x: 0,
        y: 0
    },
    ctxAktif: null
};
blitzConf.canvas.el = window.document.body.querySelector('canvas');
blitzConf.canvas.ctx = blitzConf.canvas.el.getContext('2d');
blitzConf.ctxAktif = blitzConf.canvas.ctx;
const BLCanvas = blitzConf.canvas.el;
const BLInput = blitzConf.input;
BLCanvas.onpointerdown = (e) => {
    e.stopPropagation();
    let pos = ha.blitz.input.BLGetInputPos(e.clientX, e.clientY, blitzConf.canvas.scaleX, blitzConf.canvas.scaleY);
    let input = ha.blitz.input.baru(e.button + '', e.pointerType);
    input.xStart = pos.x;
    input.yStart = pos.y;
    input.x = pos.x;
    input.y = pos.y;
    input.isDown = true;
    input.isTap = false;
    input.isDrag = false;
    input.isHit = true;
    input.key = e.button + '';
    input.type = e.pointerType;
    input.timerStart = Date.now();
    //TODO: dep
    BLInput.xStart = pos.x;
    BLInput.yStart = pos.y;
    BLInput.x = pos.x;
    BLInput.y = pos.y;
    BLInput.isDown = true;
    BLInput.isTap = false;
    BLInput.isDrag = false;
    BLInput.isHit = true;
    BLInput.key = e.button + '';
    BLInput.type = e.pointerType;
    BLInput.timerStart = Date.now();
    // console.debug('down: ');
    // console.debug('type: ' + e.pointerType + '/kode: ' + e.button);
};
BLCanvas.onpointermove = (e) => {
    e.stopPropagation();
    let input = blitzConf.input;
    let input2 = ha.blitz.input.baru(e.button + '', e.pointerType);
    if (input2.isDown) {
        input2.isDrag = true;
        let pos = ha.blitz.input.BLGetInputPos(e.clientX, e.clientY, blitzConf.canvas.scaleX, blitzConf.canvas.scaleY);
        input2.x = pos.x;
        input2.y = pos.y;
        input2.xDrag = input2.x - input2.xStart;
        input2.yDrag = input2.y - input2.yStart;
    }
    //TODO: dep
    if (BLInput.isDown) {
        input.isDrag = true;
        let pos = ha.blitz.input.BLGetInputPos(e.clientX, e.clientY, blitzConf.canvas.scaleX, blitzConf.canvas.scaleY);
        input.x = pos.x;
        input.y = pos.y;
        input.xDrag = input.x - input.xStart;
        input.yDrag = input.y - input.yStart;
    }
};
BLCanvas.onpointerup = (e) => {
    e.stopPropagation();
    let input = blitzConf.input;
    let input2 = ha.blitz.input.baru(e.button + '', e.pointerType);
    if (input2.isDown) {
        input2.isDown = false;
        input2.isDrag = false;
        input2.timerEnd = Date.now();
        input2.isTap = ((input2.timerEnd - input2.timerStart) < 500);
    }
    input.isDown = false;
    input.isDrag = false;
    input.timerEnd = Date.now();
    input.isTap = ((input.timerEnd - input.timerStart) < 500);
};
window.onkeydown = (e) => {
    e.stopPropagation();
    let input = ha.blitz.input.baru(e.key + '', 'keyb');
    if (!e.repeat) {
        // console.debug('key down');
        input.isDown = true;
        input.isDrag = false;
        input.isTap = false;
        input.timerStart = Date.now();
        input.isHit = true;
        input.key = e.key;
        input.type = 'keyb';
        //TODO: dep
        BLInput.isDown = true;
        BLInput.isDrag = false;
        BLInput.isTap = false;
        BLInput.timerStart = Date.now();
        BLInput.isHit = true;
        BLInput.key = e.key;
        BLInput.type = 'keyb';
    }
    else {
        input.isDown = true;
        input.isDrag = false;
        input.isTap = false;
        input.timerStart = Date.now();
        input.key = e.key;
        input.type = 'keyb';
        //TOOD: dep
        BLInput.isDown = true;
        BLInput.isDrag = false;
        BLInput.isTap = false;
        BLInput.timerStart = Date.now();
        BLInput.key = e.key;
        BLInput.type = 'keyb';
    }
};
window.onkeyup = (e) => {
    e.stopPropagation();
    let input = ha.blitz.input.baru(e.key + '', 'keyb');
    input.isDown = false;
    input.isDrag = false;
    input.isTap = false;
    input.timerEnd = Date.now();
    BLInput.isDown = false;
    BLInput.isDrag = false;
    BLInput.isTap = false;
    BLInput.timerEnd = Date.now();
};
window.onresize = async () => {
    ha.blitz.blWindow.windowResize();
};
ha.blitz.blWindow.windowResize();
let _window = window;
window.onload = () => {
    setTimeout(() => {
        SetColor();
        if (typeof _window.Start == "function") {
            _window.Start()
                .then(() => {
                ha.blitz.blWindow.repeat();
            })
                .catch((e) => {
                console.error(e);
            });
        }
        else {
            console.debug('start not found');
            ha.blitz.blWindow.repeat();
        }
    }, 0);
};
const Delay = async (m = 0) => {
    return new Promise((resolve, _reject) => {
        setTimeout(() => {
            resolve();
        }, m);
    });
};
const FPS = () => { };
const Dim = (n1, n2, n3) => {
    //single
    if (!n3 && !n2) {
        let hasil = [];
        for (let i = 0; i < n1; i++) {
            hasil.push(0);
        }
        return hasil;
    }
    //double integer
    if (!n3 && (typeof n2 == 'number')) {
    }
    //single object
    //double object
    return [];
};
/**
 * TEXTS
 */ 
