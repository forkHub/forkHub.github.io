# 📚 Dokumentasi BASIK

## 📖 Gambaran Umum

BASIK adalah kumpulan perintah/fungsi javascript yang bisa dipakai sebagai media pembelajaran pengenalan koding untuk pemula. BASIK mengenalkan pemrograman kepada pemula dengan membuat aplikasi interaktif berbasis kanvas sederhana. Cocok untuk siswa, guru, atau siapa saja yang ingin belajar dasar pemrograman visual.

Prinsip-prinsip BASIK
- Semua perintah bisa langsung dilihat hasilnya tanpa dibingungkan dengan struktur yang kompleks. 
- Tidak perlu install aplikasi tambahan. BASIK berjalan sepenuhnya di browser.
- Bisa jalan secara daring ataupun luring.

## Cara pemakaian

Buka file `editor.html` di broser untuk memulai.  
BASIK bisa dipakai dengan cara sederhana seperti berikut:

```
buatKanvas(800, 600);
stempel("roket");
```

`buatKanvas()` adalah perintah pertama yang berfungsi untuk memulai semua perintah BASIK. Fungsinya adalah untuk membuat kanvas tempat untuk menggambar.
`stempel("roket")` adalah perintah untuk men-stempel gambar ke kanvas. "roket" adalah nama file dari gambar yang ingin distempel. Perintah `stempel()` bisa menerima perintah berupa nama file langsung atau alamat file secara absolut. Bila dijalankan maka akan terlihat sebuah gambar roket di layar.

Pada contoh ini kita menggunakan gambar "roket" yang sudah tersedia di folder asset. Anda bisa menambahkan sendiri gambar yang dimau, atau bisa juga memuat gambar dengan url yang penuh.

perintah `stempel()` adalah perintah sederhana untuk menempel gambar. Perintah ini sangat terbatas fungsinya. Untuk mendapatkan fungsi yang lebih kompleks seperti memutar gambar, mengubah posisi, dll maka kita harus memuat gambar terlebih dahulu.

```
buatKanvas(800, 600);
let roket = muatGambar("roket");
roket.x = 400;
roket.y = 300;
roket.panjang = 90;
roket.lebar = 70;
stempel(roket);
```

Pada contoh di atas, kita memuat gambar terlebih dahulu, kemudian kita ubah posisi dan ukuran dari gambar tersebut dengan merubah property secara langsung, kemudian menempelkannya ke kanvas.

Kita juga bisa merubah property dengan perintah yang lebih ringkas.

```
buatKanvas(800, 600);
let roket = muatGambar("roket");
posisiGambar(roket, 400, 300);
ukuranGambar(roket, 90, 70);
stempel(roket);
```

BASIK mendukung aplikasi interaktif dan dinamis dengan menyediakan fungsi bawaan yang menangani mouse, keyboard, dan update applikasi.
Untuk menangani update aplikasi, maka user harus menyediakan fungsi update() yang akan dipanggil secara otomatis saat aplikasi di update.

```
buatKanvas(800, 600);
let roket = muatGambar("roket");
pusatGambar(roket, 32, 46);
posisiGambar(roket, 400, 300);

function update() {
	bersihkanLayar();
	roket.rotasi++;
	stempel(roket);
}
```

BASIK menyediakan fungsi bawaan untuk menangani event-event yang berhubungan dengan mouse, touch dan keyboard.

```
buatKanvas(800, 600);
let roket = muatGambar("roket");
pusatGambar(roket, 32, 46);

function update() {
	bersihkanLayar();
	roket.x = mouseX();
	roket.y = mouseY();
	roket.rotasi++;
	stempel(roket);
}
```

BASIK juga menyediakan fungsi bawaan untuk menangani drag. Ada 4 tipe drag yang didukung. Memungkinkan pengguna untuk membuat aplikasi interaktif dengan mudah tanpa memikirkan struktur dan alogrithma yang rumit.

```
buatKanvas(800, 600);
let roket = muatGambar("roket");
pusatGambar(roket, 32, 46);
posisiGambar(roket, 400, 300);
roket.tipeDrag = 1;

function update() {
	bersihkanLayar();
	Tulis("");
	roket.rotasi++;
	stempel(roket);
}
```

Contoh yang lebih kompleks tersedia di halaman resmi BASIK.

## Kumpulan perintah
### 📝 Gambar

#### `stempel(url, x, y)`
Menstempel gambar ke layar pada posisi tertentu  

**Parameters**

