# Operator "=" dan "+"

Javascript memiliki beberapa operator antara lain = dan +:

- Tanda = digunakan untuk mengisi kotak.
- Tanda + digunakan untuk menggabungkan teks atau menjumlahkan angka. Bila digunakan dengan teks dan angka, maka hasilnya akan digabungkan. Namun bila digunakan dengan angka dan angka maka hasilnya akan dijumlahkan.

Contoh:

```
let namaSiswa = "Budi";
tulis("Nama saya: " + namaSiswa);
```

Hasilnya adalah tulisan Nama saya: Budi

Variable Bisa Diisi Belakangan

```
let namaSiswa;
namaSiswa = "Budi";
tulis("Nama saya: " + namaSiswa);
```

Hasilnya adalah tulisan Nama saya: Budi.

Sama dengan di atas karena kita hanya memindahkan perintah untuk mengisi variable namaSiswa ke bawah, dan isinya tetap sama

Variable juga bisa diisi dengan Angka

```
let roti = 9;
let coklat = 5;
let total = roti + coklat
tulis("total bekal yang dibawa: " + total)
```

Angka ditulis tanpa tanda kutip.

Hasilnya adalah tulisan angka 14, yaitu hasil dari roti + coklat. 9 + 5 = 14.

# Tipe Data di JavaScript

- String: Teks, seperti "Budi"
- Number: Angka, seperti 90
- Object: Kita akan bahas nanti

## Tabel Contoh Penggunaan Variable
```
let nama;
```
Membuat kotak (variable) bernama nama, belum diisi

```
let nama;
nama = "Umar"
```
Membuat kotak (variable) nama, lalu diisi dengan teks "Umar"

```
let nama = "Umar";
```
Membuat dan mengisi variable nama sekaligus

```
let roti = 9;
let coklat = 5;
let total = roti + coklat
```
Menghitung total makanan dan menyimpannya di kotak total

```
let donat = 10;
donat = donat + 10;
```
Membuat variable donat dan mengisinya dengan angka 10
Menambahkan isi dari kotak donat dengan 10 dan memasukkan lagi ke dalam variable donat.
Sekarang isi variable donat jadi 20.
✏ Ini adalah salah satu pola yang sering digunakan dalam pemrograman
