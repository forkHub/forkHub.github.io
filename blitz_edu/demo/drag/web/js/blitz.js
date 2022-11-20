var ha;
(function (ha) {
    var blitz;
    (function (blitz) {
        class Main {
            _fps = 1000 / 30;
            _origin;
            _canvasAr = [];
            _canvasAktif;
            buatCanvas(canvasEl) {
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
                    rotation: 0,
                    rect: ha.rect.create()
                };
                return canvas;
            }
            init(canvasBelakang, canvasDepan) {
                let canvas = this.buatCanvas(canvasBelakang);
                this._canvasAr.push(canvas);
                canvas = this.buatCanvas(canvasDepan);
                this._canvasAr.push(canvas);
                ha.blitz.main.canvasAktif = canvas;
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
        blitz.main = new Main();
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
            resetImageRect(img) {
                let rect = img.rect;
                let p;
                p = rect.vs[0];
                p.x = 0;
                p.y = 0;
                p = rect.vs[1];
                p.x = img.frameW;
                p.y = 0;
                p = rect.vs[2];
                p.x = img.frameW;
                p.y = img.frameH;
                p = rect.vs[3];
                p.x = 0;
                p.y = img.frameH;
            }
            rectToImageTransform(image, x, y) {
                let rect = image.rect;
                let p;
                let x2 = image.frameW * image.scaleX;
                let y2 = image.frameH * image.scaleY;
                p = rect.vs[1];
                p.x = x2;
                p.y = 0;
                p = rect.vs[2];
                p.x = x2;
                p.y = y2;
                p = rect.vs[3];
                p.x = 0;
                p.y = y2;
                ha.rect.translate(rect, x, y);
                ha.rect.translate(rect, -image.handleX, -image.handleY);
                ha.rect.rotate(rect, image.rotation, x, y);
            }
        }
        blitz.image = new Image();
    })(blitz = ha.blitz || (ha.blitz = {}));
})(ha || (ha = {}));
const CreateImage = (w = 32, h = 32, frameW = 32, frameH = 32) => {
    let canvas = document.createElement('canvas');
    let img;
    canvas.width = w;
    canvas.height = h;
    let rect = ha.rect.create(0, 0, frameW, frameH);
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
        ctx: canvas.getContext('2d'),
        rect: rect
    };
    return img;
};
const CopyImage = (src) => {
    return {
        canvas: src.canvas,
        ctx: src.ctx,
        frameH: src.frameH,
        frameW: src.frameW,
        handleX: src.handleX,
        handleY: src.handleY,
        height: src.height,
        img: src.img,
        isAnim: src.isAnim,
        rect: ha.rect.copy(src.rect),
        rotation: src.rotation,
        scaleX: src.scaleX,
        scaleY: src.scaleY,
        width: src.width
    };
};
const DrawImage = (img, x = 0, y = 0, frame = 0) => {
    let ctx = ha.blitz.main.canvasAktif.ctx;
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
    img.ctx.drawImage(ha.blitz.main.canvasAktif.canvas, x, y, img.width, img.height, 0, 0, img.width, img.height);
};
const HandleImage = (img, x = 0, y = 0) => {
    img.handleX = x;
    img.handleY = y;
};
const ImageWidth = (img) => { return img.frameW * img.scaleX; };
const ImageHeight = (img) => { return img.frameH * img.scaleY; };
const ImageXHandle = (img) => { return img.handleX; };
const ImageYHandle = (img) => { return img.handleY; };
const ImageOverlap = () => { };
const ImageCollide = (img1, x1, y1, img2, x2, y2) => {
    ha.blitz.image.resetImageRect(img1);
    ha.blitz.image.rectToImageTransform(img1, x1, y1);
    ha.blitz.image.resetImageRect(img2);
    ha.blitz.image.rectToImageTransform(img2, x2, y2);
    return ha.rect.collide(img1.rect, img2.rect);
};
const ImageDotCollide = (img1, x1, y1, x2, y2) => {
    ha.blitz.image.resetImageRect(img1);
    ha.blitz.image.rectToImageTransform(img1, x1, y1);
    return ha.rect.collideDot(img1.rect, x2, y2);
};
const ImageBoundOverlap = () => {
    return false;
};
const MidHandle = (img) => {
    img.handleX = Math.floor((img.frameW * img.scaleX) / 2);
    img.handleY = Math.floor((img.frameH * img.scaleY) / 2);
};
const LoadImage = async (url) => {
    let img = await ha.blitz.image.loadImage(url);
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    let rect;
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0);
    rect = ha.rect.create(0, 0, img.naturalWidth, img.naturalHeight);
    return {
        img: img,
        width: img.naturalWidth,
        height: img.naturalHeight,
        frameH: img.naturalHeight,
        frameW: img.naturalWidth,
        isAnim: false,
        handleX: 0,
        handleY: 0,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        ctx: ctx,
        canvas: canvas,
        rect: rect
    };
};
const LoadAnimImage = async (url, fw = 32, fh = 32) => {
    let img = await ha.blitz.image.loadImage(url);
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    let rect;
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0);
    rect = ha.rect.create(0, 0, fw, fh);
    return {
        img: img,
        width: img.naturalWidth,
        height: img.naturalHeight,
        frameH: fw,
        frameW: fh,
        isAnim: true,
        handleX: 0,
        handleY: 0,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        ctx: ctx,
        canvas: canvas,
        rect: rect
    };
};
const TileImage = (img, x = 0, y = 0, frame = 0) => {
    let jmlH = 0;
    let jmlV = 0;
    let w2 = Math.floor(img.frameW * img.scaleX);
    let h2 = Math.floor(img.frameH * img.scaleY);
    while (x < 0) {
        x += w2;
    }
    while (y < 0) {
        y += h2;
    }
    x -= w2;
    y -= h2;
    frame = Math.floor(frame);
    jmlH = Math.ceil((ha.blitz.main.canvasAktif.width + Math.abs(x)) / w2);
    jmlV = Math.ceil((ha.blitz.main.canvasAktif.height + Math.abs(y)) / h2);
    for (let i = 0; i < jmlH; i++) {
        for (let j = 0; j < jmlV; j++) {
            DrawImage(img, x + (i * w2), y + (j * h2), frame);
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
        let data = ha.blitz.main.canvasAktif.ctx.getImageData(x, y, 1, 1).data;
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
    Color(r, g, b, a);
};
const SetPixel = (x = 0, y = 0) => {
    ha.blitz.main.canvasAktif.ctx.fillRect(Math.floor(x), Math.floor(y), 1, 1);
};
const ImagePivot = () => { };
const BackgroundImage = () => { };
const MainLayer = () => { };
const CreateLayer = () => { };
const LayerZ = () => { };
const Prompt = (m, def) => {
    let hasil = window.prompt(m, def);
    return hasil;
};
const InputHit = () => {
    let hit = ha.input.inputGlobal.hit;
    ha.input.inputGlobal.hit = 0;
    return hit;
};
const WaitInput = async () => {
    while (true) {
        if (InputHit() > 0)
            return;
        Delay(30);
    }
};
const InputX = () => {
    return ha.input.inputGlobal.x;
};
const InputY = () => {
    return ha.input.inputGlobal.y;
};
const InputDragX = () => {
    return ha.input.inputGlobal.xDrag;
};
const InputDragY = () => {
    return ha.input.inputGlobal.yDrag;
};
const FlushInput = () => {
    ha.input.flush();
};
const InputDown = () => {
    return ha.input.inputGlobal.isDown;
};
const InputDrag = () => {
    return ha.input.inputGlobal.isDrag;
};
const FlushKeys = () => {
    ha.input.flushByInput(ha.input.keybGlobal);
    ha.input.flushByType('keyb');
};
const GetKey = () => {
    return ha.input.keybGlobal.key;
};
const KeyIsDown = (key = '') => {
    if ("" == key) {
        return ha.input.keybGlobal.isDown;
    }
    else {
        let input = ha.input.getInput(key, 'keyb');
        if (input) {
            return input.isDown;
        }
        return false;
    }
};
const KeyHit = (key = '') => {
    if ("" == key) {
        let n = ha.input.keybGlobal.hit;
        ha.input.keybGlobal.hit = 0;
        return (n);
    }
    else {
        let input = ha.input.getInput(key, 'keyb');
        let n = 0;
        if (input) {
            n = input.hit;
            input.hit = 0;
        }
        return n;
    }
};
const WaitKey = async (kode = "") => {
    console.log('wait key: ' + kode);
    let ulang = true;
    while (ulang) {
        if (KeyHit(kode) > 0)
            ulang = false;
        await Delay(30);
    }
    console.log('wait key end');
};
const GetMouse = () => {
    return parseInt(ha.input.mouseGlobal.key);
};
const MouseHit = (button = -1) => {
    if (button == -1) {
    }
    else {
    }
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
const Cls = (r = 0, g = 0, b = 0, alpha = 1) => {
    let ctx = ha.blitz.main.canvasAktif.ctx;
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
    ctx.fillRect(0, 0, ha.blitz.main.canvasAktif.width, ha.blitz.main.canvasAktif.height);
};
const BackBuffer = () => { };
const Color = (r = 0, g = 0, b = 0, a = 1) => {
    let ctx = ha.blitz.main.canvasAktif.ctx;
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
    ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
};
const ColorRed = () => { };
const ColorBlue = () => { };
const ColorGreen = () => { };
const ClsColor = () => { };
const CopyPixel = () => { };
const CopyRect = () => { };
const FrontBuffer = () => { };
const GetColor = () => { };
const Graphics = (width = 320, height = 240, gl = true, pixel = true) => {
    let canvas = ha.blitz.main.canvasAktif;
    canvas.canvas.width = width;
    canvas.canvas.height = height;
    canvas.width = width;
    canvas.height = height;
    if (gl) {
        ha.blitz.main.canvasAktif.canvas.classList.add('gl');
    }
    else {
        ha.blitz.main.canvasAktif.canvas.classList.remove('gl');
    }
    if (pixel) {
        ha.blitz.main.canvasAktif.canvas.classList.add('pixel');
    }
};
const GraphicsBuffer = () => { };
const Line = (x1, y1, x2, y2) => {
    let ctx = ha.blitz.main.canvasAktif.ctx;
    x1 = Math.floor(x1);
    y1 = Math.floor(y1);
    x2 = Math.floor(x2);
    y2 = Math.floor(y2);
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
};
const Origin = () => { };
const Oval = () => { };
const Rect = (x1, y1, x2, y2) => {
    let ctx = ha.blitz.main.canvasAktif.ctx;
    ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
};
const SetBuffer = (buffer) => {
    ha.blitz.main.canvasAktif = buffer;
};
const WritePixel = () => { };
const ReadPixel = () => { };
const Plot = () => { };
const Delay = async (m = 0) => {
    return new Promise((resolve, _reject) => {
        setTimeout(() => {
            resolve();
        }, m);
    });
};
const FPS = (n) => {
    ha.blitz.main.fps = Math.floor(1000 / n);
    if (n >= 60) {
        ha.blitz.main.fps = 0;
    }
};
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
