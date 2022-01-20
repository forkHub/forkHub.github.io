declare namespace ha.blitz {
    class BlWindow {
        private _fps;
        private _origin;
        private _canvasAr;
        private _canvasAktif;
        buatCanvas(buffer: string): IBuffer;
        canvasInit(): void;
        windowResize: () => void;
        loop: () => Promise<void>;
        repeat: () => void;
        get canvasAktif(): IBuffer;
        set canvasAktif(value: IBuffer);
        get canvasAr(): IBuffer[];
        set canvasAr(value: IBuffer[]);
        get origin(): IV2D;
        set origin(value: IV2D);
        get fps(): number;
        set fps(value: number);
    }
    export var blWindow: BlWindow;
    export {};
}
declare namespace ha.blitz {
    class Image {
        loadImage: (url: string) => Promise<HTMLImageElement>;
    }
    export var image: Image;
    export {};
}
declare namespace ha.blitz {
    class Input {
        private _inputs;
        private _touch;
        private _mouse;
        private _keyb;
        private _event;
        constructor();
        def(): IInput;
        reset(input: IInput): void;
        flush(): void;
        get(e: string, inputType: string): IInput;
        baru(e: string, inputType: string): IInput;
        BLGetInputPos: (cx: number, cy: number, canvasScaleX: number, canvasScaleY: number) => {
            x: number;
            y: number;
        };
        get inputs(): IInput[];
        get event(): Event;
        get touch(): IInput;
        get mouse(): IInput;
        get keyb(): IInput;
        set keyb(value: IInput);
    }
    class Event {
        move(input: IInput, e: PointerEvent): void;
        down(input: IInput, e: PointerEvent, pos: any): void;
        up(input2: IInput, e: PointerEvent): void;
        keyDown(input: IInput, e: KeyboardEvent): void;
        keyUp(input: IInput, e: KeyboardEvent): void;
    }
    export var input: Input;
    export {};
}
/**
 * IMAGE
 */
declare const CreateImage: (w?: number, h?: number, frameW?: number, frameH?: number) => IBuffer;
declare const DrawImage: (img: IBuffer, x?: number, y?: number, frame?: number) => void;
declare const GrabImage: (img: IBuffer, x?: number, y?: number) => void;
declare const HandleImage: (img: IBuffer, x?: number, y?: number) => void;
declare const ImageWidth: (img: IBuffer) => number;
declare const ImageHeight: (img: IBuffer) => number;
declare const ImageXHandle: (img: IBuffer) => number;
declare const ImageYHandle: (img: IBuffer) => number;
declare const ImageOverlap: () => void;
declare const ImageColRect: () => void;
declare const ImageRectOverlap: () => void;
declare const MidHandle: (img: IBuffer) => void;
declare const LoadImage: (url: string) => Promise<IBuffer>;
declare const LoadAnimImage: (url: string, w?: number, h?: number) => Promise<IBuffer>;
declare const TileImage: (img: IBuffer, x?: number, y?: number, frame?: number) => void;
declare const ResizeImage: (img: IBuffer, w?: number, h?: number) => void;
declare const RotateImage: (img: IBuffer, degree?: number) => void;
declare const ScaleImage: (img: IBuffer, xScale?: number, yScale?: number) => void;
declare const GetPixel: (x?: number, y?: number) => number[];
declare const SetColor: (r?: number, g?: number, b?: number, a?: number) => void;
declare const SetPixel: (x?: number, y?: number) => void;
declare const ImagePivot: () => void;
declare const BackgroundImage: () => void;
declare const MainLayer: () => void;
declare const CreateLayer: () => void;
declare const LayerZ: () => void;
declare const Input: (m: string, def: string) => string;
declare const InputHit: (type?: string, kode?: string | number) => boolean;
declare const InputTap: (type?: string, kode?: string | number) => boolean;
declare const WaitInput: (type?: string, kode?: number) => Promise<void>;
declare const InputX: () => number;
declare const InputY: () => number;
declare const InputType: () => string;
declare const InputDragX: () => number;
declare const InputDragY: () => number;
declare const FlushInput: () => void;
declare const InputKey: () => string;
declare const InputDown: () => boolean;
declare const InputDrag: (type?: string, key?: string) => boolean;
/**
 * 	KEYBOARD
 */
