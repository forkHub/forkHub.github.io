"use strict";
class Edit2 {
    constructor() {
        this.editArea = document.querySelector('textarea.edit-area');
        this.webCont = document.querySelector('div.kontainer-2 div.web');
        this.editCont = document.querySelector('div.kontainer-2 div.edit-text');
        this.tblRun = document.querySelector('button.jalan');
        this.tblEdit = document.querySelector('button.edit');
        this.tblSimpan = document.querySelector('button.simpan');
        this.tblMuat = document.querySelector('button.muat');
        this.tblUnduh = document.querySelector('button.unduh');
        this.tblUnggah = document.querySelector('button.unggah');
    }
    init() {
        this.tblSimpan.onclick = () => {
            // let item: Item = {
            // 	id: Date.now() + '',
            // 	name: ''
            // }
            // //TODO:
            // item;
            // localStorage.set("");
            // CodeMirror.getValue();
            dlgBelumSelesai();
        };
        this.tblMuat.onclick = () => {
            dlgBelumSelesai();
            /*
            let item: Item[] = [];

            //load from db
            try {
                let itemStr = localStorage.getItem("basik_save");
                item = JSON.parse(itemStr) || [];
            }
            catch (e) {
                console.error(e);
                item = [];
            }

            console.log(item);

            dialogListFile(item, (selectedItem: Item | null) => {
                console.log(selectedItem);
            }, () => {
                console.log("closed");
            })
                */
        };
        this.tblUnduh.onclick = () => {
            dlgBelumSelesai();
        };
        this.tblUnggah.onclick = () => {
            dlgBelumSelesai();
        };
        this.tblRun.onclick = () => {
            console.debug('run');
            this.editCont.classList.remove('active');
            this.tblEdit.classList.remove('active');
            this.tblEdit.classList.add('disp-inline');
            this.tblMuat.classList.add('disp-none');
            this.tblSimpan.classList.add('disp-none');
            this.tblUnduh.classList.add('disp-none');
            this.tblUnggah.classList.add('disp-none');
            this.tblMuat.classList.remove('disp-inline');
            this.tblSimpan.classList.remove('disp-inline');
            this.tblUnduh.classList.remove('disp-inline');
            this.tblUnggah.classList.remove('disp-inline');
            this.tblRun.classList.add('active');
            this.tblRun.classList.add('disp-none');
            this.tblRun.classList.remove('disp-inline');
            this.webCont.classList.add('active');
            this.compile();
        };
        this.tblEdit.onclick = () => {
            this.editClick();
        };
        // const eslintConfig = {
        // 	parserOptions: {
        // 		ecmaVersion: 2015,
        // 		sourceType: "module"
        // 	},
        // 	env: {
        // 		es6: true,
        // 		browser: true
        // 	},
        // 	rules: {
        // 		semi: ["error", "always"],
        // 		"no-unused-vars": "warn"
        // 	}
        // };
        // CodeMirror.registerHelper("lint", "javascript", function (text: any) {
        // 	const results = ESLint.verify(text, eslintConfig);
        // 	return results.map((result: any) => ({
        // 		from: CodeMirror.Pos(result.line - 1, result.column - 1),
        // 		to: CodeMirror.Pos(result.line - 1, result.column),
        // 		message: result.message,
        // 		severity: result.severity === 2 ? "error" : "warning"
        // 	}));
        // });
        this.myCodeMirror = CodeMirror.fromTextArea(this.editArea, {
            lineNumbers: true,
            mode: "javascript",
            gutters: ["CodeMirror-lint-markers"],
            lint: false
        });
        // console.log(CodeMirror);
        // console.log(this.myCodeMirror);
        this.myCodeMirror.on("change", () => {
            // console.log('change');
        });
        // this.loadFromQuery();
    }
    // loadFromQuery(): void {
    // 	try {
    // 		//loading
    // 		let s: string = window.top.location.search.slice(1);
    // 		console.log('url: ' + s);
    // 		let ar: string[] = s.split('&');
    // 		console.log(ar);
    // 		ar = ar[0].split('=');
    // 		console.log(ar);
    // 		console.log('loading: ' + ha.comp.loading);
    // 		ha.comp.Util.Ajax2('get', "./data/" + ar[1] + ".js", '').then((value: string) => {
    // 			this.myCodeMirror.setValue(value);
    // 			// this.compile();
    // 		}).catch((e) => {
    // 			console.error(e);
    // 			ha.comp.dialog.tampil('Colud not load data');
    // 		});
    // 		//load query
    // 		console.log(ar);
    // 	}
    // 	catch (e) {
    // 		console.error(e);
    // 	}
    // }
    // klikRun(): void {
    // 	this.compile();
    // }
    editClick() {
        this.editCont.classList.add('active');
        this.editArea.classList.add('active');
        this.tblRun.classList.remove('active');
        this.tblRun.classList.add('disp-inline');
        this.tblRun.classList.remove('disp-none');
        this.webCont.classList.remove('active');
        this.webCont.innerHTML = '';
        this.tblEdit.classList.add('active');
        this.tblEdit.classList.add('disp-none');
        this.tblEdit.classList.remove('disp-inline');
        this.tblSimpan.classList.add('disp-inline');
        this.tblMuat.classList.add('disp-inline');
        this.tblUnduh.classList.add('disp-inline');
        this.tblUnggah.classList.add('disp-inline');
        console.log('edit click');
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
		'./editor/lib/basik.js',
		'./editor/lib/mulai.js'
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