*   `url`: `string` atau `Gambar` default "kotak"  
	`url` bisa diisi dengan alamat gambar yang akan di stempel atau object `Gambar` yang akan di stempel ke layar.  
	Alamat  bisa berupa nama file tanpa ekstensi ("kotak"), dengan ekstensi ("kotak.png"), alamat relatif ("./assets/kotak.png"), atau alamat absolute ("http://www.alamat.com/kotak.png").
	Bila alamat hanya menggunakan nama ("kotak" atau "kotak.png") maka BASIK akan otomatis mencari di folder asset.  
 	`url` dengan type string ditujukan untuk penyederhanaan bagi pemula yang belum mengenal konsep `object` dengan fitur yang lebih sedikit.
	Untuk fitur yang lebih kompleks seperti mengatur ukuran gambar, rotasi, dll, maka dianjurkan untuk memuat gambar terlebih dahulu dengan perintah `muatGambar()`.
*	`x`: `number`  
    Menentukan posisi x.  
    Parameter ini berifat opsional.  
*	`y`: `number`  
    Menentukan posisi y.  
    Parameter ini berifat opsional.    
**Returns:** `void`

#### `muatGambar(url)`

Memuat gambar. Hasil dari perintah ini bisa digunakan dengan perintah `stempel()`, atau perintah lainnya. Dengan memuat gambar terlebih dahulu, kita akan punya lebih banyak fitur seperti mengatur panjang/lebar, rotasi, dsb. 
Kita tidak perlu menunggu hingga gambar selesai di muat sepenuhnya untuk memulai operasi selanjutnya, semua di handle secara otomatis. Hal ini untuk memudahkan pemula dan menghindari perintah yang kompleks seperti event, dll.

**Parameters**

*   `url`: `string` default "kotak"  
    Alamat Gambar yang akan di dimuat.  
	Alamat  bisa berupa nama file tanpa ekstensi ("kotak"), dengan ekstensi ("kotak.png"), alamat relatif ("./assets/kotak.png"), atau alamat absolut ("http://www.alamat.com/kotak.png").
	Bila alamat hanya menggunakan nama ("kotak" atau "kotak.png") maka BASIK akan otomatis mencari di folder asset.

**Returns:** `Gambar`  

#### `gambarTabrakan(img1: Gambar, img2: Gambar): boolean`  

Mengecek apakah dua gambar bertabrakan. Pengecekan dilakukan dengan mengecek bounding box dari kedua objek `Gambar`.
Pengecekan mensupport gambar yang di rotasi.

**Parameters**

*   `img1`: `Gambar`   
	objek gambar pertama yang akan di check
*   `img2`: `Gambar`   
	objek gambar kedua yang akan di check

**Returns:** `boolean`. bernilai true bila terjadi tabrakan, atau false bila tidak terjadi tabrakan

#### `poinDidalamGambar(img: Gambar, x: number, y: number): boolean`  

Mengecek apakah sebuah point pada lokasi tertentu ada di dalam gambar

**Parameters**
*	`img`: `Gambar`  
	Gambar yang akan di check
*	`x`: `number`  
	Posisi x point
*	`y`: `number`  
	Poisi y point

**Returns:** `boolean`. Bernilai True bila point berada di dalam gambar

#### `semuaGambarSelesaiDimuat(): boolean`  

Mengecek apakah semua gambar sudah selesai di muat. Gambar yang belum di muat masih bisa menerima perintah dan event.
Bila kita men-`stempel` gambar yang belum di muat, maka gambarnya akan terlihat setelah gambar selesai di muat.
Perintah ini diperlukan kalau kita benar-benar ingin menunggu semua gambar selesai di muat sebelum melakukan sesuatu.

**Returns:** `boolean`. Bernilai true bila semua gambar selesai dimuat.

#### `hapusGAmbar(gbr: Gambar): void`  

Menghapus gambar dari memori. Gambar yang sudah dihapus tidak akan bisa menerima perintah dan akan menghasilkan error.

**Parameters**
*	`gbr`: `Gambar`  
	objek gambar yang akan di hapus

#### `posisiGambar(gbr: Gambar, x:number = 0, y:number = 0):void`  

Mengubah posisi gambar. Kita juga bisa mengubah posisi gambar secara parsial dengan mengubah property `x` atau `y` secara langsung.

**Parameters**
*	`gbr`: `Gambar`  
	Gambar yang akan di pindah
*	`x`: `number`, default 0  
	Posisi x
*	`y`: `number`, default 0  
	Posisi y  

#### `ukuranGambar(gbr: Gambar, p:number = 32, l:number = 32):void`  

Mengubah ukuran gambar. Kita juga bisa mengubah ukuran gambar melalui property `panjang` dan `lebar`.

