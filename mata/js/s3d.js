"use strict";
var ha;
(function (ha) {
    var s3d;
    (function (s3d) {
        class P2d {
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
        class P3d {
            constructor() {
                this._x = 0;
                this._y = 0;
                this._z = 0;
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
            get z() {
                return this._z;
            }
            set z(value) {
                this._z = value;
            }
        }
        class SpriteObj {
            constructor(x, y, z, w, h) {
                this._z3d = 0;
                this._x3d = 0;
                this._y3d = 0;
                this._width = 0;
                this._height = 0;
                this.p3d1 = new P3d();
                this.p3d2 = new P3d();
                this.p2d1 = new P2d();
                this.p2d2 = new P2d();
                this.t = new Transform();
                this.p3d1.x = x;
                this.p3d1.y = y;
                this.p3d1.z = z;
                this.p3d2.x = w + x;
                this.p3d2.y = h + y;
                this.p3d2.z = z;
                this._x3d = x;
                this._y3d = y;
                this._z3d = z;
                this._width = w;
                this._height = h;
                this.update();
            }
            update() {
                this.t.transformP3d(this.p3d1, this.p2d1);
                this.t.transformP3d(this.p3d2, this.p2d2);
            }
            get x2d() {
                this.update();
                return this.p2d1.x;
            }
            get y2d() {
                this.update();
                return this.p2d1.y;
            }
            get width2d() {
                this.update();
                return this.p2d2.x - this.p2d1.x;
            }
            get height2d() {
                this.update();
                return this.p2d2.y - this.p2d1.y;
            }
            get z3d() {
                return this._z3d;
            }
            set z3d(value) {
                this._z3d = value;
                this.p3d1.z = this._z3d;
                this.p3d2.z = this._z3d;
                this.update();
            }
            get x3d() {
                return this._x3d;
            }
            set x3d(value) {
                this._x3d = value;
                this.p3d1.x = value;
                this.p3d2.x = this._width + value;
                this.update();
            }
            get y3d() {
                return this._y3d;
            }
            set y3d(value) {
                this._y3d = value;
                this.p3d1.y = value;
                this.p3d2.y = this.p3d1.y + this._height;
                this.update();
            }
            get width3d() {
                return this._width;
            }
            set width3d(value) {
                this._width = value;
                this.p3d2.x = this.p3d1.x + value;
                this.update();
            }
            get height3d() {
                return this._height;
            }
            set height3d(value) {
                this._height = value;
                this.p3d2.y = this.p3d1.y + value;
                this.update();
            }
        }
        s3d.SpriteObj = SpriteObj;
        class Sprite {
            static buat(x, y, z, w, h) {
                let hs = new SpriteObj(x, y, z, w, h);
                Sprite.list.push(hs);
                return hs;
            }
            static hapus(s) {
                for (let i = 0; i < this.list.length; i++) {
                    if (this.list[i] == s) {
                        this.list.splice(i, 1);
                    }
                }
            }
            static urut() {
                this.list.sort((i, j) => {
                    return i.z3d - j.z3d;
                });
            }
        }
        Sprite.list = [];
        s3d.Sprite = Sprite;
        class Transform {
            constructor() {
                this._jrk = 500;
                this._offX = 240; //480
                this._offY = 320; //640
            }
            get offX() {
                return this._offX;
            }
            set offX(value) {
                this._offX = value;
            }
            get offY() {
                return this._offY;
            }
            set offY(value) {
                this._offY = value;
            }
            get jrk() {
                return this._jrk;
            }
            set jrk(value) {
                this._jrk = value;
            }
            transformP3d(p, p2) {
                p2.x = this.x2d(p.x, p.z);
                p2.y = this.y2d(p.y, p.z);
            }
            x2d(x, z) {
                return this.p2d(x, z) + this.offX;
            }
            y2d(x, z) {
                return this.p2d(x, z) + this.offY;
            }
            p2d(x, z) {
                return (this.jrk * x) / (this.jrk + z);
            }
        }
        s3d.Transform = Transform;
    })(s3d = ha.s3d || (ha.s3d = {}));
})(ha || (ha = {}));
