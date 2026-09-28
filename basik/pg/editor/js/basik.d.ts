declare namespace Basik {
    class Camera {
        private static _x;
        static get x(): number;
        static set x(value: number);
        private static _y;
        static get y(): number;
        static set y(value: number);
        private static _img;
        static get img(): Basik.Image;
        static set img(value: Basik.Image);
    }
}
declare namespace Basik {
    enum Evt {
        MOUSE_DOWN = "mouseDitekan",
        MOUSE_UP = "mouseDilepas",
        MOUSE_MOVE = "mouseGerak",
        MOUSE_CLICK = "mouseKlik",
        MOUSE_START_DRAG = "mouseMulaiDrag",
        MOUSE_END_DRAG = "mouseSelesaiDrag",
        KEYB_DOWN = "keyboardDitekan",
        KEYB_UP = "keyboardDilepas",
        SOUND_ENDED = "suaraSelesai",
        UPDATE = "update",
        MULAI = "mulai",
        GAMBAR_DILOAD = "gambarDiload",
        RESIZE = "resize"
    }
    class Event {
        private static readonly list;
        private _type;
        private _f;
        get type(): string;
        get f(): () => void;
        constructor(type: string, f: () => void);
        static addEventListener(type: string, f: () => void): Event;
        static removeListener(e: Event): void;
        static dispatchEvent(type: string): void;
    }
}
declare namespace Basik {
    class Graphic {
        private static _autoScale;
        private static drawCanvas;
        private static _lastX;
        private static _isUpdating;
        static get isUpdating(): boolean;
        static set isUpdating(value: boolean);
        static get lastX(): number;
        static set lastX(value: number);
        private static _lastY;
        static get lastY(): number;
        static set lastY(value: number);
        private static _red;
        private static _green;
        private static _blue;
        private static _transparan;
        private static handleWindowResize;
        private static buildCanvas;
        static Canvas(): HTMLCanvasElement;
        static SetCanvas(canvas: HTMLCanvasElement): void;
        static Start(canvas: HTMLCanvasElement): void;
        static Graphics(w?: number, h?: number, canvas?: HTMLCanvasElement, mode?: number): void;
        static Cls(x?: number, y?: number, w?: number, h?: number): void;
        private static callFunc;
        private static initEvent;
        private static setupMainCanvas;
        static get red(): number;
        static set red(value: number);
        static get green(): number;
        static set green(value: number);
        static get blue(): number;
        static set blue(value: number);
        static get alpha(): number;
        static set alpha(value: number);
    }
    const G: typeof Graphic;
}
declare namespace Basik {
    class Input {
        private static _debug;
        private static readonly lst;
        private static _pointerEvent;
        private static _keyboardEvent;
        private static _lastButton;
        static get lastButton(): number;
        static get keyboardEvent(): KeyboardEvent;
        static set keyboardEvent(value: KeyboardEvent);
        static get pointerEvent(): PointerEvent;
        static readonly global: IInput;
        static get debug(): boolean;
        static set debug(value: boolean);
        private static evt;
        constructor();
        static getMouse(): IInput;
        static getDraggedInput(): IInput;
        static getDownInput(): IInput;
        static getById(id: string): IInput;
        private static getId;
        private static getInput;
        private static checkTap;
        static init(buffer: HTMLCanvasElement): void;
        private static reg;
        static getPos: (cx: number, cy: number, c: HTMLCanvasElement) => {
            x: number;
            y: number;
        };
    }
    const In: typeof Input;
}
declare namespace Basik {
    interface IInput {
        id: string;
        pointerType: string;
        xStart: number;
        yStart: number;
        xDrag: number;
        yDrag: number;
        moveX: number;
        moveY: number;
        x: number;
        y: number;
        isDrag: boolean;
        isDown: boolean;
        isTap: boolean;
        evt: PointerEvent;
        button: number;
        timerStart: number;
        timerEnd: number;
        pointerId: number;
    }
    interface IV2D {
        x: number;
        y: number;
    }
    interface IAudio {
        src: string;
        loaded: boolean;
        sound: HTMLAudioElement;
        playedCount: number;
    }
}
declare namespace Basik {
    class Keyboard {
        private static readonly list;
        private static anyKey;
        private static _lastKey;
        static get lastKey(): string;
        private static _obj;
        static get obj(): KeyboardEvent;
        private static getByKey;
        private static reg;
        private static setDown;
        static IsDown(key?: string): boolean;
        static init(): void;
    }
}
declare namespace Basik {
    class Pt {
        private _x;
        get x(): number;
        set x(value: number);
        private _y;
        get y(): number;
        set y(value: number);
        constructor(x?: number, y?: number);
        static create(x?: number, y?: number): Pt;
        static copy(p1: Pt, p2: Pt): void;
        static clone(p: Pt): Pt;
        static putarPoros(p: Pt, xc?: number, yc?: number, deg?: number): void;
    }
}
declare namespace Basik {
    class Seg {
        private _A;
        get A(): Pt;
        set A(value: Pt);
        private _B;
        get B(): Pt;
        set B(value: Pt);
        constructor(A?: Pt, B?: Pt);
        static create(v1?: Pt, v2?: Pt): Seg;
        private static boundCollide;
        static collide(seg1: Seg, seg2: Seg): boolean;
        static copy(seg1: Seg, seg2: Seg): void;
        private static clone;
        private static crossHor;
        static deg(line: Seg): number;
        private static getXAtIdx;
        private static vecI;
        private static rotate;
        private static minX;
        private static maxX;
        private static minY;
        private static maxY;
        private static translate;
        private static xHorIdx;
    }
    const Sg: typeof Seg;
}
declare namespace Basik {
    class Ktk {
        readonly vs: Pt[];
        readonly segs: Seg[];
        constructor();
        static buat(x1?: number, y1?: number, x2?: number, y2?: number): Ktk;
        static destroy(r: Ktk): void;
        private static copy;
        private static copyInfo;
        private static collideBound;
        static collide(r1: Ktk, r2: Ktk): boolean;
        private static collideDotBound;
        static collideDot(r: Ktk, x: number, y: number): boolean;
        private static minX;
        private static maxX;
        private static minY;
        private static maxY;
        static translate(rect: Ktk, x: number, y: number): void;
        static rotate(r: Ktk, deg: number, xc: number, yc: number, copy?: boolean): Ktk;
    }
}
declare namespace Basik {
    class Transform {
        static readonly RAD2DEG: number;
        static readonly DEG2RAD: number;
        private static _lastX;
        private static _lastY;
        static get lastX(): number;
        static get lastY(): number;
        private static quadDeg2;
        static sudut(x: number, y: number): number;
        private static normalizeDeg;
        static degDist(angleS: number, angleT: number, min?: boolean): number;
        private static degDistMax;
        private static degDistMin;
        static rotateRel(x?: number, y?: number, xt?: number, yt?: number, deg?: number): void;
    }
    const Tf: typeof Transform;
}
declare namespace Basik {
    class ImgImpl {
        static readonly props: string[];
        static readonly daftar: Image[];
        static CreateImage(width: number, height: number): Image;
        static MuatAnimasi(url: string, pf: number, lf: number): Image;
        static Muat(url: string): Image;
        static tabrakan(gbr1: Image, x1: number, y1: number, gbr2: Image, x2: number, y2: number): boolean;
        static register(image: Image, url: string, tipeDrag: number): Image;
        static free(img: Basik.Image): void;
        static dotInsideImage(gbr1: Image, x1: number, y1: number, x2: number, y2: number): boolean;
        private static gambarUbin;
        static AmbilPiksel(x?: number, y?: number): void;
        static SetPiksel(x?: number, y?: number): void;
        static Draw(img: Image): void;
        private static DrawSingle;
        private static resetRect;
        private static rectToImageTf;
        static AllImageLoaded(): boolean;
    }
    const Ip: typeof ImgImpl;
}
declare namespace Basik {
    class ImgIntHandler {
        init(): void;
        private down;
        private inputDown;
        private inputMove;
    }
    export const sprInt: ImgIntHandler;
    export {};
}
declare namespace Basik {
    class Teks {
        private static _name;
        private static _size;
        private static _x;
        private static _y;
        static get size(): number;
        static set size(value: number);
        static Goto(x: number, y: number): void;
        static Name(name?: string): void;
        static Size(n?: number): void;
        static Align(s?: CanvasTextAlign): void;
        static WriteLn(teks: string): void;
        static Write(teks: string): void;
    }
    const Tk: typeof Teks;
}
declare namespace Basik {
    class Sound implements IAudio {
        static readonly list: IAudio[];
        private static _lastSound;
        private _src;
        private _loaded;
        private _sound;
        private _playedCount;
        static get lastSound(): HTMLAudioElement;
        static set lastSound(value: HTMLAudioElement);
        get playedCount(): number;
        set playedCount(value: number);
        get sound(): HTMLAudioElement;
        set sound(value: HTMLAudioElement);
        get loaded(): boolean;
        set loaded(value: boolean);
        get src(): string;
        set src(value: string);
    }
    const Sn: typeof Sound;
}
declare function penaDitekan(x?: number, y?: number, rotasi?: number): void;
declare function garis(x: number, y: number): void;
declare function lingkaran(x: number, y: number, radius: number, awal: number, akhir: number): void;
declare function elips(x: number, y: number, radiusX: number, radiusY: number, awal: number, akhir: number): void;
declare function quad(cx: number, cy: number, x: number, y: number): void;
declare function bezier(): void;
declare function penaDiangkat(): void;
declare const S: typeof Basik.Sound;
declare function muatSuara(url: string): HTMLAudioElement;
declare function mainkanSuara(s: HTMLAudioElement): void;
declare function suaraEvent(): HTMLAudioElement;
declare const G: typeof Basik.Graphic;
declare const Ip: typeof Basik.ImgImpl;
declare const In: typeof Basik.Input;
declare function setKanvas(c: HTMLCanvasElement): void;
declare function kanvas(): HTMLCanvasElement;
declare function buatKanvas(w?: number, h?: number, canvas?: HTMLCanvasElement, mode?: number): void;
declare function bersihkanLayar(x?: number, y?: number, w?: number, h?: number): void;
declare function hijau(): number;
declare function merah(): number;
declare function biru(): number;
declare function alpha(): number;
declare function ambilPiksel(x?: number, y?: number): void;
declare function setPiksel(x?: number, y?: number): void;
declare function warna(r?: number, g?: number, b?: number, a?: number): void;
declare function warnaGaris(r?: number, g?: number, b?: number, a?: number): void;
declare function mouseDitahan(): boolean;
declare function mouseDidrag(): boolean;
declare function mouseDragX(): number;
declare function mouseDragY(): number;
declare function mouseX(): number;
declare function mouseY(): number;
declare function mouseDragAwalX(): number;
declare function mouseDragAwalY(): number;
declare function mouseGerakX(): number;
declare function mouseGerakY(): number;
declare function muatGambar(url: string): Basik.Image;
declare function stempel(img: Basik.Image): void;
declare function gambarTabrakan(img1: Basik.Image, img2: Basik.Image): boolean;
declare function poinDidalamGambar(img: Basik.Image, x: number, y: number): boolean;
declare function buatGambar(width: number, height: number): Basik.Image;
declare function semuaGambarSelesaiDimuat(): boolean;
declare function hapusGAmbar(img: Basik.Image): void;
declare const posisiTeks: typeof Basik.Teks.Goto;
declare const tulis: typeof Basik.Teks.WriteLn;
declare const fontTeks: typeof Basik.Teks.Name;
declare const ukuranTeks: typeof Basik.Teks.Size;
declare const perataanTeks: typeof Basik.Teks.Align;
declare function tombolDitahan(key?: string): boolean;
declare function tombolEvent(): string;
declare namespace Basik {
    class Image {
        constructor(url?: string);
        private _x;
        private _y;
        private _alpha;
        private _pusatX;
        private _pusatY;
        private _panjang;
        private _lebar;
        private _rotasi;
        private _tilable;
        private _frameW;
        private _frameH;
        private _dragged;
        private _down;
        private _frame;
        private _pendingStempel;
        get pendingStempel(): boolean;
        set pendingStempel(value: boolean);
        private _dimuat;
        get dimuat(): boolean;
        set dimuat(value: boolean);
        private _ctrIdx;
        private static _ctrDraw;
        private _url;
        img: HTMLImageElement;
        private _canvas;
        isAnim: boolean;
        rect: Ktk;
        private _tipeDrag;
        private _dragStartY;
        private _dragStartX;
        private _sudutTekanAwal;
        private _sudutAwal;
        private _inputId;
        get inputId(): string;
        set inputId(value: string);
        get frame(): number;
        set frame(value: number);
        get kanvas(): HTMLCanvasElement;
        set kanvas(value: HTMLCanvasElement);
        get ubin(): boolean;
        set ubin(value: boolean);
        get panjangFrame(): number;
        set panjangFrame(value: number);
        get lebarFrame(): number;
        set lebarFrame(value: number);
        get x(): number;
        set x(value: number);
        get y(): number;
        set y(value: number);
        get alpha(): number;
        set alpha(value: number);
        get pusatY(): number;
        set pusatY(value: number);
        get pusatX(): number;
        set pusatX(value: number);
        get panjang(): number;
        set panjang(value: number);
        get lebar(): number;
        set lebar(value: number);
        get ctrIdx(): number;
        set ctrIdx(value: number);
        get rotasi(): number;
        set rotasi(value: number);
        get dragAwalX(): number;
        set dragAwalX(value: number);
        get dragAwalY(): number;
        set dragAwalY(value: number);
        get didrag(): boolean;
        set didrag(value: boolean);
        get ditekan(): boolean;
        set ditekan(value: boolean);
        get tipeDrag(): number;
        set tipeDrag(value: number);
        get url(): string;
        set url(value: string);
        static get ctrDraw(): number;
        static set ctrDraw(value: number);
        get initialMouseAngle(): number;
        set initialMouseAngle(value: number);
        get initialAngle(): number;
        set initialAngle(value: number);
    }
}
