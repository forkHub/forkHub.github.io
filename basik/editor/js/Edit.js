"use strict";
class Edit {
    constructor() {
        this.editArea = document.querySelector('textarea.edit-area');
        this.webCont = document.querySelector('div.kontainer-2 div.web');
        this.editCont = document.querySelector('div.kontainer-2 div.edit-text');
        this.tblEditGroup = ["simpan", "muat", "jalan", "baru"];
        this.tblJalanGroup = ["edit",];
    }
    injectScript(src, f) {
        console.group('inject script');
        console.log('src:', src);
        let script = document.createElement('script');
        script.onload = f;
        script.src = src;
        document.head.appendChild(script);
        console.groupEnd();
    }
    getTbl(nama) {
        return document.querySelector(`button.${nama}`);
    }
    showTbl(tbl) {
        if (Array.isArray(tbl)) {
            tbl.forEach((item) => {
                this.showTbl(item);
            });
        }
        else if (typeof tbl === "string") {
            this.showTbl(this.getTbl(tbl));
        }
        else {
            tbl.classList.add('disp-inline');
            tbl.classList.remove('disp-none');
        }
    }
    hideTbl(tbl) {
        if (Array.isArray(tbl)) {
            tbl.forEach((item) => {
                this.hideTbl(item);
            });
        }
        else if (typeof tbl == "string") {
            this.hideTbl(this.getTbl(tbl));
        }
        else {
            tbl.classList.remove('active');
            tbl.classList.remove('disp-inline');
            tbl.classList.add('disp-none');
        }
    }
    getQuery(key) {
        let q = '';
        let h = '';
        console.groupCollapsed('get query: ' + key);
        q = window.top.location.search;
        console.log(q);
        q = q.slice(1, q.length);
        console.log(q);
        let qAr = q.split("&");
        console.log(qAr);
        qAr.forEach((item) => {
            let keyAr = item.split('=');
            let pKey = keyAr[0];
            if (pKey == key) {
                h = keyAr[1];
            }
        });
        console.log('res: ' + h);
        console.groupEnd();
        return h;
    }
    initCodeMirror(code = '') {
        console.log("init code mirror");
        this.myCodeMirror = CodeMirror.fromTextArea(this.editArea, {
            lineNumbers: true,
            mode: "javascript",
            gutters: ["CodeMirror-lint-markers"],
            lint: false,
            init: code
        });
        this.myCodeMirror.setValue(code);
        this.myCodeMirror.on("change", () => {
            this.updateNama();
        });
    }
    checkFileUpdated() {
        let data = this.myCodeMirror.getValue();
        let fData = fileAktif.data;
        return (data != fData);
    }
    updateNama() {
        if (this.checkFileUpdated()) {
            this.fileInfo.innerText = fileNama + "(*)";
        }
        else {
            this.fileInfo.innerText = fileNama;
        }
    }
    checkJsHint() {
        try {
            if (!JSHINT)
                return [];
            JSHINT('/* jshint esversion: 6 */\n' +
                this.myCodeMirror.getValue());
            console.log(JSHINT.errors);
            let err = [];
            JSHINT.errors.forEach((item) => {
                err.push({
                    line: item.line - 1,
                    message: item.reason
                });
            });
            return err;
        }
        catch (e) {
            console.warn(e);
            return [];
        }
    }
    muatFileAwal() {
        console.groupCollapsed("muat file awal:");
        try {
            let s = window.localStorage.getItem(storageNama);
            fileList = JSON.parse(s);
            if (!fileList)
                fileList = [];
            console.log(fileList);
        }
        catch (e) {
            console.warn(e);
            fileList = [];
        }
        console.groupEnd();
    }
    reload() {
        try {
            // Get the current URL without query parameters and hash
            const cleanUrl = window.location.origin + window.location.pathname;
            // Replace the current history entry without reloading
            window.history.replaceState({}, document.title, cleanUrl);
            // Reload the page without query parameters
        }
        catch (error) {
            console.error("Failed to reload without query parameters:", error);
        }
    }
    runOk() {
        let hal2 = renderIframe(this.myCodeMirror.getValue());
        let iframe = document.createElement('iframe');
        let iframeCont = document.body.querySelector('div.kontainer-2 div.web');
        iframeCont.innerHTML = '';
        iframeCont.appendChild(iframe);
        console.groupCollapsed("compile");
        console.log(hal2);
        console.groupEnd();
        setTimeout(() => {
            iframe.contentWindow.document.open();
            iframe.contentWindow.document.write(hal2);
            iframe.contentWindow.document.close();
            iframe.focus();
        }, 0);
    }
}
