"use strict";
var Basik;
(function (Basik) {
    class Graphic {
        static get context() {
            return Graphic.canvas.getContext('2d');
        }
        static get canvas() {
            if (!Graphic._canvas) {
                Graphic._canvas = document.body.querySelector('canvas');
            }
            if (!Graphic._canvas) {
                Graphic._canvas = document.createElement('canvas');
                document.body.appendChild(Graphic._canvas);
            }
            return Graphic._canvas;
        }
        static Pause() {
            debugger;
        }
        static handleWindowResize() {
            if (!Graphic._skalaOtomatis)
                return;
            let canvas = Graphic.canvas;
            let cp = Graphic.canvas.width;
            let cl = Graphic.canvas.height;
            let wp = window.innerWidth;
            let wl = window.innerHeight;
            let ratio = Math.min((wp / cp), (wl / cl));
            let cp2 = Math.floor(cp * ratio);
            let cl2 = Math.floor(cl * ratio);
            canvas.style.position = 'fixed';
            canvas.style.zIndex = '1';
            canvas.style.width = cp2 + 'px';
            canvas.style.height = cl2 + 'px';
            canvas.style.top = ((wl - cl2) / 2) + 'px';
            canvas.style.left = ((wp - cp2) / 2) + 'px';
        }
        static buatCanvas(canvasEl) {
            let canvas = new Basik.ImageObj();
            canvas.canvas = canvasEl;
            canvas.ctx = canvasEl.getContext('2d');
            canvas.lebar = canvasEl.height;
            canvas.panjang = canvasEl.width;
            canvas.frameH = canvasEl.height;
            canvas.frameW = canvasEl.width;
            canvas.rect = Basik.Kotak.buat();
            canvas.load = true;
            canvas.panjangDiSet = true;
            canvas.lebarDiSet = true;
            return canvas;
        }
        static backupWarna() {
            Graphic.warnaBackup.b = Graphic.biru;
            Graphic.warnaBackup.h = Graphic.hijau;
            Graphic.warnaBackup.m = Graphic.merah;
            Graphic.warnaBackup.t = Graphic.transparan;
        }
        static restoreWarna() {
            Graphic.biru = Graphic.warnaBackup.b;
            Graphic.hijau = Graphic.warnaBackup.h;
            Graphic.merah = Graphic.warnaBackup.m;
            Graphic.transparan = Graphic.warnaBackup.t;
            Graphic.updateStyleWarna();
        }
        static Cls(red = 0, hijau = 0, biru = 0, transparan = 100) {
            let ctx = Graphic.context;
            Graphic.backupWarna();
            ctx.clearRect(0, 0, parseInt(Graphic.canvas.style.width), parseInt(Graphic.canvas.style.height));
            ctx.fillStyle = `rgba(${red}, ${hijau}, ${biru}, ${transparan / 100})`;
            ctx.fillRect(0, 0, parseInt(Graphic.canvas.style.width), parseInt(Graphic.canvas.style.height));
            Graphic.restoreWarna();
        }
        static FillColor(r = 0, g = 0, b = 0, a = 100) {
            let h = Graphic;
            h.merah = r;
            h.biru = b;
            h.hijau = g;
            h.transparan = a / 100;
            h.updateStyleWarna();
        }
        static StrokeColor(r = 0, g = 0, b = 0, a = 100) {
            Graphic.context.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
        }
        static NoColor() {
            Graphic.context.strokeStyle = 'none';
        }
        static updateStyleWarna() {
            Graphic.context.fillStyle = `rgba(${Graphic.merah}, ${Graphic.hijau}, ${Graphic.biru}, ${Graphic.transparan})`;
        }
        static Hijau() {
            return Graphic.hijau;
        }
        static Merah() {
            return Graphic.merah;
        }
        static Biru() {
            return Graphic.biru;
        }
        static Transparan() {
            return Math.floor(Graphic.transparan * 100);
        }
        static Start(panjang = 320, lebar = 240, canvas = null, fullScreen = true, input = true) {
            if (canvas) {
                Graphic._canvas = canvas;
            }
            Graphic._skalaOtomatis = fullScreen;
            console.log('inisialisasi');
            Graphic.Grafis2(panjang, lebar, Graphic._skalaOtomatis);
            if (input) {
                Basik.Input.init(Graphic.canvas);
            }
            window.addEventListener("resize", () => {
                Graphic.handleWindowResize();
            });
            setTimeout(() => {
                Graphic.handleWindowResize();
            }, 100);
            Basik.Teks.Rata("center");
            Basik.Teks.Goto(169, 10);
            Graphic.FillColor(255, 255, 255, 100);
            Graphic.context.strokeStyle = "#ffffff";
        }
        static Grafis2(p = 320, l = 240, fullScreen) {
            let canvas = Graphic.canvas;
            canvas.width = p;
            canvas.height = l;
            if (fullScreen) {
                canvas.style.width = p + 'px';
                canvas.style.height = l + 'px';
                canvas.style.padding = '0px';
                canvas.style.margin = '0px';
            }
            setTimeout(() => {
                Graphic.handleWindowResize();
            }, 0);
        }
        static Garis(Ax, Ay, Bx, By) {
            let ctx = Graphic.context;
            Ax = Math.floor(Ax);
            Ay = Math.floor(Ay);
            Bx = Math.floor(Bx);
            By = Math.floor(By);
            ctx.beginPath();
            ctx.moveTo(Ax, Ay);
            ctx.lineTo(Bx, By);
            ctx.stroke();
        }
        static Kotak(x1, y1, x2, y2, isi = false, garis = true, rotasi = 0) {
            let ctx = Graphic.context;
            rotasi;
            if (isi) {
                ctx.fillRect(x1, y1, x2 - x1, y2 - y1);
            }
            if (garis) {
                ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
            }
        }
        static Oval(x = 0, y = 0, radius, skalaX = 1, skalaY = .5, rotasi = 0) {
            let ctx = Graphic.context;
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(rotasi * (Math.PI / 180));
            ctx.scale(skalaX, skalaY);
            ctx.beginPath();
            ctx.arc(0, 0, radius, 0, 2 * Math.PI, false);
            ctx.restore();
            ctx.stroke();
        }
        static get merah() {
            return Graphic._merah;
        }
        static set merah(value) {
            Graphic._merah = value;
        }
        static get hijau() {
            return Graphic._hijau;
        }
        static set hijau(value) {
            Graphic._hijau = value;
        }
        static get biru() {
            return Graphic._biru;
        }
        static set biru(value) {
            Graphic._biru = value;
        }
        static get transparan() {
            return Graphic._transparan;
        }
        static set transparan(value) {
            Graphic._transparan = value;
        }
    }
    Graphic._skalaOtomatis = true;
    Graphic._merah = 0;
    Graphic._hijau = 0;
    Graphic._biru = 0;
    Graphic._transparan = 0;
    Graphic.warnaBackup = {
        m: 0,
        b: 0,
        h: 0,
        t: 1
    };
    Basik.Graphic = Graphic;
})(Basik || (Basik = {}));
var ha;
(function (ha) {
    var be;
    (function (be) {
        class Cache {
            constructor() {
                this.files = [];
            }
            getGbr(url) {
                for (let i = 0; i < this.files.length; i++) {
                    if (this.files[i].url == url) {
                        console.log('ambil dari cache: ' + url);
                        return this.files[i].img;
                    }
                }
                return null;
            }
            setFile(url, img) {
                let img2;
                img2 = this.getGbr(url);
                if (img2) {
                    return;
                }
                console.log('cache: ' + url);
                this.files.push({
                    url: url,
                    img: img
                });
            }
        }
        be.cache = new Cache();
    })(be = ha.be || (ha.be = {}));
})(ha || (ha = {}));
var Basik;
(function (Basik) {
    class Config {
        constructor() {
            this.stroke = new Stroke();
            this.fill = new Stroke();
        }
    }
    class RGB {
        constructor() {
            this._m = 0;
            this._g = 0;
            this._b = 0;
        }
        get b() {
            return this._b;
        }
        set b(value) {
            this._b = value;
        }
        get g() {
            return this._g;
        }
        set g(value) {
            this._g = value;
        }
        get m() {
            return this._m;
        }
        set m(value) {
            this._m = value;
        }
    }
    class Stroke {
        constructor() {
            this._tebal = 1;
            this.rgb = new RGB();
            this._aktif = false;
        }
        get aktif() {
            return this._aktif;
        }
        set aktif(value) {
            this._aktif = value;
        }
        get tebal() {
            return this._tebal;
        }
        set tebal(value) {
            this._tebal = value;
        }
    }
    Basik.config = new Config();
})(Basik || (Basik = {}));
var Basik;
(function (Basik) {
    let Data;
    (function (Data) {
        class Obj {
            constructor() {
                this._id = 0;
                this._nama = '';
            }
            get id() {
                return this._id;
            }
            set id(value) {
                this._id = value;
            }
            get entry() {
                return this._entry;
            }
            set entry(value) {
                this._entry = value;
            }
            get nama() {
                return this._nama;
            }
            set nama(value) {
                this._nama = value;
            }
        }
        Data.Obj = Obj;
    })(Data = Basik.Data || (Basik.Data = {}));
})(Basik || (Basik = {}));
var Dict;
(function (Dict) {
    function create() {
        let d = new DictObj();
        return d;
    }
    Dict.create = create;
    function setAttr(d, key, value) {
        for (let i = 0; i < d.attrs.length; i++) {
            if (d.attrs[i].key == key) {
                d.attrs[i].value = value;
                return;
            }
        }
        d.attrs.push(new Attr(key, value));
    }
    Dict.setAttr = setAttr;
    function value(d, key) {
        for (let i = 0; i < d.attrs.length; i++) {
            if (d.attrs[i].key == key) {
                return d.attrs[i].value;
            }
        }
        return null;
    }
    Dict.value = value;
    class DictObj {
        constructor() {
            this.attrs = [];
        }
    }
    class Attr {
        constructor(key, value) {
            this._key = '';
            this._key = key;
            this._value = value;
        }
        get key() {
            return this._key;
        }
        get value() {
            return this._value;
        }
        set value(value) {
            this._value = value;
        }
    }
})(Dict || (Dict = {}));
var ha;
(function (ha) {
    var be;
    (function (be) {
        class Id {
            static id() {
                Id._id++;
                return Id._id + '';
            }
        }
        Id._id = Date.now();
        be.Id = Id;
    })(be = ha.be || (ha.be = {}));
})(ha || (ha = {}));
var EInput;
(function (EInput) {
    EInput["TOUCH"] = "touch";
    EInput["MOUSE"] = "mouse";
    EInput["KEYB"] = "keyb";
    EInput["DEF"] = "";
})(EInput || (EInput = {}));
var Basik;
(function (Basik) {
    class EventHandler {
        move(input, buffer, e) {
            let pos = Input.getPos(e.clientX, e.clientY, buffer);
            input.x = pos.x;
            input.y = pos.y;
            input.id = e.pointerId;
            if (input.isDown) {
                if (input.isDrag == false) {
                    input.dragJml++;
                }
                input.isDrag = true;
                input.xDrag = input.x - input.xStart;
                input.yDrag = input.y - input.yStart;
            }
        }
        down(input, key, type, pos) {
            if (!input.isDown) {
                input.hit++;
            }
            input.xStart = pos.x;
            input.yStart = pos.y;
            input.xDrag = 0;
            input.yDrag = 0;
            input.x = pos.x;
            input.y = pos.y;
            input.isDown = true;
            input.isTap = false;
            input.isDrag = false;
            input.key = key;
            input.type = type;
            input.timerStart = Date.now();
        }
        up(input) {
            if (input.isDrag) {
                input.dragSelesaiJml++;
            }
            input.isDown = false;
            input.isDrag = false;
            input.timerEnd = Date.now();
            let isTap = this.checkTap(input);
            input.isTap = (isTap == '');
            if (input.isTap) {
                if (Input.debug) {
                    console.debug('tap ok');
                }
                input.tapJml++;
            }
            else {
                input.upJml++;
                if (Input.debug) {
                    console.debug('tap failed');
                    console.debug(isTap);
                }
            }
        }
        checkTap(input) {
            if (Math.abs(input.xDrag) > 5)
                return "drag x " + input.xDrag;
            if (Math.abs(input.yDrag) > 5)
                return "drag y " + input.xDrag;
            let timer = input.timerEnd - input.timerStart;
            if ((timer) > 500)
                return "timer " + timer;
            return '';
        }
    }
    class Input {
        constructor() {
        }
        static get debug() {
            return Input._debug;
        }
        static set debug(value) {
            Input._debug = value;
        }
        static JmlTap() {
            let tap = Input.global.tapJml;
            Input.global.tapJml = 0;
            return tap;
        }
        static JmlUp() {
            let up = Input.global.upJml;
            Input.global.tapJml = 0;
            return up;
        }
        static JmlDragSelesai() {
            let s = Input.global.dragSelesaiJml;
            Input.global.dragSelesaiJml = 0;
            return s;
        }
        static InputType() {
            return Input.global.type;
        }
        static InputHit() {
            let hit = Input.global.hit;
            Input.global.hit = 0;
            return hit;
        }
        static InputXAwal() {
            return Input.global.xStart;
        }
        static InputYAwal() {
            return Input.global.yStart;
        }
        static InputX() {
            return Input.global.x;
        }
        static InputY() {
            return Input.global.y;
        }
        static GeserX() {
            return Input.global.xDrag;
        }
        static GeserY() {
            return Input.global.yDrag;
        }
        static FlushInput() {
            Input.flush();
        }
        static JmlDragMulai() {
            let hasil = Input.global.dragJml;
            Input.global.dragJml = 0;
            return hasil;
        }
        static Pencet() {
            return Input.global.isDown;
        }
        static Geser() {
            return Input.global.isDrag;
        }
        static getMouseKeyId(e) {
            if (e.pointerType == 'touch') {
                return e.pointerId + '';
            }
            else if (e.pointerType == 'mouse') {
                return e.button + '';
            }
            throw Error('');
        }
        static init(buffer) {
            console.log('input init');
            Input._inputGlobal = this.buatInputDefault();
            buffer.style.touchAction = 'none';
            buffer.addEventListener("pointerdown", (e) => {
                e.stopPropagation();
                e.preventDefault();
                let pos = Input.getPos(e.clientX, e.clientY, buffer);
                let key = Input.getMouseKeyId(e);
                let input = Input.baru(key, e.pointerType);
                Input.event.down(input, key, e.pointerType, pos);
                Input.event.down(this._inputGlobal, key, e.pointerType, pos);
                Basik.sprInt.inputDown(pos, e.pointerId);
            });
            buffer.addEventListener("pointermove", (e) => {
                e.stopPropagation();
                e.preventDefault();
                let pos = Input.getPos(e.clientX, e.clientY, buffer);
                let key = this.getMouseKeyId(e);
                let input = this.baru(key, e.pointerType);
                Input.event.move(input, buffer, e);
                Input.event.move(this.global, buffer, e);
                Basik.sprInt.inputMove(pos, e.pointerId);
            });
            buffer.addEventListener("pointerout", (e) => {
                e.stopPropagation();
                e.preventDefault();
            });
            buffer.addEventListener("pointercancel", (e) => {
                e.stopPropagation();
                e.preventDefault();
            });
            buffer.addEventListener("pointerup", (e) => {
                e.stopPropagation();
                e.preventDefault();
                let key = this.getMouseKeyId(e);
                let input = this.baru(key, e.pointerType);
                Input.event.up(input);
                Input.event.up(this.global);
                Basik.ImgImpl.daftar.forEach((item) => {
                    if (e.pointerId == item.inputId) {
                        if (item.down) {
                            item.jmlHit++;
                        }
                        item.down = false;
                        item.dragged = false;
                    }
                });
            });
        }
        static buatInputDefault() {
            return {
                id: 0,
                isDown: false,
                isDrag: false,
                isTap: false,
                key: '',
                timerEnd: 0,
                timerStart: 0,
                type: EInput.DEF,
                x: 0,
                xDrag: 0,
                xStart: 0,
                y: 0,
                yDrag: 0,
                yStart: 0,
                hit: 0,
                dragJml: 0,
                dragSelesaiJml: 0,
                tapJml: 0,
                upJml: 0
            };
        }
        static flush() {
            while (Input.inputs.length > 0) {
                Input.inputs.pop();
            }
            Input.flushByInput(Input._inputGlobal);
        }
        static flushByInput(input) {
            input.isDown = false;
            input.isDrag = false;
            input.isTap = false;
            input.hit = 0;
            input.tapJml = 0;
            input.dragJml = 0;
            input.dragSelesaiJml = 0;
        }
        static getInput(key, inputType) {
            let inputHasil;
            for (let i = 0; i < Input.inputs.length; i++) {
                let input = Input.inputs[i];
                if (input.type == inputType && input.key == key) {
                    inputHasil = input;
                    return inputHasil;
                }
            }
            return inputHasil;
        }
        static baru(keyId, inputType) {
            let input = Input.getInput(keyId, inputType);
            if (!input) {
                input = {
                    key: keyId,
                    type: inputType,
                    isDown: false,
                    isDrag: false,
                    isTap: false,
                    timerEnd: 0,
                    timerStart: 0,
                    x: 0,
                    xDrag: 0,
                    xStart: 0,
                    y: 0,
                    yDrag: 0,
                    yStart: 0,
                    id: 0,
                    hit: 0,
                    dragJml: 0,
                    dragSelesaiJml: 0,
                    tapJml: 0,
                    upJml: 0
                };
                Input.inputs.push(input);
            }
            return input;
        }
        static get inputs() {
            return Input._inputs;
        }
        static get event() {
            return Input._evt;
        }
        static get global() {
            return Input._inputGlobal;
        }
    }
    Input._inputs = [];
    Input._debug = false;
    Input._evt = new EventHandler();
    Input.getPos = (cx, cy, c) => {
        let r = c.getBoundingClientRect();
        let cSclX = parseInt(window.getComputedStyle(c).width) / c.width;
        let cSclY = parseInt(window.getComputedStyle(c).height) / c.height;
        let poslx = Math.floor((cx - r.x) / cSclX);
        let posly = Math.floor((cy - r.y) / cSclY);
        return {
            x: poslx,
            y: posly
        };
    };
    Basik.Input = Input;
})(Basik || (Basik = {}));
var Basik;
(function (Basik) {
    class Mat {
        static Jarak(x1, y1, x2, y2) {
            return Math.hypot(x2 - x1, y2 - y1);
        }
        static Sudut(x, y) {
            return Basik.Transform.sudut(x, y);
        }
        static Pi() { return Math.PI; }
        static Int(n) { return parseInt(n); }
        static Float(n) { return parseFloat(n); }
        static Floor(n) { return Math.floor(n); }
        static Ceil(n) { return Math.ceil(n); }
        static Sgn(n) {
            if (n > 0)
                return 1;
            if (n < 0)
                return -1;
            return 0;
        }
        static Abs(n) { return Math.abs(n); }
        ;
        static Mod(a, b) { return a % b; }
        static Sqr(n) { return Math.sqrt(n); }
        static Sin(n) { return Math.sin(n * Math.PI / 180); }
        static Cos(n) { return Math.cos(n * Math.PI / 180); }
        static Tan(n) { return Math.tan(n * Math.PI / 180); }
        static Clamp(n, min, max) {
            if (n < min)
                return min;
            if (n > max)
                return max;
            return n;
        }
    }
    Basik.Mat = Mat;
})(Basik || (Basik = {}));
var Basik;
(function (Basik) {
    class Point {
        constructor(x = 0, y = 0) {
            this.x = x;
            this.y = y;
        }
        get x() {
            return this._x;
        }
        set x(value) {
            this._x = value;
        }
        get y() {
            return this._y;
        }
        set y(value) {
            this._y = value;
        }
        static create(x = 0, y = 0) {
            return new Point(x, y);
        }
        static copy(p1, p2) {
            p2.x = p1.x;
            p2.y = p1.y;
        }
        static clone(p) {
            let h = Point.create(p.x, p.y);
            return h;
        }
        static sama(p1, p2) {
            if (false == Basik.Transform.equal(p1.x, p2.x))
                return false;
            if (false == Basik.Transform.equal(p1.y, p2.y))
                return false;
            return true;
        }
        static putarPoros(p, xc = 0, yc = 0, deg = 0) {
            Basik.Transform.rotateRel(p.x, p.y, xc, yc, deg);
            p.x = Basik.Transform.lastX;
            p.y = Basik.Transform.lastY;
        }
        static posDist(p, xt, yt, jrk) {
            let jrkA;
            let i;
            let j;
            let rasio;
            let hasil = Point.create();
            jrkA = Basik.Transform.jarak(p.x, p.y, xt, yt);
            i = xt - p.x;
            j = yt - p.y;
            rasio = jrkA / jrk;
            hasil.x = i * rasio;
            hasil.y = j * rasio;
            hasil.x = xt - hasil.x;
            hasil.y = yt - hasil.y;
            return hasil;
        }
        static posPolar(jarak, sudut, xt, yt) {
            let hasil = Point.create();
            hasil.x = jarak * Math.cos(sudut * Basik.Transform.DEG2RAD);
            hasil.y = jarak * Math.sin(sudut * Basik.Transform.DEG2RAD);
            hasil.x += xt;
            hasil.y += yt;
            return hasil;
        }
    }
    Basik.Point = Point;
})(Basik || (Basik = {}));
var Basik;
(function (Basik) {
    class Segment {
        constructor(A = new Basik.Point(), B = new Basik.Point()) {
            this.A = A;
            this.B = B;
        }
        get A() {
            return this._A;
        }
        set A(value) {
            this._A = value;
        }
        get B() {
            return this._B;
        }
        set B(value) {
            this._B = value;
        }
        static create(v1 = new Basik.Point(), v2 = new Basik.Point()) {
            return new Segment(v1, v2);
        }
        static boundCollide(seg1, seg2) {
            if (Segment.maxX(seg1) < Segment.minX(seg2))
                return false;
            if (Segment.minX(seg1) > Segment.maxX(seg2))
                return false;
            if (Segment.maxY(seg1) < Segment.minY(seg2))
                return false;
            if (Segment.minY(seg1) > Segment.maxY(seg2))
                return false;
            return true;
        }
        static collide(seg1, seg2) {
            let bound = Segment.boundCollide(seg1, seg2);
            if (!bound)
                return false;
            let seg2Copy = Segment.clone(seg2);
            let seg1Copy = Segment.clone(seg1);
            let deg = Segment.deg(seg2);
            Segment.rotate(seg2Copy, -deg, seg2.A.x, seg2.A.y);
            Segment.rotate(seg1Copy, -deg, seg2.A.x, seg2.A.y);
            if (!Segment.boundCollide(seg1Copy, seg2Copy))
                return false;
            Segment.translate(seg1Copy, -seg2.A.x, -seg2.A.y);
            Segment.translate(seg2Copy, -seg2.A.x, -seg2.A.y);
            if (!Segment.crossHor(seg1Copy)) {
                return false;
            }
            let idx = Segment.xHorIdx(seg1Copy);
            let x = Segment.getXAtIdx(seg1Copy, idx);
            if (x > Segment.maxX(seg2Copy))
                return false;
            if (x < Segment.minX(seg2Copy))
                return false;
            return true;
        }
        static copy(seg1, seg2) {
            Basik.Point.copy(seg1.A, seg2.B);
            Basik.Point.copy(seg1.B, seg2.B);
        }
        static clone(seg) {
            return new Segment(Basik.Point.clone(seg.A), Basik.Point.clone(seg.B));
        }
        static crossHor(seg) {
            if (Segment.maxY(seg) > 0) {
                if (Segment.minY(seg) < 0) {
                    return true;
                }
            }
            return false;
        }
        static deg(line) {
            let j = line.B.y - line.A.y;
            let i = line.B.x - line.A.x;
            return Basik.Transform.sudut(i, j);
        }
        static getXAtIdx(seg, idx) {
            return seg.A.x + (idx * Segment.vecI(seg));
        }
        static getYAtIdx(seg, idx) {
            return seg.A.y + (idx * Segment.vecJ(seg));
        }
        static vecI(seg) {
            return seg.B.x - seg.A.x;
        }
        static vecJ(seg) {
            return seg.B.y - seg.A.y;
        }
        static rotate(seg, deg = 0, xc = 0, yc = 0) {
            Basik.Point.putarPoros(seg.A, xc, yc, deg);
            Basik.Point.putarPoros(seg.B, xc, yc, deg);
        }
        static minX(seg) {
            return Math.min(seg.A.x, seg.B.x);
        }
        static maxX(seg) {
            return Math.max(seg.A.x, seg.B.x);
        }
        static minY(seg) {
            return Math.min(seg.A.y, seg.B.y);
        }
        static maxY(seg) {
            return Math.max(seg.A.y, seg.B.y);
        }
        static translate(seg, x = 0, y = 0) {
            seg.A.x += x;
            seg.A.y += y;
            seg.B.x += x;
            seg.B.y += y;
        }
        static xHorIdx(seg) {
            if (!Segment.crossHor(seg))
                return NaN;
            let idx = 0;
            idx = (0 - seg.A.y) / (seg.B.y - seg.A.y);
            return idx;
        }
    }
    Basik.Segment = Segment;
})(Basik || (Basik = {}));
var Basik;
(function (Basik) {
    class Kotak {
        constructor() {
            this.vs = [];
            this.segs = [];
        }
        static buat(x1 = 0, y1 = 0, x2 = 0, y2 = 0) {
            let r = new Kotak();
            r.vs.push(Basik.Point.create(x1, y1));
            r.vs.push(Basik.Point.create(x2, y1));
            r.vs.push(Basik.Point.create(x2, y2));
            r.vs.push(Basik.Point.create(x1, y2));
            r.segs.push(Basik.Segment.create(r.vs[0], r.vs[1]));
            r.segs.push(Basik.Segment.create(r.vs[1], r.vs[2]));
            r.segs.push(Basik.Segment.create(r.vs[2], r.vs[3]));
            r.segs.push(Basik.Segment.create(r.vs[3], r.vs[0]));
            return r;
        }
        static copy(r) {
            let hasil = Kotak.buat();
            Kotak.copyInfo(r, hasil);
            return hasil;
        }
        static copyInfo(r1, r2) {
            for (let i = 0; i < r1.segs.length; i++) {
                Basik.Segment.copy(r1.segs[i], r2.segs[i]);
            }
        }
        static collideBound(r1, r2) {
            if (Kotak.maxX(r1) < Kotak.minX(r2)) {
                return false;
            }
            if (Kotak.minX(r1) > Kotak.maxX(r2)) {
                return false;
            }
            if (Kotak.maxY(r1) < Kotak.minY(r2)) {
                return false;
            }
            if (Kotak.minY(r1) > Kotak.maxY(r2)) {
                return false;
            }
            return true;
        }
        static collide(r1, r2) {
            let bound = Kotak.collideBound(r1, r2);
            if (!bound)
                return false;
            for (let i = 0; i < r1.segs.length; i++) {
                for (let j = 0; j < r2.segs.length; j++) {
                    if (Basik.Segment.collide(r1.segs[i], r2.segs[j])) {
                        return true;
                    }
                }
            }
            return false;
        }
        static collideDotBound(r, d) {
            if (d.x < Kotak.minX(r)) {
                return false;
            }
            if (d.x > Kotak.maxX(r)) {
                return false;
            }
            if (d.y < Kotak.minY(r)) {
                return false;
            }
            if (d.y > Kotak.maxY(r)) {
                return false;
            }
            return true;
        }
        static collideDot(r, x, y) {
            let r2 = Kotak.copy(r);
            let p = Basik.Point.create(x, y);
            let d = Basik.Segment.deg(r2.segs[0]);
            let pRot = r2.vs[0];
            if (!Kotak.collideDotBound(r, p)) {
                return false;
            }
            Kotak.rotate(r2, -d, pRot.x, pRot.y, false);
            Basik.Point.putarPoros(p, pRot.x, pRot.y, -d);
            if (!Kotak.collideDotBound(r2, p)) {
                return false;
            }
            return true;
        }
        static minX(r) {
            let x = r.vs[0].x;
            r.vs.forEach((item) => {
                if (item.x < x)
                    x = item.x;
            });
            return x;
        }
        static maxX(r) {
            let x = r.vs[0].x;
            r.vs.forEach((item) => {
                if (item.x > x)
                    x = item.x;
            });
            return x;
        }
        static minY(r) {
            let y = r.vs[0].y;
            r.vs.forEach((item) => {
                if (item.y < y)
                    y = item.y;
            });
            return y;
        }
        static maxY(r) {
            let y = r.vs[0].y;
            r.vs.forEach((item) => {
                if (item.y > y)
                    y = item.y;
            });
            return y;
        }
        static translate(rect, x, y) {
            rect.vs.forEach((v) => {
                v.x += x;
                v.y += y;
            });
        }
        static rotate(r, deg, xc = 0, yc, copy = true) {
            let r2;
            if (copy) {
                r2 = Kotak.copy(r);
            }
            else {
                r2 = r;
            }
            r2.vs.forEach((p) => {
                Basik.Point.putarPoros(p, xc, yc, deg);
            });
            return r2;
        }
    }
    Basik.Kotak = Kotak;
})(Basik || (Basik = {}));
var Basik;
(function (Basik) {
    class Transform {
        static get lastX() {
            return Transform._lastX;
        }
        static get lastY() {
            return Transform._lastY;
        }
        static equal(n1, n2, toleransi = 1) {
            if (Math.abs(n1 - n2) <= toleransi)
                return true;
            return false;
        }
        static quadDeg2(x, y, deg) {
            if (x == 0) {
                if (y == 0) {
                    return deg;
                }
                else if (y > 0) {
                    return deg;
                }
                else if (y < 0) {
                    return 360 - Math.abs(deg);
                }
            }
            else if (x > 0) {
                if (y == 0) {
                    return deg;
                }
                else if (y > 0) {
                    return deg;
                }
                else if (y < 0) {
                    return 360 - Math.abs(deg);
                }
            }
            else if (x < 0) {
                if (y == 0) {
                    return 180;
                }
                else if (y > 0) {
                    return 180 - Math.abs(deg);
                }
                else if (y < 0) {
                    return 180 + Math.abs(deg);
                }
            }
            throw Error();
        }
        static sudut(x, y) {
            let l;
            let sin;
            l = Math.sqrt(x * x + y * y);
            if (l == 0) {
                l = .00001;
            }
            sin = y / l;
            sin = Math.asin(sin);
            sin *= Transform.RAD2DEG;
            sin = Transform.quadDeg2(x, y, sin);
            sin = Transform.normalizeDeg(sin);
            return sin;
        }
        static normalizeDeg(deg) {
            while (deg >= 360) {
                deg -= 360;
            }
            while (deg <= -360) {
                deg += 360;
            }
            if (deg < 0)
                deg = 360 + deg;
            return deg;
        }
        static degDistMax(angleS = 0, angleT) {
            angleS = Transform.normalizeDeg(angleS);
            angleT = Transform.normalizeDeg(angleT);
            let deg = Transform.degDistMin(angleS, angleT);
            if (deg >= 0) {
                return -(360 - deg);
            }
            else {
                return (360 - Math.abs(deg));
            }
        }
        static degDistMin(angleS = 0, angleT) {
            angleS = Transform.normalizeDeg(angleS);
            angleT = Transform.normalizeDeg(angleT);
            if (angleT >= angleS) {
                if (angleT - angleS > 180) {
                    return -(angleS + 360 - angleT);
                }
                else {
                    return angleT - angleS;
                }
            }
            else {
                if (angleS - angleT >= 180) {
                    return 360 + angleT - angleS;
                }
                else {
                    return angleT - angleS;
                }
            }
        }
        static jarak(x, y, xt, yt) {
            let pjx = xt - x;
            let pjy = yt - y;
            return Math.sqrt(pjx * pjx + pjy * pjy);
        }
        static rotateRel(x = 0, y = 0, xt = 0, yt = 0, deg = 10) {
            let xr = x - xt;
            let yr = y - yt;
            let x1;
            let y1;
            deg *= Transform.DEG2RAD;
            x1 = xr * Math.cos(deg) - yr * Math.sin(deg);
            y1 = xr * Math.sin(deg) + yr * Math.cos(deg);
            Transform._lastX = x1 + xt;
            Transform._lastY = y1 + yt;
        }
    }
    Transform.RAD2DEG = 180.0 / Math.PI;
    Transform.DEG2RAD = Math.PI / 180.0;
    Transform._lastX = 0;
    Transform._lastY = 0;
    Basik.Transform = Transform;
})(Basik || (Basik = {}));
var ha;
(function (ha) {
    var be;
    (function (be) {
        class Sound {
            constructor() {
                this._src = '';
                this._loaded = false;
            }
            get playedCount() {
                return this._playedCount;
            }
            set playedCount(value) {
                this._playedCount = value;
            }
            get sound() {
                return this._sound;
            }
            set sound(value) {
                this._sound = value;
            }
            get loaded() {
                return this._loaded;
            }
            set loaded(value) {
                this._loaded = value;
            }
            get src() {
                return this._src;
            }
            set src(value) {
                this._src = value;
            }
            static Load(url) {
                let sound = document.createElement("audio");
                let s = new Sound();
                s.src = url;
                s.loaded = false;
                s.sound = sound;
                sound.onload = () => {
                    s.loaded = true;
                };
                sound.onended = () => {
                    s.playedCount++;
                };
                sound.src = url;
                Sound.list.push(s);
            }
            static Play(s) {
                s.sound.play();
            }
            static SoundEnded(s) {
                let h = s.playedCount;
                s.playedCount = 0;
                return (h > 0);
            }
            static SoundLoaded(s) {
                return s.loaded;
            }
        }
        Sound.list = [];
        be.Sound = Sound;
    })(be = ha.be || (ha.be = {}));
})(ha || (ha = {}));
var Basik;
(function (Basik) {
    class Teks {
        static get stroke() {
            return Teks._stroke;
        }
        static set stroke(value) {
            Teks._stroke = value;
        }
        static get fill() {
            return Teks._fill;
        }
        static set fill(value) {
            Teks._fill = value;
        }
        static get jarak() {
            return Teks._jarak;
        }
        static set jarak(value) {
            Teks._jarak = value;
        }
        static get ctx() {
            return Basik.Graphic.context;
        }
        static Goto(x, y) {
            Teks.x = x;
            Teks.y = y;
        }
        static Write(str) {
            Teks.Tulis(str, Teks.x, Teks.y, Teks.fill, Teks.stroke);
        }
        static WriteLn(str) {
            Teks.Tulis(str, Teks.x, Teks.y, Teks.fill, Teks.stroke);
            Teks.y += Teks.jarak;
        }
        static Font(nama = 'cursive') {
            Teks.nama = nama;
            Teks.ctx.font = Teks.ukuran + 'px ' + Teks.nama;
        }
        static FontSize(n = 30) {
            Teks.ukuran = n;
            Teks.ctx.font = Teks.ukuran + 'px ' + Teks.nama;
            console.log(Teks.ukuran, Teks.nama);
        }
        static Rata(rata = "left") {
            Teks.ctx.textAlign = rata;
        }
        static Tulis(teks, x, y, warna = true, garis = false) {
            if (warna) {
                Teks.ctx.fillText(teks, x, y);
            }
            if (garis) {
                Teks.ctx.strokeText(teks, x, y);
            }
        }
    }
    Teks.nama = 'cursive';
    Teks.ukuran = 30;
    Teks.x = 120;
    Teks.y = 10;
    Teks._stroke = false;
    Teks._jarak = 15;
    Teks._fill = true;
    Basik.Teks = Teks;
})(Basik || (Basik = {}));
const LoadSound = ha.be.Sound.Load;
const PlaySound = ha.be.Sound.Play;
const SoundEnded = ha.be.Sound.SoundEnded;
const SoundLoaded = ha.be.Sound.SoundLoaded;
var Basik;
(function (Basik) {
    class ImgImpl {
        static CreateImage(width, height) {
            let h = new Basik.ImageObj();
            h.canvas = document.createElement('canvas');
            h.canvas.width = width;
            h.canvas.height = height;
            h.ctx = h.canvas.getContext('2d');
            h.frameH = height;
            h.frameW = width;
            h.panjangDiSet = true;
            h.lebarDiSet = true;
            h.load = true;
            h.img = document.createElement('img');
            ImgImpl.register(h, h.dragable, h.url, h.tipeDrag);
            return h;
        }
        static MuatAnimasi(url, pf, lf, bisaDiDrag = false, tipeDrag = 0) {
            let img = ImgImpl.muatAnimAsync(url, pf, lf);
            return ImgImpl.register(img, bisaDiDrag, url, tipeDrag);
        }
        static GambarSemua() {
            for (let i = 0; i < ImgImpl.daftar.length; i++) {
                let item = ImgImpl.daftar[i];
                Basik.Image.Draw(item);
            }
        }
        static Bound(s) {
            ImgImpl.resetRect(s);
            ImgImpl.rectToImageTransform(s, s.x, s.y);
            return s.rect;
        }
        static muatAnimasiAsyncKanvas(url, pf, lf, bisaDiDrag, canvas, tipeDrag) {
            let img = ImgImpl.muatAnimAsyncCanvas(url, pf, lf, canvas);
            return ImgImpl.register(img, bisaDiDrag, url, tipeDrag);
        }
        static muatAsyncBerbagiKanvas(url, dragable = false, canvas, tipeDrag, onload) {
            let img = ImgImpl.muatAsyncKanvas(url, canvas, onload);
            return ImgImpl.register(img, dragable, url, tipeDrag);
        }
        static register(image, dragable = false, url, tipeDrag) {
            let hasil;
            hasil = image;
            hasil.dragable = dragable;
            hasil.tipeDrag = tipeDrag;
            hasil.url = url;
            if (hasil.dragable) {
                if (hasil.tipeDrag == 0) {
                    hasil.tipeDrag = 1;
                }
            }
            ImgImpl.daftar.push(hasil);
            return hasil;
        }
        static Muat(url, bisaDiDrag = false, tipeDrag = 0, onload) {
            if (!onload)
                onload = () => { };
            let img = ImgImpl.muatAsync(url, onload);
            let spr = ImgImpl.register(img, bisaDiDrag, url, tipeDrag);
            return spr;
        }
        static DrawImageXY(s, x, y, frame) {
            s.x = x;
            s.y = y;
            ImgImpl.gambar(s, x, y, frame);
        }
        static PositionImagePolar(img, angle, jarak, x2, y2, skalaX = 1, skalaY = 1, tilt = 0) {
            let p = Basik.Point.posPolar(jarak, angle, x2, y2);
            p.y -= y2;
            p.y *= skalaY;
            p.y += y2;
            p.x -= x2;
            p.x *= skalaX;
            p.x += x2;
            Basik.Transform.rotateRel(p.x, p.y, x2, y2, tilt);
            p.x = Basik.Transform.lastX;
            p.y = Basik.Transform.lastY;
            img.x = p.x;
            img.y = p.y;
        }
        static buatBagiCanvas(canvas, w = 32, h = 32, frameW = 32, frameH = 32) {
            let img;
            canvas.width = w;
            canvas.height = h;
            let rect = Basik.Kotak.buat(0, 0, frameW, frameH);
            img = new Basik.ImageObj();
            img.load = true;
            img.panjang = w;
            img.lebar = h;
            img.img = null;
            img.frameH = frameH;
            img.frameW = frameW;
            img.handleX = 0;
            img.handleY = 0;
            img.alpha = 100;
            img.isAnim = false;
            img.canvas = canvas;
            img.ctx = canvas.getContext('2d');
            img.rect = rect;
            img.load = true;
            img.panjangDiSet = true;
            img.lebarDiSet = true;
            return img;
        }
        static panjang(gbr, pj) {
            if (typeof pj == 'number') {
                gbr.panjang = pj;
                gbr.panjangDiSet = true;
            }
            return gbr.panjang;
        }
        ;
        static lebar(gbr, lb) {
            if (typeof lb == 'number') {
                gbr.lebar = lb;
                gbr.lebarDiSet = true;
            }
            return gbr.lebar;
        }
        ;
        static tabrakan(gbr1, x1, y1, gbr2, x2, y2) {
            ImgImpl.resetRect(gbr1);
            ImgImpl.rectToImageTransform(gbr1, x1, y1);
            ImgImpl.resetRect(gbr2);
            ImgImpl.rectToImageTransform(gbr2, x2, y2);
            return Basik.Kotak.collide(gbr1.rect, gbr2.rect);
        }
        ;
        static dotDidalamGambar(gbr1, x1, y1, x2, y2) {
            ImgImpl.resetRect(gbr1);
            ImgImpl.rectToImageTransform(gbr1, x1, y1);
            return Basik.Kotak.collideDot(gbr1.rect, x2, y2);
        }
        ;
        static muatAnimAsync(url, fw, fh) {
            let canvas = document.createElement('canvas');
            return ImgImpl.muatAnimAsyncCanvas(url, fw, fh, canvas);
        }
        static muatAnimAsyncCanvas(url, fw, fh, canvas) {
            let img = document.createElement('img');
            let ctx = canvas.getContext('2d');
            let rect;
            rect = Basik.Kotak.buat(0, 0, fw, fh);
            let gbr = new Basik.ImageObj();
            gbr.isAnim = true;
            gbr.img = img;
            gbr.panjang = img.naturalWidth;
            gbr.lebar = img.naturalHeight;
            gbr.frameH = fh;
            gbr.frameW = fw;
            gbr.isAnim = true;
            gbr.handleX = 0;
            gbr.handleY = 0;
            gbr.rotasi = 0;
            gbr.alpha = 100;
            gbr.ctx = ctx;
            gbr.canvas = canvas;
            gbr.rect = rect;
            gbr.load = false;
            gbr.panjangDiSet = false;
            gbr.lebarDiSet = false;
            img.onload = () => {
                imgOnLoad(img);
            };
            img.onerror = () => {
                console.warn('gagal load image, url ' + url);
            };
            let img2 = ha.be.cache.getGbr(url);
            if (img2) {
                imgOnLoad(img2);
            }
            else {
                img.src = url;
            }
            function imgOnLoad(img) {
                canvas.width = img.naturalWidth;
                canvas.height = img.naturalHeight;
                ctx.drawImage(img, 0, 0);
                gbr.load = true;
                if (!gbr.panjangDiSet) {
                    gbr.panjang = fw;
                    gbr.panjangDiSet = true;
                }
                if (!gbr.lebarDiSet) {
                    gbr.lebarDiSet = true;
                    gbr.lebar = fh;
                }
                ha.be.cache.setFile(url, img);
            }
            return gbr;
        }
        static muatAsync(url, onload) {
            let kanvas = document.createElement('canvas');
            return ImgImpl.muatAsyncKanvas(url, kanvas, onload);
        }
        static def(img, ctx, canvas) {
            let rect;
            rect = Basik.Kotak.buat(0, 0, img.naturalWidth, img.naturalHeight);
            let gbr;
            gbr = new Basik.ImageObj();
            gbr.img = img;
            gbr.panjang = img.naturalWidth;
            gbr.lebar = img.naturalHeight;
            gbr.panjangDiSet = false;
            gbr.lebarDiSet = false;
            gbr.frameH = img.naturalHeight;
            gbr.frameW = img.naturalWidth;
            gbr.isAnim = false;
            gbr.handleX = 0;
            gbr.handleY = 0;
            gbr.rotasi = 0;
            gbr.alpha = 100;
            gbr.ctx = ctx;
            gbr.canvas = canvas;
            gbr.rect = rect;
            gbr.load = false;
            gbr.ctrIdx = 0;
            return gbr;
        }
        static muatAsyncKanvas(url, canvas, onload) {
            let img = document.createElement('img');
            let ctx = canvas.getContext('2d');
            let gbr;
            gbr = new Basik.ImageObj();
            gbr = ImgImpl.def(img, ctx, canvas);
            img.onload = () => {
                onload();
                imgOnLoad(img);
            };
            img.onerror = () => {
                console.warn('gagal load image, url ' + url);
                imgOnLoadDefault();
            };
            let img2 = ha.be.cache.getGbr(url);
            if (img2) {
                imgOnLoad(img2);
            }
            else {
                img.src = url;
            }
            function imgOnLoad(imgP) {
                canvas.width = imgP.naturalWidth;
                canvas.height = imgP.naturalHeight;
                ctx.drawImage(imgP, 0, 0);
                gbr.rect = Basik.Kotak.buat(0, 0, imgP.naturalWidth, imgP.naturalHeight);
                gbr.load = true;
                gbr.img = imgP;
                if (!gbr.panjangDiSet) {
                    gbr.panjangDiSet = true;
                    gbr.panjang = imgP.naturalWidth;
                }
                if (!gbr.lebarDiSet) {
                    gbr.lebar = imgP.naturalHeight;
                    gbr.lebarDiSet = true;
                }
                gbr.frameH = imgP.naturalHeight;
                gbr.frameW = imgP.naturalWidth;
                ha.be.cache.setFile(url, imgP);
            }
            function imgOnLoadDefault() {
                console.log("img on load default");
                canvas.width = 32;
                canvas.height = 32;
                gbr.img = document.createElement('img');
                gbr.rect = Basik.Kotak.buat(0, 0, 32, 32);
                ctx.fillStyle = 'rgba(255, 255, 255, 100)';
                ctx.strokeStyle = 'rgba(255, 0, 0, 100)';
                ctx.beginPath();
                ctx.rect(0, 0, 32, 32);
                ctx.moveTo(0, 0);
                ctx.lineTo(31, 31);
                ctx.moveTo(0, 31);
                ctx.lineTo(31, 0);
                ctx.stroke();
                gbr.load = true;
                if (!gbr.panjangDiSet) {
                    gbr.panjangDiSet = true;
                    gbr.panjang = 32;
                }
                if (!gbr.lebarDiSet) {
                    gbr.lebar = 32;
                    gbr.lebarDiSet = true;
                }
                gbr.frameH = 32;
                gbr.frameW = 32;
                ha.be.cache.setFile(url, gbr.img);
            }
            console.log(gbr);
            return gbr;
        }
        static gambarUbin(gbr, x = 0, y = 0, frame = 0) {
            let jmlH = 0;
            let jmlV = 0;
            if (gbr.load == false)
                return;
            let w2 = Math.floor(gbr.panjang);
            let h2 = Math.floor(gbr.lebar);
            while (x < 0) {
                x += w2;
            }
            while (x > 0) {
                x -= w2;
            }
            while (y < 0) {
                y += h2;
            }
            while (y > 0) {
                y -= h2;
            }
            x -= w2;
            y -= h2;
            frame = Math.floor(frame);
            jmlH = Math.ceil((Basik.Graphic.canvas.width + Math.abs(x)) / w2);
            jmlV = Math.ceil((Basik.Graphic.canvas.height + Math.abs(y)) / h2);
            for (let i = 0; i < jmlH; i++) {
                for (let j = 0; j < jmlV; j++) {
                    ImgImpl.gambar(gbr, x + (i * w2), y + (j * h2), frame);
                }
            }
        }
        static AmbilPiksel(x = 0, y = 0) {
            try {
                let data = Basik.Graphic.context.getImageData(x, y, 1, 1).data;
                let hasil = [];
                hasil.push(data[0]);
                hasil.push(data[1]);
                hasil.push(data[2]);
                hasil.push(data[3]);
                Basik.Graphic.merah = data[0];
                Basik.Graphic.hijau = data[1];
                Basik.Graphic.biru = data[2];
                Basik.Graphic.transparan = data[3];
                Basik.Graphic.FillColor(Basik.Graphic.merah, Basik.Graphic.hijau, Basik.Graphic.biru, Basik.Graphic.transparan);
                return hasil;
            }
            catch (e) {
            }
            return [0, 0, 0];
        }
        static SetPiksel(x = 0, y = 0) {
            Basik.Graphic.context.fillRect(Math.floor(x), Math.floor(y), 1, 1);
        }
        static gambar(gbr, x = 0, y = 0, frame = 0) {
            let ctx = Basik.Graphic.context;
            let jmlH = 0;
            let frameX = 0;
            let frameY = 0;
            if (gbr.load == false)
                return;
            gbr.ctrIdx = Basik.ImageObj.ctrDraw++;
            frame = Math.floor(frame);
            jmlH = Math.floor(gbr.img.naturalWidth / gbr.frameW);
            frameX = (frame % jmlH);
            frameY = Math.floor(frame / jmlH);
            frameX *= gbr.frameW;
            frameY *= gbr.frameH;
            frameX = Math.floor(frameX);
            frameY = Math.floor(frameY);
            let x2 = Math.floor(x);
            let y2 = Math.floor(y);
            let w2 = Math.floor(gbr.panjang);
            let h2 = Math.floor(gbr.lebar);
            x2 -= (gbr.handleX);
            y2 -= (gbr.handleY);
            if (gbr.rotasi != 0) {
                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(gbr.rotasi * (Math.PI / 180));
                drawImpl(-gbr.handleX, -gbr.handleY);
                ctx.restore();
            }
            else {
                ctx.save();
                drawImpl(x2, y2);
                ctx.restore();
            }
            function drawImpl(dx, dy) {
                ctx.globalAlpha = gbr.alpha / 100;
                ctx.drawImage(gbr.canvas, frameX, frameY, gbr.frameW, gbr.frameH, dx, dy, w2, h2);
                console.groupEnd();
            }
        }
        static ukuran(gbr, w = 32, h = 32) {
            gbr.panjang = w;
            gbr.lebar = h;
            gbr.panjangDiSet = true;
            gbr.lebarDiSet = true;
        }
        static resetRect(img) {
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
        static rectToImageTransform(image, x, y) {
            let rect = image.rect;
            let p;
            let x2 = image.panjang;
            let y2 = image.lebar;
            p = rect.vs[1];
            p.x = x2;
            p.y = 0;
            p = rect.vs[2];
            p.x = x2;
            p.y = y2;
            p = rect.vs[3];
            p.x = 0;
            p.y = y2;
            Basik.Kotak.translate(rect, x, y);
            Basik.Kotak.translate(rect, -image.handleX, -image.handleY);
            Basik.Kotak.rotate(rect, image.rotasi, x, y, false);
        }
        static AllImageLoaded() {
            for (let i = 0; i < ImgImpl.daftar.length; i++) {
                let img = ImgImpl.daftar[i];
                if (!img.load)
                    return false;
            }
            return true;
        }
    }
    ImgImpl.props = [];
    ImgImpl.daftar = [];
    Basik.ImgImpl = ImgImpl;
})(Basik || (Basik = {}));
var Basik;
(function (Basik) {
    class Image {
        static CreateImage(width, height) {
            return Basik.ImgImpl.CreateImage(width, height);
        }
        static Copy(s, onload) {
            if (!onload) {
                onload = () => { };
            }
            if (s.isAnim) {
                console.debug('copy sprite anim');
                console.debug(s);
                return Basik.ImgImpl.muatAnimasiAsyncKanvas(s.url, s.frameW, s.frameH, s.dragable, s.canvas, s.tipeDrag);
            }
            else {
                return Basik.ImgImpl.muatAsyncBerbagiKanvas(s.url, s.dragable, s.canvas, s.tipeDrag, onload);
            }
        }
        static DrawAll() {
            Basik.ImgImpl.GambarSemua();
        }
        static Collide(imgA, imgB) {
            return Basik.ImgImpl.tabrakan(imgA, imgA.x, imgA.y, imgB, imgB.x, imgB.y);
        }
        static LoadAnim(url, fw, fh, dragable = false, dragType = 0) {
            return Basik.ImgImpl.MuatAnimasi(url, fw, fh, dragable, dragType);
        }
        static Load(url, dragable = false, dragType = 0) {
            return Basik.ImgImpl.Muat(url, dragable, dragType, () => { });
        }
        static Draw(img, frame) {
            Basik.ImgImpl.gambar(img, img.x, img.y, frame);
        }
        static DrawXY(img, x, y, frame) {
            Basik.ImgImpl.DrawImageXY(img, x, y, frame);
        }
        static PositionPolar(img, angle, jarak, x2, y2, skalaX = 1, skalaY = 1, tilt = 0) {
            Basik.ImgImpl.PositionImagePolar(img, angle, jarak, x2, y2, skalaX, skalaY, tilt);
        }
        static DrawTile(img, x = 0, y = 0, frame = 0) {
            Basik.ImgImpl.gambarUbin(img, x, y, frame);
        }
        static GetPixel(x = 0, y = 0) {
            return Basik.ImgImpl.AmbilPiksel(x, y);
        }
        static SetPiksel(x = 0, y = 0) {
            return Basik.ImgImpl.AmbilPiksel(x, y);
        }
        static AllImageLoaded() {
            return Basik.ImgImpl.AllImageLoaded();
        }
    }
    Basik.Image = Image;
})(Basik || (Basik = {}));
const Graphics = Basik.Graphic.Start;
function Cls(r, g, b, t) {
    Basik.Graphic.Cls(r, g, b, t);
}
const Stroke = Basik.Graphic.StrokeColor;
const Red = Basik.Graphic.Merah;
const Green = Basik.Graphic.Hijau;
const Blue = Basik.Graphic.Biru;
const Alpha = Basik.Graphic.Transparan;
const GetPixel = Basik.Image.GetPixel;
const SetPixel = Basik.Image.SetPiksel;
const Line = Basik.Graphic.Garis;
const Rect = Basik.Graphic.Kotak;
const Oval = Basik.Graphic.Oval;
const CreateDict = Dict.create;
const InputHit = Basik.Input.InputHit;
const InputX = Basik.Input.InputX;
const InputY = Basik.Input.InputY;
const InputIsDown = Basik.Input.Pencet;
const FlushInput = Basik.Input.FlushInput;
const InputDragX = Basik.Input.GeserX;
const InputDragY = Basik.Input.GeserY;
const InputIsDragged = Basik.Input.Geser;
const InputType = Basik.Input.InputType;
const InputTapCount = Basik.Input.JmlTap;
const InputDragStartCount = Basik.Input.JmlDragMulai;
const InputDragEndCount = Basik.Input.JmlDragSelesai;
const InputDragStartX = Basik.Input.InputXAwal;
const InputDragStartY = Basik.Input.InputYAwal;
const DistMin = Basik.Transform.degDistMin;
function Distance(x1, y1, x2, y2) {
    return Math.hypot(x2 - x1, y2 - y1);
}
var Basik;
(function (Basik) {
    class SprDep {
        static HandleX(s) { return s.handleX; }
        static HandleY(s) { return s.handleY; }
        static Handle(img, x = 0, y = 0) {
            img.handleX = x;
            img.handleY = y;
        }
        static Ukuran(s, w, h) {
            Basik.ImgImpl.ukuran(s, w, h);
        }
        static PositionImage(img, x = 0, y = 0) {
            img.x = x;
            img.y = y;
        }
        static StatusMuat(spr) {
            return spr.load;
        }
        static TabrakanXY(spr, x1, y1, spr2, x2, y2) {
            return Basik.ImgImpl.tabrakan(spr, x1, y1, spr2, x2, y2);
        }
        static PosisiX(s, x = null) {
            if (typeof (x) == 'number') {
                s.x = x;
            }
            return s.x;
        }
        static PosisiY(s, y = null) {
            if (typeof (y) == 'number') {
                s.y = y;
            }
            return s.y;
        }
        static DragMode(s, n) {
            if (n > 0) {
                s.tipeDrag = n;
                s.dragable = true;
            }
        }
        static Dimuat(s) {
            return s.load;
        }
        static StatusDrag(s) {
            return s.dragged;
        }
        static kontek(s) {
            return s.ctx;
        }
        static Panjang(s, pj) {
            return Basik.ImgImpl.panjang(s, pj);
        }
        static Lebar(s, lb) {
            return Basik.ImgImpl.lebar(s, lb);
        }
        static Alpha(s, alpha) {
            if (typeof (alpha) == 'number') {
                s.alpha = alpha;
            }
            return s.alpha;
        }
        static Rotasi(s, sudut) {
            if (s && (typeof (sudut) == 'number')) {
                s.rotasi = sudut;
            }
            return Basik.Transform.normalizeDeg(s.rotasi);
        }
    }
    Basik.SprDep = SprDep;
})(Basik || (Basik = {}));
const LoadImage = Basik.Image.Load;
const LoadAnimImage = Basik.Image.LoadAnim;
const ResizeImage = Basik.SprDep.Ukuran;
const DrawImage = Basik.Image.Draw;
const DrawImageXY = Basik.Image.DrawXY;
const Collide = Basik.Image.Collide;
const Tile = Basik.Image.DrawTile;
const AllImageLoaded = Basik.Image.AllImageLoaded;
const PositionImageXY = Basik.SprDep.PositionImage;
const PositionImagePolar = Basik.Image.PositionPolar;
const DrawAllImage = Basik.Image.DrawAll;
const CopyImage = Basik.Image.Copy;
const Handle = Basik.SprDep.Handle;
const Rotation = Basik.SprDep.Rotasi;
const Width = Basik.SprDep.Panjang;
const Height = Basik.SprDep.Lebar;
const ImageLoaded = Basik.SprDep.Dimuat;
const ImageXPosition = Basik.SprDep.PosisiX;
const ImageYPosition = Basik.SprDep.PosisiY;
const ImageAlpha = Basik.SprDep.Alpha;
const ImageIsDragged = Basik.SprDep.StatusDrag;
function Dist2Image(s, s2) {
    return Math.hypot(s.x - s2.x, s2.y - s.y);
}
const FontName = Basik.Teks.Font;
const Print = Basik.Teks.Tulis;
const Align = Basik.Teks.Rata;
const FontSize = Basik.Teks.FontSize;
var rpg;
(function (rpg) {
    class Conf {
        constructor() {
            this._npc = [];
            this._trig = new Trig();
        }
        get roomUrl() {
            return this._roomUrl;
        }
        set roomUrl(value) {
            this._roomUrl = value;
        }
        get npc() {
            return this._npc;
        }
        set npc(value) {
            this._npc = value;
        }
        get trig() {
            return this._trig;
        }
        set trig(value) {
            this._trig = value;
        }
    }
    class Trig {
        constructor() {
            this.p = new Point();
            this._id = '';
        }
        get id() {
            return this._id;
        }
        set id(value) {
            this._id = value;
        }
        static baru(n) {
            for (let i = 0; i < Trig.list.length; i++) {
                let item = Trig.list[i];
                if (item.id == n)
                    return item;
            }
            return new Trig();
        }
        static buat(n, x, y) {
            let t = Trig.baru(n);
            t.id = n;
            t.p.x = x;
            t.p.y = y;
        }
    }
    Trig.list = [];
    class Point {
        constructor() {
            this._x = 0;
            this._y = 0;
        }
        get x() {
            return this._x;
        }
        set x(value) {
            this._x = value;
        }
        get y() {
            return this._y;
        }
        set y(value) {
            this._y = value;
        }
    }
    class NPC {
        constructor() {
            this._p = new Point();
            this._url = '';
            this._id = '';
        }
        static baru(n) {
            for (let i = 0; i < NPC.list.length; i++) {
                let item = NPC.list[i];
                if (item.id == n)
                    return item;
            }
            return new NPC();
        }
        static buat(n, url, x, y) {
            let npc = NPC.baru(n);
            npc.url = url;
            npc.id = n;
            npc.p.x = x;
            npc.p.y = y;
            return npc;
        }
        get id() {
            return this._id;
        }
        set id(value) {
            this._id = value;
        }
        get url() {
            return this._url;
        }
        set url(value) {
            this._url = value;
        }
        get p() {
            return this._p;
        }
        set p(value) {
            this._p = value;
        }
    }
    NPC.list = [];
    rpg.conf = new Conf();
})(rpg || (rpg = {}));
var rpg;
(function (rpg) {
    function render() {
    }
    rpg.render = render;
})(rpg || (rpg = {}));
var Basik;
(function (Basik) {
    class ImageObj {
        constructor(dragable = false) {
            this.isAnim = false;
            this.rect = new Basik.Kotak();
            this.load = false;
            this.ratioX = 1;
            this.ratioY = 1;
            this._panjangDiSet = false;
            this._lebarDiSet = false;
            this._ctrIdx = 0;
            this._x = 0;
            this._y = 0;
            this._alpha = 100;
            this._frameW = 32;
            this._frameH = 32;
            this._handleX = 0;
            this._handleY = 0;
            this._rotasi = 0;
            this._panjang = 0;
            this._lebar = 0;
            this._dragged = false;
            this._down = false;
            this._dragable = false;
            this._hitCount = 0;
            this._tipeDrag = 0;
            this._dragSelesaiJml = 0;
            this._dragStartY = 0;
            this._dragStartX = 0;
            this._sudutTekanAwal = 0;
            this._sudutAwal = 0;
            this.dragable = dragable;
        }
        get sudutAwal() {
            return this._sudutAwal;
        }
        set sudutAwal(value) {
            this._sudutAwal = value;
        }
        get frameW() {
            return this._frameW;
        }
        set frameW(value) {
            this._frameW = value;
        }
        get frameH() {
            return this._frameH;
        }
        set frameH(value) {
            this._frameH = value;
        }
        get x() {
            return this._x;
        }
        set x(value) {
            this._x = value;
        }
        get y() {
            return this._y;
        }
        set y(value) {
            this._y = value;
        }
        get alpha() {
            return this._alpha;
        }
        set alpha(value) {
            this._alpha = value;
        }
        get handleY() {
            return this._handleY;
        }
        set handleY(value) {
            this._handleY = value;
        }
        get handleX() {
            return this._handleX;
        }
        set handleX(value) {
            this._handleX = value;
        }
        get panjang() {
            return this._panjang;
        }
        set panjang(value) {
            this._panjang = value;
            this._panjangDiSet = true;
        }
        get lebar() {
            return this._lebar;
        }
        set lebar(value) {
            this._lebar = value;
            this._lebarDiSet = true;
        }
        get panjangDiSet() {
            return this._panjangDiSet;
        }
        set panjangDiSet(value) {
            this._panjangDiSet = value;
        }
        get lebarDiSet() {
            return this._lebarDiSet;
        }
        set lebarDiSet(value) {
            this._lebarDiSet = value;
        }
        get ctrIdx() {
            return this._ctrIdx;
        }
        set ctrIdx(value) {
            this._ctrIdx = value;
        }
        get rotasi() {
            return this._rotasi;
        }
        set rotasi(value) {
            this._rotasi = value;
        }
        get dragSelesaiJml() {
            return this._dragSelesaiJml;
        }
        set dragSelesaiJml(value) {
            this._dragSelesaiJml = value;
        }
        get drgStartX() {
            return this._dragStartX;
        }
        set drgStartX(value) {
            this._dragStartX = value;
        }
        get drgStartY() {
            return this._dragStartY;
        }
        set drgStartY(value) {
            this._dragStartY = value;
        }
        get dragged() {
            return this._dragged;
        }
        set dragged(value) {
            this._dragged = value;
        }
        get jmlHit() {
            return this._hitCount;
        }
        set jmlHit(value) {
            this._hitCount = value;
        }
        get down() {
            return this._down;
        }
        set down(value) {
            this._down = value;
        }
        get dragable() {
            return this._dragable;
        }
        set dragable(value) {
            this._dragable = value;
        }
        get sudutTekanAwal() {
            return this._sudutTekanAwal;
        }
        set sudutTekanAwal(value) {
            this._sudutTekanAwal = value;
        }
        get tipeDrag() {
            return this._tipeDrag;
        }
        set tipeDrag(value) {
            this._tipeDrag = value;
            if (value > 0) {
                this._dragable = true;
            }
            else {
                this._dragable = false;
            }
        }
        get url() {
            return this._url;
        }
        set url(value) {
            this._url = value;
        }
        static get ctrDraw() {
            return ImageObj._ctrDraw;
        }
        static set ctrDraw(value) {
            ImageObj._ctrDraw = value;
        }
        get inputId() {
            return this._inputId;
        }
        set inputId(value) {
            this._inputId = value;
        }
    }
    ImageObj._ctrDraw = 0;
    Basik.ImageObj = ImageObj;
})(Basik || (Basik = {}));
var Basik;
(function (Basik) {
    let TypeDrag;
    (function (TypeDrag) {
        TypeDrag[TypeDrag["drag"] = 1] = "drag";
        TypeDrag[TypeDrag["rotasi"] = 2] = "rotasi";
    })(TypeDrag || (TypeDrag = {}));
    class SprInt {
        spriteDown(s, pos, id) {
            s.down = true;
            s.drgStartX = pos.x - s.x;
            s.drgStartY = pos.y - s.y;
            s.inputId = id;
            s.jmlHit++;
            s.sudutTekanAwal = Basik.Transform.sudut(pos.x - s.x, pos.y - s.y);
            s.sudutAwal = s.rotasi;
            console.group('sprite down event handler');
            console.log("sudut tekan awal", s.sudutTekanAwal);
            console.log("sudut awal", s.sudutAwal);
            console.groupEnd();
        }
        inputDown(pos, id) {
            console.group('input down');
            let lastIdx = -1;
            let lastSprite = null;
            for (let i = Basik.ImgImpl.daftar.length - 1; i >= 0; i--) {
                let item;
                item = Basik.ImgImpl.daftar[i];
                if (Basik.ImgImpl.dotDidalamGambar(item, item.x, item.y, pos.x, pos.y)) {
                    if (item.ctrIdx > lastIdx) {
                        lastIdx = item.ctrIdx;
                        lastSprite = item;
                    }
                }
                else {
                    if (item.tipeDrag == 3 || item.tipeDrag == 4) {
                        this.spriteDown(item, pos, id);
                    }
                }
            }
            if (lastSprite) {
                this.spriteDown(lastSprite, pos, id);
            }
            console.groupEnd();
        }
        inputMove(pos, pointerId) {
            Basik.ImgImpl.daftar.forEach((item) => {
                if (item.down && item.dragable && (item.inputId == pointerId)) {
                    item.dragged = true;
                    if (item.tipeDrag == TypeDrag.drag || (item.tipeDrag == 3)) {
                        item.x = pos.x - item.drgStartX;
                        item.y = pos.y - item.drgStartY;
                        console.debug('item drag move');
                    }
                    else if (item.tipeDrag == TypeDrag.rotasi || (item.tipeDrag == 4)) {
                        let sudut2 = Basik.Transform.sudut(pos.x - item.x, pos.y - item.y);
                        let perbedaan = sudut2 - item.sudutTekanAwal;
                        item.rotasi = item.sudutAwal + perbedaan;
                        console.group();
                        console.log("sudut", sudut2);
                        console.log("beda", perbedaan);
                        console.log("sudut tekan awal", item.sudutTekanAwal);
                        console.log("sudut awal", item.sudutAwal);
                        console.log("rotasi", item.rotasi);
                        console.log("posisi", item.x, item.y);
                        console.groupEnd();
                    }
                    else {
                    }
                }
            });
        }
        inputUp() {
            Basik.ImgImpl.daftar.forEach((item) => {
                if (item.down) {
                }
                if (item.dragged) {
                    console.log('input up: item rotasi ' + item.rotasi);
                }
                item.down = false;
                item.dragged = false;
            });
        }
    }
    Basik.sprInt = new SprInt();
})(Basik || (Basik = {}));
var Basik;
(function (Basik) {
    class Spr3 {
        static gerakX(s, n) {
            s.x += n;
        }
        static gerakY(s, n) {
            s.y += n;
        }
        static gerakXY(s, x, y) {
            s.x += x;
            s.y += y;
        }
        static gerakSudut(s, n, sudut) {
            sudut *= Math.PI / 180;
            Spr3.gerakX(s, n * Math.cos(sudut));
            Spr3.gerakY(s, n * Math.sin(sudut));
        }
        static gerakPutar(s, sudut, sx, sy) {
            Basik.Transform.rotateRel(s.x, s.y, sx, sy, sudut);
            s.x += Basik.Transform.lastX;
            s.y += Basik.Transform.lastY;
        }
        static menjauh(s, x, y, jml) {
            let sudut = Basik.Transform.sudut(s.x - x, s.y - y);
            Spr3.gerakSudut(s, jml, sudut);
        }
        static mendekat(s, x, y, jml) {
            let sudut = Basik.Transform.sudut(x - s.x, y - s.y);
            Spr3.gerakSudut(s, jml, sudut);
        }
    }
    Basik.Spr3 = Spr3;
})(Basik || (Basik = {}));
