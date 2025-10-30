# Menengal bentuk perintah di javascript

Secara umum, perintah di JavaScript punya bentuk seperti ini:

```
perintah("parameter1", parameter2);
```

Penjelasan bentuk perintah:

Nama perintah biasanya satu atau dua kata, contohnya:

```
tulis();
update();
prompt();
```

Kalau perintah terdiri dari dua kata, penulisannya disambung dan huruf pertama kata kedua pakai huruf kapital, contohnya:

```
muatImage();
buatKanvas();
```

Tidak boleh ada spasi di nama perintah! Contoh yang salah: buat kanvas()

Kurung buka dan tutup `( )` adalah tempat untuk menaruh parameter. Parameter itu seperti “info tambahan” yang kita berikan ke perintah.

Contoh:

```
tulis("Bismillah, Saya sedang belajar");
```

Di sini, `"Bismillah, Saya sedang belajar"` adalah parameter yang memberi tahu apa yang harus ditulis.

Perintah bisa punya 0, 1, atau lebih banyak parameter. Jika lebih dari satu, pisahkan dengan tanda koma ,

Contoh:

```
buatKanvas(300, 200);
tulisXY(100, 100, "Bismillah, saya sedang belajar coding");
muatAnimasi("gambar.png", 32, 32);
```

Di akhir perintah biasanya ada titik koma; Ini seperti tanda “selesai”. Tapi tidak apa-apa, kalau kamu lupa, JavaScript kadang masih bisa jalan. Tetap disarankan untuk dibiasakan ya!
