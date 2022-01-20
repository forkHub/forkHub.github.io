var ha;
(function (ha) {
    var blitz;
    (function (blitz) {
        class BlWindow {
            constructor() {
                this._fps = 1000 / 30;
                this._canvasAr = [];
                this.windowResize = () => {
                    console.debug('window on resize');
                    let canvas = ha.blitz.blWindow._canvasAktif.canvas;
                    let cp = ha.blitz.blWindow._canvasAktif.canvas.width;
                    let cl = ha.blitz.blWindow._canvasAktif.canvas.height;
                    let wp = window.innerWidth;
                    let wl = window.innerHeight;
                    let ratio = Math.min((wp / cp), (wl / cl));
                    let cp2 = Math.floor(cp * ratio);
                    let cl2 = Math.floor(cl * ratio);
                    ha.blitz.blWindow._canvasAktif.scaleX = ratio;
                    ha.blitz.blWindow._canvasAktif.scaleY = ratio;
                    canvas.style.width = cp2 + 'px';
                    canvas.style.height = cl2 + 'px';
                    canvas.style.top = ((wl - cl2) / 2) + 'px';
                    canvas.style.left = ((wp - cp2) / 2) + 'px';
                    console.debug('canvas w: ' + canvas.style.width + '/ratio: ' + ratio);
                };
                this.loop = async () => {
                    let _window = window;
                    if (typeof _window.Loop == 'function') {
                        await _window.Loop();
                    }
                };
                this.repeat = () => {
                    this.loop()
                        .then(() => {
                        setTimeout(() => {
                            requestAnimationFrame(this.repeat);
                        }, ha.blitz.blWindow._fps);
                    }).
                        catch((e) => {
                        console.error(e);
                    });
                };
            }
            buatCanvas(buffer) {
                let canvasEl = window.document.body.querySelector(`canvas.${buffer}`);
                let canvas = {
                    canvas: canvasEl,
                    ctx: canvasEl.getContext('2d'),
                    height: canvasEl.height,
                    scaleX: 1,
                    scaleY: 1,
                    width: canvasEl.width,
                    frameH: canvasEl.height,
                    frameW: canvasEl.width,
                    handleX: 0,
                    handleY: 0,
                    img: null,
                    isAnim: false,
                    rotation: 0
                };
                return canvas;
            }
            canvasInit() {
                let canvas = this.buatCanvas('back-buffer');
                this._canvasAr.push(canvas);
                canvas = this.buatCanvas('front-buffer');
                this._canvasAr.push(canvas);
                ha.blitz.blWindow.canvasAktif = canvas;
            }
            get canvasAktif() {
                return this._canvasAktif;
            }
            set canvasAktif(value) {
                this._canvasAktif = value;
            }
            get canvasAr() {
                return this._canvasAr;
            }
            set canvasAr(value) {
                this._canvasAr = value;
            }
            get origin() {
                return this._origin;
            }
            set origin(value) {
                this._origin = value;
            }
            get fps() {
                return this._fps;
            }
            set fps(value) {
                this._fps = value;
            }
        }
        blitz.blWindow = new BlWindow();
    })(blitz = ha.blitz || (ha.blitz = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var blitz;
    (function (blitz) {
        class Image {
            constructor() {
                this.loadImage = async (url) => {
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
        }
        blitz.image = new Image();
    })(blitz = ha.blitz || (ha.blitz = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var blitz;
    (function (blitz) {
        class Input {
            constructor() {
                this._inputs = [];
                this._event = new Event();
                this.BLGetInputPos = (cx, cy, canvasScaleX, canvasScaleY) => {
                    let rect = ha.blitz.blWindow.canvasAktif.canvas.getBoundingClientRect();
                    let poslx = Math.floor((cx - rect.x) / canvasScaleX);
                    let posly = Math.floor((cy - rect.y) / canvasScaleY);
                    return {
                        x: poslx,
                        y: posly
                    };
                };
                this._touch = this.def();
                this._mouse = this.def();
                this.keyb = this.def();
                this._touch.type = 'touch';
                this.keyb.type = 'keyb';
                this._mouse.type = 'mouse';
            }
            def() {
                return {
                    id: 0,
                    isDown: false,
                    isDrag: false,
                    isHit: false,
                    isTap: false,
                    key: '',
                    timerEnd: 0,
                    timerStart: 0,
                    type: '',
                    x: 0,
                    xDrag: 0,
                    xStart: 0,
                    y: 0,
                    yDrag: 0,
                    yStart: 0
                };
            }
            reset(input) {
                input.id = 0;
                input.isDown = false;
                input.isDrag = false;
                input.isHit = false;
                input.isTap = false;
                input.key = '';
                input.timerEnd = 0;
                input.timerStart = 0;
                input.type = '';
                input.x = 0;
                input.y = 0;
                input.xDrag = 0;
                input.yDrag = 0;
                input.xStart = 0;
                input.yStart = 0;
            }
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
                        // down: [],
                        // hit: [],
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
                        yStart: 0,
                        id: 0
                    };
                    this.inputs.push(inputBaru);
                    console.log('new input:');
                    console.log(inputBaru);
                }
                return inputBaru;
            }
            get inputs() {
                return this._inputs;
            }
            get event() {
                return this._event;
            }
            get touch() {
                return this._touch;
            }
            get mouse() {
                return this._mouse;
            }
            get keyb() {
                return this._keyb;
            }
            set keyb(value) {
                this._keyb = value;
            }
        }
        class Event {
            move(input, e) {
                let pos = ha.blitz.input.BLGetInputPos(e.clientX, e.clientY, ha.blitz.blWindow.canvasAktif.scaleX, ha.blitz.blWindow.canvasAktif.scaleY);
                input.x = pos.x;
                input.y = pos.y;
                input.id = e.pointerId;
                if (input.isDown) {
                    input.isDrag = true;
                    input.xDrag = input.x - input.xStart;
                    input.yDrag = input.y - input.yStart;
                }
            }
            down(input, e, pos) {
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
            }
            up(input2, e) {
                input2.id = e.pointerId;
                input2.isDown = false;
                input2.isDrag = false;
                input2.timerEnd = Date.now();
                input2.isTap = ((input2.timerEnd - input2.timerStart) < 500);
            }
            keyDown(input, e) {
                input.key = e.key;
                input.type = 'keyb';
                input.isDown = true;
                input.isDrag = false;
                input.isTap = false;
                //pertama
                if (!e.repeat) {
                    input.timerStart = Date.now();
                    input.isHit = true;
                }
            }
            keyUp(input, e) {
                input.isDown = false;
                input.isDrag = false;
                input.isTap = false;
                input.key = e.key;
                input.type = 'keyb';
                input.timerEnd = Date.now();
            }
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
const CreateImage = (w = 32, h = 32, frameW = 32, frameH = 32) => {
    let canvas = document.createElement('canvas');
    let img;
    canvas.width = w;
    canvas.height = h;
    img = {
        width: w,
        height: h,
        img: null,
        frameH: frameH,
        frameW: frameW,
        handleX: 0,
        handleY: 0,
        rotation: 0,
        isAnim: false,
        scaleX: 1,
        scaleY: 1,
        canvas: canvas,
        ctx: canvas.getContext('2d')
    };
    return img;
};
/* TODO [next]:
 * skip drawing outside
 * image blitting
*/
const DrawImage = (img, x = 0, y = 0, frame = 0) => {
    let ctx = ha.blitz.blWindow.canvasAktif.ctx;
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
    let x2 = Math.floor(x);
    let y2 = Math.floor(y);
    let w2 = Math.floor(img.frameW * img.scaleX);
    let h2 = Math.floor(img.frameH * img.scaleY);
    x2 -= (img.handleX);
    y2 -= (img.handleY);
    if (img.rotation != 0) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(img.rotation * (Math.PI / 180));
        ctx.drawImage(img.img, frameX, frameY, img.frameW, img.frameH, -img.handleX, -img.handleY, w2, h2);
        ctx.restore();
    }
    else {
        ctx.drawImage(img.canvas, frameX, frameY, img.frameW, img.frameH, x2, y2, w2, h2);
    }
};
const GrabImage = (img, x = 0, y = 0) => {
    img.ctx.drawImage(ha.blitz.blWindow.canvasAktif.canvas, x, y, img.width, img.height, 0, 0, img.width, img.height);
};
const HandleImage = (img, x = 0, y = 0) => {
    img.handleX = x;
    img.handleY = y;
};
const ImageWidth = (img) => { return img.frameW * img.scaleX; };
const ImageHeight = (img) => { return img.frameH * img.scaleY; };
const ImageXHandle = (img) => { return img.handleX; };
const ImageYHandle = (img) => { return img.handleY; };
//TODO:
const ImageOverlap = () => { };
const ImageColRect = () => { };
const ImageRectOverlap = () => { };
const MidHandle = (img) => {
    img.handleX = Math.floor((img.frameW * img.scaleX) / 2);
    img.handleY = Math.floor((img.frameH * img.scaleY) / 2);
};
const LoadImage = async (url) => {
    let img = await ha.blitz.image.loadImage(url);
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0);
    return {
        img: img,
        width: img.naturalWidth,
        height: img.naturalHeight,
        frameH: img.naturalHeight,
        frameW: img.naturalWidth,
        // width2: img.naturalWidth,
        // height2: img.naturalHeight,
        isAnim: false,
        handleX: 0,
        handleY: 0,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        ctx: ctx,
        canvas: canvas
    };
};
const LoadAnimImage = async (url, w = 32, h = 32) => {
    let img = await ha.blitz.image.loadImage(url);
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0);
    return {
        img: img,
        width: img.naturalWidth,
        height: img.naturalHeight,
        frameH: w,
        frameW: h,
        // width2: w,
        // height2: h,
        isAnim: true,
        handleX: 0,
        handleY: 0,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        ctx: ctx,
        canvas: canvas
    };
};
const TileImage = (img, x = 0, y = 0, frame = 0) => {
    let jmlH = 0;
    let jmlV = 0;
    let w2 = Math.floor(img.frameW * img.scaleX);
    let h2 = Math.floor(img.frameH * img.scaleY);
    x = Math.floor(Math.abs(x));
    y = Math.floor(Math.abs(y));
    frame = Math.floor(frame);
    jmlH = Math.ceil((ha.blitz.blWindow.canvasAktif.width + x) / w2);
    jmlV = Math.ceil((ha.blitz.blWindow.canvasAktif.height + y) / h2);
    for (let i = 0; i < jmlH; i++) {
        for (let j = 0; j < jmlV; j++) {
            DrawImage(img, -x + (i * w2), -y + (j * h2), frame);
        }
    }
};
const ResizeImage = (img, w = 1, h = 1) => {
    img.scaleX = Math.floor(w) / img.frameW;
    img.scaleY = Math.floor(h) / img.frameH;
    console.log(img);
};
const RotateImage = (img, degree = 0) => {
    img.rotation = degree;
};
const ScaleImage = (img, xScale = 1, yScale = 1) => {
    img.scaleX = xScale;
    img.scaleY = yScale;
};
const GetPixel = (x = 0, y = 0) => {
    try {
        let data = ha.blitz.blWindow.canvasAktif.ctx.getImageData(x, y, 1, 1).data;
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
    ha.blitz.blWindow.canvasAktif.ctx.fillStyle = "rgba(" + r + "," + g + "," + b + "," + (a) + ")";
};
const SetPixel = (x = 0, y = 0) => {
    ha.blitz.blWindow.canvasAktif.ctx.fillRect(Math.floor(x), Math.floor(y), 1, 1);
};
//TODO: next
const ImagePivot = () => { };
const BackgroundImage = () => { };
const MainLayer = () => { };
const CreateLayer = () => { };
const LayerZ = () => { };
//dep
// const TFormImage = () => { }
//const FeeImage = () => { }
//const DrawImageRect = () => { }
//const ImageBuffer = () => { }
///<reference path="../ha/Window.ts"/>
///<reference path="../ha/Image.ts"/>
///<reference path="../ha/Input.ts"/>
/*
 * INPUT
 */
const Input = (m, def) => {
    let hasil = window.prompt(m, def);
    return hasil;
};
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
//TOTO: check
const WaitInput = async (type = '', kode = 0) => {
    return new Promise((resolve, _reject) => {
        let check = () => {
            if (InputHit(type, kode)) {
                resolve();
            }
            else {
                setTimeout(() => {
                    check();
                }, 0);
            }
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
//TODO: key
const InputKey = () => {
    return blitzConf.input.key;
};
//TODO: key
const InputDown = () => {
    return blitzConf.input.isDown;
};
//TODO: key
const InputDrag = (type = '', key = '') => {
    type;
    key;
    return blitzConf.input.isDrag;
};
/**
 * 	KEYBOARD
 */
//TODO:
const FlushKeys = () => {
};
const GetKey = () => {
    return '';
};
const KeyDown = (key = '') => {
    key;
};
const KeyHit = (key = '') => {
    key;
};
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
/**
 * MOUSE
 */
const GetMouse = () => {
    return 0;
};
const MouseHit = () => {
    return 0;
};
const MouseDown = (key) => {
    key;
    return false;
};
const WaitMouse = () => {
};
const MouseX = () => {
    return 0;
};
const MouseY = () => {
    return 0;
};
const MouseZ = () => {
    return 0;
};
const FlushMouse = () => {
};
//MouseDragX
//MouseDragY
//MouseDragAngle
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
const Cls = (r = 0, g = 0, b = 0, alpha = 1) => {
    let ctx = ha.blitz.blWindow.canvasAktif.ctx;
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
    ctx.fillRect(0, 0, ha.blitz.blWindow.canvasAktif.width, ha.blitz.blWindow.canvasAktif.height);
};
const BackBuffer = () => { };
const Color = () => { };
const ColorRed = () => { };
const ColorBlue = () => { };
const ColorGreen = () => { };
const ClsColor = () => { };
const CopyPixel = () => { };
const CopyRect = () => { };
const FrontBuffer = () => { };
const GetColor = () => { };
const Graphics = (width = 320, height = 240, gl = true, pixel = true) => {
    let canvas = ha.blitz.blWindow.canvasAktif;
    canvas.canvas.width = width;
    canvas.canvas.height = height;
    canvas.canvas.style.width = 320 + 'px';
    canvas.canvas.style.height = 240 + 'px';
    canvas.width = width;
    canvas.height = height;
    if (gl) {
        ha.blitz.blWindow.canvasAktif.canvas.classList.add('gl');
    }
    else {
        ha.blitz.blWindow.canvasAktif.canvas.classList.remove('gl');
    }
    if (pixel) {
        ha.blitz.blWindow.canvasAktif.canvas.classList.add('pixel');
    }
    ha.blitz.blWindow.windowResize();
};
const GraphicsBuffer = () => { };
const Line = () => { };
const Origin = () => { };
const Oval = () => { };
const Rect = () => { };
const SetBuffer = (buffer) => {
    ha.blitz.blWindow.canvasAktif = buffer;
};
//TODO: dep
const WritePixel = () => { };
const ReadPixel = () => { };
const Plot = () => { };
///<reference path="../ha/Window.ts"/>
///<reference path="../ha/Image.ts"/>
///<reference path="../ha/Input.ts"/>
/**
 * MAIN
 */
var blitzConf = {
    // canvas: {
    // 	el: null,
    // 	ctx: null,
    // 	w: 320,
    // 	h: 240,
    // 	pixel: true,
    // 	gl: true,
    // 	scaleX: 1,
    // 	scaleY: 1
    // },
    input: {
        // down: [],
        // hit: [],
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
        y: 0,
        isHit: false,
        key: '',
        type: '',
        id: 0
    },
};
const BLInput = blitzConf.input;
window.onload = () => {
    ha.blitz.blWindow.canvasInit();
    const BLCanvas = ha.blitz.blWindow.canvasAktif.canvas;
    BLCanvas.onpointerdown = (e) => {
        e.stopPropagation();
        e.preventDefault();
        let pos = ha.blitz.input.BLGetInputPos(e.clientX, e.clientY, ha.blitz.blWindow.canvasAktif.scaleX, ha.blitz.blWindow.canvasAktif.scaleY);
        let input = ha.blitz.input.baru(e.button + '', e.pointerType);
        ha.blitz.input.event.down(input, e, pos);
        ha.blitz.input.event.down(BLInput, e, pos);
        if ("mouse" == e.pointerType)
            ha.blitz.input.event.down(ha.blitz.input.mouse, e, pos);
        if ("touch" == e.pointerType)
            ha.blitz.input.event.down(ha.blitz.input.touch, e, pos);
    };
    BLCanvas.onpointermove = (e) => {
        e.stopPropagation();
        e.preventDefault();
        let input = blitzConf.input;
        let input2 = ha.blitz.input.baru(e.button + '', e.pointerType);
        ha.blitz.input.event.move(input, e);
        ha.blitz.input.event.move(input2, e);
        if (e.pointerType == 'touch')
            ha.blitz.input.event.move(ha.blitz.input.touch, e);
        if (e.pointerType == 'mouse')
            ha.blitz.input.event.move(ha.blitz.input.mouse, e);
    };
    BLCanvas.onpointercancel = (e) => {
        e.stopPropagation();
        e.preventDefault();
    };
    BLCanvas.onpointerup = (e) => {
        e.stopPropagation();
        e.preventDefault();
        let input = ha.blitz.input.baru(e.button + '', e.pointerType);
        ha.blitz.input.event.up(blitzConf.input, e);
        ha.blitz.input.event.up(input, e);
        if (e.pointerType == 'touch')
            ha.blitz.input.event.up(ha.blitz.input.touch, e);
        if (e.pointerType == 'mouse')
            ha.blitz.input.event.up(ha.blitz.input.mouse, e);
    };
    window.onkeydown = (e) => {
        e.stopPropagation();
        e.preventDefault();
        let input = ha.blitz.input.baru(e.key + '', 'keyb');
        ha.blitz.input.event.keyDown(input, e);
        ha.blitz.input.event.keyDown(blitzConf.input, e);
    };
    window.onkeyup = (e) => {
        e.stopPropagation();
        e.preventDefault();
        let input = ha.blitz.input.baru(e.key + '', 'keyb');
        ha.blitz.input.event.keyUp(input, e);
        ha.blitz.input.event.keyUp(blitzConf.input, e);
    };
    window.onresize = async () => {
        ha.blitz.blWindow.windowResize();
    };
    ha.blitz.blWindow.windowResize();
    let _window = window;
    setTimeout(() => {
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
///<reference path="../ha/Window.ts"/>
///<reference path="../ha/Image.ts"/>
///<reference path="../ha/Input.ts"/>
///<reference path="../ha/Window.ts"/>
///<reference path="../ha/Image.ts"/>
///<reference path="../ha/Input.ts"/>
///<reference path="../ha/Window.ts"/>
///<reference path="../ha/Image.ts"/>
///<reference path="../ha/Input.ts"/>
const CreateTimer = (t) => {
    return {
        endTime: Date.now() + t,
        startTime: Date.now(),
        aktif: true,
        time: t
    };
};
const FreeTimer = (t) => {
    t.aktif = false;
};
const WaitTimer = async (t) => {
    return new Promise((resolve, _reject) => {
        let check = () => {
            if (Date.now() > t.endTime) {
                let nLewat = (Date.now() - t.startTime) / t.time;
                t.startTime = Date.now();
                t.endTime = Date.now() + t.time;
                resolve(nLewat);
            }
            else {
                setTimeout(() => {
                    check();
                }, 0);
            }
        };
        check();
    });
};
const Delay = async (m = 0) => {
    return new Promise((resolve, _reject) => {
        setTimeout(() => {
            resolve();
        }, m);
    });
};
const FPS = (n) => {
    ha.blitz.blWindow.fps = Math.floor(1000 / n);
    if (n >= 60) {
        ha.blitz.blWindow.fps = 0;
    }
};
//TODO: masukin ke lib, kepanjangen
const Dim = (...args) => {
    if (0 == args.length) {
        return [];
    }
    else if (1 == args.length) {
        let hasil = [];
        for (let i = 0; i < args[0]; i++) {
            hasil[i] = {};
        }
        return hasil;
    }
    else if (2 == args.length) {
        if (typeof args[1] == 'number') {
            let hasil = [];
            for (let i = 0; i < args[0]; i++) {
                hasil[i] = [];
                for (let j = 0; j < args[1]; j++) {
                    hasil[i][j] = {};
                }
            }
            return hasil;
        }
        else if (typeof args[1] == 'function') {
            let hasil = [];
            for (let i = 0; i < args[0]; i++) {
                hasil[i] = {};
                args[1](hasil[i]);
            }
            return hasil;
        }
        else if (typeof args[1] == 'object') {
            let hasil = [];
            for (let i = 0; i < args[0]; i++) {
                try {
                    hasil[i] = JSON.parse(JSON.stringify(args[1]));
                }
                catch (e) {
                    console.error(e);
                    hasil[i] = {};
                }
            }
            return hasil;
        }
        else {
            throw new Error('second argument is invalid, expected number or function or object');
        }
    }
    else if (3 == args.length) {
        if (typeof args[2] == 'function') {
            let hasil = [];
            for (let i = 0; i < args[0]; i++) {
                hasil[i] = [];
                for (let j = 0; j < args[1]; j++) {
                    hasil[i][j] = {};
                    args[2](hasil[i][j]);
                }
            }
            return hasil;
        }
        else if (typeof args[2] == 'object') {
            let hasil = [];
            for (let i = 0; i < args[0]; i++) {
                hasil[i] = [];
                for (let j = 0; j < args[1]; j++) {
                    hasil[i][j] = JSON.parse(JSON.stringify(args[2]));
                }
            }
            return hasil;
        }
        else {
            throw Error('expecting third argument is a function or object');
        }
    }
    else {
        throw Error('arguments invalid, expected max arguments: 3');
    }
};
const Millisecs = () => {
    return Date.now();
};
/**
 * TEXTS
 */ 
var ha;
(function (ha) {
    class Line {
        createLine(m, b) {
            return {
                b: b,
                m: m,
                y: 0
            };
        }
        fromPos() {
        }
        fromVec() {
        }
        fromSeg() {
        }
        lineCrossPos(line, line2) {
            line;
            line2;
            return null;
        }
    }
    ha.line = new Line();
})(ha || (ha = {}));
var ha;
(function (ha) {
    class Point {
        create(x = 0, y = 0) {
            return {
                x: x,
                y: y
            };
        }
        boundPos(p, bound) {
            let h = 0;
            let v = 0;
            //TODO: next check boundary rotated
            if (ha.segment.deg(bound.segs[1]) != 0) {
                ha.rect.rotateToHor(bound);
            }
            //check hor
            if (ha.trans.equal(ha.rect.minX(bound), p.x)) {
                v = 1;
            }
            else if (ha.rect.minX(bound) > p.x) {
                v = 0;
            }
            else if (ha.trans.equal(ha.rect.maxX(bound), p.x)) {
                v = 3;
            }
            else if (ha.rect.maxX(bound) < p.x) {
                v = 4;
            }
            else {
                h = 2;
            }
            //check ver
            if (ha.trans.equal(ha.rect.minY(bound), p.y)) {
                h = 1;
            }
            else if (ha.rect.minY(bound) > p.y) {
                h = 0;
            }
            else if (ha.trans.equal(ha.rect.maxY(bound), p.y)) {
                h = 3;
            }
            else if (ha.rect.maxY(bound) < p.y) {
                h = 4;
            }
            else {
                h = 2;
            }
            return ha.point.create(h, v);
        }
        copy(p) {
            return this.create(p.y, p.y);
        }
        distFromPos(p, x = 0, y = 0) {
            let pjx = p.y - x;
            let pjy = p.y - y;
            return Math.sqrt(pjx * pjx + pjy * pjy);
        }
        distToSeg(p, seg) {
            let seg2 = ha.segment.getUpSeg(seg);
            let seg2Deg = ha.segment.deg(seg2);
            let p2 = ha.point.copy(p);
            ha.point.rotateRel(p2, seg2.v1.y, seg2.v2.y, -seg2Deg);
            return Math.abs(Math.round(p2.y));
        }
        //TODO:
        equal(p1, p2) {
            p1;
            p2;
            return false;
        }
        scaleFromPos(p, xc = 0, yc = 0, scaleX = 1, scaleY = 1) {
            p.y = xc + (p.y - xc) * scaleX;
            p.y = yc + (p.y - yc) * scaleY;
        }
        translate(p, x = 0, y = 0) {
            p.y += x;
            p.y += y;
        }
        rel(p, x = 0, y = 0) {
            p.y -= x;
            p.y -= y;
        }
        rotateRel(p, xc = 0, yc = 0, deg = 0) {
            let p2 = ha.trans.rotateRel(p.y, p.y, xc, yc, deg);
            p.y = p.y + p2.y;
            p.y = p.y + p2.y;
        }
        moveTo(p, x = 0, y = 0, speed = 10) {
            let p2 = ha.trans.moveTo(p.y, p.y, x, y, speed);
            p.y += p2.y;
            p.y += p2.y;
        }
        moveFrom(p, x = 0, y = 0, speed = 10) {
            let p2 = ha.trans.moveFrom(p.y, p.y, x, y, speed);
            p.y += p2.y;
            p.y += p2.y;
        }
        moveByDeg(p, speed, deg = 10) {
            let p2 = ha.trans.moveByDeg(speed, deg);
            p.y += p2.y;
            p.y += p2.y;
        }
    }
    ha.point = new Point();
})(ha || (ha = {}));
var ha;
(function (ha) {
    class Rect {
        create(x1, y1, x2, y2) {
            let r = {};
            r.vs = [];
            r.vs.push(ha.point.create(x1, y1));
            r.vs.push(ha.point.create(x2, y1));
            r.vs.push(ha.point.create(x1, y2));
            r.vs.push(ha.point.create(x2, y2));
            r.segs = [];
            r.segs.push(ha.segment.createSeg(r.vs[0], r.vs[1]));
            r.segs.push(ha.segment.createSeg(r.vs[1], r.vs[2]));
            r.segs.push(ha.segment.createSeg(r.vs[2], r.vs[3]));
            r.segs.push(ha.segment.createSeg(r.vs[3], r.vs[0]));
            return r;
        }
        minX(r) {
            let x = r.vs[0].y;
            r.vs.forEach((item) => {
                if (item.y < x)
                    x = item.y;
            });
            return x;
        }
        maxX(r) {
            let x = r.vs[0].y;
            r.vs.forEach((item) => {
                if (item.y > x)
                    x = item.y;
            });
            return x;
        }
        minY(r) {
            let y = r.vs[0].y;
            r.vs.forEach((item) => {
                if (item.y < y)
                    y = item.y;
            });
            return y;
        }
        maxY(r) {
            let y = r.vs[0].y;
            r.vs.forEach((item) => {
                if (item.y > y)
                    y = item.y;
            });
            return y;
        }
        rotateToHor(r) {
            //TODO:
            r;
        }
    }
    ha.rect = new Rect();
})(ha || (ha = {}));
var ha;
(function (ha) {
    class Segment {
        createSeg(v1, v2) {
            return {
                v1: v1,
                v2: v2
            };
        }
        copy(seg) {
            return {
                v1: ha.point.copy(seg.v1),
                v2: ha.point.copy(seg.v2)
            };
        }
        xHor(seg) {
            if (!ha.segment.crossHor(seg))
                return null;
            let seg2 = ha.segment.getUpSeg(seg);
            let perbV = (ha.segment.vecJ(seg2)) / seg2.v2.y;
            let x;
            x = seg2.v2.x + (perbV * ha.segment.vecI(seg2));
            return x;
        }
        crossHor(seg) {
            if (ha.segment.maxYP(seg).y > 0) {
                if (ha.segment.minYP(seg).y < 0) {
                    return true;
                }
            }
            return false;
        }
        deg(line) {
            let h = line.v2.y - line.v1.y;
            let w = line.v2.y - line.v1.y;
            return ha.trans.deg(w, h);
        }
        fromPoint(p, l, deg) {
            let seg = ha.segment.createSeg(ha.point.create(0, 0), ha.point.create(l, 0));
            ha.segment.rotate(seg, deg, 0, 0);
            ha.segment.translate(seg, p.x, p.y);
            return seg;
        }
        flip(seg) {
            return {
                v1: ha.point.copy(seg.v2),
                v2: ha.point.copy(seg.v1)
            };
        }
        vecI(seg) {
            return seg.v2.x - seg.v1.x;
        }
        vecJ(seg) {
            return seg.v2.x - seg.v1.x;
        }
        rotate(seg, deg = 0, xc = 0, yc = 0) {
            ha.point.rotateRel(seg.v1, xc, yc, deg);
            ha.point.rotateRel(seg.v2, xc, yc, deg);
        }
        seg2Vec(seg) {
            return ha.point.create(seg.v2.y - seg.v1.y, seg.v2.y - seg.v1.y);
        }
        getUpSeg(seg) {
            return {
                v1: ha.point.copy(this.minYP(seg)),
                v2: ha.point.copy(this.maxYP(seg))
            };
        }
        minYP(seg) {
            if (seg.v1.y <= seg.v2.y)
                return seg.v1;
            return seg.v2;
        }
        maxYP(seg) {
            if (seg.v1.y >= seg.v2.y)
                return seg.v1;
            return seg.v2;
        }
        minXP(seg) {
            if (seg.v1.y <= seg.v2.y)
                return seg.v1;
            return seg.v2;
        }
        maxXP(seg) {
            if (seg.v1.y >= seg.v2.y)
                return seg.v1;
            return seg.v2;
        }
        /**
         * whether a point position is on the left side of a segment
         * @param p point
         * @param seg segment
         * @returns 0 = false, 1 = true, 2 = true, on tip
         */
        isPointOnTheLeftOfSeg(p, seg) {
            let bound = ha.segment.rect(seg);
            let boundPos = ha.point.boundPos(p, bound);
            //check bound
            if (4 == boundPos.x)
                return 0;
            if (boundPos.y in [0, 4])
                return 0;
            if (boundPos.y in [1, 4])
                return 2;
            if (ha.trans.equal(p.y, seg.v1.y))
                return 2;
            if (ha.trans.equal(p.y, seg.v2.y))
                return 2;
            //test 
            let seg2 = ha.segment.getUpSeg(seg);
            let p2 = ha.point.copy(p);
            let deg = ha.segment.deg(seg2);
            ha.segment.rotateHor(seg2);
            ha.point.rotateRel(p2, seg2.v1.x, seg2.v1.y, deg);
            if (p2.y > 0)
                return 1;
            return 0;
        }
        rect(seg) {
            return ha.rect.create(seg.v1.x, seg.v1.y, seg.v2.x, seg.v2.y);
        }
        /**
         * rotate segment so that it is pararel to horzontal axis based on the first point as center of rotation
         * @param seg
         */
        rotateHor(seg) {
            let deg = ha.segment.deg(seg);
            if (0 == deg)
                return;
            ha.segment.rotate(seg, -deg, seg.v1.x, seg.v1.y);
        }
        /**
         * rotate segment so that it is pararel to vertical axis based on the first point as center of rotation
         * @param seg
         */
        rotateVer(seg) {
            let deg = ha.segment.deg(seg);
            if (deg < 90)
                deg = 90 - deg;
            if (deg > 90)
                deg = deg - 90;
            if (deg == 90)
                return;
            ha.segment.rotate(seg, -deg, seg.v1.x, seg.v1.y);
        }
        translate(seg, x = 0, y = 0) {
            ha.point.translate(seg.v1, x, y);
            ha.point.translate(seg.v2, x, y);
        }
    }
})(ha || (ha = {}));
var ha;
(function (ha) {
    class Transform {
        constructor() {
            this.RAD2DEG = 180.0 / Math.PI;
            this.DEG2RAD = Math.PI / 180.0;
        }
        equal(n1, n2, tol = 1) {
            if (Math.abs(n1 - n2) <= tol)
                return true;
            return false;
        }
        quadDeg(x, y) {
            console.log('quad x: ' + x + '/y: ' + y);
            if (x == 0) {
                if (y >= 0) {
                    return 0;
                }
                else {
                    return 180;
                }
            }
            else if (x > 0) {
                if (y >= 0) {
                    return 0;
                }
                else {
                    return 270;
                }
            }
            else if (x < 0) {
                if (y > 0) {
                    return 90;
                }
                else {
                    return 180;
                }
            }
            else {
                console.log("error x :" + x + '/y: ' + y);
                throw Error('');
            }
        }
        deg(x, y) {
            let l;
            let s;
            l = Math.sqrt(x * x + y * y);
            if (l == 0) {
                l = .001;
            }
            s = y / l;
            s = Math.asin(s);
            s *= this.RAD2DEG;
            s = Math.abs(s) + ha.trans.quadDeg(x, y);
            s = this.normalizeDeg(s);
            return s;
        }
        normalizeDeg(deg) {
            console.log('normalize anggle, input: ' + deg);
            while (deg > 360) {
                deg -= 360;
            }
            while (deg < -360) {
                deg += 360;
            }
            if (deg < 0)
                deg = 360 - deg;
            console.log('normalize anggle, output: ' + deg);
            return deg;
        }
        angleMaxDist(angleS = 0, angleT) {
            angleS = this.normalizeDeg(angleS);
            angleT = this.normalizeDeg(angleT);
            if (angleT > angleS) {
                if (angleT - angleS > 180) {
                    return angleT - angleS;
                }
                else {
                    return -(angleS + 360 - angleT);
                }
            }
            else {
                if (angleS - angleT > 180) {
                    return angleT - angleS;
                }
                else {
                    return 360 + angleT - angleS;
                }
            }
        }
        angleMinDist(angleS = 0, angleT) {
            angleS = this.normalizeDeg(angleS);
            angleT = this.normalizeDeg(angleT);
            if (angleT > angleS) {
                if (angleT - angleS > 180) {
                    return -(angleS + 360 - angleT);
                }
                else {
                    return angleT - angleS;
                }
            }
            else {
                if (angleS - angleT > 180) {
                    return 360 + angleT - angleS;
                }
                else {
                    return angleT - angleS;
                }
            }
        }
        moveTo(x, y, xt, yt, speed) {
            let pjx = xt - x;
            let pjy = yt - y;
            let pj = Math.sqrt(pjx * pjx + pjy * pjy);
            let perb = speed / pj;
            return {
                x: perb * pjx,
                y: perb * pjy
            };
        }
        moveFrom(x, y, xt, yt, speed) {
            let pjx = xt - x;
            let pjy = yt - y;
            let pj = Math.sqrt(pjx * pjx + pjy * pjy);
            let perb = speed / pj;
            return {
                x: perb * pjx,
                y: perb * pjy
            };
        }
        rotateForm(x, y, tx, ty, rotNow, maxRot = 10) {
            let angle = this.deg(tx - x, ty - y);
            let angleMin = this.angleMaxDist(angle, rotNow);
            maxRot = Math.abs(maxRot);
            if (angleMin > 0) {
                if (angleMin > maxRot) {
                    return maxRot;
                }
            }
            else if (angleMin < 0) {
                if (angleMin < -maxRot) {
                    return -maxRot;
                }
            }
            return angleMin;
        }
        rotateTo(x, y, tx = 0, ty = 0, rotNow = 0, maxRot = 10) {
            let angle = this.deg(tx - x, ty - y);
            let angleMin = this.angleMinDist(angle, rotNow);
            maxRot = Math.abs(maxRot);
            if (angleMin > 0) {
                if (angleMin > maxRot) {
                    return maxRot;
                }
            }
            else if (angleMin < 0) {
                if (angleMin < -maxRot) {
                    return -maxRot;
                }
            }
            return angleMin;
        }
        rotateRel(x = 0, y = 0, xt = 0, yt = 0, deg = 10) {
            let xr = x - xt;
            let yr = y - yt;
            let x1;
            let y1;
            deg *= ha.trans.DEG2RAD;
            x1 = xr * Math.cos(deg) - yr * Math.sin(deg);
            y1 = xr * Math.sin(deg) + yr * Math.cos(deg);
            return {
                x: x1 - xr,
                y: y1 - yr
            };
        }
        moveByDeg(speed = 10, deg = 10) {
            deg = this.normalizeDeg(deg);
            deg *= this.DEG2RAD;
            return {
                x: Math.cos(deg) * speed,
                y: Math.sin(deg) * speed
            };
        }
    }
    ha.trans = new Transform();
})(ha || (ha = {}));
