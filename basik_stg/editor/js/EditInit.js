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
let isOnline = false;
let appState = EState.edit;
const storageNama = "io.github.forkhub.basik.data";
window.onload = () => {
    let edit = new Edit2();
    edit.init();
    // console.log(JSHINT.errors);
    // JSHINT.errors = jsHIntErrors;
    // JSHINT.warnings = jshintWarnings;
    // JSHINT.info = jsHintInfo;
};
//================================================================================
function tunggu(getValue_1) {
    return __awaiter(this, arguments, void 0, function* (getValue, options = {}) {
        function sleep(durationMs) {
            return new Promise(function (resolve) {
                setTimeout(function () {
                    resolve();
                }, durationMs);
            });
        }
        const interval = options.interval !== undefined ? options.interval : 100;
        const timeout = options.timeout !== undefined ? options.timeout : 5000;
        if (typeof getValue !== "function") {
            throw new TypeError("getValue harus berupa function");
        }
        const startTime = Date.now();
        while (true) {
            const currentValue = getValue();
            if (currentValue) {
                return true;
            }
            const elapsedTime = Date.now() - startTime;
            if (elapsedTime > timeout) {
                throw new Error("Timeout: nilai tidak berubah menjadi true dalam " + timeout + " ms");
            }
            yield sleep(interval);
        }
    });
}
function loadScript(src) {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => console.log("sukses muat " + src);
    script.onerror = () => console.warn("gagal muat file: " + src);
    // 	console.error("Failed to load: " + sources[index]);
    // 	loadNext(index + 1); // Skip failed script and continue
    // };
    document.head.appendChild(script);
}
function loadScripts(sources, finalCallback) {
    function loadNext(index) {
        if (index >= sources.length) {
            if (typeof finalCallback === 'function')
                finalCallback();
            return;
        }
        const script = document.createElement('script');
        script.src = sources[index];
        script.onload = () => loadNext(index + 1);
        script.onerror = () => {
            console.error("Failed to load: " + sources[index]);
            // loadNext(index + 1); // Skip failed script and continue
            //TODO:
        };
        document.head.appendChild(script);
    }
    loadNext(0);
}
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
        if (err.line > -1) {
            item.innerHTML = `Baris ${err.line}: ${err.message}`;
        }
        else {
            item.innerHTML = err.message;
        }
        list.appendChild(item);
    });
    dialog.appendChild(list);
    dialog.appendChild(document.createElement('hr'));
    html('p', dialog, (el) => {
        el.innerText = "Pesan ini mungkin memiliki kesalahan, dan hanya ditujukan untuk pengecekan.";
    });
    const p = document.createElement('p');
    p.innerText = "Tekan 'Lanjutkan' bila yakin tidak ada kesalahan, tekan 'Batal' untuk mengedit kembali.";
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
function html(t, p, e) {
    let h = document.createElement(t);
    p.appendChild(h);
    if (e)
        e(h);
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
