"use strict";
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
    class Camera {
        static get x() {
            return Camera._x;
        }
        static set x(value) {
            Camera._x = value;
        }
        static get y() {
            return Camera._y;
        }
        static set y(value) {
            Camera._y = value;
        }
        static get img() {
            return Camera._img;
        }
        static set img(value) {
            Camera._img = value;
        }
        static init() {
            function update() {
                window.requestAnimationFrame(update);
            }
            window.requestAnimationFrame(update);
        }
    }
    Camera._x = 0;
    Camera._y = 0;
    Basik.Camera = Camera;
})(Basik || (Basik = {}));
var Basik;
(function (Basik) {
    class Event {
        constructor(type, f) {
            this._type = '';
            this._type = type;
            this._f = f;
        }
        get type() {
            return this._type;
        }
        get f() {
            return this._f;
        }
        static addListener(type, f) {
            let e = new Event(type.toLowerCase(), f);
            Event.list.push(e);
            console.log("add listener: type ", type);
            return e;
        }
        static call(type) {
            Event.list.forEach((item) => {
                if (item.type === type.toLowerCase()) {
                    item.f();
                    return;
                }
            });
        }
    }
    Event.list = [];
    Basik.Event = Event;
})(Basik || (Basik = {}));
var Basik;
(function (Basik) {
    class Graphic {
        static get autoScale() {
            return Basik.G._autoScale;
        }
        static set autoScale(value) {
            Basik.G._autoScale = value;
        }
        static handleWindowResize() {
            if (!Basik.G._autoScale)
                return;
            let canvas = Basik.G.canvas;
            let cp = Basik.G.canvas.width;
            let cl = Basik.G.canvas.height;
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
        static buildCanvas(w, h) {
            let canvas;
            canvas = document.body.querySelector('canvas');
            if (!canvas) {
                canvas = document.createElement('canvas');
                document.body.appendChild(canvas);
                canvas.width = w;
                canvas.height = h;
            }
            return canvas;
        }
        static Canvas() {
            return Basik.G.canvas;
        }
        static MainCanvas() {
            return Basik.G.mainCanvas;
        }
        static SetCanvas(canvas) {
            Basik.G.mainCanvas = canvas;
        }
        static Graphics(w = 320, h = 240, canvas = null, fullScreen = true) {
            if (!canvas)
                canvas = Basik.G.buildCanvas(w, h);
            Basik.G.mainCanvas = canvas;
            Basik.G.canvas = canvas;
            Basik.G.autoScale = fullScreen;
            console.log('inisialisasi');
            Basik.G.setupMainCanvas(w, h, Basik.G.autoScale);
            Basik.In.init(Basik.G.canvas);
            Basik.Keyboard.init();
            Basik.Camera.init();
            window.addEventListener("resize", () => {
                Basik.G.handleWindowResize();
            });
            function update() {
                Basik.Event.call("update");
                window.requestAnimationFrame(update);
            }
            window.requestAnimationFrame(update);
            setTimeout(() => {
                Basik.G.handleWindowResize();
            }, 100);
            Basik.G.handleWindowResize();
            Cls();
        }
        static setupMainCanvas(p = 320, l = 240, fullScreen) {
            Basik.G.mainCanvas.width = p;
            Basik.G.mainCanvas.height = l;
            if (fullScreen) {
                Basik.G.mainCanvas.style.width = p + 'px';
                Basik.G.mainCanvas.style.padding = '0px';
                Basik.G.mainCanvas.style.margin = '0px';
            }
        }
        static Cls() {
            let ctx = Basik.G.canvas.getContext('2d');
            ctx.clearRect(0, 0, (Basik.G.canvas.width), (Basik.G.canvas.height));
        }
        static get red() {
            return Basik.G._merah;
        }
        static set red(value) {
            Basik.G._merah = value;
        }
        static get green() {
            return Basik.G._hijau;
        }
        static set green(value) {
            Basik.G._hijau = value;
        }
        static get blue() {
            return Basik.G._biru;
        }
        static set blue(value) {
            Basik.G._biru = value;
        }
        static get alpha() {
            return Basik.G._transparan;
        }
        static set alpha(value) {
            Basik.G._transparan = value;
        }
    }
    Graphic._autoScale = true;
    Graphic._merah = 0;
    Graphic._hijau = 0;
    Graphic._biru = 0;
    Graphic._transparan = 0;
    Basik.Graphic = Graphic;
    Basik.G = Graphic;
})(Basik || (Basik = {}));
var Basik;
(function (Basik) {
    let input;
    (function (input_1) {
        class EventHandler {
            move(input, buffer, e) {
                let pos = Input.getPos(e.clientX, e.clientY, buffer);
                input.x = pos.x;
                input.y = pos.y;
                input.key = e.button;
                if (input.isDown) {
                    input.isDrag = true;
                    input.xDrag = input.x - input.xStart;
                    input.yDrag = input.y - input.yStart;
                    Basik.Event.call("mousedrag");
                }
                Basik.Event.call("mousemove");
            }
            down(input, key, pos) {
                if (input.isDown == false) {
                    Basik.Event.call("mousedown");
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
                input.timerStart = Date.now();
            }
            up(input, key) {
                if (input.isDown) {
                    Basik.Event.call("mouseup");
                }
                input.isDown = false;
                input.isDrag = false;
                input.timerEnd = Date.now();
                input.key = key;
                let isTap = this.checkTap(input);
                input.isTap = (isTap == '');
                if (input.isTap) {
                    Basik.Event.call("mouseclick");
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
        input_1.EventHandler = EventHandler;
    })(input || (input = {}));
    class Input {
        constructor() {
        }
        static get debug() {
            return Input._debug;
        }
        static set debug(value) {
            Input._debug = value;
        }
        static reg(btn) {
            let inp = Input.buatInputDefault();
            inp.key = btn;
            Input.lst.push(inp);
            return inp;
        }
        static IsDown(btn) {
            let lst = Input.lst;
            for (let i = 0; i < lst.length; i++) {
                let o = lst[i];
                if (o.key == btn)
                    return o.isDown;
            }
            return false;
        }
        static getInput(btn) {
            let lst = Input.lst;
            for (let i = 0; i < lst.length; i++) {
                let o = lst[i];
                if (o.key == btn)
                    return o;
            }
            let inp = Input.buatInputDefault();
            inp.key = btn;
            lst.push(inp);
            return inp;
        }
        static init(buffer) {
            console.log('Input init');
            buffer.style.touchAction = 'none';
            buffer.addEventListener("mousedown", (e) => {
                e.stopPropagation();
                e.preventDefault();
                let pos = Input.getPos(e.clientX, e.clientY, buffer);
                let button = e.button;
                Input.event.down(Input.getInput(button), button, pos);
                Basik.sprInt.inputDown(pos, e.button);
            });
            buffer.addEventListener("mousemove", (e) => {
                e.stopPropagation();
                e.preventDefault();
                let pos = Input.getPos(e.clientX, e.clientY, buffer);
                Input.event.move(Input.getInput(0), buffer, e);
                Input.event.move(Input.getInput(1), buffer, e);
                Basik.sprInt.inputMove(pos, e.button);
            });
            buffer.addEventListener("mouseout", (e) => {
                mouseUp(e);
            });
            buffer.addEventListener("mouseup", (e) => {
                mouseUp(e);
            });
            function mouseUp(e) {
                e.stopPropagation();
                e.preventDefault();
                Input.event.up(Input.getInput(e.button), e.button);
                Basik.Ip.daftar.forEach((img) => {
                    img.down = false;
                    img.dragged = false;
                });
            }
        }
        static buatInputDefault() {
            return {
                isDown: false,
                isDrag: false,
                isTap: false,
                key: 0,
                timerEnd: 0,
                timerStart: 0,
                x: 0,
                xDrag: 0,
                xStart: 0,
                y: 0,
                yDrag: 0,
                yStart: 0,
                evt: null
            };
        }
        static get event() {
            return Input._evt;
        }
    }
    Input._debug = false;
    Input.lst = [];
    Input._evt = new input.EventHandler();
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
    Basik.In = Input;
})(Basik || (Basik = {}));
var Basik;
(function (Basik) {
    let keyb;
    (function (keyb) {
        class KeybObj {
            constructor(key, isDown) {
                this.key = '';
                this.isDown = false;
                this.key = key;
                this.isDown = isDown;
            }
        }
        keyb.KeybObj = KeybObj;
    })(keyb || (keyb = {}));
    class Keyboard {
        static get obj() {
            return Keyboard._obj;
        }
        static reg(key, isDown) {
            console.log('new key registered: ' + key);
            Keyboard.list.push(new keyb.KeybObj(key, isDown));
        }
        static setDown(key, downState) {
            let lst = Keyboard.list;
            for (let i = 0; i < lst.length; i++) {
                let o = lst[i];
                if (o.key == key) {
                    o.isDown = downState;
                    return;
                }
            }
            Keyboard.reg(key, downState);
        }
        static IsDown(key) {
            let lst = Keyboard.list;
            for (let i = 0; i < lst.length; i++) {
                let o = lst[i];
                if (o.key == key) {
                    return o.isDown;
                }
            }
            this.reg(key, false);
            return false;
        }
        static init() {
            window.addEventListener("keydown", (e) => {
                Keyboard._obj = e;
                Keyboard.setDown(e.key, true);
                Basik.Event.call("keydown");
            });
            window.addEventListener("keyup", (e) => {
                Keyboard._obj = e;
                Keyboard.setDown(e.key, false);
                Basik.Event.call("keyup");
            });
        }
    }
    Keyboard.list = [];
    Basik.Keyboard = Keyboard;
})(Basik || (Basik = {}));
var Basik;
(function (Basik) {
    class Pt {
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
            return new Pt(x, y);
        }
        static copy(p1, p2) {
            p2.x = p1.x;
            p2.y = p1.y;
        }
        static clone(p) {
            let h = Pt.create(p.x, p.y);
            return h;
        }
        static putarPoros(p, xc = 0, yc = 0, deg = 0) {
            Basik.Tf.rotateRel(p.x, p.y, xc, yc, deg);
            p.x = Basik.Tf.lastX;
            p.y = Basik.Tf.lastY;
        }
    }
    Basik.Pt = Pt;
})(Basik || (Basik = {}));
var Basik;
(function (Basik) {
    class Seg {
        constructor(A = new Basik.Pt(), B = new Basik.Pt()) {
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
        static create(v1 = new Basik.Pt(), v2 = new Basik.Pt()) {
            return new Basik.Sg(v1, v2);
        }
        static boundCollide(seg1, seg2) {
            if (Basik.Sg.maxX(seg1) < Basik.Sg.minX(seg2))
                return false;
            if (Basik.Sg.minX(seg1) > Basik.Sg.maxX(seg2))
                return false;
            if (Basik.Sg.maxY(seg1) < Basik.Sg.minY(seg2))
                return false;
            if (Basik.Sg.minY(seg1) > Basik.Sg.maxY(seg2))
                return false;
            return true;
        }
        static collide(seg1, seg2) {
            let bound = Basik.Sg.boundCollide(seg1, seg2);
            if (!bound)
                return false;
            let seg2Copy = Basik.Sg.clone(seg2);
            let seg1Copy = Basik.Sg.clone(seg1);
            let deg = Basik.Sg.deg(seg2);
            Basik.Sg.rotate(seg2Copy, -deg, seg2.A.x, seg2.A.y);
            Basik.Sg.rotate(seg1Copy, -deg, seg2.A.x, seg2.A.y);
            if (!Basik.Sg.boundCollide(seg1Copy, seg2Copy))
                return false;
            Basik.Sg.translate(seg1Copy, -seg2.A.x, -seg2.A.y);
            Basik.Sg.translate(seg2Copy, -seg2.A.x, -seg2.A.y);
            if (!Basik.Sg.crossHor(seg1Copy)) {
                return false;
            }
            let idx = Basik.Sg.xHorIdx(seg1Copy);
            let x = Basik.Sg.getXAtIdx(seg1Copy, idx);
            if (x > Basik.Sg.maxX(seg2Copy))
                return false;
            if (x < Basik.Sg.minX(seg2Copy))
                return false;
            return true;
        }
        static copy(seg1, seg2) {
            Basik.Pt.copy(seg1.A, seg2.B);
            Basik.Pt.copy(seg1.B, seg2.B);
        }
        static clone(seg) {
            return new Seg(Basik.Pt.clone(seg.A), Basik.Pt.clone(seg.B));
        }
        static crossHor(seg) {
            if (Basik.Sg.maxY(seg) > 0) {
                if (Basik.Sg.minY(seg) < 0) {
                    return true;
                }
            }
            return false;
        }
        static deg(line) {
            let j = line.B.y - line.A.y;
            let i = line.B.x - line.A.x;
            return Basik.Tf.sudut(i, j);
        }
        static getXAtIdx(seg, idx) {
            return seg.A.x + (idx * Basik.Sg.vecI(seg));
        }
        static vecI(seg) {
            return seg.B.x - seg.A.x;
        }
        static rotate(seg, deg = 0, xc = 0, yc = 0) {
            Basik.Pt.putarPoros(seg.A, xc, yc, deg);
            Basik.Pt.putarPoros(seg.B, xc, yc, deg);
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
            if (!Seg.crossHor(seg))
                return NaN;
            let idx = 0;
            idx = (0 - seg.A.y) / (seg.B.y - seg.A.y);
            return idx;
        }
    }
    Basik.Seg = Seg;
    Basik.Sg = Seg;
})(Basik || (Basik = {}));
var Basik;
(function (Basik) {
    class Ktk {
        constructor() {
            this.vs = [];
            this.segs = [];
        }
        static buat(x1 = 0, y1 = 0, x2 = 0, y2 = 0) {
            let r = new Ktk();
            r.vs.push(Basik.Pt.create(x1, y1));
            r.vs.push(Basik.Pt.create(x2, y1));
            r.vs.push(Basik.Pt.create(x2, y2));
            r.vs.push(Basik.Pt.create(x1, y2));
            r.segs.push(Basik.Seg.create(r.vs[0], r.vs[1]));
            r.segs.push(Basik.Seg.create(r.vs[1], r.vs[2]));
            r.segs.push(Basik.Seg.create(r.vs[2], r.vs[3]));
            r.segs.push(Basik.Seg.create(r.vs[3], r.vs[0]));
            return r;
        }
        static destroy(r) {
            while (r.vs.length > 0) {
                r.vs.pop();
            }
            while (r.segs.length > 0) {
                let s = r.segs.pop();
                s.A = null;
                s.B = null;
            }
        }
        static copy(r) {
            let hasil = Ktk.buat();
            Ktk.copyInfo(r, hasil);
            return hasil;
        }
        static copyInfo(r1, r2) {
            for (let i = 0; i < r1.segs.length; i++) {
                Basik.Seg.copy(r1.segs[i], r2.segs[i]);
            }
        }
        static collideBound(r1, r2) {
            if (Ktk.maxX(r1) < Ktk.minX(r2)) {
                return false;
            }
            if (Ktk.minX(r1) > Ktk.maxX(r2)) {
                return false;
            }
            if (Ktk.maxY(r1) < Ktk.minY(r2)) {
                return false;
            }
            if (Ktk.minY(r1) > Ktk.maxY(r2)) {
                return false;
            }
            return true;
        }
        static collide(r1, r2) {
            let bound = Ktk.collideBound(r1, r2);
            if (!bound)
                return false;
            for (let i = 0; i < r1.segs.length; i++) {
                for (let j = 0; j < r2.segs.length; j++) {
                    if (Basik.Seg.collide(r1.segs[i], r2.segs[j])) {
                        return true;
                    }
                }
            }
            return false;
        }
        static collideDotBound(r, d) {
            if (d.x < Ktk.minX(r)) {
                return false;
            }
            if (d.x > Ktk.maxX(r)) {
                return false;
            }
            if (d.y < Ktk.minY(r)) {
                return false;
            }
            if (d.y > Ktk.maxY(r)) {
                return false;
            }
            return true;
        }
        static collideDot(r, x, y) {
            let r2 = Ktk.copy(r);
            let p = Basik.Pt.create(x, y);
            let d = Basik.Seg.deg(r2.segs[0]);
            let pRot = r2.vs[0];
            if (!Ktk.collideDotBound(r, p)) {
                return false;
            }
            Ktk.rotate(r2, -d, pRot.x, pRot.y, false);
            Basik.Pt.putarPoros(p, pRot.x, pRot.y, -d);
            if (!Ktk.collideDotBound(r2, p)) {
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
                r2 = Ktk.copy(r);
            }
            else {
                r2 = r;
            }
            r2.vs.forEach((p) => {
                Basik.Pt.putarPoros(p, xc, yc, deg);
            });
            return r2;
        }
    }
    Basik.Ktk = Ktk;
})(Basik || (Basik = {}));
var Basik;
(function (Basik) {
    class Transform {
        static get lastX() {
            return Basik.Tf._lastX;
        }
        static get lastY() {
            return Basik.Tf._lastY;
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
            sin *= Basik.Tf.RAD2DEG;
            sin = Basik.Tf.quadDeg2(x, y, sin);
            sin = Basik.Tf.normalizeDeg(sin);
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
        static degDist(angleS = 0, angleT, min = true) {
            if (min) {
                return Transform.degDistMin(angleS, angleT);
            }
            else {
                return Transform.degDistMax(angleS, angleT);
            }
        }
        static degDistMax(angleS = 0, angleT) {
            angleS = Basik.Tf.normalizeDeg(angleS);
            angleT = Basik.Tf.normalizeDeg(angleT);
            let deg = Basik.Tf.degDistMin(angleS, angleT);
            if (deg >= 0) {
                return -(360 - deg);
            }
            else {
                return (360 - Math.abs(deg));
            }
        }
        static degDistMin(angleS = 0, angleT) {
            angleS = Basik.Tf.normalizeDeg(angleS);
            angleT = Basik.Tf.normalizeDeg(angleT);
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
        static rotateRel(x = 0, y = 0, xt = 0, yt = 0, deg = 10) {
            let xr = x - xt;
            let yr = y - yt;
            let x1;
            let y1;
            deg *= Basik.Tf.DEG2RAD;
            x1 = xr * Math.cos(deg) - yr * Math.sin(deg);
            y1 = xr * Math.sin(deg) + yr * Math.cos(deg);
            Basik.Tf._lastX = x1 + xt;
            Basik.Tf._lastY = y1 + yt;
        }
    }
    Transform.RAD2DEG = 180.0 / Math.PI;
    Transform.DEG2RAD = Math.PI / 180.0;
    Transform._lastX = 0;
    Transform._lastY = 0;
    Basik.Transform = Transform;
    Basik.Tf = Transform;
})(Basik || (Basik = {}));
var Basik;
(function (Basik) {
    class ImgImpl {
        static CreateImage(width, height) {
            let h = new Basik.Image();
            h.canvas = document.createElement('canvas');
            h.canvas.width = width;
            h.canvas.height = height;
            h.frameH = height;
            h.frameW = width;
            h.load = true;
            h.img = document.createElement('img');
            Basik.Ip.register(h, h.url, h.tipeDrag);
            return h;
        }
        static MuatAnimasi(url, pf, lf, tipeDrag = 0) {
            tipeDrag;
            return Basik.Ip.muatAnimAsync(url, pf, lf);
        }
        static GambarSemua() {
            for (let i = 0; i < Basik.Ip.daftar.length; i++) {
                let item = Basik.Ip.daftar[i];
                Basik.Ip.Draw(item);
            }
        }
        static muatAnimasiAsyncKanvas(url, pf, lf, canvas, tipeDrag) {
            let img = Basik.Ip.muatAnimAsyncCanvas(url, pf, lf, canvas);
            return Basik.Ip.register(img, url, tipeDrag);
        }
        static register(image, url, tipeDrag) {
            let hasil;
            hasil = image;
            hasil.tipeDrag = tipeDrag;
            hasil.url = url;
            if (hasil.dragable) {
                if (hasil.tipeDrag == 0) {
                    hasil.tipeDrag = 1;
                }
            }
            Basik.Ip.daftar.push(hasil);
            return hasil;
        }
        static free(img) {
            for (let i = 0; i < this.daftar.length; i++) {
                if (this.daftar[i] == img) {
                    img.canvas = null;
                    img.img = null;
                    Basik.Ktk.destroy(img.rect);
                    this.daftar.splice(i, 1);
                    return;
                }
            }
        }
        static Muat(url, tipeDrag = 0, onload) {
            if (!onload)
                onload = () => { };
            let img = Basik.Ip.muatAsync(url, onload);
            tipeDrag;
            return img;
        }
        static tabrakan(gbr1, x1, y1, gbr2, x2, y2) {
            Basik.Ip.resetRect(gbr1);
            Basik.Ip.rectToImageTf(gbr1, x1, y1);
            Basik.Ip.resetRect(gbr2);
            Basik.Ip.rectToImageTf(gbr2, x2, y2);
            return Basik.Ktk.collide(gbr1.rect, gbr2.rect);
        }
        ;
        static dotInsideImage(gbr1, x1, y1, x2, y2) {
            Basik.Ip.resetRect(gbr1);
            Basik.Ip.rectToImageTf(gbr1, x1, y1);
            return Basik.Ktk.collideDot(gbr1.rect, x2, y2);
        }
        ;
        static muatAnimAsync(url, fw, fh) {
            let canvas = document.createElement('canvas');
            return Basik.Ip.muatAnimAsyncCanvas(url, fw, fh, canvas);
        }
        static muatAnimAsyncCanvas(url, fw, fh, canvas) {
            canvas;
            let gbr = new Basik.Image(url);
            gbr.isAnim = true;
            gbr.frameW = fw;
            gbr.frameH = fh;
            gbr.width = fw;
            gbr.height = fh;
            return gbr;
        }
        static muatAsync(url, onload) {
            let kanvas = document.createElement('canvas');
            return Basik.Ip.muatAsyncKanvas(url, kanvas, onload);
        }
        static muatAsyncKanvas(url, canvas, onload) {
            canvas;
            onload;
            let gbr;
            gbr = new Basik.Image(url);
            return gbr;
        }
        static gambarUbin(gbr, x = 0, y = 0, frame = 0) {
            let jmlH = 0;
            let jmlV = 0;
            if (gbr.load == false)
                return;
            let w2 = Math.floor(gbr.width);
            let h2 = Math.floor(gbr.height);
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
            jmlH = Math.ceil((Basik.G.MainCanvas().width + Math.abs(x)) / w2);
            jmlV = Math.ceil((Basik.G.MainCanvas().height + Math.abs(y)) / h2);
            for (let i = 0; i < jmlH; i++) {
                for (let j = 0; j < jmlV; j++) {
                    Basik.Ip.DrawSingle(gbr, x + (i * w2), y + (j * h2), frame);
                }
            }
        }
        static AmbilPiksel(x = 0, y = 0) {
            try {
                let data = Basik.G.Canvas().getContext('2d').getImageData(x, y, 1, 1).data;
                let hasil = [];
                hasil.push(data[0]);
                hasil.push(data[1]);
                hasil.push(data[2]);
                hasil.push(data[3]);
                Basik.G.red = data[0];
                Basik.G.green = data[1];
                Basik.G.blue = data[2];
                Basik.G.alpha = data[3];
            }
            catch (e) {
            }
        }
        static SetPiksel(x = 0, y = 0) {
            Basik.G.Canvas().getContext('2d').fillRect(Math.floor(x), Math.floor(y), 1, 1);
        }
        static Draw(img) {
            if (img.tilable) {
                Basik.Ip.gambarUbin(img, img.x, img.y, img.frame);
            }
            else {
                Basik.Ip.DrawSingle(img, img.x, img.y, img.frame);
            }
        }
        static DrawSingle(gbr, x = 0, y = 0, frame = 0) {
            let ctx = Basik.G.Canvas().getContext('2d');
            let jmlH = 0;
            let frameX = 0;
            let frameY = 0;
            if (gbr.load == false)
                return;
            gbr.ctrIdx = Basik.Image.ctrDraw++;
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
            let w2 = Math.floor(gbr.width);
            let h2 = Math.floor(gbr.height);
            x2 -= (gbr.handleX);
            y2 -= (gbr.handleY);
            if (gbr.rotation != 0) {
                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(gbr.rotation * (Math.PI / 180));
                drawImpl(-gbr.handleX, -gbr.handleY);
                ctx.restore();
            }
            else {
                ctx.save();
                drawImpl(x2, y2);
                ctx.restore();
            }
            function drawImpl(dx, dy) {
                dx -= Basik.Camera.x;
                dy -= Basik.Camera.y;
                ctx.globalAlpha = gbr.alpha / 100;
                ctx.drawImage(gbr.canvas, frameX, frameY, gbr.frameW, gbr.frameH, Math.floor(dx), Math.floor(dy), w2, h2);
            }
        }
        static resetRect(img) {
            let rect = img.rect;
            let p;
            p = rect.vs[0];
            p.x = 0;
            p.y = 0;
            p = rect.vs[1];
            p.x = img.frameW - 1;
            p.y = 0;
            p = rect.vs[2];
            p.x = img.frameW - 1;
            p.y = img.frameH - 1;
            p = rect.vs[3];
            p.x = 0;
            p.y = img.frameH - 1;
        }
        static rectToImageTf(image, x, y) {
            let rect = image.rect;
            let p;
            let x2 = image.width - 1;
            let y2 = image.height - 1;
            p = rect.vs[1];
            p.x = x2;
            p.y = 0;
            p = rect.vs[2];
            p.x = x2;
            p.y = y2;
            p = rect.vs[3];
            p.x = 0;
            p.y = y2;
            Basik.Ktk.translate(rect, x, y);
            Basik.Ktk.translate(rect, -image.handleX, -image.handleY);
            Basik.Ktk.rotate(rect, image.rotation, x, y, false);
        }
        static AllImageLoaded() {
            for (let i = 0; i < Basik.Ip.daftar.length; i++) {
                let img = Basik.Ip.daftar[i];
                if (!img.load)
                    return false;
            }
            return true;
        }
    }
    ImgImpl.props = [];
    ImgImpl.daftar = [];
    Basik.ImgImpl = ImgImpl;
    Basik.Ip = ImgImpl;
})(Basik || (Basik = {}));
var Basik;
(function (Basik) {
    class Image {
        constructor(url = '') {
            this._x = 0;
            this._y = 0;
            this._alpha = 100;
            this._handleX = 0;
            this._handleY = 0;
            this._panjang = 0;
            this._lebar = 0;
            this._rotasi = 0;
            this._tilable = false;
            this._frameW = 0;
            this._frameH = 0;
            this._dragged = false;
            this._down = false;
            this._frame = 0;
            this.load = false;
            this._ctrIdx = 0;
            this.isAnim = false;
            this.rect = new Basik.Ktk();
            this._tipeDrag = 0;
            this._dragStartY = 0;
            this._dragStartX = 0;
            this._sudutTekanAwal = 0;
            this._sudutAwal = 0;
            let img = document.createElement('img');
            let canvas = document.createElement('canvas');
            let ctx = canvas.getContext('2d');
            let gbr;
            gbr = this;
            let rect = Basik.Ktk.buat(0, 0, img.naturalWidth, img.naturalHeight);
            Basik.Ip.register(this, url, 0);
            gbr.img = img;
            gbr.canvas = canvas;
            gbr.rect = rect;
            gbr.load = false;
            img.onload = () => {
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
                gbr.rect = Basik.Ktk.buat(0, 0, imgP.naturalWidth, imgP.naturalHeight);
                gbr.load = true;
                gbr.img = imgP;
                if (!gbr.width) {
                    gbr.width = imgP.naturalWidth;
                }
                if (!gbr.height) {
                    gbr.height = imgP.naturalHeight;
                }
                if (!gbr._frameH)
                    gbr.frameH = imgP.naturalHeight;
                if (!gbr._frameW)
                    gbr.frameW = imgP.naturalWidth;
                ha.be.cache.setFile(url, imgP);
            }
            function imgOnLoadDefault() {
            }
        }
        get frame() {
            return this._frame;
        }
        set frame(value) {
            this._frame = value;
        }
        get canvas() {
            return this._canvas;
        }
        set canvas(value) {
            this._canvas = value;
        }
        get tilable() {
            return this._tilable;
        }
        set tilable(value) {
            this._tilable = value;
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
        get width() {
            if (this._panjang)
                return this._panjang;
            if (this.img)
                return this.img.naturalWidth;
            return 0;
        }
        set width(value) {
            this._panjang = value;
        }
        get height() {
            if (this._lebar)
                return this._lebar;
            if (this.img)
                return this.img.naturalHeight;
            return 0;
        }
        set height(value) {
            this._lebar = value;
        }
        get ctrIdx() {
            return this._ctrIdx;
        }
        set ctrIdx(value) {
            this._ctrIdx = value;
        }
        get rotation() {
            return this._rotasi;
        }
        set rotation(value) {
            this._rotasi = value;
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
        get down() {
            return this._down;
        }
        set down(value) {
            this._down = value;
        }
        get dragable() {
            return this._tipeDrag > 0 ? true : false;
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
        }
        get url() {
            return this._url;
        }
        set url(value) {
            this._url = value;
        }
        static get ctrDraw() {
            return Image._ctrDraw;
        }
        static set ctrDraw(value) {
            Image._ctrDraw = value;
        }
        get button() {
            return this._button;
        }
        set button(value) {
            this._button = value;
        }
    }
    Image._ctrDraw = 0;
    Basik.Image = Image;
})(Basik || (Basik = {}));
var Basik;
(function (Basik) {
    let TypeDrag;
    (function (TypeDrag) {
        TypeDrag[TypeDrag["drag"] = 1] = "drag";
        TypeDrag[TypeDrag["rotasi"] = 2] = "rotasi";
    })(TypeDrag || (TypeDrag = {}));
    class SprInt {
        spriteDown(img, posCam, id) {
            let posAbs = {
                x: posCam.x - Basik.Camera.x,
                y: posCam.y - Basik.Camera.y
            };
            img.down = true;
            img.drgStartX = posAbs.x - img.x;
            img.drgStartY = posAbs.y - img.y;
            img.button = id;
            img.sudutTekanAwal = Basik.Tf.sudut(posAbs.x - img.x, posAbs.y - img.y);
            img.sudutAwal = img.rotation;
        }
        inputDown(posCam, button) {
            console.group('input down');
            let posAbs = {
                x: posCam.x - Basik.Camera.x,
                y: posCam.y - Basik.Camera.y
            };
            let lastIdx = -1;
            let lastSprite = null;
            for (let i = Basik.Ip.daftar.length - 1; i >= 0; i--) {
                let img;
                img = Basik.Ip.daftar[i];
                if (Basik.Ip.dotInsideImage(img, img.x, img.y, posAbs.x, posAbs.y)) {
                    if (img.ctrIdx > lastIdx) {
                        lastIdx = img.ctrIdx;
                        lastSprite = img;
                    }
                }
                else {
                    if (img.tipeDrag == 3 || img.tipeDrag == 4) {
                        this.spriteDown(img, posCam, button);
                    }
                }
            }
            if (lastSprite) {
                this.spriteDown(lastSprite, posCam, button);
            }
            console.groupEnd();
        }
        inputMove(posCam, button) {
            let posAbs = {
                x: posCam.x - Basik.Camera.x,
                y: posCam.y - Basik.Camera.y
            };
            Basik.Ip.daftar.forEach((img) => {
                if (img.down && img.dragable && (img.button == button)) {
                    img.dragged = true;
                    if (img.tipeDrag == TypeDrag.drag || (img.tipeDrag == 3)) {
                        img.x = posAbs.x - img.drgStartX;
                        img.y = posAbs.y - img.drgStartY;
                    }
                    else if (img.tipeDrag == TypeDrag.rotasi || (img.tipeDrag == 4)) {
                        let sudut2 = Basik.Tf.sudut(posAbs.x - img.x, posAbs.y - img.y);
                        let perbedaan = sudut2 - img.sudutTekanAwal;
                        img.rotation = img.sudutAwal + perbedaan;
                    }
                    else {
                    }
                }
            });
        }
    }
    Basik.sprInt = new SprInt();
})(Basik || (Basik = {}));
var Basik;
(function (Basik) {
    class Sound {
        constructor() {
            this._src = '';
            this._loaded = false;
        }
        static get lastSound() {
            return Sound._lastSound;
        }
        static set lastSound(value) {
            Sound._lastSound = value;
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
    }
    Sound.list = [];
    Basik.Sound = Sound;
    Basik.Sn = Sound;
})(Basik || (Basik = {}));
const S = Basik.Sn;
function LoadSound(url) {
    let sound = document.createElement("audio");
    let s = new S();
    s.src = url;
    s.loaded = false;
    s.sound = sound;
    sound.onload = () => {
        s.loaded = true;
    };
    sound.onended = () => {
        s.playedCount++;
        try {
            window.SoundEnded(s);
        }
        catch (e) { }
    };
    sound.src = url;
    S.list.push(s);
    return s;
}
function PlaySound(s) {
    s.sound.play();
}
function SoundLoaded(s) {
    return s.loaded;
}
const G = Basik.G;
const Ip = Basik.Ip;
const In = Basik.In;
function MainCanvas() {
    return G.MainCanvas();
}
function SetCanvas(c) {
    G.SetCanvas(c);
}
function ClearArea(x, y, w, h) {
    G.Canvas().getContext('2d').clearRect(x, y, w, h);
}
function Graphics(w = 320, h = 240, canvas = null, fullScreen = true) {
    G.Graphics(w, h, canvas, fullScreen);
}
function Cls() {
    G.Cls();
}
function Green() {
    return G.green;
}
function Red() {
    return G.red;
}
function Blue() {
    return G.blue;
}
function Alpha() {
    return Math.floor(G.alpha * 100);
}
function GetPixel(x = 0, y = 0) {
    Ip.AmbilPiksel(x, y);
}
function SetPixel(x = 0, y = 0) {
    Ip.SetPiksel(x, y);
}
function FillColor(r = 0, g = 0, b = 0, a = 100) {
    G.Canvas().getContext('2d').fillStyle = `rgba( ${r}, ${g}, ${b}, ${a})`;
    G.red = r;
    G.green = g;
    G.blue = b;
    G.alpha = a;
}
function StrokeColor(r = 0, g = 0, b = 0, a = 1) {
    G.Canvas().getContext('2d').strokeStyle = `rgba( ${r}, ${g}, ${b}, ${a})`;
    G.red = r;
    G.green = g;
    G.blue = b;
    G.alpha = a;
}
function AddListener(type, f) {
    Basik.Event.addListener(type, f);
}
function KeyboardEventObj() {
    return Basik.Keyboard.obj;
}
function KeyboardDown(key) {
    return Basik.Keyboard.IsDown(key);
}
function MouseEventObj(btn) {
    return Basik.Input.getInput(btn).evt;
}
function MouseIsDown(btn = 0) {
    return In.getInput(btn).isDown;
}
function MouseIsDragged(btn = 0) {
    return In.getInput(btn).isDrag;
}
function MouseDragXAmount(btn = 0) {
    return In.getInput(btn).xDrag;
}
function MouseDragYAmount(btn = 0) {
    return In.getInput(btn).yDrag;
}
function MouseX(btn = 0) {
    return In.getInput(btn).x;
}
function MouseY(btn = 0) {
    return In.getInput(btn).y;
}
function MouseDragStartX(btn = 0) {
    return In.getInput(btn).xStart;
}
function MouseDragStartY(btn = 0) {
    return In.getInput(btn).yStart;
}
function degDist(angleS = 0, angleT, min = true) {
    return Basik.Transform.degDist(angleS, angleT, min);
}
function Angle(x, y) {
    return Basik.Tf.sudut(x, y);
}
function Clamp(n, min, max) {
    if (n < min)
        return min;
    if (n > max)
        return max;
    return n;
}
function LoadImage(url) {
    return Ip.Muat(url);
}
function LoadAnimImage(url, frameWidth, frameHeight) {
    return Ip.MuatAnimasi(url, frameWidth, frameHeight);
}
function DrawImage(img) {
    Ip.Draw(img);
}
function ImageCollide(img1, img2) {
    return Ip.tabrakan(img1, img1.x, img1.y, img2, img2.x, img2.y);
}
function ImageCollidePoint(img, x, y) {
    return Ip.dotInsideImage(img, img.x, img.y, x, y);
}
function CreateImage(width, height) {
    return Ip.CreateImage(width, height);
}
const ImageCanvas = (img) => {
    return img.canvas;
};
function AllImageLoaded() {
    return Ip.AllImageLoaded();
}
function FreeImage(img) {
    Ip.free(img);
}
