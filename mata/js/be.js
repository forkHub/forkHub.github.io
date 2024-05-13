///<reference path="./Route.ts"/>
/**
 * Membersihkan layar dengan warna tertentu, default hitam
 * @param merah {angka} opsional, merah, default = 0
 * @param hijau {angka} opsional, hijau,, default = 0
 * @param biru {angka} opsional, biru, default = 0
 * @param transparan {angka} opsional, transparan (0-100)
 */
const Bersih = (merah, hijau, biru, transparan) => {
    ha.be.Be.Bersih(merah, hijau, biru, transparan);
};
/**
 * Setup Blitz Edu
 * @param panjang (angka) panjang dari kanvas
 * @param lebar (angka) lebar dari kanvs
 * @param canvas (HTMLCanvasElement) referensi ke kanvas
 * @param fullScreen (boolean) apakah akan men-skala kanvas mengikuti ukuran layar/fullscreen
 * @returns
 */
const Grafis = (panjang = 240, lebar = 320, canvas = null, fullScreen = true, input = true) => {
    ha.be.Be.Grafis(panjang, lebar, canvas, fullScreen, input);
};
/**
 * Mengeset warna untuk dipakai pada perintah menggambar berikutnya
 * @param r (number) merah
 * @param g (number) hijau
 * @param b (number) biru
 * @param a (number) alpha (0-100)
 */
const Warna = (r = 0, g = 0, b = 0, a = 100) => {
    ha.be.Be.Warna(r, g, b, a);
};
/**
 * Mengembalikan warna merah dari perintah AmbilPixel terakhir
 * @returns (number) warna merah
 */
const Merah = () => {
    return ha.be.Be.Merah();
};
const Hijau = ha.be.Be.Hijau;
const Biru = ha.be.Be.Biru;
const Transparan = ha.be.Be.Transparan;
const AmbilPiksel = ha.be.Img.AmbilPiksel;
const SetPiksel = ha.be.Img.SetPiksel;
const Kontek = ha.be.Be.Kontek;
const Kanvas = ha.be.Be.Kanvas;
const Garis = ha.be.Be.Garis;
const Kotak = ha.be.Be.Kotak;
const Oval = ha.be.Be.Oval;
///<reference path="./Route.ts"/>
const InputHit = ha.be.Input.InputHit;
const InputX = ha.be.Input.InputX;
const InputY = ha.be.Input.InputY;
const InputDragStartX = ha.be.Input.InputXAwal;
const InputDragStartY = ha.be.Input.InputYAwal;
const InputDragX = ha.be.Input.GeserX;
const InputDragY = ha.be.Input.GeserY;
const FlushInput = ha.be.Input.FlushInput;
const InputIsDown = ha.be.Input.Pencet;
const InputIsDragged = ha.be.Input.Geser;
const InputType = ha.be.Input.InputType;
const InputTapCount = ha.be.Input.JmlTap;
const InputStartDragCount = ha.be.Input.JmlDragMulai;
const InputEndDragCount = ha.be.Input.JmlDragSelesai;
const Sudut = ha.be.Mat.Sudut;
///<reference path="./Route.ts"/>
const Muat = ha.be.Spr.Muat;
const MuatAsync = ha.be.Spr.MuatAsync;
const Dimuat = ha.be.Spr.Dimuat;
const MuatAnimasi = ha.be.Spr.MuatAnimasi;
const StatusMuat = ha.be.Spr.StatusMuat;
const Posisi = ha.be.Spr.Posisi;
const Ukuran = ha.be.Spr.Ukuran;
const PosisiPolar = ha.be.Spr.posisiPolar;
const Gambar = ha.be.Spr.Gambar;
const GambarSemua = ha.be.Spr.GambarSemua;
const PosisiX = ha.be.Spr.PosisiX;
const PosisiY = ha.be.Spr.PosisiY;
const Handle = ha.be.Spr.Handle;
const Rotasi = ha.be.Spr.Rotasi;
const Alpha = ha.be.Spr.Alpha;
const Tabrakan = ha.be.Spr.Tabrakan;
const StatusDrag = ha.be.Spr.StatusDrag;
const SpriteKontek = ha.be.Spr.kontek;
const Panjang = ha.be.Spr.Panjang;
const Lebar = ha.be.Spr.Lebar;
const Copy = ha.be.Spr.Copy;
const Ubin = ha.be.Spr.Ubin;
const Bound = ha.be.Spr.Bound;
// Shortcut buat perintah-perintah font
var Font = ha.be.Teks.Font;
var Tulis = ha.be.Teks.Tulis;
var Rata = ha.be.Teks.Rata;
