"use strict";
class Edit2 {
    init() {
        let editArea = document.querySelector('textarea.edit-area');
        myCodeMirror = CodeMirror.fromTextArea(editArea, {
            lineNumbers: false,
            styleActiveLine: true,
            matchBrackets: true,
            theme: 'ambiance'
        });
        myCodeMirror.on("change", () => {
        });
    }
}
window.onload = () => {
};
