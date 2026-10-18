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
class Edit2 extends Edit {
    constructor() {
        super();
        this.webCont;
        this.editCont;
        this.fileInfo = document.querySelector("div.file-info span.nama");
    }
    initTombol() {
        this.getTbl("simpan").onclick = () => {
            this.simpanKlik();
        };
        this.getTbl("muat").onclick = () => {
            this.muatKlik();
        };
        this.getTbl("jalan").onclick = () => {
            console.debug('run');
            this.editCont.classList.remove('active');
            this.webCont.classList.add('active');
            this.hideTbl(this.tblEditGroup);
            this.showTbl(this.tblJalanGroup);
            // this.tblEdit.classList.remove('active');
            // this.tblEdit.classList.add('disp-inline');
            // this.tblMuat.classList.add('disp-none');
            // this.tblSimpan.classList.add('disp-none');
            // this.tblMuat.classList.remove('disp-inline');
            // this.tblSimpan.classList.remove('disp-inline');
            // this.tblRun.classList.add('active');
            // this.tblRun.classList.add('disp-none');
            // this.tblRun.classList.remove('disp-inline');
            this.compile();
        };
        this.getTbl("edit").onclick = () => {
            this.editClick();
        };
        this.getTbl("baru").onclick = () => {
            this.baruKlik();
        };
    }
    init() {
        console.groupCollapsed("init");
        this.initTombol();
        this.hideTbl("edit");
        this.muatFileAwal();
        this.fileInfo.innerText = fileNama;
        console.groupEnd();
        //code per project
        //blocking, early return on success/error
        //depecrated
        // let code = this.getQuery("pId");
        // if (code) {
        // 	this.injectScript("./demo/" + code + ".js", () => {
        // 		//TODO:
        // 		console.log("script loaded");
        // 		this.initCodeMirror(codeDemo.code);
        // 	})
        // 	return;
        // }
        //is online
        // isOnline = Boolean(this.getQuery('online'))
        // console.log("is online: " + isOnline);
        // if (!isOnline) {
        // 	loadScript("./editor/lib/jshint.js");
        // 	loadScript("./editor/lib/acorn.js");
        // 	//TODO: go with inject scripts multiple
        // }
        //let load code demo for online purpose;
        console.groupCollapsed("init 2");
        let loadCode = this.getQuery("url");
        if (loadCode) {
            console.log("load code from url");
            loadFileFromUrl(loadCode)
                .then((code) => {
                this.initCodeMirror(code);
                mulai();
            })
                .catch((err) => {
                console.log(err);
                mulai();
            });
        }
        else {
            mulai();
            //loading stop
        }
        function mulai() {
            console.log("load async js");
            loadScript("./editor/js/demo.js");
            loadScript("./editor/lib/jshint.js");
            loadScript("./editor/lib/acorn.js");
            console.groupEnd();
        }
    }
    // demoKlik() {
    // 	let demo = document.querySelector("dialog.demo") || (() => { throw new Error("Demo dialog not found"); })();
    // 	(demo as HTMLDialogElement).showModal();
    // }
    baruKlik() {
        this.reload();
        window.location.reload();
    }
    muatKlik() {
        console.log("");
        dialogDaftarFile((item) => {
            console.group("");
            console.log("muat data");
            console.log(item.data);
            console.log("this", this);
            console.log("code mirror instance", this.myCodeMirror);
            console.log("globalThis instance", globalThis);
            console.log("globalThis edit instance", globalThis["edit"]);
            console.groupEnd();
            fileBaru = false;
            fileNama = item.namaFile;
            fileAktif = item;
            this.myCodeMirror.setValue(item.data);
            this.updateNama();
        }, () => {
            //nothing
        });
    }
    editClick() {
        // this.gantiState(EState.edit);
        this.editCont.classList.add('active');
        this.editArea.classList.add('active');
        // this.tblRun.classList.remove('active');
        // this.showTbl(this.getTbl("jalan"));
        // this.tblRun.classList.add('disp-inline');
        // this.tblRun.classList.remove('disp-none');
        this.webCont.classList.remove('active');
        this.webCont.innerHTML = '';
        // this.tblEdit.classList.add('active');
        // this.tblEdit.classList.add('disp-none');
        // this.tblEdit.classList.remove('disp-inline');
        // this.tblSimpan.classList.add('disp-inline');
        // this.tblMuat.classList.add('disp-inline');
        // this.tblEditGroup.forEach((item) => {
        // 	this.showTbl(this.getTbl(item));
        // })
        this.showTbl(this.tblEditGroup);
        this.hideTbl(this.tblJalanGroup);
        console.log('edit click');
    }
    simpanKlik() {
        let dataKode = this.myCodeMirror.getValue();
        let code = {
            code: dataKode
        };
        console.log("code str");
        console.log(code);
        if (!dataKode) {
            alert("Tidak ada data yang disimpan, Anda belum menulis apa-apa.");
            return;
        }
        let nama = prompt("Nama file:", fileNama);
        if (!nama) {
            return;
        }
        let self = this;
        let gantiNama = (nama != fileNama);
        if (fileBaru) {
            resolveKonflik();
        }
        else {
            if (gantiNama) {
                resolveKonflik();
            }
            else {
                timpa();
            }
        }
        this.updateNama();
        function resolveKonflik() {
            if (checkKonflik()) {
                if (confirm("Nama file sudah ada, apakah mau di timpa?")) {
                    timpa();
                    fileBaru = false;
                    fileNama = nama;
                }
                else {
                    //batal simpan
                }
            }
            else {
                simpanBaru();
            }
        }
        function checkKonflik() {
            let konflik = false;
            for (let i = 0; i < fileList.length; i++) {
                if (fileList[i].namaFile === nama) {
                    konflik = true;
                }
            }
            return konflik;
        }
        function timpa() {
            fileList.forEach((item) => {
                if (item.namaFile == nama) {
                    item.data = dataKode;
                    fileAktif = item;
                }
            });
            window.localStorage.setItem(storageNama, JSON.stringify(fileList));
            fileBaru = false;
            fileNama = nama;
        }
        function simpanBaru() {
            fileAktif = {
                namaFile: nama,
                data: self.myCodeMirror.getValue()
            };
            fileList.push(fileAktif);
            fileBaru = false;
            fileNama = nama;
            window.localStorage.setItem(storageNama, JSON.stringify(fileList));
        }
    }
    compile() {
        let err = this.checkJsHint();
        if (acornParser) {
            console.group("accorn parse");
            let { varErr, funErr, callErr } = acornParser.parse(this.myCodeMirror.getValue());
            console.groupEnd();
            varErr.forEach((v) => {
                err.push({
                    line: -1,
                    message: `tidak boleh mendeklarasikan variable dengan nama: <code>${v}</code>, karena namanya sama dengan variable/fungsi bawaan dari BASIK`
                });
            });
            funErr.forEach((v) => {
                err.push({
                    line: -1,
                    message: `fungsi dengan nama <code>${v.v}</code> kemungkinan memiliki kesalahan ejaan, yang benar adalah <code>${v.b}</code>`
                });
            });
            callErr.forEach((v) => {
                err.push({
                    line: -1,
                    message: `perintah dengan nama <code>${v.v}</code> kemungkinan memiliki kesalahan ejaan, yang benar adalah <code>${v.b}</code>`
                });
            });
        }
        // JSHINT(
        // 	'/* jshint esversion: 6 */\n' +
        // 	this.myCodeMirror.getValue()
        // );
        // console.log(JSHINT.errors);
        // let err: ErrorItem[] = [];
        // JSHINT.errors.forEach((item: any) => {
        // 	err.push({
        // 		line: item.line - 1,
        // 		message: item.reason
        // 	})
        // });
        if (err.length > 0) {
            showErrorDialog(err, () => {
                this.runOk();
            }, () => {
                this.editClick();
                // this.gantiState(EState.edit);
            });
        }
        else {
            this.runOk();
        }
        // console.log
        // console.log(this.myCodeMirror.getValue());
        // console.log(hal2);
    }
}