declare const FlushKeys: () => void;
declare const GetKey: () => string;
declare const KeyDown: (key?: string) => void;
declare const KeyHit: (key?: string) => void;
declare const WaitKey: (kode?: string) => Promise<void>;
/**
 * MOUSE
 */
declare const GetMouse: () => number;
declare const MouseHit: () => number;
declare const MouseDown: (key: string) => boolean;
declare const WaitMouse: () => void;
declare const MouseX: () => number;
declare const MouseY: () => number;
declare const MouseZ: () => number;
declare const FlushMouse: () => void;
/**
 * INTERFACE
*/
interface IConfig {
    input: IInput;
}
interface ILine {
    y: number;
    m: number;
    b: number;
}
interface IRect {
    vs?: IV2D[];
    segs?: ISegment[];
}
interface ISegment {
    v1: IV2D;
    v2: IV2D;
}
interface ITimer {
    endTime: number;
    startTime: number;
    time: number;
    aktif: boolean;
}
interface IInput {
    xStart: number;
    yStart: number;
    xDrag: number;
    yDrag: number;
    x: number;
    y: number;
    isDrag: boolean;
    isDown: boolean;
    isTap: boolean;
    isHit: boolean;
    key: string;
    type: string;
    timerStart: number;
    timerEnd: number;
    id: number;
}
interface IInputData {
    type?: string;
    key?: string;
}
interface IBuffer {
    img: HTMLImageElement;
    width: number;
    height: number;
    frameW: number;
    frameH: number;
    handleX: number;
    handleY: number;
    rotation: number;
    scaleX: number;
    scaleY: number;
    isAnim: boolean;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
}
interface IV2D {
    x: number;
    y: number;
}
declare const Cls: (r?: number, g?: number, b?: number, alpha?: number) => void;
declare const BackBuffer: () => void;
declare const Color: () => void;
declare const ColorRed: () => void;
declare const ColorBlue: () => void;
declare const ColorGreen: () => void;
declare const ClsColor: () => void;
declare const CopyPixel: () => void;
declare const CopyRect: () => void;
declare const FrontBuffer: () => void;
declare const GetColor: () => void;
declare const Graphics: (width?: number, height?: number, gl?: boolean, pixel?: boolean) => void;
declare const GraphicsBuffer: () => void;
declare const Line: () => void;
declare const Origin: () => void;
declare const Oval: () => void;
declare const Rect: () => void;
declare const SetBuffer: (buffer: IBuffer) => void;
declare const WritePixel: () => void;
declare const ReadPixel: () => void;
declare const Plot: () => void;
/**
 * MAIN
 */
declare var blitzConf: IConfig;
declare const BLInput: IInput;
declare const CreateTimer: (t: number) => ITimer;
declare const FreeTimer: (t: ITimer) => void;
declare const WaitTimer: (t: ITimer) => Promise<number>;
declare const Delay: (m?: number) => Promise<void>;
declare const FPS: (n: number) => void;
declare const Dim: (...args: any[]) => any[];
declare const Millisecs: () => number;
/**
 * TEXTS
 */ 
