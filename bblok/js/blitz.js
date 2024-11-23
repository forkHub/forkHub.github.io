var ha;
(function (ha) {
    var be;
    (function (be) {
        class Be {
            static Pause() {
                debugger;
            }
            /**
             * Handle saat window di resize
             * @private
             */
            static windowResize() {
                // console.debug('window on resize');
                let canvas = Be.canvasAktif.canvas;
                let cp = Be.canvasAktif.canvas.width;
                let cl = Be.canvasAktif.canvas.height;
                let wp = window.innerWidth;
                let wl = window.innerHeight;
                let ratio = Math.min((wp / cp), (wl / cl));
                let cp2 = Math.floor(cp * ratio);
                let cl2 = Math.floor(cl * ratio);
                Be.canvasAktif.ratioX = ratio;
                Be.canvasAktif.ratioY = ratio;
                canvas.style.position = 'fixed';
                canvas.style.zIndex = '1';
                canvas.style.width = cp2 + 'px';
                canvas.style.height = cl2 + 'px';
                canvas.style.top = ((wl - cl2) / 2) + 'px';
                canvas.style.left = ((wp - cp2) / 2) + 'px';
                // console.debug('canvas w: ' + canvas.style.width + '/ratio: ' + ratio);
            }
            /**
             * mengeset/mengembalikan Kontek yang sedang aktif
             *
             * @param ctx (CanvasRenderingContext2D) | null
             * @returns CanvasRenderingContext2D
             */
            static Kontek(ctx) {
                if (ctx) {
                    Be.canvasAktif.ctx = ctx;
                }
                return Be.canvasAktif.ctx;
            }
            static buatCanvas(canvasEl) {
                let canvas = new be.SprObj();
                canvas.canvas = canvasEl;
                canvas.ctx = canvasEl.getContext('2d');
                canvas.lebar = canvasEl.height;
                canvas.panjang = canvasEl.width;
                canvas.frameH = canvasEl.height;
                canvas.frameW = canvasEl.width;
                canvas.rect = be.Kotak.buat();
                canvas.load = true;
                canvas.panjangDiSet = true;
                canvas.lebarDiSet = true;
                // {
                // 	canvas: canvasEl,
                // 	ctx: canvasEl.getContext('2d'),
                // 	lebar: canvasEl.height,
                // 	panjang: canvasEl.width,
                // 	frameH: canvasEl.height,
                // 	frameW: canvasEl.width,
                // 	handleX: 0,
                // 	handleY: 0,
                // 	img: null,
                // 	isAnim: false,
                // 	rotasi: 0,
                // 	alpha: 1,
                // 	rect: Kotak.buat(),
                // 	load: true,
                // 	panjangDiSet: true,
                // 	lebarDiSet: true,
                // 	ratioX: 1,
                // 	ratioY: 1,
                // 	ctrIdx: 0,
                // }
                return canvas;
            }
            static init(canvasBelakang, canvasDepan) {
                let canvas = Be.buatCanvas(canvasBelakang);
                Be._canvasAr.push(canvas);
                canvas = Be.buatCanvas(canvasDepan);
                Be._canvasAr.push(canvas);
                Be.canvasAktif = canvas;
                ha.be.Teks.Rata("center");
            }
            static backupWarna() {
                Be.warnaBackup.b = Be.biru;
                Be.warnaBackup.h = Be.hijau;
                Be.warnaBackup.m = Be.merah;
                Be.warnaBackup.t = Be.transparan;
            }
            static restoreWarna() {
                Be.biru = Be.warnaBackup.b;
                Be.hijau = Be.warnaBackup.h;
                Be.merah = Be.warnaBackup.m;
                Be.transparan = Be.warnaBackup.t;
                Be.updateStyleWarna();
            }
            /**
             *
             * @param merah {angka} warna merah, optional default = 0
             * @param hijau
             * @param biru
             * @param transparan
             */
            static Bersih(merah = 0, hijau = 0, biru = 0, transparan = 100) {
                let ctx = Be.canvasAktif.ctx;
                Be.backupWarna();
                ctx.clearRect(0, 0, Be.canvasAktif.panjang, Be.canvasAktif.lebar);
                ctx.fillStyle = `rgba(${merah}, ${hijau}, ${biru}, ${transparan / 100})`;
                ctx.fillRect(0, 0, Be.canvasAktif.panjang, Be.canvasAktif.lebar);
                Be.restoreWarna();
            }
            /**
             * Update style warna
             * @param r (0-255)
             * @param g (0-255)
             * @param b (0-255)
             * @param a (0-100)
             */
            static Warna(r = 0, g = 0, b = 0, a = 100) {
                let h = Be;
                h.merah = r;
                h.biru = b;
                h.hijau = g;
                h.transparan = a / 100;
                h.updateStyleWarna();
            }
            static StrokeColor(r = 0, g = 0, b = 0, a = 100) {
                let ctx = Be.canvasAktif.ctx;
                ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
            }
            static updateStyleWarna() {
                let ctx = Be.canvasAktif.ctx;
                ctx.fillStyle = `rgba(${Be.merah}, ${Be.hijau}, ${Be.biru}, ${Be.transparan})`;
            }
            /**
             * Mengembalikan warna merah dari perintah AmbilPixel terakhir
             * @returns (number) warna merah
             */
            static Hijau() {
                return Be.hijau;
            }
            static Merah() {
                return Be.merah;
            }
            /**
             * Mengembalikan warna biru dari perintah AmbilPixel terakhir
             * @returns (number) warna biru
             */
            static Biru() {
                return Be.biru;
            }
            /**
             *
             * @returns
             */
            static Transparan() {
                return Math.floor(Be.transparan * 100);
            }
            /**
             *
             * @returns
             */
            static Kanvas() {
                return Be.canvasAktif.canvas;
            }
            static Grafis(panjang = 320, lebar = 240, canvas = null, fullScreen = true, input = true) {
                //coba cari canvas
                if (!canvas) {
                    canvas = document.body.querySelector('canvas');
                }
                if (!canvas) {
                    document.body.appendChild(document.createElement('canvas'));
                }
                Be.skalaOtomatis = fullScreen;
                // ha.be.Blijs._inputStatus = input
                //sudah diinisialisasi atau belum
                if (Be.canvasAktif) {
                    console.warn('init lebih dari sekali');
                    Be.Grafis2(panjang, lebar, Be.skalaOtomatis);
                }
                else {
                    console.log('inisialisasi');
                    Be.init(canvas, canvas);
                    Be.Grafis2(panjang, lebar, Be.skalaOtomatis);
                    if (input) {
                        be.Input.init(Be.canvasAktif.canvas);
                    }
                    if (Be.skalaOtomatis) {
                        window.onresize = () => {
                            if (Be.skalaOtomatis) {
                                Be.windowResize();
                            }
                        };
                    }
                    if (Be.skalaOtomatis) {
                        Be.windowResize();
                    }
                    setTimeout(() => {
                        if (Be.skalaOtomatis) {
                            Be.windowResize();
                        }
                    }, 100);
                    // setTimeout(() => {
                    // 	ha.be.Blijs.repeat();
                    // }, 0);
                    //font default
                    // Teks.Font("12px cursive");
                    be.Teks.Rata("center");
                    be.Teks.Goto(169, 10);
                    Be.Warna(255, 255, 255, 100);
                    Be.canvasAktif.ctx.strokeStyle = "#ffffff";
                }
            }
            /**
             * @private
             * helper method
             * */
            static Grafis2(p = 320, l = 240, ubahStyle) {
                let canvas = Be.canvasAktif;
                canvas.canvas.width = p;
                canvas.canvas.height = l;
                if (ubahStyle) {
                    canvas.canvas.style.width = p + 'px';
                    canvas.canvas.style.height = l + 'px';
                    canvas.canvas.style.padding = '0px';
                    canvas.canvas.style.margin = '0px';
                }
                canvas.panjang = p;
                canvas.lebar = l;
                setTimeout(() => {
                    if (Be.skalaOtomatis) {
                        Be.windowResize();
                    }
                    else {
                    }
                }, 0);
                // if (canvas2) {
                // 	Main.canvasAktif.canvas.classList.add('gl');
                // }
                // else {
                // 	Main.canvasAktif.canvas.classList.remove('gl');
                // }
                // if (skalaOtomatis) {
                // 	Main.canvasAktif.canvas.classList.add('pixel');
                // }
                // ha_blitz.Main.windowResize();
            }
            /**
             *
             * @param x1
             * @param y1
             * @param x2
             * @param y2
             */
            static Garis(x1, y1, x2, y2) {
                let ctx = Be.canvasAktif.ctx;
                x1 = Math.floor(x1);
                y1 = Math.floor(y1);
                x2 = Math.floor(x2);
                y2 = Math.floor(y2);
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();
            }
            /**
             *
             * @param x1
             * @param y1
             * @param x2
             * @param y2
             * @param isi
             * @param garis
             * @param rotasi
             */
            static Kotak(x1, y1, x2, y2, isi = false, garis = true, rotasi = 0) {
                let ctx = Be.canvasAktif.ctx;
                //TODO: rotasi
                rotasi;
                if (isi) {
                    ctx.fillRect(x1, y1, x2 - x1, y2 - y1);
                }
                if (garis) {
                    ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
                }
            }
            /**
             * Menggambar Oval
             * @param x posisi x
             * @param y posisi y
             * @param radius radius
             * @param skalaX skala horizontal
             * @param skalaY skala vertikal
             * @param rotasi sudut oval
             */
            static Oval(x = 0, y = 0, radius, skalaX = 1, skalaY = .5, rotasi = 0) {
                let ctx = Be.canvasAktif.ctx;
                // save state
                ctx.save();
                // translate context
                ctx.translate(x, y);
                ctx.rotate(rotasi * (Math.PI / 180));
                // scale context horizontally
                ctx.scale(skalaX, skalaY);
                // draw circle which will be stretched into an oval
                ctx.beginPath();
                ctx.arc(0, 0, radius, 0, 2 * Math.PI, false);
                // restore to original state
                ctx.restore();
                ctx.stroke();
            }
            static get canvasAktif() {
                return Be._canvasAktif;
            }
            static set canvasAktif(value) {
                Be._canvasAktif = value;
            }
            static get canvasAr() {
                return Be._canvasAr;
            }
            static set canvasAr(value) {
                Be._canvasAr = value;
            }
            // public static get origin(): IV2D {
            // 	return Main._origin;
            // }
            // public static set origin(value: IV2D) {
            // 	Main._origin = value;
            // }
            // public static get fps(): number {
            // 	return Main._fps;
            // }
            // public static set fps(value: number) {
            // 	Main._fps = value;
            // }
            static get skalaOtomatis() {
                return Be._skalaOtomatis;
            }
            static set skalaOtomatis(value) {
                Be._skalaOtomatis = value;
            }
            static get merah() {
                return Be._merah;
            }
            static set merah(value) {
                Be._merah = value;
            }
            static get hijau() {
                return Be._hijau;
            }
            static set hijau(value) {
                Be._hijau = value;
            }
            static get biru() {
                return Be._biru;
            }
            static set biru(value) {
                Be._biru = value;
            }
            static get transparan() {
                return Be._transparan;
            }
            static set transparan(value) {
                Be._transparan = value;
            }
        }
        Be._canvasAr = [];
        Be._skalaOtomatis = true;
        //TODO: pindah ke konf
        Be._merah = 0;
        Be._hijau = 0;
        Be._biru = 0;
        Be._transparan = 0;
        Be.warnaBackup = {
            m: 0,
            b: 0,
            h: 0,
            t: 1
        };
        be.Be = Be;
    })(be = ha.be || (ha.be = {}));
})(ha || (ha = {}));
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
var ha;
(function (ha) {
    var be;
    (function (be) {
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
        be.config = new Config();
    })(be = ha.be || (ha.be = {}));
})(ha || (ha = {}));
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
//TODO:
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
//TODO: depecreated
var EInput;
(function (EInput) {
    EInput["TOUCH"] = "touch";
    EInput["MOUSE"] = "mouse";
    EInput["KEYB"] = "keyb";
    EInput["DEF"] = "";
})(EInput || (EInput = {}));
var ha;
(function (ha) {
    var be;
    (function (be) {
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
            //check tap
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
            /**
             * berapa kali tap terjadi sejak pemanggilan terakhir kali
             * @returns (number)
             */
            static JmlTap() {
                let tap = Input.global.tapJml;
                Input.global.tapJml = 0;
                return tap;
            }
            /**
             * berapa kali pointer diangkat  sejak pemanggilan terakhir kali
             * @returns (number)
             */
            static JmlUp() {
                let up = Input.global.upJml;
                Input.global.tapJml = 0;
                return up;
            }
            /**
             * berapa jumlah drag selesai sejak pemanggilan terakhir kali
             * @returns
             */
            static JmlDragSelesai() {
                let s = Input.global.dragSelesaiJml;
                Input.global.dragSelesaiJml = 0;
                return s;
            }
            /**
             * (depecreated) type input dari event terkhir
             * @returns (EInput)
             */
            static InputType() {
                return Input.global.type;
            }
            /**
             * berapa kali pointer di tekan sejak terakhir kali perintah dipanggil
             * @returns (number)
             */
            static InputHit() {
                let hit = Input.global.hit;
                Input.global.hit = 0;
                return hit;
            }
            /**
             * posisi x awal drag
             * @returns (number)
             *
             * */
            static InputXAwal() {
                return Input.global.xStart;
            }
            /**
             * posisi y awal drag
             * @returns (number)
             */
            static InputYAwal() {
                return Input.global.yStart;
            }
            /**
             * posisi x pointer
             * @returns (number)
             */
            static InputX() {
                return Input.global.x;
            }
            /**
             * posisi y pointer
             * @returns
             */
            static InputY() {
                return Input.global.y;
            }
            /**
             * berapa jauh pointer digeser sejajar sumbu x
             * @returns (number)
             */
            static GeserX() {
                return Input.global.xDrag;
            }
            /**
             * berapa jauh pointer di drag sejajar sumbu y
             * @returns (number)
             */
            static GeserY() {
                return Input.global.yDrag;
            }
            /**
             * menghapus data input
             */
            static FlushInput() {
                Input.flush();
            }
            /**
             * berapa kali drag dimulai sejak pemanggilan terakhir
             *
             */
            static JmlDragMulai() {
                let hasil = Input.global.dragJml;
                Input.global.dragJml = 0;
                return hasil;
            }
            /**
             * mengecek apakah pointer sedang ditekan
             * @returns (boolean)
             */
            static Pencet() {
                return Input.global.isDown;
            }
            /**
             * mengecheck apakah pointer sedang di drag
             * @returns (boolean)
             */
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
                    be.sprInteraksi.inputDown(pos, e.pointerId);
                });
                buffer.addEventListener("pointermove", (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    let pos = Input.getPos(e.clientX, e.clientY, buffer);
                    let key = this.getMouseKeyId(e);
                    let input = this.baru(key, e.pointerType);
                    Input.event.move(input, buffer, e);
                    Input.event.move(this.global, buffer, e);
                    //sprite
                    be.sprInteraksi.inputMove(pos, e.pointerId);
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
                    //sprite up
                    //sprite hit
                    be.Spr.daftar.forEach((item) => {
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
                    // isHit: false,
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
        Input._inputs = []; //any input, todo: clean up
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
        be.Input = Input;
    })(be = ha.be || (ha.be = {}));
})(ha || (ha = {}));
// Input
//======
// KeyDown
// KeyHit
// GetKey
// WaitKey
// FlushKeys
// MoveMouse
// MouseDown
// MouseHit
// GetMouse
// WaitMouse
// MouseX
// MouseY
// MouseZ
// MouseXSpeed
// MouseYSpeed
// MouseZSpeed
// FlushMouse
// JoyType
// JoyDown
// JoyHit
// GetJoy
// WaitJoy
// JoyX
// JoyY
// JoyZ
// JoyU
// JoyV
// JoyXDir
// JoyYDir
// JoyZDir
// JoyUDir
// JoyVDir
// JoyYaw
// JoyPitch
// JoyRoll
// JoyHat
// FlushJoy
/**
 * INTERFACE
*/
// interface ISprObj {
// 	buff: ISprImgObj,
// 	dragable: boolean
// 	dragged: boolean
// 	down: boolean
// 	//TODO:
// 	jmlHit?: number,
// 	jmlup?: number,
// 	jmlStartDrag?: number,
// 	jmlEndDrag?: number,
// 	drgStartX: number
// 	drgStartY: number
// 	url: string
// 	//
// 	tipeDrag: number; //1 drag, 2 rotasi, 3 skew (todo)
// 	sudutTekanAwal: number
// 	sudutAwal: number
// 	inputId: number
// }
var ha;
(function (ha) {
    var be;
    (function (be) {
        class Mat {
            static Jarak(x1, y1, x2, y2) {
                return Math.hypot(x2 - x1, y2 - y1);
            }
            /**
             * Menghitung sudut dari posisi relative ke posisi 0,0
             * @param x posisi x
             * @param y posisi y
             * @returns sudut relative ke posisi 0,0
             */
            static Sudut(x, y) {
                return be.Transform.sudut(x, y);
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
        be.Mat = Mat;
    })(be = ha.be || (ha.be = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var be;
    (function (be) {
        // internal class untuk menghandle geometri 
        class Point {
            static create(x = 0, y = 0) {
                return {
                    x: x,
                    y: y
                };
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
                if (false == be.Transform.equal(p1.x, p2.x))
                    return false;
                if (false == be.Transform.equal(p1.y, p2.y))
                    return false;
                return true;
            }
            static putarPoros(p, xc = 0, yc = 0, deg = 0) {
                be.Transform.rotateRel(p.x, p.y, xc, yc, deg);
                p.x = be.Transform.lastX;
                p.y = be.Transform.lastY;
            }
            static posDist(p, xt, yt, jrk) {
                let jrkA;
                let i;
                let j;
                let rasio;
                let hasil = Point.create();
                //jarak sekarang
                jrkA = be.Transform.jarak(p.x, p.y, xt, yt);
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
                hasil.x = jarak * Math.cos(sudut * be.Transform.DEG2RAD);
                hasil.y = jarak * Math.sin(sudut * be.Transform.DEG2RAD);
                hasil.x += xt;
                hasil.y += yt;
                return hasil;
            }
        }
        be.Point = Point;
    })(be = ha.be || (ha.be = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var be;
    (function (be) {
        //internal
        class Segment {
            static create(v1 = { x: 0, y: 0 }, v2 = { x: 0, y: 0 }) {
                return {
                    v1: v1,
                    v2: v2
                };
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
                // let deg: number = Segment.deg(seg2);
                let seg2Copy = Segment.clone(seg2);
                let seg1Copy = Segment.clone(seg1);
                let deg = Segment.deg(seg2);
                Segment.rotate(seg2Copy, -deg, seg2.v1.x, seg2.v1.y);
                Segment.rotate(seg1Copy, -deg, seg2.v1.x, seg2.v1.y);
                if (!Segment.boundCollide(seg1Copy, seg2Copy))
                    return false;
                Segment.translate(seg1Copy, -seg2.v1.x, -seg2.v1.y);
                Segment.translate(seg2Copy, -seg2.v1.x, -seg2.v1.y);
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
                be.Point.copy(seg1.v1, seg2.v2);
                be.Point.copy(seg1.v2, seg2.v2);
            }
            static clone(seg) {
                return {
                    v1: be.Point.clone(seg.v1),
                    v2: be.Point.clone(seg.v2)
                };
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
                let j = line.v2.y - line.v1.y;
                let i = line.v2.x - line.v1.x;
                return be.Transform.sudut(i, j);
            }
            static getXAtIdx(seg, idx) {
                return seg.v1.x + (idx * Segment.vecI(seg));
            }
            static getYAtIdx(seg, idx) {
                return seg.v1.y + (idx * Segment.vecJ(seg));
            }
            static vecI(seg) {
                return seg.v2.x - seg.v1.x;
            }
            static vecJ(seg) {
                return seg.v2.y - seg.v1.y;
            }
            static rotate(seg, deg = 0, xc = 0, yc = 0) {
                be.Point.putarPoros(seg.v1, xc, yc, deg);
                be.Point.putarPoros(seg.v2, xc, yc, deg);
            }
            static minX(seg) {
                return Math.min(seg.v1.x, seg.v2.x);
            }
            static maxX(seg) {
                return Math.max(seg.v1.x, seg.v2.x);
            }
            static minY(seg) {
                return Math.min(seg.v1.y, seg.v2.y);
            }
            static maxY(seg) {
                return Math.max(seg.v1.y, seg.v2.y);
            }
            static translate(seg, x = 0, y = 0) {
                seg.v1.x += x;
                seg.v1.y += y;
                seg.v2.x += x;
                seg.v2.y += y;
            }
            //tested
            static xHorIdx(seg) {
                if (!Segment.crossHor(seg))
                    return NaN;
                let idx = 0;
                idx = (0 - seg.v1.y) / (seg.v2.y - seg.v1.y);
                return idx;
            }
        }
        be.Segment = Segment;
    })(be = ha.be || (ha.be = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var be;
    (function (be) {
        // internal class untuk menghandle geometri 
        // Kotak
        class Kotak {
            static buat(x1 = 0, y1 = 0, x2 = 0, y2 = 0) {
                let r = {};
                r.vs = [];
                r.vs.push(be.Point.create(x1, y1));
                r.vs.push(be.Point.create(x2, y1));
                r.vs.push(be.Point.create(x2, y2));
                r.vs.push(be.Point.create(x1, y2));
                r.segs = [];
                r.segs.push(be.Segment.create(r.vs[0], r.vs[1]));
                r.segs.push(be.Segment.create(r.vs[1], r.vs[2]));
                r.segs.push(be.Segment.create(r.vs[2], r.vs[3]));
                r.segs.push(be.Segment.create(r.vs[3], r.vs[0]));
                return r;
            }
            static copy(r) {
                // console.log('copy:');
                // console.log(r.vs);
                // let hasil: IRect = Rect.create(r.vs[0].x, r.vs[0].y, r.vs[2].x, r.vs[2].y);
                let hasil = Kotak.buat();
                Kotak.copyInfo(r, hasil);
                // console.log(hasil.vs);
                return hasil;
            }
            static copyInfo(r1, r2) {
                for (let i = 0; i < r1.segs.length; i++) {
                    be.Segment.copy(r1.segs[i], r2.segs[i]);
                }
            }
            static collideBound(r1, r2) {
                // console.debug('collide bound');
                if (Kotak.maxX(r1) < Kotak.minX(r2)) {
                    // console.debug('maxX gagal');
                    return false;
                }
                // console.log('maxx ' + Rect.maxX(r1));
                // console.log('minx ' + Rect.minX(r2));
                if (Kotak.minX(r1) > Kotak.maxX(r2)) {
                    // console.debug('min x gagal');
                    return false;
                }
                if (Kotak.maxY(r1) < Kotak.minY(r2)) {
                    // console.debug('max y gagal');
                    return false;
                }
                if (Kotak.minY(r1) > Kotak.maxY(r2)) {
                    // console.debug('min y gagal');
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
                        if (be.Segment.collide(r1.segs[i], r2.segs[j])) {
                            return true;
                        }
                    }
                }
                return false;
            }
            static collideDotBound(r, d) {
                if (d.x < Kotak.minX(r)) {
                    // console.log('minx failed');
                    return false;
                }
                if (d.x > Kotak.maxX(r)) {
                    // console.log('maxX failed');
                    // console.log(d);
                    // console.log(Rect.maxX(r));
                    // console.log(r.vs);
                    return false;
                }
                if (d.y < Kotak.minY(r)) {
                    // console.log('minY failed');
                    return false;
                }
                if (d.y > Kotak.maxY(r)) {
                    // console.log('maxY failed');
                    return false;
                }
                return true;
            }
            static collideDot(r, x, y) {
                let r2 = Kotak.copy(r);
                let p = be.Point.create(x, y);
                let d = be.Segment.deg(r2.segs[0]);
                let pRot = r2.vs[0];
                if (!Kotak.collideDotBound(r, p)) {
                    return false;
                }
                Kotak.rotate(r2, -d, pRot.x, pRot.y, false);
                be.Point.putarPoros(p, pRot.x, pRot.y, -d);
                if (!Kotak.collideDotBound(r2, p)) {
                    // console.log('collide bound 2 failed');
                    // console.log('deg ' + d);
                    // console.log('rect');
                    // console.log(r2);
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
                    be.Point.putarPoros(p, xc, yc, deg);
                });
                return r2;
            }
        }
        be.Kotak = Kotak;
    })(be = ha.be || (ha.be = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var be;
    (function (be) {
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
            /**
             * Menghitung sudut dari posisi relative ke posisi 0,0
             * @param x posisi x
             * @param y posisi y
             * @returns sudut relative ke posisi 0,0
             */
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
        be.Transform = Transform;
    })(be = ha.be || (ha.be = {}));
})(ha || (ha = {}));
///<reference path="./Point.ts"/>
///<reference path="./Segment.ts"/>
///<reference path="./Rect.ts"/>
///<reference path="./Transform.ts"/>
///<reference path="./geom/Route.ts"/>
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
var ha;
(function (ha) {
    var be;
    (function (be) {
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
                return be.Be.canvasAktif.ctx;
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
            /**
             *
             * @param nama
             */
            static Font(nama = 'cursive') {
                Teks.nama = nama;
                Teks.ctx.font = Teks.ukuran + 'px ' + Teks.nama;
            }
            static FontSize(n = 30) {
                Teks.ukuran = n;
                Teks.ctx.font = Teks.ukuran + 'px ' + Teks.nama;
                console.log(Teks.ukuran, Teks.nama);
            }
            /**
             *
             * @param rata (string) "center" | "end" | "left" | "right" | "start"
             */
            static Rata(rata = "left") {
                Teks.ctx.textAlign = rata;
            }
            /**
             * menulis teks di kanvas
             * @param teks (string)
             * @param x (number)
             * @param y (number)
             * @param warna (boolean=true) apakah akan mengisi teks dengan warna
             * @param garis (boolean=false) apakah akan menggunakan outline
             */
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
        be.Teks = Teks;
    })(be = ha.be || (ha.be = {}));
})(ha || (ha = {}));
///<reference path="../Route.ts"/>
///<reference path="./Route.ts"/>
const LoadSound = ha.be.Sound.Load;
const PlaySound = ha.be.Sound.Play;
const SoundEnded = ha.be.Sound.SoundEnded;
const SoundLoaded = ha.be.Sound.SoundLoaded;
var ha;
(function (ha) {
    var be;
    (function (be) {
        /*
        export class SprObj {
            img: HTMLImageElement;
            canvas: HTMLCanvasElement;
            ctx: CanvasRenderingContext2D;
            isAnim: boolean = false;
            rect: Ikt = new Kotak();
            load: boolean = false;
            ratioX?: number = 1;
            ratioY?: number = 1;
    
            private _panjangDiSet: boolean = false;
            private _lebarDiSet: boolean = false;
            private _ctrIdx: number = 0;
    
            private _x: number = 0;
            private _y: number = 0;
            private _alpha: number = 100;
            private _frameW: number = 32;
            private _frameH: number = 32;
            private _handleX: number = 0;
            private _handleY: number = 0;
            private _rotasi: number = 0;
            private _panjang: number = 0;
            private _lebar: number = 0;
    
            public get frameW(): number {
                return this._frameW;
            }
            public set frameW(value: number) {
                this._frameW = value;
            }
            public get frameH(): number {
                return this._frameH;
            }
            public set frameH(value: number) {
                this._frameH = value;
            }
    
            public get x(): number {
                return this._x;
            }
            public set x(value: number) {
                this._x = value;
            }
            public get y(): number {
                return this._y;
            }
            public set y(value: number) {
                this._y = value;
            }
    
            public get alpha(): number {
                return this._alpha;
            }
            public set alpha(value: number) {
                this._alpha = value;
            }
    
            public get handleY(): number {
                return this._handleY;
            }
            public set handleY(value: number) {
                this._handleY = value;
            }
    
            public get handleX(): number {
                return this._handleX;
            }
            public set handleX(value: number) {
                this._handleX = value;
            }
    
            public get panjang(): number {
                return this._panjang;
            }
            public set panjang(value: number) {
                console.log('set panjang: ' + value);
                this._panjang = value;
                this._panjangDiSet = true;
            }
    
            public get lebar(): number {
                return this._lebar;
            }
            public set lebar(value: number) {
                this._lebar = value;
                this._lebarDiSet = true;
            }
    
            public get panjangDiSet(): boolean {
                return this._panjangDiSet;
            }
            public set panjangDiSet(value: boolean) {
                this._panjangDiSet = value;
            }
    
            public get lebarDiSet(): boolean {
                return this._lebarDiSet;
            }
            public set lebarDiSet(value: boolean) {
                this._lebarDiSet = value;
            }
    
            public get ctrIdx(): number {
                return this._ctrIdx;
            }
            public set ctrIdx(value: number) {
                this._ctrIdx = value;
            }
    
            public get rotasi(): number {
                return this._rotasi;
            }
            public set rotasi(value: number) {
                // console.debug('set value: ' + value);
                this._rotasi = value;
            }
        }
        */
        class SprImg {
            static buatBagiCanvas(canvas, w = 32, h = 32, frameW = 32, frameH = 32) {
                let img;
                canvas.width = w;
                canvas.height = h;
                let rect = ha.be.Kotak.buat(0, 0, frameW, frameH);
                img = new be.SprObj();
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
            //depecrated
            static panjang(gbr, pj) {
                if (typeof pj == 'number') {
                    gbr.panjang = pj;
                    gbr.panjangDiSet = true;
                }
                return gbr.panjang;
            }
            ;
            //depecrated
            static lebar(gbr, lb) {
                if (typeof lb == 'number') {
                    gbr.lebar = lb;
                    gbr.lebarDiSet = true;
                }
                return gbr.lebar;
            }
            ;
            static tabrakan(gbr1, x1, y1, gbr2, x2, y2) {
                SprImg.resetRect(gbr1);
                SprImg.rectToImageTransform(gbr1, x1, y1);
                SprImg.resetRect(gbr2);
                SprImg.rectToImageTransform(gbr2, x2, y2);
                return ha.be.Kotak.collide(gbr1.rect, gbr2.rect);
            }
            ;
            static dotDidalamGambar(gbr1, x1, y1, x2, y2) {
                SprImg.resetRect(gbr1);
                SprImg.rectToImageTransform(gbr1, x1, y1);
                return ha.be.Kotak.collideDot(gbr1.rect, x2, y2);
            }
            ;
            static muatAnimAsync(url, fw, fh) {
                let canvas = document.createElement('canvas');
                return SprImg.muatAnimAsyncCanvas(url, fw, fh, canvas);
            }
            static muatAnimAsyncCanvas(url, fw, fh, canvas) {
                let img = document.createElement('img'); //;
                let ctx = canvas.getContext('2d');
                let rect;
                rect = ha.be.Kotak.buat(0, 0, fw, fh);
                let gbr = new be.SprObj();
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
                // let gbr: IGambar = {
                // 	img: img,
                // 	panjang: img.naturalWidth,
                // 	lebar: img.naturalHeight,
                // 	frameH: fh,
                // 	frameW: fw,
                // 	isAnim: true,
                // 	handleX: 0,
                // 	handleY: 0,
                // 	rotasi: 0,
                // 	alpha: 1,
                // 	ctx: ctx,
                // 	canvas: canvas,
                // 	rect: rect,
                // 	load: false,
                // 	panjangDiSet: false,
                // 	lebarDiSet: false
                // }
                img.onload = () => {
                    imgOnLoad(img);
                };
                img.onerror = () => {
                    console.warn('gagal load image, url ' + url);
                    //TODO: default image
                };
                let img2 = ha.be.cache.getGbr(url);
                if (img2) {
                    imgOnLoad(img2);
                }
                else {
                    img.src = url;
                }
                function imgOnLoad(img) {
                    // console.log('img anim load ' + url);
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
                return SprImg.muatAsyncKanvas(url, kanvas, onload);
            }
            static muatAsyncKanvas(url, canvas, onload) {
                let img = document.createElement('img');
                let ctx = canvas.getContext('2d');
                let rect;
                rect = ha.be.Kotak.buat(0, 0, img.naturalWidth, img.naturalHeight);
                let gbr;
                gbr = new be.SprObj();
                //TODO: refaktor
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
                img.onload = () => {
                    onload();
                    imgOnLoad(img);
                };
                img.onerror = () => {
                    console.warn('gagal load image, url ' + url);
                    //TODO: default image
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
                    gbr.rect = ha.be.Kotak.buat(0, 0, imgP.naturalWidth, imgP.naturalHeight);
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
                    //TODO: draw rectangle, broken image
                    // ctx = canvas.getContext('2d');
                    gbr.img = document.createElement('img');
                    // ctx.drawImage(gbr.img, 0, 0);
                    gbr.rect = ha.be.Kotak.buat(0, 0, 32, 32);
                    ctx.fillStyle = 'rgba(255, 255, 255, 100)';
                    ctx.strokeStyle = 'rgba(255, 0, 0, 100)';
                    ctx.beginPath();
                    ctx.rect(0, 0, 32, 32);
                    ctx.moveTo(0, 0);
                    ctx.lineTo(31, 31);
                    ctx.moveTo(0, 31);
                    ctx.lineTo(31, 0);
                    ctx.stroke();
                    // ctx.setf
                    // ctx.fillRect(0, 0, 32, 32);
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
                //posisi gambar dimulai dari sebelum titik 0,0
                while (y < 0) {
                    y += h2;
                }
                while (y > 0) {
                    y -= h2;
                }
                x -= w2;
                y -= h2;
                frame = Math.floor(frame);
                jmlH = Math.ceil((be.Be.canvasAktif.panjang + Math.abs(x)) / w2);
                jmlV = Math.ceil((be.Be.canvasAktif.lebar + Math.abs(y)) / h2);
                for (let i = 0; i < jmlH; i++) {
                    for (let j = 0; j < jmlV; j++) {
                        SprImg.gambar(gbr, x + (i * w2), y + (j * h2), frame);
                    }
                }
            }
            /**
             * mengambil pixel di layar
             * @param x posisi x
             * @param y posisi y
             * @returns (Uint8ClampedArray)
             */
            static AmbilPiksel(x = 0, y = 0) {
                try {
                    let data = be.Be.canvasAktif.ctx.getImageData(x, y, 1, 1).data;
                    let hasil = [];
                    hasil.push(data[0]);
                    hasil.push(data[1]);
                    hasil.push(data[2]);
                    hasil.push(data[3]);
                    be.Be.merah = data[0];
                    be.Be.hijau = data[1];
                    be.Be.biru = data[2];
                    be.Be.transparan = data[3];
                    be.Be.Warna(be.Be.merah, be.Be.hijau, be.Be.biru, be.Be.transparan);
                    return hasil;
                }
                catch (e) {
                    // console.error(e);
                }
                return [0, 0, 0];
            }
            /**
             *
             * @param x
             * @param y
             */
            static SetPiksel(x = 0, y = 0) {
                be.Be.canvasAktif.ctx.fillRect(Math.floor(x), Math.floor(y), 1, 1);
            }
            static gambar(gbr, x = 0, y = 0, frame = 0) {
                let ctx = be.Be.canvasAktif.ctx;
                let jmlH = 0;
                // let jmlV: number = 0;
                let frameX = 0;
                let frameY = 0;
                // let rect: IRect = img.rect;
                if (gbr.load == false)
                    return;
                gbr.ctrIdx = ha.be.SprObj.ctrDraw++;
                frame = Math.floor(frame);
                jmlH = Math.floor(gbr.img.naturalWidth / gbr.frameW);
                // jmlV = Math.floor(gbr.img.naturalHeight / gbr.frameH);
                // console.log('jmlH ' + jmlH);
                // console.log('nw: ' + gbr.img.naturalWidth);
                // console.log('fw: ' + gbr.frameW);
                // debugger;
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
                    // ctx.globalAlpha = gbr.alpha / 100;
                    // ctx.drawImage(gbr.canvas, frameX, frameY, gbr.frameW, gbr.frameH, -gbr.handleX, -gbr.handleY, w2, h2);
                    drawImpl(-gbr.handleX, -gbr.handleY);
                    ctx.restore();
                }
                else {
                    ctx.save();
                    // ctx.globalAlpha = gbr.alpha / 100;
                    // ctx.drawImage(gbr.canvas, frameX, frameY, gbr.frameW, gbr.frameH, x2, y2, w2, h2);
                    drawImpl(x2, y2);
                    ctx.restore();
                }
                function drawImpl(dx, dy) {
                    ctx.globalAlpha = gbr.alpha / 100;
                    ctx.drawImage(gbr.canvas, frameX, frameY, gbr.frameW, gbr.frameH, dx, dy, w2, h2);
                    console.group('gmbar image');
                    console.log("x:", x, "y:", y, "x2:", x2, "y2:", y2);
                    console.groupEnd();
                }
                // debugger;
            }
            /**
             * Ubah Ukuran Gambar
             * @param gbr
             * @param w
             * @param h
             */
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
                //scale
                p = rect.vs[1];
                p.x = x2;
                p.y = 0;
                p = rect.vs[2];
                p.x = x2;
                p.y = y2;
                p = rect.vs[3];
                p.x = 0;
                p.y = y2;
                //translate
                ha.be.Kotak.translate(rect, x, y);
                ha.be.Kotak.translate(rect, -image.handleX, -image.handleY);
                //rotate
                ha.be.Kotak.rotate(rect, image.rotasi, x, y, false);
            }
        }
        be.SprImg = SprImg;
    })(be = ha.be || (ha.be = {}));
})(ha || (ha = {}));
///<reference path="./Route.ts"/>
///<reference path="../spr/SpriteImage.ts"/>
const Graphics = ha.be.Be.Grafis;
/**
 * Clear Screen and optionally use color
 * @param r number = 0 - 255 (optional) the red color
 * @param g
 * @param b
 * @param t
 */
function Cls(r, g, b, t) {
    ha.be.Be.Bersih(r, g, b, t);
}
const Color = ha.be.Be.Warna;
const Stroke = ha.be.Be.StrokeColor;
// /**
//  * Mengembalikan warna merah dari perintah AmbilPixel terakhir
//  * @returns (number) warna merah
//  */
// };
const Red = ha.be.Be.Merah;
const Green = ha.be.Be.Hijau;
const Blue = ha.be.Be.Biru;
const Alpha = ha.be.Be.Transparan;
const GetPixel = ha.be.SprImg.AmbilPiksel;
const SetPixel = ha.be.SprImg.SetPiksel;
// const Kontek = ha.be.Be.Kontek;
// const Kanvas = ha.be.Be.Kanvas;
const Line = ha.be.Be.Garis;
const Rect = ha.be.Be.Kotak;
const Oval = ha.be.Be.Oval;
const CreateDict = Dict.create;
// const DictGetValue = Dict.GetValue;
// const DictAddAttr = Dict.AddAttr;
// const DictGetKeyList = Dict.GetKeyList;
// const DictGetValueList = Dict.GetValueList;   
///<reference path="./Route.ts"/>
const InputHit = ha.be.Input.InputHit;
const InputX = ha.be.Input.InputX;
const InputY = ha.be.Input.InputY;
const InputIsDown = ha.be.Input.Pencet;
// //extended
const FlushInput = ha.be.Input.FlushInput;
const InputDragX = ha.be.Input.GeserX;
const InputDragY = ha.be.Input.GeserY;
const InputIsDragged = ha.be.Input.Geser;
const InputType = ha.be.Input.InputType;
const InputTapCount = ha.be.Input.JmlTap;
const InputDragStartCount = ha.be.Input.JmlDragMulai;
const InputDragEndCount = ha.be.Input.JmlDragSelesai;
const InputDragStartX = ha.be.Input.InputXAwal;
const InputDragStartY = ha.be.Input.InputYAwal;
//TODO: input id
// // const FlushKeys = () => {
// // 	// ha.be.input.flushByInput(ha.be.input.keybGlobal);
// // 	ha.be.input.flushByType('keyb');
// // }
// // const GetKey = (): string => {
// // 	return ha.be.input.keybGlobal.key;
// // }
// // const KeybDiPencet = (key: string = ''): boolean => {
// // 	if ("" == key) {
// // 		return ha.be.input.keybGlobal.isDown;
// // 	}
// // 	else {
// // 		let input: IInput = ha.be.input.getInput(key, 'keyb');
// // 		if (input) {
// // 			return input.isDown;
// // 		}
// // 		return false;
// // 	}
// // }
// // const KeybHit = (key: string = ''): number => {
// // 	if ("" == key) {
// // 		let n: number = ha.be.input.keybGlobal.hit;
// // 		ha.be.input.keybGlobal.hit = 0;
// // 		return (n);
// // 	}
// // 	else {
// // 		let input: IInput = ha.be.input.getInput(key, 'keyb');
// // 		let n: number = 0;
// // 		if (input) {
// // 			n = input.hit;
// // 			input.hit = 0;
// // 		}
// // 		return n;
// // 	}
// // }
///<reference path="./Route.ts"/>
// const Sudut = ha.be.Mat.Sudut;
const DistMin = ha.be.Transform.degDistMin;
/**
 *
 * @param x1
 * @param y1
 * @param x2
 * @param y2
 * @returns
 */
function Distance(x1, y1, x2, y2) {
    return Math.hypot(x2 - x1, y2 - y1);
}
///<reference path="./SpriteImage.ts"/>
var ha;
(function (ha) {
    var be;
    (function (be) {
        class Spr {
            static checkNull(s) {
                if (s == null)
                    throw Error("Image belum di inisialisasi");
            }
            //Attribute [depecrated]
            //depecrated
            static DragMode(s, n) {
                Spr.checkNull(s);
                if (n > 0) {
                    s.tipeDrag = n;
                    s.dragable = true;
                }
            }
            //depecrated
            /**
             *
             * @param s
             * @returns
             */
            static Dimuat(s) {
                Spr.checkNull(s);
                return s.load;
            }
            /**
             *
             * @param s
             * @returns
             */
            static StatusDrag(s) {
                let hasil = false;
                Spr.checkNull(s);
                Spr.daftar.forEach((item) => {
                    if (s == item) {
                        hasil = s.dragged;
                        return;
                    }
                });
                return hasil;
            }
            /**
             * [depecrated]
             * @param s
             * @returns
             */
            static kontek(s) {
                Spr.checkNull(s);
                return s.ctx;
            }
            /**
             * [depecrated]
             * @param s
             * @param pj
             * @returns
             */
            static Panjang(s, pj) {
                Spr.checkNull(s);
                return be.SprImg.panjang(s, pj);
            }
            /**
             * [depacrated]
             * @param s
             * @param lb
             * @returns
             */
            static Lebar(s, lb) {
                Spr.checkNull(s);
                return be.SprImg.lebar(s, lb);
            }
            /**
             *
             * @param s
             * @param alpha 0-100s
             * @returns
             */
            static Alpha(s, alpha) {
                Spr.checkNull(s);
                if (typeof (alpha) == 'number') {
                    s.alpha = alpha;
                }
                return s.alpha;
            }
            /**
             *
             * @param s
             * @param sudut
             * @returns
             */
            static Rotasi(s, sudut) {
                Spr.checkNull(s);
                if (s && (typeof (sudut) == 'number')) {
                    s.rotasi = sudut;
                }
                return be.Transform.normalizeDeg(s.rotasi);
            }
            //method
            /**
             *
             * @param s
             * @param x
             * @param y
             */
            static Posisi(s, x = 0, y = 0) {
                Spr.checkNull(s);
                s.x = x;
                s.y = y;
            }
            /**
             *
             * @param s
             * @param x
             * @returns
             */
            static PosisiX(s, x = null) {
                Spr.checkNull(s);
                if (typeof (x) == 'number') {
                    s.x = x;
                }
                return s.x;
            }
            /**
             *
             * @param s
             * @param y
             * @returns
             */
            static PosisiY(s, y = null) {
                if (typeof (y) == 'number') {
                    // debugger;
                    s.y = y;
                }
                return s.y;
            }
            /**
             *
             * @param s
             * @returns
             */
            static Bound(s) {
                be.SprImg.resetRect(s);
                be.SprImg.rectToImageTransform(s, s.x, s.y);
                return s.rect;
            }
            //TODO:boundx, boundy, boundX2, boundY2
            /**
             *
             * @param s
             * @param x
             * @param y
             * @returns
             */
            static Handle(s, x = 0, y = 0) {
                if (s) {
                    s.handleX = x;
                    s.handleY = y;
                }
            }
            static HandleX(s) { return s.handleX; }
            static HandleY(s) { return s.handleY; }
            /**
             *
             * @param s
             * @param w
             * @param h
             */
            static Ukuran(s, w, h) {
                be.SprImg.ukuran(s, w, h);
            }
            //================
            //Image Operation:
            //================
            /**
             *
             * @param s {ISprObj} sprite
             * @param onload {() => void} optional, fungsi yang dipanggil sprite selesai dimuat
             * @returns
             */
            static Copy(s, onload) {
                if (!onload) {
                    onload = () => { };
                }
                if (s.isAnim) {
                    console.debug('copy sprite anim');
                    console.debug(s);
                    return Spr.muatAnimasiAsyncKanvas(s.url, s.frameW, s.frameH, s.dragable, s.canvas, s.tipeDrag);
                }
                else {
                    return Spr.muatAsyncBerbagiKanvas(s.url, s.dragable, s.canvas, s.tipeDrag, onload);
                }
            }
            /**
             *
             */
            static GambarSemua() {
                for (let i = 0; i < Spr.daftar.length; i++) {
                    let item = Spr.daftar[i];
                    Spr.Gambar(item);
                }
            }
            /**
             *
             * @param spr
             * @param spr2
             * @returns
             */
            static Tabrakan(spr, spr2) {
                return be.SprImg.tabrakan(spr, Spr.PosisiX(spr), Spr.PosisiY(spr), spr2, Spr.PosisiX(spr2), Spr.PosisiY(spr2));
            }
            //TODO: depecrated
            static TabrakanXY(spr, x1, y1, spr2, x2, y2) {
                return be.SprImg.tabrakan(spr, x1, y1, spr2, x2, y2);
            }
            static muatAnimasiAsyncKanvas(url, pf, lf, bisaDiDrag, canvas, tipeDrag) {
                let img = be.SprImg.muatAnimAsyncCanvas(url, pf, lf, canvas);
                return Spr.register(img, bisaDiDrag, url, tipeDrag);
            }
            /**
             *
             * @param url
             * @param pf
             * @param lf
             * @param bisaDiDrag
             * @param tipeDrag
             * @returns
             */
            static MuatAnimasi(url, pf, lf, bisaDiDrag = false, tipeDrag = 0) {
                let img = be.SprImg.muatAnimAsync(url, pf, lf);
                return Spr.register(img, bisaDiDrag, url, tipeDrag);
            }
            static muatAsyncBerbagiKanvas(url, dragable = false, canvas, tipeDrag, onload) {
                let img = be.SprImg.muatAsyncKanvas(url, canvas, onload);
                return Spr.register(img, dragable, url, tipeDrag);
            }
            /**
             *
             * @param url (string) url gambar
             * @param bisaDiDrag
             * @param tipeDrag
             * @param onload
             * @returns
             */
            static Muat(url, bisaDiDrag = false, tipeDrag = 0, onload) {
                if (!onload)
                    onload = () => { };
                let img = be.SprImg.muatAsync(url, onload);
                let spr = Spr.register(img, bisaDiDrag, url, tipeDrag);
                return spr;
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
                Spr.daftar.push(hasil);
                // console.debug('buat sprite');
                // console.debug(hasil);
                return hasil;
            }
            /**
             * Menggambar sprite ke layar
             * @param sprite
             * @param frame
             */
            static Gambar(sprite, frame) {
                be.SprImg.gambar(sprite, sprite.x, sprite.y, frame);
            }
            /**
             *
             * @param s
             * @param x
             * @param y
             * @param frame
             * @returns
             */
            static GambarXY(s, x, y, frame) {
                s.x = x;
                s.y = y;
                be.SprImg.gambar(s, x, y, frame);
            }
            /**
             *
             * @param spr
             * @param sudut
             * @param jarak
             * @param x2
             * @param y2
             * @param skalaX
             * @param skalaY
             */
            static posisiPolar(spr, sudut, jarak, x2, y2, skalaX = 1, skalaY = 1, tilt = 0) {
                let p = be.Point.posPolar(jarak, sudut, x2, y2);
                p.y -= y2;
                p.y *= skalaY;
                p.y += y2;
                p.x -= x2;
                p.x *= skalaX;
                p.x += x2;
                //tilt
                be.Transform.rotateRel(p.x, p.y, x2, y2, tilt);
                p.x = be.Transform.lastX;
                p.y = be.Transform.lastY;
                spr.x = p.x;
                spr.y = p.y;
            }
            /**
             *
             * @param spr
             * @param x
             * @param y
             * @param frame
             */
            static Ubin(spr, x = 0, y = 0, frame = 0) {
                be.SprImg.gambarUbin(spr, x, y, frame);
            }
            /**
             *
             * @param spr
             * @returns
             */
            static StatusMuat(spr) {
                let hasil = true;
                if (spr && spr) {
                    return spr.load;
                }
                Spr.daftar.forEach((item) => {
                    if (!item.load) {
                        hasil = false;
                    }
                });
                return hasil;
            }
        }
        Spr.daftar = [];
        be.Spr = Spr;
    })(be = ha.be || (ha.be = {}));
})(ha || (ha = {}));
///<reference path="./Route.ts"/>
///<reference path="../spr/Sprite.ts"/>
//operation
const LoadImage = ha.be.Spr.Muat; //
const LoadAnimImage = ha.be.Spr.MuatAnimasi;
const ResizeImage = ha.be.Spr.Ukuran;
const DrawImage = ha.be.Spr.Gambar;
const DrawImageXY = ha.be.Spr.GambarXY;
const Collide = ha.be.Spr.Tabrakan;
const CollideXY = ha.be.Spr.TabrakanXY;
const Tile = ha.be.Spr.Ubin; //TODO: diganti property
const AllImageLoaded = ha.be.Spr.StatusMuat;
const PositionImageXY = ha.be.Spr.Posisi;
const PositionImagePolar = ha.be.Spr.posisiPolar;
const DrawAllImage = ha.be.Spr.GambarSemua;
const CopyImage = ha.be.Spr.Copy;
//depecrated
const SpriteKontek = ha.be.Spr.kontek;
const Handle = ha.be.Spr.Handle;
const Rotation = ha.be.Spr.Rotasi;
const Width = ha.be.Spr.Panjang; //depecrated
const Height = ha.be.Spr.Lebar; //depecrated
const ImageLoaded = ha.be.Spr.Dimuat;
const ImageXPosition = ha.be.Spr.PosisiX;
const ImageYPosition = ha.be.Spr.PosisiY;
const ImageAlpha = ha.be.Spr.Alpha;
const ImageIsDragged = ha.be.Spr.StatusDrag;
const ImageBound = ha.be.Spr.Bound;
/**
 * @memberof Image
 *
 * return Distance between 2 images
 * @param s first Image
 * @param s2 second Image
 */
function Dist2Image(s, s2) {
    return Math.hypot(s.x - s2.x, s2.y - s.y);
}
///<reference path="./Route.ts"/>
// Shortcut buat perintah-perintah font
const FontName = ha.be.Teks.Font;
const FontSize = ha.be.Teks.FontSize;
const Print = ha.be.Teks.Tulis;
const Align = ha.be.Teks.Rata;
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
    //task
    rpg.conf = new Conf();
})(rpg || (rpg = {}));
var rpg;
(function (rpg) {
    function render() {
    }
    rpg.render = render;
})(rpg || (rpg = {}));
var ha;
(function (ha) {
    var be;
    (function (be) {
        class SprObj {
            // //image wrapper
            // public get x(): number {
            // 	return this._buff.x;
            // }
            // public set x(value: number) {
            // 	this._buff.x = value;
            // }
            // public get y(): number {
            // 	return this._buff.y;
            // }
            // public set y(value: number) {
            // 	this._buff.y = value;
            // }
            // public get panjang(): number {
            // 	return this._buff.panjang;
            // }
            // public set panjang(value: number) {
            // 	this._buff.panjang = value;
            // }
            // public get lebar(): number {
            // 	return this._buff.lebar;
            // }
            // public set lebar(value: number) {
            // 	this._buff.lebar = value;
            // }
            // public get alpha(): number {
            // 	return this._buff.alpha;
            // }
            // public set alpha(value: number) {
            // 	this._buff.alpha = value;
            // }
            //TODO: wrapper yang lain
            //untuk memudahkan membuat perintah shortcut dan penyederhanaan
            constructor(dragable = false) {
                this.isAnim = false;
                this.rect = new be.Kotak();
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
                //interaktif even
                this._dragged = false;
                this._down = false;
                this._dragable = false;
                this._hit = 0;
                this._tipeDrag = 0;
                this._dragSelesaiJml = 0;
                //internal interatif
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
                // console.debug('set value: ' + value);
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
            // public get buff(): SprImgObj {
            // 	return this._buff;
            // }
            // public set buff(value: SprImgObj) {
            // 	this._buff = value;
            // }
            // public get x(): number {
            // 	return this._x;
            // }
            // public set x(value: number) {
            // 	this._x = value;
            // }
            // public get y(): number {
            // 	return this._y;
            // }
            // public set y(value: number) {
            // 	this._y = value;
            // }
            get jmlHit() {
                return this._hit;
            }
            set jmlHit(value) {
                this._hit = value;
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
                return SprObj._ctrDraw;
            }
            static set ctrDraw(value) {
                SprObj._ctrDraw = value;
            }
            get inputId() {
                return this._inputId;
            }
            set inputId(value) {
                this._inputId = value;
            }
        }
        SprObj._ctrDraw = 0;
        be.SprObj = SprObj;
    })(be = ha.be || (ha.be = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var be;
    (function (be) {
        let TypeDrag;
        (function (TypeDrag) {
            TypeDrag[TypeDrag["drag"] = 1] = "drag";
            TypeDrag[TypeDrag["rotasi"] = 2] = "rotasi";
        })(TypeDrag || (TypeDrag = {}));
        /**
         * Handle interaksi sprite
         */
        class SpriteInteraksi {
            spriteDown(s, pos, id) {
                s.down = true;
                s.drgStartX = pos.x - s.x;
                s.drgStartY = pos.y - s.y;
                s.inputId = id;
                s.jmlHit++;
                s.sudutTekanAwal = be.Transform.sudut(pos.x - s.x, pos.y - s.y);
                s.sudutAwal = s.rotasi;
                console.group('sprite down event handler');
                console.log("sudut tekan awal", s.sudutTekanAwal);
                console.log("sudut awal", s.sudutAwal);
                console.groupEnd();
            }
            inputDown(pos, id) {
                //sprite down
                console.group('input down');
                let lastIdx = -1;
                let lastSprite = null;
                for (let i = be.Spr.daftar.length - 1; i >= 0; i--) {
                    let item;
                    item = be.Spr.daftar[i];
                    if (be.SprImg.dotDidalamGambar(item, item.x, item.y, pos.x, pos.y)) {
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
                //
                if (lastSprite) {
                    this.spriteDown(lastSprite, pos, id);
                    // lastSprite.down = true;
                    // lastSprite.dragStartX = pos.x - lastSprite.x;
                    // lastSprite.dragStartY = pos.y - lastSprite.y;
                    // lastSprite.inputId = id;
                    // lastSprite.jmlHit++;
                    // lastSprite.sudutTekanAwal = Transform.sudut(pos.x - lastSprite.x, pos.y - lastSprite.y);
                    // lastSprite.sudutAwal = lastSprite.buff.rotasi;
                }
                //
                console.groupEnd();
            }
            inputMove(pos, pointerId) {
                be.Spr.daftar.forEach((item) => {
                    if (item.down && item.dragable && (item.inputId == pointerId)) {
                        item.dragged = true;
                        if (item.tipeDrag == TypeDrag.drag || (item.tipeDrag == 3)) {
                            item.x = pos.x - item.drgStartX;
                            item.y = pos.y - item.drgStartY;
                            console.debug('item drag move');
                        }
                        else if (item.tipeDrag == TypeDrag.rotasi || (item.tipeDrag == 4)) {
                            let sudut2 = be.Transform.sudut(pos.x - item.x, pos.y - item.y);
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
                            //TODO:
                        }
                    }
                });
            }
            inputUp() {
                be.Spr.daftar.forEach((item) => {
                    if (item.down) {
                        // item.hit++;
                    }
                    if (item.dragged) {
                        console.log('input up: item rotasi ' + item.rotasi);
                    }
                    item.down = false;
                    item.dragged = false;
                });
            }
        }
        be.sprInteraksi = new SpriteInteraksi();
    })(be = ha.be || (ha.be = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var be;
    (function (be) {
        //Fungsi untuk pergerakan sprite
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
                ha.be.Spr3.gerakX(s, n * Math.cos(sudut));
                ha.be.Spr3.gerakY(s, n * Math.sin(sudut));
            }
            static gerakPutar(s, sudut, sx, sy) {
                be.Transform.rotateRel(s.x, s.y, sx, sy, sudut);
                s.x += be.Transform.lastX;
                s.y += be.Transform.lastY;
            }
            static menjauh(s, x, y, jml) {
                let sudut = be.Transform.sudut(s.x - x, s.y - y);
                Spr3.gerakSudut(s, jml, sudut);
            }
            static mendekat(s, x, y, jml) {
                let sudut = be.Transform.sudut(x - s.x, y - s.y);
                Spr3.gerakSudut(s, jml, sudut);
            }
        }
        be.Spr3 = Spr3;
    })(be = ha.be || (ha.be = {}));
})(ha || (ha = {}));
