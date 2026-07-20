"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var EState;
(function (EState) {
    EState[EState["awal"] = 0] = "awal";
    EState[EState["edit"] = 1] = "edit";
    EState[EState["dialogSimpan"] = 2] = "dialogSimpan";
    EState[EState["jalankan"] = 3] = "jalankan";
})(EState || (EState = {}));
//globa state
let fileDiedit = false;
let fileHash = '';
let fileNama = "latihan_" + (Math.floor(Math.random() * 1000) + 1000);
let fileList = [];
let fileBaru = true;
let fileAktif = {
    namaFile: fileNama,
    data: ""
};
let appState = EState.edit;
const storageNama = "io.github.forkhub.basik.data";
class Edit2 {
    constructor() {
        this.editArea = document.querySelector('textarea.edit-area');
        this.webCont = document.querySelector('div.kontainer-2 div.web');
        this.editCont = document.querySelector('div.kontainer-2 div.edit-text');
        this.tblEditGroup = ["simpan", "muat", "jalan", "baru"];
        this.tblJalanGroup = ["edit",];
        this.webCont;
        this.editCont;
        this.fileInfo = document.querySelector("div.file-info span.nama");
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
        console.group('get query: ' + key);
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
    injectScript(src, f) {
        console.group('inject script');
        console.log('src:', src);
        let script = document.createElement('script');
        script.onload = f;
        script.src = src;
        document.head.appendChild(script);
        console.groupEnd();
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
    init() {
        console.group("init");
        this.initTombol();
        this.hideTbl("edit");
        this.muatFileAwal();
        this.fileInfo.innerText = fileNama;
        let code = this.getQuery("pId");
        if (code) {
            this.injectScript("./demo/" + code + ".js", () => {
                //TODO:
                console.log("script loaded");
                this.initCodeMirror(codeDemo.code);
            });
            return;
        }
        //let load code;
        let loadCode = this.getQuery("url");
        if (loadCode) {
            loadFileFromUrl(loadCode)
                .then((code) => {
                this.initCodeMirror(code);
            })
                .catch((err) => {
                console.log(err);
            });
        }
        else {
            this.initCodeMirror("mulai();\n");
        }
        console.groupEnd();
    }
    demoKlik() {
        let demo = document.querySelector("dialog.demo") || (() => { throw new Error("Demo dialog not found"); })();
        demo.showModal();
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
    muatFileAwal() {
        console.log("muat file awal:");
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
    runOk() {
        let hal2 = renderIframe(this.myCodeMirror.getValue());
        let iframe = document.createElement('iframe');
        let iframeCont = document.body.querySelector('div.kontainer-2 div.web');
        iframeCont.innerHTML = '';
        iframeCont.appendChild(iframe);
        setTimeout(() => {
            iframe.contentWindow.document.open();
            iframe.contentWindow.document.write(hal2);
            iframe.contentWindow.document.close();
            iframe.focus();
        }, 0);
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
}
window.onload = () => {
    let edit = new Edit2();
    edit.init();
    // console.log(JSHINT.errors);
    // JSHINT.errors = jsHIntErrors;
    // JSHINT.warnings = jshintWarnings;
    // JSHINT.info = jsHintInfo;
};
function renderIframe(script) {
    let rand = Math.floor(Math.random() * 1000);
    let hal = `
<html>
<meta charset="utf-8" />

<head>
	<style>
		canvas {
			border: 1px solid gray;
			background-color: white;
		}

		html,
		body {
			margin: 0px;
			padding: 0px;
			background-color: lightGray;
		}

		.custom-alert-overlay {		
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, 0.5);
			display: none;
			/* awalnya hidden */
			justify-content: center;
			align-items: center;
			z-index: 9999;
		}

		.custom-alert-box {
			background: #fff;
			padding: 20px;
			border-radius: 8px;
			min-width: 250px;
			text-align: center;
			box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
		}

		.custom-alert-box button {
			margin-top: 15px;
			padding: 8px 16px;
			border: none;
			background: #0078d7;
			color: #fff;
			border-radius: 4px;
			cursor: pointer;
		}

	</style>
	<script>
	function loadScriptsSequentially(sources, finalCallback) {
		function loadNext(index) {
			if (index >= sources.length) {
				if (typeof finalCallback === 'function') finalCallback();
				return;
			}

			const script = document.createElement('script');
			script.src = sources[index];
			script.onload = () => loadNext(index + 1);
			script.onerror = () => {
				console.error("Failed to load: " + sources[index]);
				loadNext(index + 1); // Skip failed script and continue
			};
			document.head.appendChild(script);
		}

		loadNext(0);
	}

	// Example usage:
	loadScriptsSequentially([
		'./editor/lib/basik.min.js?r=${rand}',
		'./editor/lib/mulai.js?r=${rand}'
	], () => {
		const script = document.createElement('script');
		script.textContent = \`${script}\`
		document.head.appendChild(script);
	});
	window.focus();
	</script>
</head>

<body>
</body>

</html>
`;
    return hal;
}
function showErrorDialog(errors, okHandle, cancelHandle) {
    // Remove existing dialog if any
    const existing = document.getElementById('error-dialog');
    if (existing) {
        existing.close();
        existing.remove();
    }
    // Create dialog element
    const dialog = document.createElement('dialog');
    dialog.id = 'error-dialog';
    dialog.style.padding = '20px';
    dialog.style.border = '1px solid #ccc';
    dialog.style.minWidth = '300px';
    dialog.style.boxSizing = 'border-box';
    // Title
    const title = document.createElement('h2');
    title.textContent = 'Ups, ada kesalahan, check dulu ya!';
    title.style.marginTop = '0';
    dialog.appendChild(title);
    // Error list
    const list = document.createElement('ul');
    errors.forEach((err) => {
        const item = document.createElement('li');
        item.textContent = `Baris ${err.line}: ${err.message}`;
        list.appendChild(item);
    });
    dialog.appendChild(list);
    dialog.appendChild(document.createElement('hr'));
    const p = document.createElement('p');
    p.innerText = "Tekan 'Lanjutkan' untuk tetap menjalankan aplikasi, tekan 'Batal' untuk mengedit kembali.";
    dialog.appendChild(p);
    // Buttons container
    const buttons = document.createElement('div');
    buttons.style.marginTop = '20px';
    buttons.style.display = 'flex';
    buttons.style.justifyContent = 'flex-end';
    buttons.style.gap = '10px';
    // Continue button
    const continueBtn = document.createElement('button');
    continueBtn.textContent = 'Lanjutkan';
    continueBtn.onclick = () => {
        // Empty handler
        dialog.close();
        okHandle();
    };
    // Abort button
    const abortBtn = document.createElement('button');
    abortBtn.textContent = 'Batal';
    abortBtn.onclick = () => {
        // Empty handler
        dialog.close();
        cancelHandle();
    };
    buttons.appendChild(continueBtn);
    buttons.appendChild(abortBtn);
    dialog.appendChild(buttons);
    // Append and show
    document.body.appendChild(dialog);
    dialog.showModal();
}
function dlgBelumSelesai() {
    alert("Maaf fungsi masih belum tersedia");
}
/**
 * Load file content from a given URL.
 * @param url - The URL of the file to fetch.
 * @param type - The expected response type: "text", "json", or "arrayBuffer".
 * @returns Promise with the file content in the chosen format.
 */
function loadFileFromUrl(url_1) {
    return __awaiter(this, arguments, void 0, function* (url, type = "text") {
        const response = yield fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to load file: ${response.status} ${response.statusText}`);
        }
        switch (type) {
            case "json":
                return (yield response.json());
            case "arrayBuffer":
                return (yield response.arrayBuffer());
            default:
                return (yield response.text());
        }
    });
}