declare namespace ha {
    class Line {
        createLine(m: number, b: number): ILine;
        fromPos(): void;
        fromVec(): void;
        fromSeg(): void;
        lineCrossPos(line: ILine, line2: ILine): IV2D;
    }
    export var line: Line;
    export {};
}
declare namespace ha {
    class Point {
        create(x?: number, y?: number): IV2D;
        boundPos(p: IV2D, bound: IRect): IV2D;
        copy(p: IV2D): IV2D;
        distFromPos(p: IV2D, x?: number, y?: number): number;
        distToSeg(p: IV2D, seg: ISegment): number;
        equal(p1: IV2D, p2: IV2D): boolean;
        scaleFromPos(p: IV2D, xc?: number, yc?: number, scaleX?: number, scaleY?: number): void;
        translate(p: IV2D, x?: number, y?: number): void;
        rel(p: IV2D, x?: number, y?: number): void;
        rotateRel(p: IV2D, xc?: number, yc?: number, deg?: number): void;
        moveTo(p: IV2D, x?: number, y?: number, speed?: number): void;
        moveFrom(p: IV2D, x?: number, y?: number, speed?: number): void;
        moveByDeg(p: IV2D, speed: number, deg?: number): void;
    }
    export var point: Point;
    export {};
}
declare namespace ha {
    class Rect {
        create(x1: number, y1: number, x2: number, y2: number): IRect;
        minX(r: IRect): number;
        maxX(r: IRect): number;
        minY(r: IRect): number;
        maxY(r: IRect): number;
        rotateToHor(r: IRect): void;
    }
    export var rect: Rect;
    export {};
}
declare namespace ha {
    class Segment {
        createSeg(v1: IV2D, v2: IV2D): ISegment;
        copy(seg: ISegment): ISegment;
        xHor(seg: ISegment): number;
        crossHor(seg: ISegment): boolean;
        deg(line: ISegment): number;
        fromPoint(p: IV2D, l: number, deg: number): ISegment;
        flip(seg: ISegment): ISegment;
        vecI(seg: ISegment): number;
        vecJ(seg: ISegment): number;
        rotate(seg: ISegment, deg?: number, xc?: number, yc?: number): void;
        seg2Vec(seg: ISegment): IV2D;
        getUpSeg(seg: ISegment): ISegment;
        minYP(seg: ISegment): IV2D;
        maxYP(seg: ISegment): IV2D;
        minXP(seg: ISegment): IV2D;
        maxXP(seg: ISegment): IV2D;
        /**
         * whether a point position is on the left side of a segment
         * @param p point
         * @param seg segment
         * @returns 0 = false, 1 = true, 2 = true, on tip
         */
        isPointOnTheLeftOfSeg(p: IV2D, seg: ISegment): number;
        rect(seg: ISegment): IRect;
        /**
         * rotate segment so that it is pararel to horzontal axis based on the first point as center of rotation
         * @param seg
         */
        rotateHor(seg: ISegment): void;
        /**
         * rotate segment so that it is pararel to vertical axis based on the first point as center of rotation
         * @param seg
         */
        rotateVer(seg: ISegment): void;
        translate(seg: ISegment, x?: number, y?: number): void;
    }
    export var segment: Segment;
    export {};
}
declare namespace ha {
    class Transform {
        readonly RAD2DEG: number;
        readonly DEG2RAD: number;
        equal(n1: number, n2: number, tol?: number): boolean;
        quadDeg(x: number, y: number): number;
        deg(x: number, y: number): number;
        normalizeDeg(deg: number): number;
        angleMaxDist(angleS: number, angleT: number): number;
        angleMinDist(angleS: number, angleT: number): number;
        moveTo(x: number, y: number, xt: number, yt: number, speed: number): IV2D;
        moveFrom(x: number, y: number, xt: number, yt: number, speed: number): IV2D;
        rotateForm(x: number, y: number, tx: number, ty: number, rotNow: number, maxRot?: number): number;
        rotateTo(x: number, y: number, tx?: number, ty?: number, rotNow?: number, maxRot?: number): number;
        rotateRel(x?: number, y?: number, xt?: number, yt?: number, deg?: number): IV2D;
        moveByDeg(speed?: number, deg?: number): IV2D;
    }
    export var trans: Transform;
    export {};
}
