"use strict";
class Iframe {
    static init() {
        try {
            console.log("init");
            let simpan = window.localStorage.getItem("blocklycode");
            let iframe = document.querySelector('iframe');
            let doc = iframe.contentWindow.document;
            doc.open();
            doc.write(simpan);
            doc.close();
        }
        catch (e) {
            console.log('fatal error');
            alert("Ada kesalahan fatal.\n Silahkan check kodenya kembali.\nApakah ada blok yang belum terisi?");
        }
    }
}
Iframe.init();
