"use strict";
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
                //gagal load codes
                //TODO: dialog
                //TODO: 
                // tunggu demo dan muat dari demo sebagai alternatif
                // paramter load code dibuat nama demo
                // dan base url di set otomatis
                // dialog("");
                console.log(err);
                this.initCodeMirror("mulai()");
                mulai();
            });
        }
        else {
            this.initCodeMirror("mulai()");
            mulai();
            //loading stop
        }
        function mulai() {
            //loading stop
            document.querySelector("#loading-screen").classList.add("hidden");
            console.log("load async js");
            loadScript("./editor/js/demo.js");
            loadScript("./editor/lib/jshint.js");
            loadScript("./editor/lib/acorn.js");
            console.groupEnd();
        }
    }
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
        //optional checking
        let err = [];
        try {
            err = this.checkJsHint();
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
        }
        catch (e) {
            console.warn(e);
        }
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
    }
}
