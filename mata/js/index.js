"use strict";
class Sp {
    constructor(s) {
        this._frame = 0;
        this.sp = s;
    }
    get sp() {
        return this._sp;
    }
    set sp(value) {
        this._sp = value;
    }
    get frame() {
        return this._frame;
    }
    set frame(value) {
        this._frame = value;
    }
}
let y = 0;
window.onload = () => {
    Grafis(480, 640);
    const c = ha.be.Be.Kontek();
    const t = new ha.s3d.Transform();
    const img = MuatAnimasi("./img/angka.png", 64, 64);
    const sps = [];
    for (let i = 0; i < 10; i++) {
        let sp = ha.s3d.Sprite.buat(-240, -320, 0, 128, 128);
        let spw = new Sp(sp);
        reset(spw);
        sp.x3d = -480 + (i * 128);
        sp.y3d = 0;
        // sp.z3d = (i / 10) * 4000;
        sps.push(spw);
    }
    let vz = 10;
    let lastTimer = Date.now();
    update();
    function drawBack() {
        c.beginPath();
        c.moveTo(t.x2d(-240, 0), t.y2d(-320, 0));
        c.lineTo(t.x2d(-240, 2000), t.y2d(-320, 2000));
        c.lineTo(t.x2d(-240, 2000), t.y2d(320, 2000));
        c.lineTo(t.x2d(-240, 0), t.y2d(320, 0));
        c.moveTo(t.x2d(-240, 2000), t.y2d(-320, 2000));
        c.lineTo(t.x2d(240, 2000), t.y2d(-320, 2000));
        c.lineTo(t.x2d(240, 2000), t.y2d(320, 2000));
        c.lineTo(t.x2d(-240, 2000), t.y2d(320, 2000));
        c.moveTo(t.x2d(240, 2000), t.y2d(-320, 2000));
        c.lineTo(t.x2d(240, 0), t.y2d(-320, 0));
        c.moveTo(t.x2d(240, 2000), t.y2d(320, 2000));
        c.lineTo(t.x2d(240, 0), t.y2d(320, 0));
        c.stroke();
    }
    function reset(spw) {
        let sp = spw.sp;
        sp.z3d = 0;
        sp.y3d = y;
        spw.frame = Math.floor(Math.random() * 9);
    }
    function gerak(spw) {
        let sp = spw.sp;
        sp.z3d += vz;
    }
    function update() {
        if (Date.now() > (lastTimer + 500)) {
            lastTimer = Date.now();
            // frame = Math.floor(Math.random() * 9);
            // console.log(frame);
        }
        Bersih();
        drawBack();
        for (let i = 0; i < 10; i++) {
            let spw = sps[i];
            let sp = spw.sp;
            gerak(spw);
            Posisi(img, sp.x2d, sp.y2d);
            Ukuran(img, sp.width2d, sp.height2d);
            Handle(img, Panjang(img) / 2, Lebar(img) / 2);
            Gambar(img, sps[i].frame);
        }
        let sp = sps[0].sp;
        if (sp.z3d > 6000) {
            y = (Math.random() * 240) - 120;
            for (let i = 0; i < 10; i++) {
                let spw = sps[i];
                reset(spw);
            }
        }
        window.requestAnimationFrame(update);
    }
    update();
};
