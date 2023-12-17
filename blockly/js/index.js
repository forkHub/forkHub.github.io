"use strict";
var ha;
(function (ha) {
    var blockly;
    (function (blockly) {
        class Dialog {
            static dlg;
            static show(msg) {
                this.dlg = document.body.querySelector("dialog.alert");
                this.dlg.querySelector('P').innerHTML = msg;
                this.dlg.showModal();
            }
            static klik() {
                this.dlg.close();
            }
        }
        blockly.Dialog = Dialog;
    })(blockly = ha.blockly || (ha.blockly = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var blockly;
    (function (blockly) {
        class DialogPublish {
            static dlg = document.querySelector('dialog');
            static onClick = () => { };
            static open(p, cont) {
                this.dlg.querySelector('p').innerHTML = p;
                this.dlg.querySelector('textarea').value = cont;
                this.dlg.showModal();
            }
            static batal() {
                this.dlg.close();
            }
            static klik() {
                this.dlg.close();
                this.onClick();
            }
        }
        blockly.DialogPublish = DialogPublish;
    })(blockly = ha.blockly || (ha.blockly = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var blockly;
    (function (blockly) {
        let EEntity;
        (function (EEntity) {
            EEntity["PROJECT"] = "project";
            EEntity["FILE"] = "file";
        })(EEntity = blockly.EEntity || (blockly.EEntity = {}));
        class Entity {
            static dbName = 'ha.blockly.data2';
            static list = [];
            static init() {
                try {
                    let str;
                    let obj;
                    while (this.list.length > 0) {
                        this.list.pop();
                    }
                    str = window.localStorage.getItem(this.dbName);
                    obj = JSON.parse(str);
                    obj.forEach((item) => {
                        this.list.push(item);
                    });
                }
                catch (e) {
                    console.log('load error');
                    console.warn(e);
                }
            }
            static getByType(ty) {
                let hasil = [];
                this.list.forEach((item) => {
                    if (item.type == ty) {
                        hasil.push(item);
                    }
                });
                return hasil;
            }
            static getById(id) {
                let hasil;
                this.list.forEach((item) => {
                    if (item.id == id) {
                        hasil = item;
                    }
                });
                return hasil;
            }
            static getByParentId(pId) {
                let hasil;
                this.list.forEach((item) => {
                    if (item.parentId == pId) {
                        hasil = item;
                    }
                });
                return hasil;
            }
            static update(id, data) {
                this.delete(id);
                this.tambah(data);
            }
            static delete(id) {
                console.group('delete by id ' + id);
                for (let i = 0; i < this.list.length; i++) {
                    if (this.list[i].id == id) {
                        console.log('deleted ' + id);
                        this.list.splice(i, 1);
                        break;
                    }
                }
                console.groupEnd();
            }
            static tambah(data) {
                this.list.push(data);
            }
            static commit() {
                try {
                    window.localStorage.setItem(this.dbName, JSON.stringify(this.list));
                }
                catch (e) {
                    console.error(e);
                }
            }
        }
        blockly.Entity = Entity;
        class Project {
            getById(id) {
                return Entity.getById(id);
            }
            delete(id) {
                Entity.delete(id);
            }
            update(data) {
                Entity.update(data.id, data);
            }
            tambah(data) {
                Entity.tambah(data);
            }
        }
        blockly.Project = Project;
        class File {
            getById(id) {
                id;
                return null;
            }
            delete(id) {
                id;
            }
            update(data) {
                data;
            }
            tambah(data) {
                data;
            }
        }
        blockly.File = File;
    })(blockly = ha.blockly || (ha.blockly = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var blockly;
    (function (blockly) {
        class HalImport {
            static import() {
                try {
                    let value = document.querySelector('textarea').value;
                    let code = JSON.parse(value);
                    console.log(code);
                    Blockly.serialization.workspaces.load(code, blockly.Index.workspace);
                }
                catch (e) {
                    console.error(e);
                }
            }
        }
        blockly.HalImport = HalImport;
    })(blockly = ha.blockly || (ha.blockly = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var blockly;
    (function (blockly) {
        class HalListProject {
            static cont;
            static listCont;
            static selectedId = '';
            // private static project: IProject;
            static openKlik() {
                if (this.selectedId == '') {
                    //no selected
                    console.log('no selected');
                    blockly.Dialog.show("no item selected");
                    return;
                }
                if (blockly.Store.projectId == this.selectedId) {
                    //already opened
                    console.log('already open');
                    blockly.Dialog.show("You are currently editing this project");
                    return;
                }
                let f = blockly.Entity.getByParentId(this.selectedId);
                let code = JSON.parse(f.wspace);
                let project = blockly.Entity.getById(this.selectedId);
                blockly.Store.idFile = f.id;
                blockly.Store.projectId = project.id;
                Blockly.serialization.workspaces.load(code, blockly.Index.workspace);
                this.closeKlik();
                blockly.Index.updateName();
            }
            static deleteKlik() {
                console.group('delete klik');
                if (this.selectedId == '') {
                    //TODO: dialog
                    console.log('no item selected');
                    console.groupEnd();
                    blockly.Dialog.show("no item selected");
                    return;
                }
                if (this.selectedId == blockly.Store.projectId) {
                    //already opened
                    console.log("already opened");
                    console.groupEnd();
                    blockly.Dialog.show("You are currently editing this project");
                    return;
                }
                let confirm = window.confirm("are you sure you ?");
                if (confirm) {
                    console.log('delete by id ' + this.selectedId);
                    blockly.Entity.delete(this.selectedId);
                    blockly.Entity.commit();
                    console.log("get view to delete");
                    this.listCont.querySelectorAll('.project').forEach((item) => {
                        if (item.getAttribute('data-id') == this.selectedId) {
                            item.parentElement.removeChild(item);
                            console.log("ok");
                        }
                    });
                    this.selectedId = '';
                }
                else {
                    console.log('cancel');
                }
                console.groupEnd();
                this.closeKlik();
            }
            static closeKlik() {
                this.cont.close();
                this.selectedId = '';
                // this.project = null;
            }
            static show(p) {
                this.cont.showModal();
                this.render(p);
            }
            static renameKlik() {
                if (this.selectedId == '') {
                    blockly.Dialog.show("no item selected");
                    return;
                }
                let w = window.prompt("renae", blockly.Entity.getById(this.selectedId).nama);
                if (w) {
                    blockly.Entity.getById(this.selectedId).nama = w;
                    this.updateItemView(this.listCont.querySelector(`div[data-id='${this.selectedId}']`), blockly.Entity.getById(this.selectedId));
                    blockly.Entity.commit();
                }
                else {
                    blockly.Dialog.show("invalid name");
                }
            }
            static init() {
                this.cont = document.createElement('dialog');
                this.cont.innerHTML = `
                <div style="display:flex; flex-direction:column">
                    <h4>Project List:</h4>
                    <div class='list-cont' style="flex-grow-1">
                    </div>
                    <div>
                        <button onclick="ha.blockly.HalListProject.openKlik()">open</button>
                        <button onclick="ha.blockly.HalListProject.renameKlik()">rename</button>
                        <button onclick="ha.blockly.HalListProject.deleteKlik()">delete</button>
                        <button onclick="ha.blockly.HalListProject.closeKlik()">close</button>
                    </div>
                </div>
            `;
                this.listCont = this.cont.querySelector("div.list-cont");
                document.body.append(this.cont);
            }
            static buatItemViewIsi(item, cont) {
                cont.innerHTML = `
                <span>${item.nama}</span>
            `;
            }
            static updateItemView(el, item) {
                el.innerHTML = '';
                this.buatItemViewIsi(item, el);
            }
            static buatItemView(item) {
                let hasil;
                hasil = document.createElement('div');
                hasil.classList.add('project');
                hasil.setAttribute('data-id', item.id);
                hasil.onclick = () => {
                    this.selectedId = item.id;
                    this.listCont.querySelectorAll(".project").forEach((item2) => {
                        item2.classList.remove('selected');
                    });
                    hasil.classList.add('selected');
                };
                this.buatItemViewIsi(item, hasil);
                return hasil;
            }
            static render(list) {
                list = list.sort((item, item2) => {
                    if (item.nama < item2.nama)
                        return -1;
                    if (item.nama > item2.nama)
                        return 1;
                    return 0;
                });
                this.listCont.innerHTML = '';
                this.renderList(list);
            }
            static renderList(list) {
                list.forEach((item) => {
                    this.listCont.appendChild(this.buatItemView(item));
                });
            }
        }
        blockly.HalListProject = HalListProject;
    })(blockly = ha.blockly || (ha.blockly = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var blockly;
    (function (blockly) {
        class Id {
            static _id = Date.now();
            static get id() {
                this._id++;
                return this._id + '';
            }
        }
        blockly.Id = Id;
    })(blockly = ha.blockly || (ha.blockly = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var blockly;
    (function (blockly) {
        class ObjectParser {
            static parse(obj, depth = 0) {
                depth++;
                console.log('parse obj, d ' + depth);
                if (depth > 2)
                    return;
                for (let i in obj) {
                    console.log(i + '/' + typeof (i));
                    let j = i;
                    if (obj[j] instanceof Object) {
                        ObjectParser.parse(obj[j], depth);
                    }
                }
            }
        }
        blockly.ObjectParser = ObjectParser;
    })(blockly = ha.blockly || (ha.blockly = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var blockly;
    (function (blockly) {
        class Op {
            static op() {
                //TODO: depecrated
                let w = window;
                w.simpan = () => {
                    Op.simpan();
                    // if (Store.namaProject == "") {
                    // }
                    // else {
                    //     let simpan = Blockly.serialization.workspaces.save(Index.workspace);
                    // }
                    // let simpan = Blockly.serialization.workspaces.save(Index.workspace);
                    // let code = javascript.javascriptGenerator.workspaceToCode(Index.workspace);
                    // window.localStorage.setItem("blocklytest", JSON.stringify(simpan));
                    // window.localStorage.setItem("blocklycode", code);
                    // console.log(simpan);
                };
                w.load = () => {
                    Op.load();
                    // let simpan = window.localStorage.getItem("blocklytest");
                    // let code = JSON.parse(simpan);
                    // console.log(code);
                    // Blockly.serialization.workspaces.load(code, Index.workspace);
                };
                w.code = () => {
                    let code = javascript.javascriptGenerator.workspaceToCode(blockly.Index.workspace);
                    console.log(code);
                };
                w.tambahVar = () => {
                    let var1 = prompt('variable baru');
                    let simpan = Blockly.serialization.workspaces.save(blockly.Index.workspace);
                    if (!simpan.variables) {
                        simpan.variables = [];
                    }
                    simpan.variables.push({
                        id: 'random_id' + Math.floor(Math.random() * 1000),
                        name: var1
                    });
                    Blockly.serialization.workspaces.load(simpan, blockly.Index.workspace);
                };
                w.run = () => {
                    let codeHtml = ha.blockly.Export.export(javascript.javascriptGenerator.workspaceToCode(blockly.Index.workspace));
                    // w.simpan();
                    window.localStorage.setItem("blocklycode", codeHtml);
                    window.open('./play.html', "_blank");
                    // window.location.href = "./play.html";
                };
                w.publish = () => {
                    Op.publish();
                };
                w.exportJSON = () => {
                    Op.export();
                };
                w.importJSON = () => {
                    Op.import();
                };
            }
            static load() {
                let list = blockly.Entity.getByType(blockly.EEntity.PROJECT);
                // let p: IProject = list[0] as IProject;
                // let f: IFile = Entity.getByParentId(p.id) as IFile;
                //develop ui
                blockly.HalListProject.show(list);
                // let code = JSON.parse(f.wspace);
                // console.log(code);
                // Blockly.serialization.workspaces.load(code, Index.workspace);
                // Store.idFile = f.id;
                // Store.namaProject = p.nama;
                // console.log(list);
            }
            static publish() {
                let codeHtml = ha.blockly.Export.export(javascript.javascriptGenerator.workspaceToCode(blockly.Index.workspace));
                blockly.DialogPublish.open(`
                    <h1>Publish</h1>
                    <p>
                        Copy content of textarea below, and save it to a file with .html extension.
                        You can run the file directly without setting up a web-server
                    </p>
            `, (codeHtml));
                // window.localStorage.setItem("blocklycode", codeHtml);
                // window.open('./publish.html', "_blank");
            }
            static export() {
                let simpan = Blockly.serialization.workspaces.save(blockly.Index.workspace);
                blockly.DialogPublish.open(`
                    <h1>Export to JSON</h1>
                    <p>
                        Copy content of textarea below. You can save to file or import later.
                    </p>
            `, JSON.stringify(simpan));
                // window.localStorage.setItem("blocklyExport", JSON.stringify(simpan));
                // window.open('./export.html', "_blank");
            }
            static import() {
                blockly.DialogPublish.onClick = () => {
                    try {
                        let value = document.querySelector('textarea').value;
                        let code = JSON.parse(value);
                        Blockly.serialization.workspaces.load(code, blockly.Index.workspace);
                    }
                    catch (e) {
                        console.error(e);
                    }
                };
                blockly.DialogPublish.open(`
                    <h1>Import from JSON</h1>
                    <p>
                        Fill the text area below with content you have exported before.
                    </p>
            `, "");
            }
            static resize() {
                const onresize = function () {
                    // Compute the absolute coordinates and dimensions of blocklyArea.
                    let element = blockly.Index.blocklyArea;
                    let x = 0;
                    let y = 0;
                    do {
                        x += element.offsetLeft;
                        y += element.offsetTop;
                        element = element.offsetParent;
                    } while (element);
                    // Position blocklyDiv over blocklyArea.
                    blockly.Index.blocklyDiv.style.left = x + 'px';
                    blockly.Index.blocklyDiv.style.top = y + 'px';
                    blockly.Index.blocklyDiv.style.width = blockly.Index.blocklyArea.offsetWidth + 'px';
                    blockly.Index.blocklyDiv.style.height = blockly.Index.blocklyArea.offsetHeight + 'px';
                    Blockly.svgResize(blockly.Index.workspace);
                };
                window.onresize = () => {
                    setTimeout(() => {
                        onresize();
                    }, 100);
                };
                setTimeout(() => {
                    onresize();
                }, 100);
            }
            static simpanBaru() {
                let id = blockly.Id.id;
                let nama = window.prompt("project name", "def1");
                //TOOD: validasi nama
                //save new project
                let p = {
                    id: id,
                    type: blockly.EEntity.PROJECT,
                    nama: nama,
                    parentId: "-1"
                };
                blockly.Entity.tambah(p);
                let f = {
                    id: blockly.Id.id,
                    type: blockly.EEntity.FILE,
                    nama: blockly.Store.idFile,
                    parentId: p.id,
                    wspace: JSON.stringify(Blockly.serialization.workspaces.save(blockly.Index.workspace))
                };
                //TODO: save file yang lain
                blockly.Store.idFile = f.id;
                blockly.Store.projectId = p.id;
                blockly.Entity.tambah(f);
                blockly.Entity.commit();
                blockly.Index.updateName();
            }
            static simpan() {
                // let id: string = Id.id;
                if (blockly.Store.projectId == "") {
                    this.simpanBaru();
                }
                else {
                    let file = blockly.Entity.getById(blockly.Store.idFile);
                    file.wspace = JSON.stringify(Blockly.serialization.workspaces.save(blockly.Index.workspace));
                    blockly.Entity.commit();
                }
                blockly.Index.updateName();
            }
        }
        blockly.Op = Op;
    })(blockly = ha.blockly || (ha.blockly = {}));
})(ha || (ha = {}));
// function openFile(id: string): void {
//     id;
// }
// function deleteFile(id: string): void {
//     console.group('delete by id: ' + id);
//     ha.blockly.Data.hapus(id);
//     window.location.reload();
// }
var ha;
(function (ha) {
    var blockly;
    (function (blockly) {
        class Store {
            // private static _namaProject: string = '';
            static _idFile = '';
            static _projectId = '';
            static _defWSpace = '';
            static get defWSpace() {
                return Store._defWSpace;
            }
            static set defWSpace(value) {
                Store._defWSpace = value;
            }
            static get projectId() {
                return Store._projectId;
            }
            static set projectId(value) {
                Store._projectId = value;
            }
            static get idFile() {
                return Store._idFile;
            }
            static set idFile(value) {
                Store._idFile = value;
            }
        }
        blockly.Store = Store;
        Store.defWSpace = "{\"blocks\":{\"languageVersion\":0,\"blocks\":[{\"type\":\"procedures_defnoreturn\",\"id\":\"@iZs`-A.)`GZTz%?Wh_j\",\"x\":607,\"y\":136,\"icons\":{\"comment\":{\"text\":\"Describe this function...\",\"pinned\":false,\"height\":80,\"width\":160}},\"fields\":{\"NAME\":\"update\"},\"inputs\":{\"STACK\":{\"block\":{\"type\":\"ha.be.Be.Bersih\",\"id\":\"(7d4VY9ISHI3=xQXw=c0\",\"next\":{\"block\":{\"type\":\"ha.be.Spr.Gambar\",\"id\":\"TKi]Pbe|YLS%b}yYe+1L\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\"Oxp^k?rAe(XG%z7DGmrI\",\"fields\":{\"VAR\":{\"id\":\"99*3xs_.J9FLSB`sp](v\"}}}},\"x\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"iR^9X(~I02#.l.kt.[;:\",\"fields\":{\"NUM\":120}}},\"y\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"Sn*[t/Kt[]3J~cg5t9-K\",\"fields\":{\"NUM\":100}}}}}}}}}},{\"type\":\"ha.be.Be.Grafis\",\"id\":\"HaDx$m%9L0)lj6v$4@k*\",\"x\":187,\"y\":160,\"inputs\":{\"width\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"1Yjl.$%bS/5z=@5Qd]V~\",\"fields\":{\"NUM\":320}}},\"height\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"?(lT9dOGdzVnQ.vcHAEI\",\"fields\":{\"NUM\":240}}}},\"next\":{\"block\":{\"type\":\"ha.be.Be.Bersih\",\"id\":\"P=3%M?Ud(^qXZB;*oeeA\",\"next\":{\"block\":{\"type\":\"variables_set\",\"id\":\"?BBuRH-xfVFsVL#ivCx)\",\"fields\":{\"VAR\":{\"id\":\"99*3xs_.J9FLSB`sp](v\"}},\"inputs\":{\"VALUE\":{\"block\":{\"type\":\"ha.be.Spr.Muat\",\"id\":\"-Wwr3nwkx~$;z$;b1tzu\",\"inputs\":{\"url\":{\"shadow\":{\"type\":\"text\",\"id\":\"tjz/~)*VQIRK@:47=aoI\",\"fields\":{\"TEXT\":\"./imgs/box.png\"}}}}}}}}}}}}]},\"variables\":[{\"name\":\"image\",\"id\":\"99*3xs_.J9FLSB`sp](v\"}]}";
    })(blockly = ha.blockly || (ha.blockly = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var blockly;
    (function (blockly) {
        class WorkSpace {
        }
        blockly.WorkSpace = WorkSpace;
    })(blockly = ha.blockly || (ha.blockly = {}));
})(ha || (ha = {}));
var EOutput;
(function (EOutput) {
    EOutput["Boolean"] = "Boolean";
    EOutput["Number"] = "Number";
    EOutput["String"] = "String";
    EOutput["Array"] = "Array";
    EOutput["Dummy"] = "dummy";
    EOutput["Any"] = "";
})(EOutput || (EOutput = {}));
var EArgType;
(function (EArgType) {
    EArgType["inputValue"] = "input_value";
    EArgType["inputDummy"] = "input_dummy";
})(EArgType || (EArgType = {}));
var ToolBoxKind;
(function (ToolBoxKind) {
    ToolBoxKind["categoryToolbox"] = "categoryToolbox";
    ToolBoxKind["category"] = "category";
    ToolBoxKind["block"] = "block";
})(ToolBoxKind || (ToolBoxKind = {}));
///<reference path="./toolboxType.ts"/>
/**
 * blitz toolbox definition
 */
var ha;
(function (ha) {
    var blockly;
    (function (blockly) {
        var BDef;
        (function (BDef) {
            /**
             * add default value
             * @param t
             */
            function defValue(t) {
                // console.group("defValue");
                // console.log(t);
                if (t.output != undefined) {
                }
                else {
                    t.previousStatement = null;
                    t.nextStatement = null;
                }
                if (!Object.hasOwn(t, "inputsInline")) {
                    t.inputsInline = false;
                }
                if (t.kurung == undefined) {
                    t.kurung = true;
                }
                t.colour = 230;
                t.tooltip = t.tooltip || "";
                t.helpUrl = t.helpUrl || "";
                // console.log(t)
                // console.groupEnd();
            }
            /**
             * create shadow based on input
             * @param t
             * @returns
             */
            function createShadow(t) {
                console.group('create shadow');
                console.log(t.check);
                console.groupEnd();
                if (EOutput.String == t.check) {
                    return {
                        shadow: {
                            "type": "text",
                            "fields": {
                                "TEXT": t.default
                            }
                        }
                    };
                }
                else if (EOutput.Number == t.check) {
                    return {
                        shadow: {
                            "type": "math_number",
                            "fields": {
                                "NUM": t.default
                            }
                        }
                    };
                }
                else if (EOutput.Boolean == t.check) {
                    return {
                        shadow: {
                            "type": "logic_boolean",
                            "fields": {
                                "BOOL": t.default
                            }
                        }
                    };
                }
                else if (EOutput.Dummy == t.check) {
                    return null;
                }
                else if (t.check == undefined) {
                    return null;
                }
                throw Error('not supported: ' + t.check);
            }
            function addArg(t) {
                console.group('add arg ');
                console.log(t);
                function getCheck(n) {
                    if (typeof n == "number")
                        return EOutput.Number;
                    if (typeof n == "string")
                        return EOutput.String;
                    if (typeof n == "boolean")
                        return EOutput.Boolean;
                    if (typeof n == "object")
                        return EOutput.Any;
                    //TODO: null
                    throw Error(n);
                }
                t.args0 = [];
                for (let i in t.args) {
                    if ("dummy" == i.toLocaleLowerCase()) {
                        t.args0.push({
                            type: EArgType.inputDummy
                        });
                    }
                    else if ("any" == i.toLocaleLowerCase()) {
                        //TODO:
                    }
                    else {
                        let check = getCheck(t.args[i]);
                        console.log("check:", check);
                        if (EOutput.Any == check) {
                            console.log("any");
                            t.args0.push({
                                type: EArgType.inputValue,
                                name: i + ''
                            });
                        }
                        else {
                            console.log("skalar");
                            t.args0.push({
                                check: check,
                                type: EArgType.inputValue,
                                default: t.args[i] + '',
                                name: i + ''
                            });
                        }
                    }
                }
                console.groupEnd();
            }
            /**
             * add default input
             * @param t
             * @returns
             */
            function addInput(t) {
                if (t.inputs)
                    return;
                let inputs = {};
                t.args0.forEach((item) => {
                    if (item.type == EArgType.inputDummy) {
                    }
                    else {
                        let shadow = createShadow(item);
                        if (shadow != null) {
                            inputs[item.name] = shadow;
                        }
                    }
                });
                t.inputs = inputs;
            }
            function normal(t) {
                defValue(t);
                addArg(t);
                addInput(t);
            }
            /**
             * normalize all block
             */
            function normalizeAllBlock() {
                blockly.BlitzData.list.forEach((item) => { normal(item); });
                blockly.ImageBlockData.list.forEach((item) => { normal(item); });
                blockly.ImageBlockData2.list.forEach((item) => { normal(item); });
                blockly.debugData.list.forEach((item) => { normal(item); });
                blockly.InputBlockData.list.forEach((item) => { normal(item); });
                blockly.TextData.list.forEach((item) => { normal(item); });
            }
            BDef.normalizeAllBlock = normalizeAllBlock;
        })(BDef = blockly.BDef || (blockly.BDef = {}));
    })(blockly = ha.blockly || (ha.blockly = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var blockly;
    (function (blockly) {
        class Export {
            static data = `
            <!DOCTYPE html>
            <html>

            <head>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0,
                    target-densityDpi=device-dpi">
                <title>Blitz Blockly</title>
            </head>

            <body>
                <canvas></canvas>
                <!-- script ref  -->
                <script src="./js/be.js" defer></script>

                <!-- main  -->
                <script>
                    "use strict";
                    window.onload = () => {
                        console.log('start');
                        /** script here **/
                        let __update; // = update || Update || UPDATE as any;
                        if (typeof update === "function")
                            __update = update;
                        if (typeof Update === "function")
                            __update = Update;
                        if (typeof UPDATE === "function")
                            __update = UPDATE;
                        console.log(__update);
                        let __updater = () => {
                            if (__update) {
                                __update();
                            }
                            requestAnimationFrame(__updater);
                        };
                        requestAnimationFrame(__updater);
                    };
                </script>
            </body>

            </html>
        `;
            static export(code) {
                console.group("export:");
                console.log(code);
                console.groupEnd();
                // console.log('code', code);
                // let win = window.open('about:blank', '_blank');
                let data2 = this.data.replace('/** script here **/', code);
                return data2;
                // let iframe = document.body.querySelector('iframe') as HTMLIFrameElement;
                // let doc = iframe.contentWindow.document;
                // doc.open();
                // doc.write(data2);
                // doc.close();
                // console.log('data2', data2);
                // setTimeout(() => {
                //     win.document.open();
                //     win.document.write(data2);
                //     win.document.close();
                //     console.log('writing');
                // }, 100);
                // let link = (document.body.querySelector('a.run') as HTMLLinkElement);
                // link.href = './play.html?code=' +
                //     encodeURIComponent(data2);
                // window.open('data:text/html;charset=utf-8,' +
                //     encodeURIComponent(data2)
                // );
            }
        }
        blockly.Export = Export;
    })(blockly = ha.blockly || (ha.blockly = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var blockly;
    (function (blockly) {
        class HalExport {
            static init() {
                let simpan = window.localStorage.getItem("blocklyExport");
                let textArea = document.querySelector('textarea');
                textArea.value = simpan;
            }
            static modal() {
                let simpan = window.localStorage.getItem("blocklyExport");
                let textArea = document.querySelector('textarea');
                textArea.value = simpan;
            }
        }
        blockly.HalExport = HalExport;
    })(blockly = ha.blockly || (ha.blockly = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var blockly;
    (function (blockly) {
        class HalPublish {
            static init() {
                let simpan = window.localStorage.getItem("blocklycode");
                let textArea = document.querySelector('textarea');
                textArea.value = simpan;
            }
        }
        blockly.HalPublish = HalPublish;
    })(blockly = ha.blockly || (ha.blockly = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var blockly;
    (function (blockly) {
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
        blockly.Iframe = Iframe;
    })(blockly = ha.blockly || (ha.blockly = {}));
})(ha || (ha = {}));
///<reference path="./toolboxType.ts"/>
var ha;
(function (ha) {
    var blockly;
    (function (blockly) {
        var toolbox;
        (function (toolbox_1) {
            // export function ToolBoxCreateJSDef(t: TBlockDef) {
            //     console.log("test: " + t.type);
            //     javascript.javascriptGenerator.forBlock[t.type] = function (block: any, generator: any) {
            //         let code = '';
            //         code = t.type + '('
            //         t.args0.forEach((item, idx) => {
            //             console.log('item type: ', item.type);
            //             if (item.type == EArgType.inputDummy) {
            //             }
            //             else {
            //                 let value = generator.valueToCode(block, item.name, javascript.Order.ATOMIC);
            //                 console.log('value to code >>', "item name:", item.name, "value", value);
            //                 code += value;
            //                 if (idx < t.args0.length - 1) {
            //                     code += ','
            //                 }
            //             }
            //         });
            //         code += ');\n';
            //         console.log("code", code);
            //         return code;
            //     };
            // }
            function init() {
                blockly.BDef.normalizeAllBlock();
                let allToolBoxDef = populateToolBox();
                Blockly.common.defineBlocksWithJsonArray(allToolBoxDef);
                toolbox_1.toolbox.contents.push(getCategory("Blitz", blockly.BlitzData.list)); //registerBlitz());
                toolbox_1.toolbox.contents.push(getCategory("Image v1", blockly.ImageBlockData.list));
                toolbox_1.toolbox.contents.push(getCategory("Image v2", blockly.ImageBlockData2.list));
                toolbox_1.toolbox.contents.push(getCategory(blockly.debugData.group, blockly.debugData.list));
                toolbox_1.toolbox.contents.push(getCategory(blockly.InputBlockData.group, blockly.InputBlockData.list));
                toolbox_1.toolbox.contents.push(getCategory(blockly.TextData.group, blockly.TextData.list));
                js(allToolBoxDef);
            }
            toolbox_1.init = init;
            function getCategory(nama, l) {
                let h = {
                    kind: "category",
                    name: nama,
                    contents: getToolBoxContentDef(l)
                };
                return h;
            }
            /*
            function registerImage(): TToolbokContentDef {
                let h: TToolbokContentDef = {
                    kind: "category",
                    name: "Image",
                    contents: getToolBoxContentDef(ImageBlockData.list)
                }
        
                // //register blitz content
                // ImageBlockData.list.forEach((item) => {
                //     let def: TToolbokContentDef = {
                //         name: item.type,
                //         kind: ToolBoxKind.block,
                //         type: item.type
                //     }
                //     if (item.inputs) {
                //         def.inputs = item.inputs
                //     }
        
                //     h.contents.push(def);
                // })
        
                return h;
            }
            */
            function getToolBoxContentDef(l) {
                //register blitz content 
                let h = [];
                l.forEach((item) => {
                    let def = {
                        name: item.type,
                        kind: ToolBoxKind.block,
                        type: item.type
                    };
                    if (item.inputs) {
                        def.inputs = item.inputs;
                    }
                    h.push(def);
                });
                return h;
            }
            /*
            function registerBlitz(): TToolbokContentDef {
                let blitz: TToolbokContentDef =
                {
                    kind: "category",
                    name: "Blitz",
                    contents: []
                }
        
                //register blitz content
                BlitzData.list.forEach((item) => {
                    let def: TToolbokContentDef = {
                        name: item.type,
                        kind: ToolBoxKind.block,
                        type: item.type
                    }
                    if (item.inputs) {
                        def.inputs = item.inputs
                    }
        
                    blitz.contents.push(def);
                })
        
        
                return blitz;
            }
            */
            function populateToolBox() {
                let blockData = [];
                blockly.BlitzData.list.forEach((item) => {
                    blockData.push(item);
                });
                blockly.ImageBlockData.list.forEach((item) => {
                    blockData.push(item);
                });
                blockly.ImageBlockData2.list.forEach((item) => {
                    blockData.push(item);
                });
                blockly.debugData.list.forEach((item) => {
                    blockData.push(item);
                });
                blockly.InputBlockData.list.forEach((item) => {
                    blockData.push(item);
                });
                blockly.TextData.list.forEach((item) => {
                    blockData.push(item);
                });
                return blockData;
            }
            function js(blockData) {
                for (let i = 0; i < blockData.length; i++) {
                    let itemBlockData = blockData[i];
                    console.log('type: ' + itemBlockData.type);
                    javascript.javascriptGenerator.forBlock[itemBlockData.type] = (block, generator) => {
                        let code = '';
                        console.group("");
                        code += itemBlockData.perintah.split('_')[0];
                        if (itemBlockData.kurung) {
                            code += '(';
                        }
                        itemBlockData.args0.forEach((item, idx) => {
                            if (item.type == EArgType.inputDummy) {
                            }
                            else {
                                let value = generator.valueToCode(block, item.name, javascript.Order.ATOMIC);
                                code += value;
                                if (idx < itemBlockData.args0.length - 1) {
                                    code += ',';
                                }
                            }
                        });
                        if (itemBlockData.kurung) {
                            code += ')';
                        }
                        console.log("code", code);
                        console.groupEnd();
                        if (itemBlockData.output != null) {
                            return [code, Blockly.JavaScript.ORDER_NONE];
                        }
                        else {
                            return code + ';\n';
                        }
                    };
                }
            }
            // let blockData: TBlockDef[] = [];
            //default toolbox
            toolbox_1.toolbox = {
                kind: ToolBoxKind.categoryToolbox,
                contents: [
                    {
                        kind: ToolBoxKind.category,
                        name: "Logic",
                        contents: [
                            {
                                kind: "block",
                                type: "controls_if"
                            },
                            {
                                kind: "block",
                                type: "logic_compare"
                            },
                            {
                                kind: "block",
                                type: "logic_operation"
                            },
                            {
                                kind: "block",
                                type: "logic_negate"
                            },
                            {
                                kind: "block",
                                type: "logic_boolean"
                            },
                            {
                                kind: "block",
                                type: "logic_null"
                            },
                            {
                                kind: "block",
                                type: "logic_ternary"
                            }
                        ]
                    },
                    {
                        kind: "category",
                        name: "Loops",
                        contents: [
                            {
                                kind: "block",
                                type: "controls_repeat_ext"
                            },
                            {
                                kind: "block",
                                type: "controls_whileUntil"
                            }, {
                                kind: "block",
                                type: "controls_for"
                            }, {
                                kind: "block",
                                type: "controls_forEach"
                            }, {
                                kind: "block",
                                type: "controls_flow_statements"
                            },
                        ]
                    },
                    {
                        kind: "category",
                        name: "Math",
                        contents: [
                            {
                                kind: "block",
                                type: "math_number"
                            },
                            {
                                kind: "block",
                                type: "math_arithmetic",
                            },
                            {
                                kind: "block",
                                type: "math_single"
                            },
                            {
                                kind: "block",
                                type: "math_trig"
                            },
                            {
                                kind: "block",
                                type: "math_constant"
                            },
                            {
                                kind: "block",
                                type: "math_number_property"
                            },
                            {
                                kind: "block",
                                type: "math_round"
                            },
                            {
                                kind: "block",
                                type: "math_on_list"
                            },
                            {
                                kind: "block",
                                type: "math_modulo"
                            },
                            {
                                kind: "block",
                                type: "math_constrain"
                            },
                            {
                                kind: "block",
                                type: "math_random_int"
                            },
                            {
                                kind: "block",
                                type: "math_random_float"
                            },
                        ]
                    },
                    {
                        kind: "category",
                        name: "Text",
                        contents: [
                            {
                                kind: "block",
                                type: "text"
                            },
                            {
                                kind: "block",
                                type: "text_join"
                            },
                            {
                                kind: "block",
                                type: "text_append"
                            },
                            {
                                kind: "block",
                                type: "text_length"
                            },
                            {
                                kind: "block",
                                type: "text_isEmpty"
                            },
                            {
                                kind: "block",
                                type: "text_indexOf"
                            },
                            {
                                kind: "block",
                                type: "text_charAt"
                            },
                            {
                                kind: "block",
                                type: "text_getSubstring"
                            },
                            {
                                kind: "block",
                                type: "text_changeCase"
                            },
                            {
                                kind: "block",
                                type: "text_trim"
                            },
                            {
                                kind: "block",
                                type: "text_print"
                            },
                            {
                                kind: "block",
                                type: "text_prompt_ext"
                            },
                        ]
                    },
                    {
                        kind: "category",
                        name: "Lists",
                        contents: [
                            {
                                kind: "block",
                                type: "lists_create_with"
                            },
                            {
                                kind: "block",
                                type: "lists_repeat"
                            },
                            {
                                kind: "block",
                                type: "lists_length"
                            },
                            {
                                kind: "block",
                                type: "lists_isEmpty"
                            },
                            {
                                kind: "block",
                                type: "lists_indexOf"
                            },
                            {
                                kind: "block",
                                type: "lists_getIndex"
                            },
                            {
                                kind: "block",
                                type: "lists_setIndex"
                            },
                            {
                                kind: "block",
                                type: "lists_getSublist"
                            },
                            {
                                kind: "block",
                                type: "lists_split"
                            },
                            {
                                kind: "block",
                                type: "lists_sort"
                            },
                        ]
                    },
                    {
                        kind: "category",
                        name: "Variables",
                        custom: "VARIABLE",
                    },
                    {
                        kind: "category",
                        name: "Functions",
                        custom: "PROCEDURE"
                    }
                ]
            };
        })(toolbox = blockly.toolbox || (blockly.toolbox = {}));
    })(blockly = ha.blockly || (ha.blockly = {}));
})(ha || (ha = {}));
///<reference path="./toobox.ts"/>
var ha;
(function (ha) {
    var blockly;
    (function (blockly) {
        class Index {
            static workspace;
            static blocklyArea;
            static blocklyDiv;
            static updateName() {
                let spanNama = document.body.querySelector("span.judul_file");
                if (blockly.Store.projectId) {
                    spanNama.innerHTML = blockly.Entity.getById(blockly.Store.projectId).nama;
                }
                else {
                    spanNama.innerHTML = "untitled";
                }
            }
            static initWorkSpace() {
                Blockly.Msg["VARIABLES_SET"] = "%1 = %2";
                Blockly.Msg["MATH_CHANGE_TITLE"] = "%1 += %2";
                var options = {
                    toolbox: ha.blockly.toolbox.toolbox,
                    collapse: true,
                    comments: true,
                    disable: true,
                    maxBlocks: Infinity,
                    trashcan: true,
                    // horizontalLayout: true,
                    toolboxPosition: 'start',
                    css: true,
                    media: 'https://blockly-demo.appspot.com/static/media/',
                    rtl: false,
                    scrollbars: true,
                    sounds: true,
                    oneBasedIndex: true
                };
                Index.workspace = Blockly.inject("blocklyDiv", options);
                Index.blocklyArea = document.body.querySelector('#blocklyArea');
                Index.blocklyDiv = document.body.querySelector('#blocklyDiv');
            }
            static getQuery() {
                //TODO:
            }
            static init() {
                blockly.HalListProject.init();
                ha.blockly.Entity.init();
                ha.blockly.toolbox.init();
                Index.initWorkSpace();
                blockly.Op.resize();
                blockly.Op.op();
                try {
                    Blockly.serialization.workspaces.load(JSON.parse(blockly.Store.defWSpace), Index.workspace);
                }
                catch (e) {
                    console.error(e);
                }
                this.updateName();
            }
        }
        blockly.Index = Index;
    })(blockly = ha.blockly || (ha.blockly = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var blockly;
    (function (blockly) {
        var InputBlockData;
        (function (InputBlockData) {
            InputBlockData.list = [];
            InputBlockData.group = "Input";
            // ha.be.Input.InputHit;
            // InputHit
            InputBlockData.list.push({
                type: "ha.be.Input.InputHit",
                perintah: "InputHit",
                message0: "InputHit",
                tooltip: "return how many time an input is pressed since the last call",
                output: EOutput.Number
            });
            // ha.be.Input.InputX;
            InputBlockData.list.push({
                type: "ha.be.Input.InputX",
                perintah: "InputX",
                message0: "InputX",
                tooltip: "return the x position of input",
                output: EOutput.Number
            });
            // ha.be.Input.InputY
            InputBlockData.list.push({
                type: "ha.be.Input.InputY",
                perintah: "InputY",
                message0: "InputY",
                tooltip: "return the y position of input",
                output: EOutput.Number
            });
            //Input extended
            // ===========
            // ha.be.Input.Pencet
            InputBlockData.list.push({
                type: "ha.be.Input.Pencet",
                perintah: "InputIsDown",
                message0: "InputIsDown",
                tooltip: "return true if an input is pressed",
                output: EOutput.Boolean
            });
            // const GeserX = ha.be.Input.GeserX;
            InputBlockData.list.push({
                type: "ha.be.Input.GeserX",
                perintah: "DragX",
                message0: "InputDragX",
                tooltip: "return how much input is dragged in x axis",
                output: EOutput.Boolean
            });
            // const DragY = ha.be.Input.GeserY;
            InputBlockData.list.push({
                type: "ha.be.Input.GeserY",
                perintah: "DragY",
                message0: "DragY",
                tooltip: "return how much input is dragged in y axis",
                output: EOutput.Number
            });
            // const IsDragged = ha.be.Input.Geser;
            InputBlockData.list.push({
                type: "ha.be.Input.Geser",
                perintah: "InputIsDragged",
                message0: "InputIsDragged",
                tooltip: "return true if input is dragged",
                output: EOutput.Boolean
            });
            // const InputType = ha.be.Input.InputType;
            // const TapCount = ha.be.Input.JmlTap;
            // const DragStartCount = ha.be.Input.JmlDragMulai;
            // const DragEndCount = ha.be.Input.JmlDragSelesai;
            // const DragStartX = ha.be.Input.InputXAwal;
            // const DragStartY = ha.be.Input.InputYAwal;
        })(InputBlockData = blockly.InputBlockData || (blockly.InputBlockData = {}));
    })(blockly = ha.blockly || (ha.blockly = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var blockly;
    (function (blockly) {
        var TextData;
        (function (TextData) {
            TextData.list = [];
            TextData.group = "Text 2";
            // Shortcut buat perintah-perintah font
            // FontName
            TextData.list.push({
                type: "ha.be.Teks.Font",
                perintah: "FontName",
                message0: "Set Font Name to %1",
                args: {
                    name: "cursive"
                }
            });
            // ha.be.Teks.FontSize
            // FontSize 
            TextData.list.push({
                type: "ha.be.Teks.FontSize",
                perintah: "FontSize",
                message0: "Set Font Size to %1",
                args: {
                    size: 14
                }
            });
            // const Align = ha.be.Teks.Rata;
            TextData.list.push({
                type: "ha.be.Teks.Rata",
                perintah: "Align",
                message0: "Set Font Alignment to %1",
                args: {
                    align: "left"
                }
            });
            // ha.be.Teks.Goto;
            TextData.list.push({
                type: "ha.be.Teks.Goto",
                perintah: "ha.be.Teks.Goto",
                message0: "Set Text position to x %1 y %2",
                inputsInline: true,
                args: {
                    x: 0,
                    y: 0
                }
            });
            // ha.be.Teks.fill
            TextData.list.push({
                type: "ha.be.Teks.fill",
                perintah: "ha.be.Teks.fill",
                message0: "Use Font Color Fill is %1",
                args: {
                    fill: true
                }
            });
            // ha.be.Teks.stroke;
            TextData.list.push({
                type: "ha.be.Teks.stroke",
                perintah: "ha.be.Teks.stroke",
                message0: "Use Font Color stroke is %1",
                args: {
                    stroke: false
                }
            });
            // ha.be.Teks.jarak
            TextData.list.push({
                type: "ha.be.Teks.jarak",
                perintah: "ha.be.Teks.jarak",
                message0: "Set line-height to %1",
                args: {
                    height: 40
                }
            });
            // ha.be.Teks.Write;
            TextData.list.push({
                type: "ha.be.Teks.Write",
                perintah: "ha.be.Teks.Write",
                message0: "Write %1",
                args: {
                    text: ""
                }
            });
            // ha.be.Teks.WriteLn;
            TextData.list.push({
                type: "ha.be.Teks.WriteLn",
                perintah: "ha.be.Teks.WriteLn",
                message0: "WriteLn %1",
                args: {
                    text: ""
                },
                tooltip: "Write text and move position to next line"
            });
            // const Print = ha.be.Teks.Tulis;
            TextData.list.push({
                type: "ha.be.Teks.Tulis",
                perintah: "Print",
                message0: "Write %1 text %2 x: %3 y: %4 use fill: %5 use stroke: %6",
                args: {
                    dummy: "",
                    text: "",
                    x: 0,
                    y: 0,
                    fill: true,
                    stroke: false
                }
            });
        })(TextData = blockly.TextData || (blockly.TextData = {}));
    })(blockly = ha.blockly || (ha.blockly = {}));
})(ha || (ha = {}));
///<reference path="../toolboxType.ts"/>
var ha;
(function (ha) {
    var blockly;
    (function (blockly) {
        var BlitzData;
        (function (BlitzData) {
            BlitzData.list = [];
            // ha.be.Be.Grafis
            BlitzData.Grafis = {
                type: "ha.be.Be.Grafis",
                perintah: "ha.be.Be.Grafis",
                message0: "Graphics %1 width: %2 height: %3",
                inputsInline: true,
                args: {
                    dummy: '',
                    width: 320,
                    height: 240
                }
            };
            BlitzData.list.push(BlitzData.Grafis);
            // ha.be.Be.Bersih
            BlitzData.list.push({
                type: "ha.be.Be.Bersih",
                perintah: "ha.be.Be.Bersih",
                message0: 'Cls',
            });
        })(BlitzData = blockly.BlitzData || (blockly.BlitzData = {}));
    })(blockly = ha.blockly || (ha.blockly = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var blockly;
    (function (blockly) {
        var debugData;
        (function (debugData) {
            debugData.list = [];
            debugData.group = "Debug";
            debugData.list.push({
                type: "console.log",
                perintah: "console.log",
                message0: "Log %1",
                args: {
                    log: ""
                },
                tooltip: "console log",
            });
            debugData.list.push({
                type: "debugger",
                perintah: "debugger",
                message0: "Pause",
                tooltip: "pause a program when developer tool is open",
                kurung: false
            });
            debugData.list.push({
                type: "note",
                perintah: "//",
                kurung: false,
                message0: "📝 %1",
                args: {
                    comment: ""
                },
                tooltip: "Note",
            });
        })(debugData = blockly.debugData || (blockly.debugData = {}));
    })(blockly = ha.blockly || (ha.blockly = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var blockly;
    (function (blockly) {
        var ImageBlockData;
        (function (ImageBlockData) {
            ImageBlockData.list = [];
            // ha.be.Spr.Muat
            ImageBlockData.blitz_Muat = {
                type: "ha.be.Spr.Muat",
                message0: 'LoadImage %1 url: %2',
                perintah: "ha.be.Spr.Muat",
                args: {
                    dummy: '',
                    url: "./imgs/box.png"
                },
                inputsInline: true,
                output: EOutput.Any
            };
            ImageBlockData.list.push(ImageBlockData.blitz_Muat);
            // LoadAnimImage
            // ha.be.Spr.MuatAnimasi
            ImageBlockData.list.push({
                type: "ha.be.Spr.MuatAnimasi",
                message0: "LoadAnimImage %1 url: %2 frame width: %3 frame height: %4",
                perintah: "ha.be.Spr.MuatAnimasi",
                args: {
                    dummy: '',
                    sprite: {},
                    fw: 32,
                    fh: 32
                },
                inputsInline: true,
                output: EOutput.Any
            });
            // DrawImage
            // ha.be.Spr.GambarXY
            ImageBlockData.list.push({
                type: "ha.be.Spr.Gambar",
                message0: "DrawImage: %4 image %1 x: %2 y: %3",
                perintah: "ha.be.Spr.GambarXY",
                inputsInline: true,
                args: {
                    sprite: {},
                    x: 0,
                    y: 0,
                    dummy: ""
                }
            });
            // DrawImageAnim
            // ha.be.Spr.Gambar animasi
            ImageBlockData.list.push({
                type: "ha.be.Spr.Gambar_animasi",
                message0: "DrawImage %5 image %1 x: %2 y: %3 frame: %4",
                perintah: "ha.be.Spr.Gambar",
                inputsInline: true,
                args: {
                    sprite: {},
                    x: 0,
                    y: 0,
                    frame: 0,
                    dummy: ''
                }
            });
            // TileImage
            //ha.be.Spr.Ubin;
            ImageBlockData.list.push({
                type: "ha.be.Spr.Ubin",
                message0: "TileImage: %5 image %1 x: %2 y: %3 frame: %4",
                perintah: "ha.be.Spr.Ubin",
                inputsInline: true,
                args: {
                    sprite: {},
                    x: 0,
                    y: 0,
                    frame: 0,
                    dummy: ''
                }
            });
            // HandleImage
            // ha.be.Spr.Handle
            ImageBlockData.list.push({
                type: "ha.be.Spr.Handle",
                message0: "HandleImage: %1 image %2 x: %3 y: %4",
                perintah: "ha.be.Spr.Handle",
                inputsInline: true,
                args: {
                    dummy: '',
                    sprite: {},
                    x: 0,
                    y: 0,
                }
            });
            // ResizeImage
            // ha.be.Spr.Ukuran;
            ImageBlockData.list.push({
                type: "ha.be.Spr.Ukuran",
                perintah: "ha.be.Spr.Ukuran",
                message0: "ResizeImage: %1 image %2 width: %3 height: %4",
                inputsInline: true,
                args: {
                    dummy: '',
                    sprite: {},
                    width: 0,
                    height: 0,
                }
            });
            // RotateImage
            // ha.be.Spr.Rotasi;
            ImageBlockData.list.push({
                type: "ha.be.Spr.Rotasi",
                perintah: "ha.be.Spr.Rotasi",
                message0: "RotateImage: %1 image %2 value (0-360): %3",
                inputsInline: true,
                args: {
                    dummy: '',
                    sprite: {},
                    angle: 0
                }
            });
            // CopyImage
            //TODO
            /**
             * INFO
             * ====
             */
            // ImageWidth
            // ha.be.Spr.Panjang;
            ImageBlockData.list.push({
                type: "ha.be.Spr.Panjang",
                perintah: "ha.be.Spr.Panjang",
                message0: "ImageWidth: %1 image %2",
                inputsInline: true,
                args: {
                    dummy: '',
                    sprite: {},
                },
                output: EOutput.Number
            });
            // ImageHeight
            // ha.be.Spr.Lebar;
            ImageBlockData.list.push({
                type: "ha.be.Spr.Lebar",
                perintah: "ha.be.Spr.Lebar",
                message0: "ImageHeight: %1 image %2",
                args: {
                    dummy: '',
                    sprite: {},
                },
                output: EOutput.Number
            });
            // ImageXHandle
            // ha.be.Spr.HandleX
            ImageBlockData.list.push({
                type: "ha.be.Spr.HandleX",
                perintah: "ha.be.Spr.HandleX",
                message0: "ImageXHandle: %1 image %2",
                args: {
                    dummy: '',
                    sprite: {},
                },
                tooltip: "return the image-handle X coordinate",
                output: EOutput.Number
            });
            // ImageYHandle
            // ha.be.Spr.HandleY
            ImageBlockData.list.push({
                type: "ha.be.Spr.HandleY",
                perintah: "ha.be.Spr.HandleY",
                message0: "ImageYHandle: %1 image %2",
                args: {
                    dummy: '',
                    sprite: {},
                },
                tooltip: "return the image-handle Y coordinate",
                output: EOutput.Number
            });
            // ImagesCollideXY
            // ha.be.Spr.TabrakanXY;
            ImageBlockData.list.push({
                type: "ha.be.Spr.TabrakanXY",
                message0: "ImagesCollide: %1 image1: %2 x1: %3 y1: %4 image2: %5 x2: %6 y2: %7",
                perintah: "ha.be.Spr.TabrakanXY",
                args: {
                    dummy: '',
                    sprite: {},
                    x1: 0,
                    y1: 0,
                    sprite2: {},
                    x2: 0,
                    y2: 0
                },
                inputsInline: true,
                tooltip: "return true if two images are collided at position",
                output: EOutput.Boolean,
            });
        })(ImageBlockData = blockly.ImageBlockData || (blockly.ImageBlockData = {}));
    })(blockly = ha.blockly || (ha.blockly = {}));
})(ha || (ha = {}));
//next
// const Loaded = ha.be.Spr.Dimuat;
// const StatusMuat = ha.be.Spr.StatusMuat;
// const Posisi = ha.be.Spr.Posisi;
// const PosisiPolar = ha.be.Spr.posisiPolar;
// const GambarSemua = ha.be.Spr.GambarSemua;
// const PosisiX = ha.be.Spr.PosisiX;
// const PosisiY = ha.be.Spr.PosisiY;
// const Alpha = ha.be.Spr.Alpha;
// const StatusDrag = ha.be.Spr.StatusDrag;
// const Copy = ha.be.Spr.Copy;
// const Bound = ha.be.Spr.Bound;
//next 2
// const SpriteKontek = ha.be.Spr.kontek;
//not supported
// CreateImage
// FreeImage
// SaveImage
// GrabImage
// ImageBuffer
// DrawImageRect
// DrawBlockRect
// DrawBlock
// TileBlock
// MaskImage
// MidHandle => todo
// AutoMidHandle => todo
// ScaleImage
// TFormImage
// TFormFilter
// ImagesOverlap
// RectsOverlap
// ImageRectOverlap
// ImageRectCollide
var ha;
(function (ha) {
    var blockly;
    (function (blockly) {
        var ImageBlockData2;
        (function (ImageBlockData2) {
            ImageBlockData2.list = [];
            // DrawImage
            ImageBlockData2.list.push({
                type: "ha.be.Spr.Gambar_no_frame",
                perintah: "DrawImage",
                message0: "Draw Image %1",
                inputsInline: true,
                args: {
                    sprite: {},
                },
                tooltip: "Draw image to screen"
            });
            // DrawImage w frame
            ImageBlockData2.list.push({
                type: "ha.be.Spr.Gambar_frame",
                perintah: "DrawImage",
                message0: "Draw Image %1, frame no: %2",
                inputsInline: true,
                args: {
                    sprite: {},
                    frame: 0
                },
                tooltip: "Draw image to screen at a specific frame"
            });
            // ha.be.Spr.DragMode();
            ImageBlockData2.list.push({
                type: "ha.be.Spr.DragMode",
                perintah: "ha.be.Spr.DragMode",
                message0: "Image %1 set drag mode to %2",
                inputsInline: true,
                args: {
                    sprite: {},
                    dragMode: 1
                }
            });
            // const ImageLoaded = ha.be.Spr.Dimuat;
            // ImageLoaded
            ImageBlockData2.list.push({
                type: "ha.be.Spr.Dimuat",
                perintah: "ImageLoaded",
                message0: "Image %1 loaded",
                inputsInline: true,
                args: {
                    sprite: {},
                },
                output: EOutput.Boolean
            });
            // const AllImageLoaded = ha.be.Spr.StatusMuat;
            ImageBlockData2.list.push({
                type: "ha.be.Spr.StatusMuat",
                perintah: "AllImageLoaded",
                message0: "All Images Loaded",
                output: EOutput.Boolean,
                tooltip: 'Check if All Images have been loaded'
            });
            // const PositionImageXY = ha.be.Spr.Posisi;
            // PositionImageXY
            ImageBlockData2.list.push({
                type: "ha.be.Spr.Posisi",
                perintah: "PositionImageXY",
                message0: "Image %1 set position to x %2 y %3",
                inputsInline: true,
                args: {
                    sprite: {},
                    x: 0,
                    y: 0
                },
                tooltip: 'Position image at x,y'
            });
            // const PositionImagePolar = ha.be.Spr.posisiPolar;
            // PositionImagePolar
            ImageBlockData2.list.push({
                type: "ha.be.Spr.posisiPolar",
                perintah: "PositionImagePolar",
                message0: "Image %1 set position relative to x %4 y %5 by angle %2 at dist %3 scale x %6 scale y %7",
                inputsInline: true,
                args: {
                    sprite: {},
                    angle: 0,
                    dist: 100,
                    x: 0,
                    y: 0,
                    scaleX: 1,
                    scaleY: 1
                },
                tooltip: 'Position image relative to certain position'
            });
            // const DrawAllImage = ha.be.Spr.GambarSemua;
            ImageBlockData2.list.push({
                type: "ha.be.Spr.GambarSemua",
                perintah: "DrawAllImage",
                message0: "DrawAllImage",
                tooltip: 'Draw All Images, ordered by created time'
            });
            // const ImageXPosition = ha.be.Spr.PosisiX;
            // ImageXPosition
            ImageBlockData2.list.push({
                type: "ha.be.Spr.PosisiX",
                perintah: "ImageXPosition",
                message0: "ImageXPosition %1",
                args: {
                    sprite: {},
                },
                output: EOutput.Number,
                tooltip: 'Return Image x position'
            });
            // const ImageYPosition = ha.be.Spr.PosisiY;
            // ImageYPosition
            ImageBlockData2.list.push({
                type: "ha.be.Spr.PosisiY",
                perintah: "ImageYPosition",
                message0: "ImageYPosition %1",
                args: {
                    sprite: {},
                },
                output: EOutput.Number,
                tooltip: 'Return Image y position'
            });
            // const ImageAlpha = ha.be.Spr.Alpha;
            // ImageAlpha
            ImageBlockData2.list.push({
                type: "ha.be.Spr.Alpha",
                perintah: "ImageAlpha",
                message0: "Image %1 set alpha to (0-100) %2",
                args: {
                    sprite: {},
                    alpha: 100
                },
                inputsInline: true,
                tooltip: 'set image alpha '
            });
            // const ImageIsDragged = ha.be.Spr.StatusDrag;
            ImageBlockData2.list.push({
                type: "ha.be.Spr.StatusDrag",
                perintah: "ImageIsDragged",
                message0: "Image %1 is dragged",
                args: {
                    sprite: {},
                },
                inputsInline: true,
                tooltip: 'return true if image is dragged'
            });
            // ha.be.Spr.Tabrakan
            //Collide
            ImageBlockData2.list.push({
                type: "ha.be.Spr.Tabrakan",
                perintah: "Collide",
                message0: "check Image %1 is collided with Image %2",
                args: {
                    sprite1: {},
                    sprite2: {},
                },
                output: EOutput.Boolean,
                inputsInline: true,
                tooltip: 'return true if two images is collided'
            });
        })(ImageBlockData2 = blockly.ImageBlockData2 || (blockly.ImageBlockData2 = {}));
    })(blockly = ha.blockly || (ha.blockly = {}));
})(ha || (ha = {}));
//next
// const CopyImage = ha.be.Spr.Copy;
// const ImageBound = ha.be.Spr.Bound;
//next 2
// const SpriteKontek = ha.be.Spr.kontek;
