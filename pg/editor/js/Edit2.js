"use strict";
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
        this.tblEditGroup = ["simpan", "muat", "jalan"];
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
    init() {
        this.getTbl("simpan").onclick = () => {
            this.simpanKlik();
        };
        this.getTbl("muat").onclick = () => {
            this.muatKlik();
        };
        this.getTbl("jalan").onclick = () => {
            // this.gantiState(EState.jalankan);
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
        this.myCodeMirror = CodeMirror.fromTextArea(this.editArea, {
            lineNumbers: true,
            mode: "javascript",
            gutters: ["CodeMirror-lint-markers"],
            lint: false
        });
        this.myCodeMirror.on("change", () => {
            // console.log('change');
            this.updateNama();
        });
        this.hideTbl("edit");
        this.muatFileAwal();
        this.fileInfo.innerText = fileNama;
    }
    muatKlik() {
        dialogDaftarFile((item) => {
            console.log("muat data");
            console.log(item.data);
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
        let hal2 = render(this.myCodeMirror.getValue());
        // hal2 = hal2.replace('{{script}}', this.myCodeMirror.getValue());
        let iframe = document.createElement('iframe');
        let iframeCont = document.body.querySelector('div.kontainer-2 div.web');
        iframeCont.innerHTML = '';
        iframeCont.appendChild(iframe);
        setTimeout(() => {
            iframe.contentWindow.document.open();
            iframe.contentWindow.document.write(hal2);
            iframe.contentWindow.document.close();
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
    console.log(JSHINT.errors);
    // JSHINT.errors = jsHIntErrors;
    // JSHINT.warnings = jshintWarnings;
    // JSHINT.info = jsHintInfo;
};
function render(script) {
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
		'./editor/lib/basik.min.js?r=324',
		'./editor/lib/mulai.js?r=123'
	], () => {
		const script = document.createElement('script');
		script.textContent = \`${script}\`
		document.head.appendChild(script);
	});
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
    // Buttons container
    const buttons = document.createElement('div');
    buttons.style.marginTop = '20px';
    buttons.style.display = 'flex';
    buttons.style.justifyContent = 'flex-end';
    buttons.style.gap = '10px';
    // Continue button
    const continueBtn = document.createElement('button');
    continueBtn.textContent = 'Continue';
    continueBtn.onclick = () => {
        // Empty handler
        dialog.close();
        okHandle();
    };
    // Abort button
    const abortBtn = document.createElement('button');
    abortBtn.textContent = 'Abort';
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