**Parameters**
*	`gbr`: `Gambar`  
	Gambar yang akan di ubah ukurannya
*	`p`: `number`, default 32  
	panjang gambar
*	`l`: `number`, default 32
	Lebar gambar

### 📝 Perintah Input
Perintah-perintah yang berhubungan dengan input seperti mouse, touch, dan keyboard.

#### `mouseDitekan():boolean`

Mengecek apakah mouse sedang di tekan  

**Returns:** `boolean`. Bernilai true bila mouse sedang ditekan

#### `mouseDidrag(): boolean`  

Mengecek apakah mouse sedang di drag

**Returns:** `boolean`. Bernilai true bila mouse sedang di drag

#### `mouseDragX(): number`  

Mengembalikan berapa jarak vertikal mouse saat di drag, dihitung dari posisi awal saat drag dimulai

**Returns:** `number`. besaran drag horizontal

#### `mouseDragY(): number`  

Mengembalikan berapa jarak vertikal mouse saat di drag, dihitung dari posisi awal saat drag dimulai

**Returns:** `number`. besaran drag vertikal

#### `mouseX(): number`  

Mengembalikan posisi X dari mouse

**Returns:** `number`. posisi x dari mouse

#### `mouseY(): number`  

Mengembalikan posisi Y dari mouse

**Returns:** `number`. posisi y dari mouse

#### `mouseDragAwalX(): number`  

Posisi awal mouse saat mulai di drag

**Returns:** `number`. posisi x saat mulai di drag

#### `mouseDragAwalY(): number`  

Posisi awal mouse saat mulai di drag

**Returns:** `number`. posisi y saat mulai di drag

#### `mouseGerakX(): number`  

Mengembalikan pergerakan horizontal saat mouse bergerak

**Returns:** `number`. besar pergerakan horizontal saat mouse digerakkan

#### `mouseGerakY(): number`

Mengembalikan pergerakan vertikal saat mouse bergerak

**Returns:** `number`. besar pergerakan vertikal saat mouse digerakkan

### 📝 Perintah menggambar

#### `bukaPath(x: number = 0, y: number = 0): void`  

Perintah ini berfungsi untuk memulai menggambar bentuk yang kompleks. 
Perintah ini di ikuti dengan perintah `garisKe()`, `kurvaKe()` dan `lingkaranKe()`

**Parameters**
*	`x`: `number`  
	Gambar yang akan di ubah ukurannya
*	`y`: `number`, default 32  
	panjang gambar

#### `garisKe(x: number, y: number): void`  

Membuat garis ke posisi tertentu dari posisi terakhir

**Parameters**
*	`x`: `number`  
	posisi x ujung garis
*	`y`: `number`, default 32  
	posisi y ujung garis

#### `kurvaKe(cx: number, cy: number, x: number, y: number): void`  

Membuat kurva 

**Parameters**
*	`cx`: `number`  
	posisi kontrol point
*	`cy`: `number`, default 32  
	posisi kontrol point
*	`x`: `number`  
	posisi ujung kurva
*	`y`: `number`, default 32  
	posisi ujung kurva

#### `lingkaranKe(tx: number, ty: number, sudut: number, searahJarumJam = false)`  

Membuat lingkaran dari posisi terakhir sebesar sudut.

**Parameters**
*	`tx`: `number`  
	posisi x dari tengah lingkaran
*	`ty`: `number`  
	posisi y dari tengah lingkaran
*	`sudut`: `number`  
	sudut akhir lingkaran 
*	`searahJarumJam`: `boolean`  
	apakah lingkaran digambar searah jarum jam

#### `tutupPath()`  

Menutup Path. Perintah ini harus dipanggil untuk mengakhiri perintah dari `bukaPath()`.

#### `elip(x: number = 0, y: number = 0, radiusX: number = 0, radiusY: number = 0, awal: number = 0, akhir: number = 360, searahJarumJam:boolean = false): void`  

Menggambar elip atau lingkaran

**Parameters**
*	`x`: `number`, default 0
	posisi x dari tengah lingkaran
*	`y`: `number`, default 0
	posisi y dari tengah lingkaran
*	`radiusX`: `number`, default 32  
	radius horizontal 
*	`radiusY`: `number`, default 64
	radius vertikal
*	`awal`: `number`, default 0  
	sudut awal elip
*	`akhir`: `number`, default 360  
	sudut akhir elip
*	`searahJarumJam`: `boolean`, default false  
	apakah elips searah jarum jam

#### `kotak(x1: number = 10, y1: number = 10, x2: number = 100, y2: number = 100)`  

