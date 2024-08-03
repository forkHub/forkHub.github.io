"use strict";
class Iframe {
    static init() {
        console.log("init");
        let simpan = window.localStorage.getItem("blocklycode");
        let iframe = document.querySelector('iframe');
        let doc = iframe.contentWindow.document;
        doc.open();
        doc.write(simpan);
        doc.close();
    }
}
Iframe.init();
