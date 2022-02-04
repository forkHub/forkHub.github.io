"use strict";
class Edit2 {
    myCodeMirror;
    editArea = document.querySelector('textarea.edit-area');
    webCont = document.querySelector('div.kontainer-2 div.web');
    editCont = document.querySelector('div.kontainer-2 div.edit-text');
    tblRun = document.querySelector('button.jalan');
    tblEdit = document.querySelector('button.edit');
    init() {
        console.log(CodeMirror);
        this.tblRun.onclick = () => {
            console.debug('run');
            this.tblEdit.classList.remove('active');
            this.editCont.classList.remove('active');
            this.tblRun.classList.add('active');
            this.webCont.classList.add('active');
            this.compile();
        };
        this.tblEdit.onclick = () => {
            this.tblEdit.classList.add('active');
            this.editCont.classList.add('active');
            this.editArea.classList.add('active');
            this.tblRun.classList.remove('active');
            this.webCont.classList.remove('active');
            this.webCont.innerHTML = '';
            console.log('edit click');
        };
        this.myCodeMirror = CodeMirror.fromTextArea(this.editArea, {
            lineNumbers: false,
            styleActiveLine: true,
            matchBrackets: true,
            theme: 'ambiance'
        });
        console.log(CodeMirror);
        console.log(this.myCodeMirror);
        this.myCodeMirror.on("change", () => {
            console.log('change');
        });
        //loading
        let s = window.top.location.search.slice(1);
        let ar = s.split('=');
        console.log('loading: ' + ha.comp.loading);
        ha.comp.Util.Ajax2('get', "./datajs/" + ar[1] + ".js", '').then((value) => {
            this.myCodeMirror.setValue(value);
            // this.compile();
        }).catch((e) => {
            console.error(e);
        });
        //load query
        console.log(ar);
    }
    klikRun() {
        this.compile();
    }
    compile() {
        let hal2 = hal;
        hal2 = hal2.replace('{{script}}', this.myCodeMirror.getValue());
        let iframe = document.createElement('iframe');
        let iframeCont = document.body.querySelector('div.kontainer-2 div.web');
        iframeCont.innerHTML = '';
        iframeCont.appendChild(iframe);
        setTimeout(() => {
            iframe.contentWindow.document.open();
            iframe.contentWindow.document.write(hal2);
            iframe.contentWindow.document.close();
        }, 10);
        // console.log
        console.log(this.myCodeMirror.getValue());
    }
}
window.onload = () => {
    let edit = new Edit2();
    edit.init();
};
let hal = `
	<!DOCTYPE html>
	<html>

	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0,
			target-densityDpi=device-dpi">

		<title>Blitz</title>

		<style>
			html,
			body,
			div,
			canvas {
				box-sizing: border-box;
				overflow: hidden;
				margin: 0px;
				padding: 0px;
			}

			html,
			body {
				position: relative;
				width: 100%;
				height: 100%;
				background-color: #111;
			}

			canvas.buffer.back-buffer,
			canvas.buffer.front-buffer {
				position: absolute;
				background-color: transparent;
				touch-action: none;
				image-rendering: pixelated;
			}

			canvas.buffer.back-buffer {
				display: none;
			}

			div.debug {
				touch-action: none;
				height: 100vh;
				pointer-events: none;
				width: 100%;
				height: 100%;
				color: white;
			}
		</style>
	</head>

	<body>
		<canvas class='buffer back-buffer'></canvas>
		<canvas class='buffer front-buffer'></canvas>
		<div class='debug' style="z-index:1; position:relative"></div>

		<script src="./js/blitzjs.js"></script>
		<script>{{script}}</script>
	</body>

	</html>
`;