**Parameters**
*	`x`: `number`, default 0
	posisi x dari tengah lingkaran


### 📝 Perintah Umum

#### `buatKanvas(w: number = 320, h: number = 240, canvas: HTMLCanvasElement = null, mode: number = 1)`  

**Parameters**
*	`x`: `number`, default 0
	posisi x dari tengah lingkaran


Membuat kanvas

#### `bersihkanLayar(x: number = 0, y: number = 0, w: number = 0, h: number = 0)`

Membersihkan layar

**Parameters**
*	`x`: `number`, default 0
	posisi x dari tengah lingkaran

#### `warna(idx: number = 0, trans = 100)`

Mengeset warna fill

**Parameters**
*	`x`: `number`, default 0
	posisi x dari tengah lingkaran

#### `warnaGaris(idx: number, trans = 100)`

Mengeset warna garis

**Parameters**
*	`x`: `number`, default 0
	posisi x dari tengah lingkaran


#### `tebalGaris(n: number)`

Mengatur ketbalan garis

**Parameters**
*	`x`: `number`, default 0
	posisi x dari tengah lingkaran


### 📝 Perintah Matematika
perintah umum matematika.

#### `akar(n = 4): number`  

Mencari akar dari bilangan

**Parameters**
*	`x`: `number`, default 4
	bilangan yang ingin dicari akarnya

**Returns:** `number`. 

#### `pi(): number`

Mengembalikan nilai dari Pi, (3.14 ...)

**Returns:** `number`. 

#### `jarak(x: number = 0, y: number = 0): number`

Menghitung jarak

**Parameters**
*	`x`: `number`, default 0
	posisi x dari tengah lingkaran
*	`x`: `number`, default 0
	posisi x dari tengah lingkaran

**Returns:** `number`. 

#### `jarakSudut(angleS: number = 0, angleT: number, min: boolean = true)`

menghitung jarak antar dua sudut

**Parameters**
*	`x`: `number`, default 0
	posisi x dari tengah lingkaran

**Returns:** `number`. 

#### `sudut(x: number, y: number)`

Menghitung sudut

**Parameters**
*	`x`: `number`, default 0
	posisi x dari tengah lingkaran

**Returns:** `number`. 

#### `polarX(panjang = 100, sudut = 0)`

Posisi X polar

**Parameters**
*	`x`: `number`, default 0
	posisi x dari tengah lingkaran

**Returns:** `number`. 

#### `polarY(panjang = 100, sudut = 0)`

Posisi Y polar

**Parameters**
*	`x`: `number`, default 0
	posisi x dari tengah lingkaran

**Returns:** `number`. 

#### `abs(n: number): number`

menghasilkan nilai absolute dari suatu bilangan

**Parameters**
*	`n`: `number`, default 0
	bilangan yang ingin dicari nilai absolutenya

**Returns:** `number`. 

#### `normalisasiSudut(sdt: number = 0): number`

Menghasilkan sudut antara 0 - 360, berguna bila ingin mengubah sudut yang lebih dari 360 atau kurang dari 0 menjadi sudut antara 0 - 360 

**Parameters**
*	`sdt`: `number`, default 0
	sudut yang ingin dicari nilai normalnya

**Returns:** `number`. 

#### `pembulatan(n: number, b: number = 1, type: number = 0): number`

Membulatkan bilangan 

**Parameters**
*	`x`: `number`, default 0
	posisi x dari tengah lingkaran

### 📝 Perintah Teks

Perintah-perintah yang berhubungan dengan teks.

#### `tulis`

Menulis sesuatu 

**Parameters**
*	`x`: `number`, default 0
	posisi x dari tengah lingkaran

#### `fontTeks`

Mengatur jenis font

**Parameters**
*	`x`: `number`, default 0
	posisi x dari tengah lingkaran

#### `ukuranTeks`

Mengatur ukuran teks

**Parameters**
*	`x`: `number`, default 0
	posisi x dari tengah lingkaran

#### `perataanTeks`

Mengatur perataan teks. 

**Parameters**
*	`x`: `number`, default 0
	posisi x dari tengah lingkaran

### 📝Event Input Keyboard

#### `tombolDitahan(key: string = '')`

mengecek apakah tombol ditahan

**Parameters**
*	`x`: `number`, default 0
	posisi x dari tengah lingkaran

#### ` tombolEvent():string `

Mengembalikan informasi tombol terakhir yang terlibat saat ada event keyboard

**Parameters**
*	`x`: `number`, default 0
	posisi x dari tengah lingkaran

### 📄 Lisensi

GNU license

***