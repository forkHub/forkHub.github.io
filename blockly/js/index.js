"use strict";
var ha;
(function (ha) {
    var blockly;
    (function (blockly) {
        blockly.Demo = {};
    })(blockly = ha.blockly || (ha.blockly = {}));
})(ha || (ha = {}));
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
                    if (blockly.Store.devMode) {
                        blockly.Store.demo.forEach((item) => {
                            this.list.push(item);
                        });
                        return;
                    }
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
            // private static selectedId: string = '';
            // private static demoList: ListDemoView;
            static projekList;
            // private static isDemo: boolean = false;
            // static DemoButtonKlik() {
            //     this.isDemo = true;
            //     this.render();
            //     this.updateTombol();
            // }
            // static ProjectButtonKlik() {
            //     this.isDemo = false;
            //     this.render();
            //     this.updateTombol();
            // }
            static openKlik() {
                if (blockly.Store.selectedId == '') {
                    //no selected
                    console.log('no selected');
                    blockly.Dialog.show("no item selected");
                    return;
                }
                if (blockly.Store.projectId == blockly.Store.selectedId) {
                    //already opened
                    console.log('already open');
                    blockly.Dialog.show("You are currently editing this project");
                    return;
                }
                let f;
                let project;
                let code;
                // if (this.isDemo) {
                //     f = Store.demo.find((item) => {
                //         return (item as IEntity).parentId == Store.selectedId;
                //     });
                //     console.log(f);
                //     code = JSON.parse(f.wspace);
                //     project = Store.demo.find((item) => {
                //         return (item as IEntity).id == Store.selectedId;
                //     });
                // }
                // else {
                f = blockly.Entity.getByParentId(blockly.Store.selectedId);
                code = JSON.parse(f.wspace);
                project = blockly.Entity.getById(blockly.Store.selectedId);
                // }
                blockly.Store.idFile = f.id;
                blockly.Store.projectId = project.id;
                Blockly.serialization.workspaces.load(code, blockly.Index.workspace);
                this.closeKlik();
                blockly.Index.updateName();
            }
            static deleteKlik() {
                console.group('delete klik');
                if (blockly.Store.selectedId == '') {
                    //TODO: dialog
                    console.log('no item selected');
                    console.groupEnd();
                    blockly.Dialog.show("no item selected");
                    return;
                }
                // if (this.isDemo) {
                //     Dialog.show("The project is read only");
                //     return;
                // }
                if (blockly.Store.selectedId == blockly.Store.projectId) {
                    //already opened
                    console.log("already opened");
                    console.groupEnd();
                    blockly.Dialog.show("You are currently editing this project");
                    return;
                }
                let confirm = window.confirm("are you sure you ?");
                if (confirm) {
                    console.log('delete by id ' + blockly.Store.selectedId);
                    blockly.Entity.delete(blockly.Store.selectedId);
                    blockly.Entity.commit();
                    console.log("get view to delete");
                    this.listCont.querySelectorAll('.project').forEach((item) => {
                        if (item.getAttribute('data-id') == blockly.Store.selectedId) {
                            item.parentElement.removeChild(item);
                            console.log("ok");
                        }
                    });
                    blockly.Store.selectedId = '';
                }
                else {
                    console.log('cancel');
                }
                console.groupEnd();
                // this.closeKlik();
            }
            static closeKlik() {
                this.cont.close();
                blockly.Store.selectedId = '';
                // this.project = null;
            }
            static renameKlik() {
                if (blockly.Store.selectedId == '') {
                    blockly.Dialog.show("no item selected");
                    return;
                }
                // if (this.isDemo) {
                //     Dialog.show("the project is read only")
                //     return;
                // }
                let w = window.prompt("renae", blockly.Entity.getById(blockly.Store.selectedId).nama);
                //todo: validate 
                if (w) {
                    blockly.Entity.getById(blockly.Store.selectedId).nama = w;
                    blockly.Entity.commit();
                    this.updateItemView(this.listCont.querySelector(`div[data-id='${blockly.Store.selectedId}']`), blockly.Entity.getById(blockly.Store.selectedId));
                }
                else {
                    blockly.Dialog.show("invalid name");
                }
            }
            static show() {
                // this.isDemo = false;
                this.cont.showModal();
                this.render();
            }
            // private static updateTombol() {
            //     let cont = this.cont.querySelector('.button-cont');
            //     cont.querySelectorAll('button').forEach((item) => {
            //         item.classList.remove('outline');
            //     })
            //     if (this.isDemo) {
            //         cont.querySelector('button.demo').classList.add('outline');
            //     }
            //     else {
            //         cont.querySelector('button.project').classList.add('outline');
            //     }
            // }
            static init() {
                this.cont = document.createElement('dialog');
                this.cont.classList.add('project-list');
                this.cont.innerHTML = `
                <div style="display:flex; flex-direction:column; height:100%">
                    <h4>Project List:</h4>
                    <div class='list-cont' style="flex-grow:1; overflow-y:auto">
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
                // this.demoList = new ListDemoView();
                this.projekList = new HalProjekList();
            }
            static updateItemView(el, item) {
                el.innerHTML = '';
                this.projekList.buatItemViewIsi(item, el);
            }
            static render() {
                blockly.Store.selectedId = '';
                this.listCont.innerHTML = '';
                this.projekList.render(this.listCont);
            }
        }
        blockly.HalListProject = HalListProject;
        class HalProjekList {
            buatItemViewIsi(item, cont) {
                cont.innerHTML = `
                <span>${item.nama}</span>
            `;
            }
            //TODO: buat shared method
            buatItemView(item, cont) {
                let hasil;
                hasil = document.createElement('div');
                hasil.classList.add('project');
                hasil.setAttribute('data-id', item.id);
                hasil.onclick = () => {
                    blockly.Store.selectedId = item.id;
                    cont.querySelectorAll(".project").forEach((item2) => {
                        item2.classList.remove('selected');
                    });
                    hasil.classList.add('selected');
                };
                this.buatItemViewIsi(item, hasil);
                return hasil;
            }
            render(cont) {
                let list = blockly.Entity.getByType(blockly.EEntity.PROJECT);
                list = list.sort((item, item2) => {
                    if (item.nama < item2.nama)
                        return -1;
                    if (item.nama > item2.nama)
                        return 1;
                    return 0;
                });
                list.forEach((item) => {
                    cont.appendChild(this.buatItemView(item, cont));
                });
            }
        }
        //TODO: depecrated
        class ListDemoView {
            buatItemViewIsi(item, cont) {
                cont.innerHTML = `
                <span>${item.nama}</span>
            `;
            }
            buatItemView(item, cont) {
                let hasil;
                hasil = document.createElement('div');
                hasil.classList.add('project');
                hasil.setAttribute('data-id', item.id);
                hasil.onclick = () => {
                    blockly.Store.selectedId = item.id;
                    cont.querySelectorAll(".project").forEach((item2) => {
                        item2.classList.remove('selected');
                    });
                    hasil.classList.add('selected');
                };
                this.buatItemViewIsi(item, hasil);
                return hasil;
            }
            render(cont) {
                let list = blockly.Store.demo.filter((item) => {
                    return item.type == "project";
                });
                list = list.sort((item, item2) => {
                    if (item.nama < item2.nama)
                        return -1;
                    if (item.nama > item2.nama)
                        return 1;
                    return 0;
                });
                list.forEach((item) => {
                    cont.appendChild(this.buatItemView(item, cont));
                });
            }
        }
        class HalListDemo {
            static cont;
            static listCont;
            static demoList;
            static DemoButtonKlik() {
                this.render();
            }
            static openKlik() {
                if (blockly.Store.selectedId == '') {
                    //no selected
                    console.log('no selected');
                    blockly.Dialog.show("no item selected");
                    return;
                }
                if (blockly.Store.projectId == blockly.Store.selectedId) {
                    //already opened
                    console.log('already open');
                    blockly.Dialog.show("You are currently editing this project");
                    return;
                }
                let f;
                // let project
                let code;
                f = blockly.Store.demo.find((item) => {
                    return item.parentId == blockly.Store.selectedId;
                });
                console.log(f);
                code = JSON.parse(f.wspace);
                // project = Store.demo.find((item) => {
                //     return (item as IEntity).id == Store.selectedId;
                // });
                blockly.Store.idFile = f.id;
                blockly.Store.projectId = '';
                Blockly.serialization.workspaces.load(code, blockly.Index.workspace);
                this.closeKlik();
                blockly.Index.updateName();
            }
            static closeKlik() {
                this.cont.close();
                blockly.Store.selectedId = '';
                // this.project = null;
            }
            static show() {
                this.cont.showModal();
                this.render();
            }
            static init() {
                this.cont = document.createElement('dialog');
                this.cont.classList.add('project-list');
                this.cont.innerHTML = `
                <div style="display:flex; flex-direction:column; height:100%">
                    <h4>Demo::</h4>
                    <div class='list-cont' style="flex-grow:1; overflow-y:auto">
                    </div>
                    <div>
                        <button onclick="ha.blockly.HalListDemo.openKlik();">open</button>
                        <button onclick="ha.blockly.HalListDemo.closeKlik();">close</button>
                    </div>
                </div>
            `;
                this.listCont = this.cont.querySelector("div.list-cont");
                document.body.append(this.cont);
                this.demoList = new ListDemoView();
            }
            static render() {
                blockly.Store.selectedId = '';
                this.listCont.innerHTML = '';
                this.demoList.render(this.listCont);
            }
        }
        blockly.HalListDemo = HalListDemo;
    })(blockly = ha.blockly || (ha.blockly = {}));
})(ha || (ha = {}));
var ha;
(function (ha) {
    var blockly;
    (function (blockly) {
        class Id {
            static _id = Date.now();
            static prefix = (Math.floor(Math.random() * 8000) + 1000) + '';
            static get id() {
                this._id++;
                return this.prefix + this._id + '';
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
                    Op.loadKlik();
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
                    window.localStorage.setItem("blocklycode", codeHtml);
                    window.open('./play.html', "_blank");
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
            static loadKlik() {
                // let list: IEntity[] = Entity.getByType(EEntity.PROJECT);
                // let p: IProject = list[0] as IProject;
                // let f: IFile = Entity.getByParentId(p.id) as IFile;
                //develop ui
                blockly.HalListProject.show();
                // let code = JSON.parse(f.wspace);
                // console.log(code);
                // Blockly.serialization.workspaces.load(code, Index.workspace);
                // Store.idFile = f.id;
                // Store.namaProject = p.nama;
                // console.log(list);
            }
            static publish() {
                let codeHtml = ha.blockly.Export.export(javascript.javascriptGenerator.workspaceToCode(blockly.Index.workspace), true);
                blockly.DialogPublish.open(`
                    <h1>Publish</h1>
                    <p>
                        Copy content of textarea below, and save it to a file with .html extension.
                        You can run the file directly without setting up a web-server
                    </p>
            `, (codeHtml));
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
            static _idFile = '';
            static _projectId = '';
            static _defWSpace = '';
            static _demo = [];
            static _selectedId = '';
            static _devMode = true;
            static get devMode() {
                return Store._devMode;
            }
            static set devMode(value) {
                Store._devMode = value;
            }
            static get selectedId() {
                return Store._selectedId;
            }
            static set selectedId(value) {
                Store._selectedId = value;
            }
            static get demo() {
                return Store._demo;
            }
            static set demo(value) {
                Store._demo = value;
            }
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
        Store.defWSpace = "{\"blocks\":{\"languageVersion\":0,\"blocks\":[{\"type\":\"procedures_defnoreturn\",\"id\":\"@iZs`-A.)`GZTz%?Wh_j\",\"x\":607,\"y\":136,\"icons\":{\"comment\":{\"text\":\"Describe this function...\",\"pinned\":false,\"height\":80,\"width\":160}},\"fields\":{\"NAME\":\"update\"},\"inputs\":{\"STACK\":{\"block\":{\"type\":\"ha.be.Be.Bersih\",\"id\":\"(7d4VY9ISHI3=xQXw=c0\",\"next\":{\"block\":{\"type\":\"ha.be.Spr.Gambar\",\"id\":\"TKi]Pbe|YLS%b}yYe+1L\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\"Oxp^k?rAe(XG%z7DGmrI\",\"fields\":{\"VAR\":{\"id\":\"99*3xs_.J9FLSB`sp](v\"}}}},\"x\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"iR^9X(~I02#.l.kt.[;:\",\"fields\":{\"NUM\":120}}},\"y\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"Sn*[t/Kt[]3J~cg5t9-K\",\"fields\":{\"NUM\":100}}}}}}}}}},{\"type\":\"ha.be.Be.Grafis\",\"id\":\"HaDx$m%9L0)lj6v$4@k*\",\"x\":187,\"y\":160,\"inputs\":{\"width\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"1Yjl.$%bS/5z=@5Qd]V~\",\"fields\":{\"NUM\":320}}},\"height\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"?(lT9dOGdzVnQ.vcHAEI\",\"fields\":{\"NUM\":240}}}},\"next\":{\"block\":{\"type\":\"variables_set\",\"id\":\"?BBuRH-xfVFsVL#ivCx)\",\"fields\":{\"VAR\":{\"id\":\"99*3xs_.J9FLSB`sp](v\"}},\"inputs\":{\"VALUE\":{\"block\":{\"type\":\"ha.be.Spr.Muat\",\"id\":\"-Wwr3nwkx~$;z$;b1tzu\",\"inputs\":{\"url\":{\"shadow\":{\"type\":\"text\",\"id\":\"tjz/~)*VQIRK@:47=aoI\",\"fields\":{\"TEXT\":\"./imgs/box.png\"}}}}}}}}}}]},\"variables\":[{\"name\":\"image\",\"id\":\"99*3xs_.J9FLSB`sp](v\"}]}";
    })(blockly = ha.blockly || (ha.blockly = {}));
})(ha || (ha = {}));
///<reference path="Store.ts"/>
ha.blockly.Store.demo =
    [
        {
            "id": "1702695514572",
            "type": "file",
            "nama": "",
            "parentId": "1702695514571",
            "wspace": "{\"blocks\":{\"languageVersion\":0,\"blocks\":[{\"type\":\"ha.be.Be.Grafis\",\"id\":\"=~Z^4K/@YS?vy`~7_mri\",\"x\":160,\"y\":50,\"inputs\":{\"width\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"3i#`otG44!%O3dK?dpFj\",\"fields\":{\"NUM\":320}}},\"height\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"B.b@w3*tj%BV1R.$`7K%\",\"fields\":{\"NUM\":240}}}},\"next\":{\"block\":{\"type\":\"ha.be.Be.Bersih\",\"id\":\"GQw6--T)gA*/?G$;:#ma\",\"next\":{\"block\":{\"type\":\"variables_set\",\"id\":\"Z5KN#ZVs|T/tvMLw@-2_\",\"fields\":{\"VAR\":{\"id\":\"+THF*Wwgh/T7rj}$}R!O\"}},\"inputs\":{\"VALUE\":{\"block\":{\"type\":\"ha.be.Spr.Muat\",\"id\":\"d+O(1EMlgqiZyP]*aO}i\",\"inputs\":{\"url\":{\"shadow\":{\"type\":\"text\",\"id\":\"Wf4d%oy-2`wB{hiB*,-O\",\"fields\":{\"TEXT\":\"./imgs/box.png\"}}}}}}}}}}}}]},\"variables\":[{\"name\":\"img\",\"id\":\"+THF*Wwgh/T7rj}$}R!O\"}]}"
        },
        {
            "id": "1702699321358",
            "type": "file",
            "nama": "",
            "parentId": "1702699321357",
            "wspace": "{\"blocks\":{\"languageVersion\":0,\"blocks\":[{\"type\":\"procedures_defnoreturn\",\"id\":\"@iZs`-A.)`GZTz%?Wh_j\",\"x\":607,\"y\":136,\"icons\":{\"comment\":{\"text\":\"Describe this function...\",\"pinned\":false,\"height\":80,\"width\":160}},\"fields\":{\"NAME\":\"update\"},\"inputs\":{\"STACK\":{\"block\":{\"type\":\"ha.be.Be.Bersih\",\"id\":\"(7d4VY9ISHI3=xQXw=c0\",\"next\":{\"block\":{\"type\":\"ha.be.Spr.Gambar\",\"id\":\"TKi]Pbe|YLS%b}yYe+1L\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\"Oxp^k?rAe(XG%z7DGmrI\",\"fields\":{\"VAR\":{\"id\":\"99*3xs_.J9FLSB`sp](v\"}}}},\"x\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"iR^9X(~I02#.l.kt.[;:\",\"fields\":{\"NUM\":120}}},\"y\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"Sn*[t/Kt[]3J~cg5t9-K\",\"fields\":{\"NUM\":100}}}}}}}}}},{\"type\":\"ha.be.Be.Grafis\",\"id\":\"HaDx$m%9L0)lj6v$4@k*\",\"x\":187,\"y\":160,\"inputs\":{\"width\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"1Yjl.$%bS/5z=@5Qd]V~\",\"fields\":{\"NUM\":320}}},\"height\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"?(lT9dOGdzVnQ.vcHAEI\",\"fields\":{\"NUM\":240}}}},\"next\":{\"block\":{\"type\":\"ha.be.Be.Bersih\",\"id\":\"P=3%M?Ud(^qXZB;*oeeA\",\"next\":{\"block\":{\"type\":\"variables_set\",\"id\":\"?BBuRH-xfVFsVL#ivCx)\",\"fields\":{\"VAR\":{\"id\":\"99*3xs_.J9FLSB`sp](v\"}},\"inputs\":{\"VALUE\":{\"block\":{\"type\":\"ha.be.Spr.Muat\",\"id\":\"-Wwr3nwkx~$;z$;b1tzu\",\"inputs\":{\"url\":{\"shadow\":{\"type\":\"text\",\"id\":\"tjz/~)*VQIRK@:47=aoI\",\"fields\":{\"TEXT\":\"./imgs/box.png\"}}}}}}}}}}}}]},\"variables\":[{\"name\":\"image\",\"id\":\"99*3xs_.J9FLSB`sp](v\"}]}"
        },
        {
            "id": "1702699501929",
            "type": "file",
            "nama": "",
            "parentId": "1702699501928",
            "wspace": "{\"blocks\":{\"languageVersion\":0,\"blocks\":[{\"type\":\"ha.be.Be.Grafis\",\"id\":\"~TlYIq3#Om{-=*Tx0s!)\",\"x\":94,\"y\":93,\"inputs\":{\"width\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"+Updxr[pybv?]u7,S(I_\",\"fields\":{\"NUM\":320}}},\"height\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"m@`/`ndGLb-rlfJ[iA;{\",\"fields\":{\"NUM\":240}}}},\"next\":{\"block\":{\"type\":\"ha.be.Be.Bersih\",\"id\":\"~*lYR/ye*1G/BTco|bcp\"}}}]}}"
        },
        {
            "id": "1702733784746",
            "type": "file",
            "nama": "",
            "parentId": "1702733784745",
            "wspace": "{\"blocks\":{\"languageVersion\":0,\"blocks\":[{\"type\":\"procedures_defnoreturn\",\"id\":\"YAeHvg0folHqbP|w!o~O\",\"x\":482,\"y\":51,\"icons\":{\"comment\":{\"text\":\"Describe this function...\",\"pinned\":false,\"height\":80,\"width\":160}},\"fields\":{\"NAME\":\"update\"},\"inputs\":{\"STACK\":{\"block\":{\"type\":\"ha.be.Be.Bersih\",\"id\":\"(-Hw93,LiU7imvX*I;$%\",\"next\":{\"block\":{\"type\":\"ha.be.Teks.Goto\",\"id\":\"zz9Lh8GH|)6DM@,b|T.u\",\"inputs\":{\"x\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"6z4B?zOocaZ5qOG^+pMT\",\"fields\":{\"NUM\":0}}},\"y\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"1vW;|D8LrPlWU,sLfd=L\",\"fields\":{\"NUM\":10}}}},\"next\":{\"block\":{\"type\":\"ha.be.Teks.WriteLn\",\"id\":\"XTqRM@?w!0PoxFj`%cI{\",\"inputs\":{\"text\":{\"shadow\":{\"type\":\"text\",\"id\":\"sIPQa*XUE=EyVcN7IRp^\",\"fields\":{\"TEXT\":\"\"}},\"block\":{\"type\":\"text\",\"id\":\"8N(zr)7s/]wHkc$Unk^0\",\"fields\":{\"TEXT\":\"Rotate the box\"}}}},\"next\":{\"block\":{\"type\":\"ha.be.Teks.WriteLn\",\"id\":\";s1VGL_u*pU0vdajE9n5\",\"inputs\":{\"text\":{\"shadow\":{\"type\":\"text\",\"id\":\"j#EZ!E);w[R)kQ`M=r:]\",\"fields\":{\"TEXT\":\"\"}},\"block\":{\"type\":\"text_join\",\"id\":\"$J[kFannJPo3yr@?:t$8\",\"extraState\":{\"itemCount\":2},\"inputs\":{\"ADD0\":{\"block\":{\"type\":\"text\",\"id\":\":m#Cv+4-)N)hGk?`H6M]\",\"fields\":{\"TEXT\":\"Angle:\"}}},\"ADD1\":{\"block\":{\"type\":\"ha.be.Spr.Rotasi\",\"id\":\"-ZZ-/o^9oO;J5i[,8zFu\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\"Yp[V+^lS3nYi%k]sGH3b\",\"fields\":{\"VAR\":{\"id\":\"U/P;57A.cj6i*`rQ:Wkm\"}}}}}}}}}}},\"next\":{\"block\":{\"type\":\"ha.be.Spr.Gambar_no_frame\",\"id\":\"d5b{p_=eg*]UyFf5DM@9\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\"H0[o0!)W%Z/6{p2}A;zg\",\"fields\":{\"VAR\":{\"id\":\"U/P;57A.cj6i*`rQ:Wkm\"}}}}}}}}}}}}}}}}},{\"type\":\"ha.be.Be.Grafis\",\"id\":\"+0cX1W]m4NbL#=Srz!0M\",\"x\":34,\"y\":17,\"inputs\":{\"width\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"pLz:_^C5wQ?SC*?o/tan\",\"fields\":{\"NUM\":320}}},\"height\":{\"shadow\":{\"type\":\"math_number\",\"id\":\":v-Gueqp;NeddO.fYkb/\",\"fields\":{\"NUM\":240}}}},\"next\":{\"block\":{\"type\":\"variables_set\",\"id\":\"g?Cp~3Fu590VYAhLs^Za\",\"fields\":{\"VAR\":{\"id\":\"U/P;57A.cj6i*`rQ:Wkm\"}},\"inputs\":{\"VALUE\":{\"block\":{\"type\":\"ha.be.Spr.Muat\",\"id\":\"vPfhzXl?GTZ@N~P+m3NC\",\"inputs\":{\"url\":{\"shadow\":{\"type\":\"text\",\"id\":\"pXgmitjH}Vj$av`a$Jn1\",\"fields\":{\"TEXT\":\"./imgs/box.png\"}}}}}}},\"next\":{\"block\":{\"type\":\"ha.be.Spr.DragMode\",\"id\":\"q3WCO0B]_`uxuyH9b/^;\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\"9qk,l~#6tZ@[9G1egxsZ\",\"fields\":{\"VAR\":{\"id\":\"U/P;57A.cj6i*`rQ:Wkm\"}}}},\"dragMode\":{\"shadow\":{\"type\":\"math_number\",\"id\":\":dId7|[V*VSg,ydUrw^_\",\"fields\":{\"NUM\":2}}}},\"next\":{\"block\":{\"type\":\"ha.be.Spr.Posisi\",\"id\":\"qX|j!kb7nyToCctsbxX#\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\",6,]t5YfA,j1|);-Ok$J\",\"fields\":{\"VAR\":{\"id\":\"U/P;57A.cj6i*`rQ:Wkm\"}}}},\"x\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"}LjN/+0E]/xy3cDrL9g@\",\"fields\":{\"NUM\":160}}},\"y\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"Y7N1PTUZ#u59/)BoxI`*\",\"fields\":{\"NUM\":120}}}},\"next\":{\"block\":{\"type\":\"ha.be.Spr.Handle\",\"id\":\"s7+_kPl}K*1WL6hM.g}Z\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\"QaU?5*zae.3WxF%+gb|*\",\"fields\":{\"VAR\":{\"id\":\"U/P;57A.cj6i*`rQ:Wkm\"}}}},\"x\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"{Qp6nqBC(P9uE*ENXish\",\"fields\":{\"NUM\":16}}},\"y\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"E-#LQl!V5ROxo^F3W*)}\",\"fields\":{\"NUM\":16}}}}}}}}}}}}}]},\"variables\":[{\"name\":\"img\",\"id\":\"U/P;57A.cj6i*`rQ:Wkm\"}]}"
        },
        {
            "id": "1702737718630",
            "type": "project",
            "nama": "00 collision 1",
            "parentId": "-1"
        },
        {
            "id": "1702737718631",
            "type": "file",
            "nama": "",
            "parentId": "1702737718630",
            "wspace": "{\"blocks\":{\"languageVersion\":0,\"blocks\":[{\"type\":\"ha.be.Be.Grafis\",\"id\":\"A;e@.|QUk^%DE2Wr6c9Q\",\"x\":-92,\"y\":2,\"inputs\":{\"width\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"9WA==wu6RE`1Nr.%61pq\",\"fields\":{\"NUM\":640}}},\"height\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"T!Z_3t%]S(C#0`bfmDti\",\"fields\":{\"NUM\":480}}}},\"next\":{\"block\":{\"type\":\"variables_set\",\"id\":\"YBoGw+3Rg1cuPu)JolG5\",\"fields\":{\"VAR\":{\"id\":\"VkK%wOG:^w4r+jR3OSwl\"}},\"inputs\":{\"VALUE\":{\"block\":{\"type\":\"math_number\",\"id\":\"bJrtrVrtc4%NV9dI1Wq3\",\"fields\":{\"NUM\":45}}}},\"next\":{\"block\":{\"type\":\"ha.be.Teks.Goto\",\"id\":\"k9DLyzGc1_k#Os$XYkz*\",\"inputs\":{\"x\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"|ma{5u-?y$g#_hweQ)x$\",\"fields\":{\"NUM\":320}}},\"y\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"2+SV7hG]^$,RBfx8]1|_\",\"fields\":{\"NUM\":20}}}},\"next\":{\"block\":{\"type\":\"note\",\"id\":\"G%OY2#dt*Rz4qZ;Z^~U2\",\"inputs\":{\"comment\":{\"shadow\":{\"type\":\"text\",\"id\":\"v3087sp%gW4$n^~ucU@z\",\"fields\":{\"TEXT\":\"img #1\"}}}},\"next\":{\"block\":{\"type\":\"variables_set\",\"id\":\"X9|QK7pf:.KI1pjVBr@2\",\"fields\":{\"VAR\":{\"id\":\"A0k8Ck#PrIl*XMc%C6nq\"}},\"inputs\":{\"VALUE\":{\"block\":{\"type\":\"ha.be.Spr.Muat\",\"id\":\"N,2n_hb^fPOwr8DlO!*I\",\"inputs\":{\"url\":{\"shadow\":{\"type\":\"text\",\"id\":\")TQI_DPDerl)m](sER.K\",\"fields\":{\"TEXT\":\"./imgs/box.png\"}}}}}}},\"next\":{\"block\":{\"type\":\"ha.be.Spr.Handle\",\"id\":\"5:J*wMjGliCM^t03VG*C\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\"Yp`Bet]Ar)c?I@|;0k|n\",\"fields\":{\"VAR\":{\"id\":\"A0k8Ck#PrIl*XMc%C6nq\"}}}},\"x\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"G6cFxu**`XNruep9MpB!\",\"fields\":{\"NUM\":320}}},\"y\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"6Ns]nL?7f_A4NqZBg?]4\",\"fields\":{\"NUM\":32}}}},\"next\":{\"block\":{\"type\":\"ha.be.Spr.Ukuran\",\"id\":\"dHbX$*E0*9Z*5]W|deJm\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\"yretwz!G3N-d*:;EoROz\",\"fields\":{\"VAR\":{\"id\":\"A0k8Ck#PrIl*XMc%C6nq\"}}}},\"width\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"`RxA]@U[8RNHCgjh+NJy\",\"fields\":{\"NUM\":640}}},\"height\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"@3Y-8t%pPVw.BMCb,cdh\",\"fields\":{\"NUM\":64}}}},\"next\":{\"block\":{\"type\":\"note\",\"id\":\"|5{!gO]{dlwElR^d6K[I\",\"inputs\":{\"comment\":{\"shadow\":{\"type\":\"text\",\"id\":\"ENb@L[r3Aae`lTXs%(o}\",\"fields\":{\"TEXT\":\"img #2\"}}}},\"next\":{\"block\":{\"type\":\"variables_set\",\"id\":\".UQ/*_w,CBSIqMPI(Rgx\",\"fields\":{\"VAR\":{\"id\":\"3P(-*k,iL46@4$m:4]?+\"}},\"inputs\":{\"VALUE\":{\"block\":{\"type\":\"ha.be.Spr.Muat\",\"id\":\"M[ZZf;mRYmbmP*W6-l`M\",\"inputs\":{\"url\":{\"shadow\":{\"type\":\"text\",\"id\":\"tb_Gt@GP/=[w}i:S(MpB\",\"fields\":{\"TEXT\":\"./imgs/box.png\"}}}}}}},\"next\":{\"block\":{\"type\":\"ha.be.Spr.Ukuran\",\"id\":\"_a=s)|9SkqfLN^3vXN(-\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\"#2{mAR:kQ7{:^]O5SzZ@\",\"fields\":{\"VAR\":{\"id\":\"3P(-*k,iL46@4$m:4]?+\"}}}},\"width\":{\"shadow\":{\"type\":\"math_number\",\"id\":\";_56uv/c2J?I),uDG7hr\",\"fields\":{\"NUM\":120}}},\"height\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"BQ/QMf=26dMvaqcR$BbN\",\"fields\":{\"NUM\":120}}}}}}}}}}}}}}}}}}}}}}},{\"type\":\"procedures_defnoreturn\",\"id\":\"tiLTEq`Rv!*_k(!M,VN)\",\"x\":483,\"y\":8,\"icons\":{\"comment\":{\"text\":\"Describe this function...\",\"pinned\":false,\"height\":80,\"width\":160}},\"fields\":{\"NAME\":\"update\"},\"inputs\":{\"STACK\":{\"block\":{\"type\":\"math_change\",\"id\":\"KRBqB8EgETwA]%)VMr0g\",\"fields\":{\"VAR\":{\"id\":\"VkK%wOG:^w4r+jR3OSwl\"}},\"inputs\":{\"DELTA\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"FgtD*,GO6xMW`?v8Xumx\",\"fields\":{\"NUM\":1}}}},\"next\":{\"block\":{\"type\":\"ha.be.Spr.Rotasi\",\"id\":\"Osj,XwZ!%WtmRf}+rxsV\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\"!7WQR(S~--zTC)3B:fj2\",\"fields\":{\"VAR\":{\"id\":\"A0k8Ck#PrIl*XMc%C6nq\"}}}},\"angle\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"m:E^C%|i:+XOeWLbmNw[\",\"fields\":{\"NUM\":0}},\"block\":{\"type\":\"variables_get\",\"id\":\"^7L[^l{LSudIG$G#{SK9\",\"fields\":{\"VAR\":{\"id\":\"VkK%wOG:^w4r+jR3OSwl\"}}}}},\"next\":{\"block\":{\"type\":\"variables_set\",\"id\":\"bR`e[i]y6OomcC;ucHR}\",\"fields\":{\"VAR\":{\"id\":\"/(Z|)5mME319$T[cI@SG\"}},\"inputs\":{\"VALUE\":{\"block\":{\"type\":\"ha.be.Spr.TabrakanXY\",\"id\":\"_mjvdsf.76n9,uc3g1u3\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\"@f`+TE*82|LE3WX^3ygv\",\"fields\":{\"VAR\":{\"id\":\"A0k8Ck#PrIl*XMc%C6nq\"}}}},\"x1\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"oX^E@LFHS7YkYN:9#$z;\",\"fields\":{\"NUM\":200}}},\"y1\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"oJM=bwYR+9p5[Z{]!Gjp\",\"fields\":{\"NUM\":240}}},\"sprite2\":{\"block\":{\"type\":\"variables_get\",\"id\":\"8jl}SEc!-)|g8Ztq40k?\",\"fields\":{\"VAR\":{\"id\":\"3P(-*k,iL46@4$m:4]?+\"}}}},\"x2\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"d`QLgoIB)2nz0QpeQ*$p\",\"fields\":{\"NUM\":480}}},\"y2\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"}*x/+|i/@D?Jji%,,;qh\",\"fields\":{\"NUM\":240}}}}}}},\"next\":{\"block\":{\"type\":\"note\",\"id\":\"_4,KD+3jC,KH7ctm|5I3\",\"inputs\":{\"comment\":{\"shadow\":{\"type\":\"text\",\"id\":\"kzm1RNB*N`Q(|XNA}|LJ\",\"fields\":{\"TEXT\":\"render\"}}}},\"next\":{\"block\":{\"type\":\"ha.be.Be.Bersih\",\"id\":\"w=[?@!uJYM;BE1l}IwBv\",\"next\":{\"block\":{\"type\":\"ha.be.Spr.Gambar\",\"id\":\"Y;nVsZ:mkO;Ic=/ptF_o\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\"FLC|ovT@!v4+ngvkZ_?S\",\"fields\":{\"VAR\":{\"id\":\"A0k8Ck#PrIl*XMc%C6nq\"}}}},\"x\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"3zkk85CZoTYUgaZ!U,xk\",\"fields\":{\"NUM\":200}}},\"y\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"Dj,A@l:)6CTSh:dVXnwJ\",\"fields\":{\"NUM\":240}}}},\"next\":{\"block\":{\"type\":\"ha.be.Spr.Gambar\",\"id\":\"Nw-$nL`8SObe|htVm:n=\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\"C/yB=`ta]TyAka+[L6IH\",\"fields\":{\"VAR\":{\"id\":\"3P(-*k,iL46@4$m:4]?+\"}}}},\"x\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"Ve!!=inpzwLYsRHZpNTE\",\"fields\":{\"NUM\":480}}},\"y\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"(AoM#T@+IG*,W1;=^XR2\",\"fields\":{\"NUM\":240}}}},\"next\":{\"block\":{\"type\":\"ha.be.Teks.Write\",\"id\":\"#e*iN4d((~HOq[2$uP6_\",\"inputs\":{\"text\":{\"shadow\":{\"type\":\"text\",\"id\":\"{9L3ji6|(|4Hj36|j#FK\",\"fields\":{\"TEXT\":\"collision status\"}},\"block\":{\"type\":\"text_join\",\"id\":\"SK~3!r4HLp-9/4Pm6U(*\",\"extraState\":{\"itemCount\":2},\"inputs\":{\"ADD0\":{\"block\":{\"type\":\"text\",\"id\":\"bQU!{3B:#tUArk!k`GRE\",\"fields\":{\"TEXT\":\"collision status:\"}}},\"ADD1\":{\"block\":{\"type\":\"variables_get\",\"id\":\"p_7e~BdibNM4`4AXZn#N\",\"fields\":{\"VAR\":{\"id\":\"/(Z|)5mME319$T[cI@SG\"}}}}}}}}}}}}}}}}}}}}}}}}}}]},\"variables\":[{\"name\":\"img\",\"id\":\"A0k8Ck#PrIl*XMc%C6nq\"},{\"name\":\"rotation\",\"id\":\"VkK%wOG:^w4r+jR3OSwl\"},{\"name\":\"img2\",\"id\":\"3P(-*k,iL46@4$m:4]?+\"},{\"name\":\"collisionStat\",\"id\":\"/(Z|)5mME319$T[cI@SG\"}]}"
        },
        {
            "id": "1702739076684",
            "type": "file",
            "nama": "1702737718631",
            "parentId": "1702739076683",
            "wspace": "{\"blocks\":{\"languageVersion\":0,\"blocks\":[{\"type\":\"ha.be.Be.Grafis\",\"id\":\"A;e@.|QUk^%DE2Wr6c9Q\",\"x\":38,\"y\":21,\"inputs\":{\"width\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"9WA==wu6RE`1Nr.%61pq\",\"fields\":{\"NUM\":640}}},\"height\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"T!Z_3t%]S(C#0`bfmDti\",\"fields\":{\"NUM\":480}}}},\"next\":{\"block\":{\"type\":\"variables_set\",\"id\":\"YBoGw+3Rg1cuPu)JolG5\",\"fields\":{\"VAR\":{\"id\":\"VkK%wOG:^w4r+jR3OSwl\"}},\"inputs\":{\"VALUE\":{\"block\":{\"type\":\"math_number\",\"id\":\"bJrtrVrtc4%NV9dI1Wq3\",\"fields\":{\"NUM\":45}}}},\"next\":{\"block\":{\"type\":\"variables_set\",\"id\":\"k;tBJ#cBag7(Zw#][ook\",\"fields\":{\"VAR\":{\"id\":\"/(Z|)5mME319$T[cI@SG\"}},\"inputs\":{\"VALUE\":{\"block\":{\"type\":\"logic_boolean\",\"id\":\"B3yb)A`kSlBP*s|wtU2p\",\"fields\":{\"BOOL\":\"TRUE\"}}}},\"next\":{\"block\":{\"type\":\"ha.be.Teks.Goto\",\"id\":\"k9DLyzGc1_k#Os$XYkz*\",\"inputs\":{\"x\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"|ma{5u-?y$g#_hweQ)x$\",\"fields\":{\"NUM\":320}}},\"y\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"2+SV7hG]^$,RBfx8]1|_\",\"fields\":{\"NUM\":20}}}}}}}}}}},{\"type\":\"procedures_defnoreturn\",\"id\":\"tiLTEq`Rv!*_k(!M,VN)\",\"x\":521,\"y\":3,\"icons\":{\"comment\":{\"text\":\"Describe this function...\",\"pinned\":false,\"height\":80,\"width\":160}},\"fields\":{\"NAME\":\"update\"},\"inputs\":{\"STACK\":{\"block\":{\"type\":\"math_change\",\"id\":\"KRBqB8EgETwA]%)VMr0g\",\"fields\":{\"VAR\":{\"id\":\"VkK%wOG:^w4r+jR3OSwl\"}},\"inputs\":{\"DELTA\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"FgtD*,GO6xMW`?v8Xumx\",\"fields\":{\"NUM\":1}}}},\"next\":{\"block\":{\"type\":\"ha.be.Spr.Rotasi\",\"id\":\"Osj,XwZ!%WtmRf}+rxsV\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\"!7WQR(S~--zTC)3B:fj2\",\"fields\":{\"VAR\":{\"id\":\"A0k8Ck#PrIl*XMc%C6nq\"}}}},\"angle\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"m:E^C%|i:+XOeWLbmNw[\",\"fields\":{\"NUM\":0}},\"block\":{\"type\":\"variables_get\",\"id\":\"^7L[^l{LSudIG$G#{SK9\",\"fields\":{\"VAR\":{\"id\":\"VkK%wOG:^w4r+jR3OSwl\"}}}}},\"next\":{\"block\":{\"type\":\"variables_set\",\"id\":\"hSOZrjQ`CuX8-2%pi8eH\",\"fields\":{\"VAR\":{\"id\":\"/(Z|)5mME319$T[cI@SG\"}},\"inputs\":{\"VALUE\":{\"block\":{\"type\":\"ha.be.Spr.Tabrakan\",\"id\":\"1DBTb@!UzRaU1%fx]q#t\",\"inputs\":{\"sprite1\":{\"block\":{\"type\":\"variables_get\",\"id\":\"TRN#!(4g4(TCiqm6ACdl\",\"fields\":{\"VAR\":{\"id\":\"A0k8Ck#PrIl*XMc%C6nq\"}}}},\"sprite2\":{\"block\":{\"type\":\"variables_get\",\"id\":\"0,3e(8*X#}G=[;K9*e)l\",\"fields\":{\"VAR\":{\"id\":\"3P(-*k,iL46@4$m:4]?+\"}}}}}}}},\"next\":{\"block\":{\"type\":\"note\",\"id\":\"TnU!#mE8:T_8@^qFnz0c\",\"inputs\":{\"comment\":{\"shadow\":{\"type\":\"text\",\"id\":\"qwfy+@{N[2vI(FOO1G:c\",\"fields\":{\"TEXT\":\"render\"}}}},\"next\":{\"block\":{\"type\":\"ha.be.Be.Bersih\",\"id\":\"w=[?@!uJYM;BE1l}IwBv\",\"next\":{\"block\":{\"type\":\"ha.be.Spr.GambarSemua\",\"id\":\"=HKU#|TWzo9Fg:c_4uLr\",\"next\":{\"block\":{\"type\":\"ha.be.Teks.Write\",\"id\":\"#e*iN4d((~HOq[2$uP6_\",\"inputs\":{\"text\":{\"shadow\":{\"type\":\"text\",\"id\":\"{9L3ji6|(|4Hj36|j#FK\",\"fields\":{\"TEXT\":\"collision status\"}},\"block\":{\"type\":\"text_join\",\"id\":\"SK~3!r4HLp-9/4Pm6U(*\",\"extraState\":{\"itemCount\":2},\"inputs\":{\"ADD0\":{\"block\":{\"type\":\"text\",\"id\":\"bQU!{3B:#tUArk!k`GRE\",\"fields\":{\"TEXT\":\"collision status:\"}}},\"ADD1\":{\"block\":{\"type\":\"variables_get\",\"id\":\"p_7e~BdibNM4`4AXZn#N\",\"fields\":{\"VAR\":{\"id\":\"/(Z|)5mME319$T[cI@SG\"}}}}}}}}}}}}}}}}}}}}}}}},{\"type\":\"note\",\"id\":\"Ob/8Uah9`;4K#:mvNy[;\",\"x\":49,\"y\":372,\"inputs\":{\"comment\":{\"shadow\":{\"type\":\"text\",\"id\":\"9(qw$5_^aWqbbd[E~$gw\",\"fields\":{\"TEXT\":\"Image #2\"}}}},\"next\":{\"block\":{\"type\":\"variables_set\",\"id\":\".UQ/*_w,CBSIqMPI(Rgx\",\"fields\":{\"VAR\":{\"id\":\"3P(-*k,iL46@4$m:4]?+\"}},\"inputs\":{\"VALUE\":{\"block\":{\"type\":\"ha.be.Spr.Muat\",\"id\":\"M[ZZf;mRYmbmP*W6-l`M\",\"inputs\":{\"url\":{\"shadow\":{\"type\":\"text\",\"id\":\"tb_Gt@GP/=[w}i:S(MpB\",\"fields\":{\"TEXT\":\"./imgs/box.png\"}}}}}}},\"next\":{\"block\":{\"type\":\"ha.be.Spr.Ukuran\",\"id\":\"_a=s)|9SkqfLN^3vXN(-\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\"#2{mAR:kQ7{:^]O5SzZ@\",\"fields\":{\"VAR\":{\"id\":\"3P(-*k,iL46@4$m:4]?+\"}}}},\"width\":{\"shadow\":{\"type\":\"math_number\",\"id\":\";_56uv/c2J?I),uDG7hr\",\"fields\":{\"NUM\":120}}},\"height\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"BQ/QMf=26dMvaqcR$BbN\",\"fields\":{\"NUM\":120}}}},\"next\":{\"block\":{\"type\":\"ha.be.Spr.Posisi\",\"id\":\"y~+Mo8`)=Kp,F6qj8:Tg\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\"*KQ68BiF9B[j+Z-^(|KX\",\"fields\":{\"VAR\":{\"id\":\"3P(-*k,iL46@4$m:4]?+\"}}}},\"x\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"-*$8#u*x-((?1SQdNNx`\",\"fields\":{\"NUM\":480}}},\"y\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"yc#g1HYbc+QZR$NQ;|MT\",\"fields\":{\"NUM\":240}}}}}}}}}}},{\"type\":\"note\",\"id\":\"p#VVS,I]6Pw#Xpehh;Xq\",\"x\":5,\"y\":174,\"inputs\":{\"comment\":{\"shadow\":{\"type\":\"text\",\"id\":\"h,;=wn!e:M-:lT-IjVHn\",\"fields\":{\"TEXT\":\"Image #1\"}}}},\"next\":{\"block\":{\"type\":\"variables_set\",\"id\":\"X9|QK7pf:.KI1pjVBr@2\",\"fields\":{\"VAR\":{\"id\":\"A0k8Ck#PrIl*XMc%C6nq\"}},\"inputs\":{\"VALUE\":{\"block\":{\"type\":\"ha.be.Spr.Muat\",\"id\":\"N,2n_hb^fPOwr8DlO!*I\",\"inputs\":{\"url\":{\"shadow\":{\"type\":\"text\",\"id\":\")TQI_DPDerl)m](sER.K\",\"fields\":{\"TEXT\":\"./imgs/box.png\"}}}}}}},\"next\":{\"block\":{\"type\":\"ha.be.Spr.Handle\",\"id\":\"5:J*wMjGliCM^t03VG*C\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\"Yp`Bet]Ar)c?I@|;0k|n\",\"fields\":{\"VAR\":{\"id\":\"A0k8Ck#PrIl*XMc%C6nq\"}}}},\"x\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"G6cFxu**`XNruep9MpB!\",\"fields\":{\"NUM\":320}}},\"y\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"6Ns]nL?7f_A4NqZBg?]4\",\"fields\":{\"NUM\":32}}}},\"next\":{\"block\":{\"type\":\"ha.be.Spr.Ukuran\",\"id\":\"dHbX$*E0*9Z*5]W|deJm\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\"yretwz!G3N-d*:;EoROz\",\"fields\":{\"VAR\":{\"id\":\"A0k8Ck#PrIl*XMc%C6nq\"}}}},\"width\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"`RxA]@U[8RNHCgjh+NJy\",\"fields\":{\"NUM\":640}}},\"height\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"@3Y-8t%pPVw.BMCb,cdh\",\"fields\":{\"NUM\":64}}}},\"next\":{\"block\":{\"type\":\"ha.be.Spr.Posisi\",\"id\":\"H|[Q67B#8)WxKlJ.{ybJ\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\"KA~CkZlu9bCsn_KSep:V\",\"fields\":{\"VAR\":{\"id\":\"A0k8Ck#PrIl*XMc%C6nq\"}}}},\"x\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"N3boLkiZC)YQw1i//ERI\",\"fields\":{\"NUM\":200}}},\"y\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"hv@u!0-+?v4f,8t{1kZ#\",\"fields\":{\"NUM\":240}}}}}}}}}}}}}]},\"variables\":[{\"name\":\"img\",\"id\":\"A0k8Ck#PrIl*XMc%C6nq\"},{\"name\":\"rotation\",\"id\":\"VkK%wOG:^w4r+jR3OSwl\"},{\"name\":\"img2\",\"id\":\"3P(-*k,iL46@4$m:4]?+\"},{\"name\":\"collisionStat\",\"id\":\"/(Z|)5mME319$T[cI@SG\"}]}"
        },
        {
            "id": "1702786373112",
            "type": "file",
            "nama": "",
            "parentId": "1702786373111",
            "wspace": "{\"blocks\":{\"languageVersion\":0,\"blocks\":[{\"type\":\"procedures_defnoreturn\",\"id\":\"@iZs`-A.)`GZTz%?Wh_j\",\"x\":560,\"y\":70,\"icons\":{\"comment\":{\"text\":\"Describe this function...\",\"pinned\":false,\"height\":80,\"width\":160}},\"fields\":{\"NAME\":\"update\"},\"inputs\":{\"STACK\":{\"block\":{\"type\":\"ha.be.Be.Bersih\",\"id\":\"(7d4VY9ISHI3=xQXw=c0\",\"next\":{\"block\":{\"type\":\"ha.be.Spr.Gambar\",\"id\":\"TKi]Pbe|YLS%b}yYe+1L\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\"Oxp^k?rAe(XG%z7DGmrI\",\"fields\":{\"VAR\":{\"id\":\"99*3xs_.J9FLSB`sp](v\"}}}},\"x\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"iR^9X(~I02#.l.kt.[;:\",\"fields\":{\"NUM\":120}}},\"y\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"Sn*[t/Kt[]3J~cg5t9-K\",\"fields\":{\"NUM\":100}}}}}}}}}},{\"type\":\"ha.be.Be.Grafis\",\"id\":\"HaDx$m%9L0)lj6v$4@k*\",\"x\":85,\"y\":50,\"inputs\":{\"width\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"1Yjl.$%bS/5z=@5Qd]V~\",\"fields\":{\"NUM\":320}}},\"height\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"?(lT9dOGdzVnQ.vcHAEI\",\"fields\":{\"NUM\":240}}}},\"next\":{\"block\":{\"type\":\"ha.be.Be.Bersih\",\"id\":\"P=3%M?Ud(^qXZB;*oeeA\",\"next\":{\"block\":{\"type\":\"variables_set\",\"id\":\"?BBuRH-xfVFsVL#ivCx)\",\"fields\":{\"VAR\":{\"id\":\"99*3xs_.J9FLSB`sp](v\"}},\"inputs\":{\"VALUE\":{\"block\":{\"type\":\"ha.be.Spr.Muat\",\"id\":\"-Wwr3nwkx~$;z$;b1tzu\",\"inputs\":{\"url\":{\"shadow\":{\"type\":\"text\",\"id\":\"tjz/~)*VQIRK@:47=aoI\",\"fields\":{\"TEXT\":\"./imgs/box.png\"}}}}}}}}}}}}]},\"variables\":[{\"name\":\"image\",\"id\":\"99*3xs_.J9FLSB`sp](v\"}]}"
        },
        {
            "id": "1702786387196",
            "type": "file",
            "nama": "",
            "parentId": "1702786387195",
            "wspace": "{\"blocks\":{\"languageVersion\":0,\"blocks\":[{\"type\":\"procedures_defnoreturn\",\"id\":\"@iZs`-A.)`GZTz%?Wh_j\",\"x\":560,\"y\":70,\"icons\":{\"comment\":{\"text\":\"Describe this function...\",\"pinned\":false,\"height\":80,\"width\":160}},\"fields\":{\"NAME\":\"update\"},\"inputs\":{\"STACK\":{\"block\":{\"type\":\"ha.be.Be.Bersih\",\"id\":\"(7d4VY9ISHI3=xQXw=c0\",\"next\":{\"block\":{\"type\":\"ha.be.Spr.Gambar\",\"id\":\"TKi]Pbe|YLS%b}yYe+1L\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\"Oxp^k?rAe(XG%z7DGmrI\",\"fields\":{\"VAR\":{\"id\":\"99*3xs_.J9FLSB`sp](v\"}}}},\"x\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"iR^9X(~I02#.l.kt.[;:\",\"fields\":{\"NUM\":120}}},\"y\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"Sn*[t/Kt[]3J~cg5t9-K\",\"fields\":{\"NUM\":100}}}}}}}}}},{\"type\":\"ha.be.Be.Grafis\",\"id\":\"HaDx$m%9L0)lj6v$4@k*\",\"x\":85,\"y\":50,\"inputs\":{\"width\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"1Yjl.$%bS/5z=@5Qd]V~\",\"fields\":{\"NUM\":320}}},\"height\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"?(lT9dOGdzVnQ.vcHAEI\",\"fields\":{\"NUM\":240}}}},\"next\":{\"block\":{\"type\":\"ha.be.Be.Bersih\",\"id\":\"P=3%M?Ud(^qXZB;*oeeA\",\"next\":{\"block\":{\"type\":\"variables_set\",\"id\":\"?BBuRH-xfVFsVL#ivCx)\",\"fields\":{\"VAR\":{\"id\":\"99*3xs_.J9FLSB`sp](v\"}},\"inputs\":{\"VALUE\":{\"block\":{\"type\":\"ha.be.Spr.Muat\",\"id\":\"-Wwr3nwkx~$;z$;b1tzu\",\"inputs\":{\"url\":{\"shadow\":{\"type\":\"text\",\"id\":\"tjz/~)*VQIRK@:47=aoI\",\"fields\":{\"TEXT\":\"./imgs/box.png\"}}}}}}}}}}}}]},\"variables\":[{\"name\":\"image\",\"id\":\"99*3xs_.J9FLSB`sp](v\"}]}"
        },
        {
            "id": "1702786438291",
            "type": "file",
            "nama": "",
            "parentId": "1702786438290",
            "wspace": "{\"blocks\":{\"languageVersion\":0,\"blocks\":[{\"type\":\"procedures_defnoreturn\",\"id\":\"@iZs`-A.)`GZTz%?Wh_j\",\"x\":616,\"y\":79,\"icons\":{\"comment\":{\"text\":\"Describe this function...\",\"pinned\":false,\"height\":80,\"width\":160}},\"fields\":{\"NAME\":\"update\"},\"inputs\":{\"STACK\":{\"block\":{\"type\":\"ha.be.Be.Bersih\",\"id\":\"(7d4VY9ISHI3=xQXw=c0\",\"next\":{\"block\":{\"type\":\"ha.be.Spr.Gambar\",\"id\":\"TKi]Pbe|YLS%b}yYe+1L\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\"Oxp^k?rAe(XG%z7DGmrI\",\"fields\":{\"VAR\":{\"id\":\"99*3xs_.J9FLSB`sp](v\"}}}},\"x\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"iR^9X(~I02#.l.kt.[;:\",\"fields\":{\"NUM\":120}}},\"y\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"Sn*[t/Kt[]3J~cg5t9-K\",\"fields\":{\"NUM\":100}}}}}}}}}},{\"type\":\"ha.be.Be.Grafis\",\"id\":\"HaDx$m%9L0)lj6v$4@k*\",\"x\":191,\"y\":95,\"inputs\":{\"width\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"1Yjl.$%bS/5z=@5Qd]V~\",\"fields\":{\"NUM\":320}}},\"height\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"?(lT9dOGdzVnQ.vcHAEI\",\"fields\":{\"NUM\":240}}}},\"next\":{\"block\":{\"type\":\"ha.be.Be.Bersih\",\"id\":\"P=3%M?Ud(^qXZB;*oeeA\",\"next\":{\"block\":{\"type\":\"variables_set\",\"id\":\"?BBuRH-xfVFsVL#ivCx)\",\"fields\":{\"VAR\":{\"id\":\"99*3xs_.J9FLSB`sp](v\"}},\"inputs\":{\"VALUE\":{\"block\":{\"type\":\"ha.be.Spr.Muat\",\"id\":\"-Wwr3nwkx~$;z$;b1tzu\",\"inputs\":{\"url\":{\"shadow\":{\"type\":\"text\",\"id\":\"tjz/~)*VQIRK@:47=aoI\",\"fields\":{\"TEXT\":\"./imgs/box.png\"}}}}}}}}}}}}]},\"variables\":[{\"name\":\"image\",\"id\":\"99*3xs_.J9FLSB`sp](v\"}]}"
        },
        {
            "id": "1702786941238",
            "type": "project",
            "nama": "00 drag image",
            "parentId": "-1"
        },
        {
            "id": "1702786941239",
            "type": "file",
            "nama": "1702733784746",
            "parentId": "1702786941238",
            "wspace": "{\"blocks\":{\"languageVersion\":0,\"blocks\":[{\"type\":\"procedures_defnoreturn\",\"id\":\"YAeHvg0folHqbP|w!o~O\",\"x\":479,\"y\":121,\"icons\":{\"comment\":{\"text\":\"Describe this function...\",\"pinned\":false,\"height\":80,\"width\":160}},\"fields\":{\"NAME\":\"update\"},\"inputs\":{\"STACK\":{\"block\":{\"type\":\"ha.be.Be.Bersih\",\"id\":\"(-Hw93,LiU7imvX*I;$%\",\"next\":{\"block\":{\"type\":\"ha.be.Teks.Goto\",\"id\":\"cItlX(@5nI;}y0xA==6r\",\"inputs\":{\"x\":{\"shadow\":{\"type\":\"math_number\",\"id\":\",E!hcTV.3ant6.uK$_K4\",\"fields\":{\"NUM\":0}}},\"y\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"03?s7IKPPKq=F)G@WfB-\",\"fields\":{\"NUM\":10}}}},\"next\":{\"block\":{\"type\":\"ha.be.Teks.WriteLn\",\"id\":\"eN|RC/,MiRt7HAq-~c0a\",\"inputs\":{\"text\":{\"shadow\":{\"type\":\"text\",\"id\":\"%ZN/U%LcDNU#%(/tMvbr\",\"fields\":{\"TEXT\":\"\"}},\"block\":{\"type\":\"text_join\",\"id\":\"!ldfwVre0mT6]+,|NmZr\",\"extraState\":{\"itemCount\":2},\"inputs\":{\"ADD0\":{\"block\":{\"type\":\"text\",\"id\":\"4JwLyvo+}b]uz!SSOe4K\",\"fields\":{\"TEXT\":\"Drag Image, \"}}},\"ADD1\":{\"block\":{\"type\":\"text_join\",\"id\":\"v)}nR+gu]dv4:e7S3g`-\",\"extraState\":{\"itemCount\":4},\"inputs\":{\"ADD0\":{\"block\":{\"type\":\"text\",\"id\":\"V}EA$f{zUiwyd^O^sCW#\",\"fields\":{\"TEXT\":\"position x: \"}}},\"ADD1\":{\"block\":{\"type\":\"ha.be.Spr.PosisiX\",\"id\":\"9dH!Y@XZSz1s@qP;9~-R\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\"^0Wl)nI]3IU[|D=e_y=+\",\"fields\":{\"VAR\":{\"id\":\"U/P;57A.cj6i*`rQ:Wkm\"}}}}}}},\"ADD2\":{\"block\":{\"type\":\"text\",\"id\":\"$i==hNm{|,%cD2r6=VN0\",\"fields\":{\"TEXT\":\" y: \"}}},\"ADD3\":{\"block\":{\"type\":\"ha.be.Spr.PosisiY\",\"id\":\"ZH}IKSsJbiUb-/w6Hs2~\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\"e8EQdI$On6Q8EVv0WDIG\",\"fields\":{\"VAR\":{\"id\":\"U/P;57A.cj6i*`rQ:Wkm\"}}}}}}}}}}}}}},\"next\":{\"block\":{\"type\":\"ha.be.Teks.WriteLn\",\"id\":\"Rz~7x}4,5MO`~m155a_I\",\"inputs\":{\"text\":{\"shadow\":{\"type\":\"text\",\"id\":\"OwLy6E^XyeXy0qVn+Q~5\",\"fields\":{\"TEXT\":\"\"}},\"block\":{\"type\":\"text_join\",\"id\":\"bR9|f|58}ZRpOn|?S%%E\",\"extraState\":{\"itemCount\":2},\"inputs\":{\"ADD0\":{\"block\":{\"type\":\"text\",\"id\":\"CBK$c.}e0L#16B:]q?ir\",\"fields\":{\"TEXT\":\"drag status: \"}}},\"ADD1\":{\"block\":{\"type\":\"ha.be.Spr.StatusDrag\",\"id\":\"X=`r4~_^:;K)^?RBAPfl\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\"x?Y9:~nw)[-G=66eNcv+\",\"fields\":{\"VAR\":{\"id\":\"U/P;57A.cj6i*`rQ:Wkm\"}}}}}}}}}}},\"next\":{\"block\":{\"type\":\"ha.be.Spr.GambarSemua\",\"id\":\".$2vnJV),.KPkOP$^`5H\"}}}}}}}}}}}},{\"type\":\"ha.be.Be.Grafis\",\"id\":\"+0cX1W]m4NbL#=Srz!0M\",\"x\":34,\"y\":17,\"inputs\":{\"width\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"pLz:_^C5wQ?SC*?o/tan\",\"fields\":{\"NUM\":320}}},\"height\":{\"shadow\":{\"type\":\"math_number\",\"id\":\":v-Gueqp;NeddO.fYkb/\",\"fields\":{\"NUM\":240}}}},\"next\":{\"block\":{\"type\":\"variables_set\",\"id\":\"g?Cp~3Fu590VYAhLs^Za\",\"fields\":{\"VAR\":{\"id\":\"U/P;57A.cj6i*`rQ:Wkm\"}},\"inputs\":{\"VALUE\":{\"block\":{\"type\":\"ha.be.Spr.Muat\",\"id\":\"vPfhzXl?GTZ@N~P+m3NC\",\"inputs\":{\"url\":{\"shadow\":{\"type\":\"text\",\"id\":\"pXgmitjH}Vj$av`a$Jn1\",\"fields\":{\"TEXT\":\"./imgs/box.png\"}}}}}}},\"next\":{\"block\":{\"type\":\"ha.be.Spr.DragMode\",\"id\":\"q3WCO0B]_`uxuyH9b/^;\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\"9qk,l~#6tZ@[9G1egxsZ\",\"fields\":{\"VAR\":{\"id\":\"U/P;57A.cj6i*`rQ:Wkm\"}}}},\"dragMode\":{\"shadow\":{\"type\":\"math_number\",\"id\":\":dId7|[V*VSg,ydUrw^_\",\"fields\":{\"NUM\":1}}}},\"next\":{\"block\":{\"type\":\"ha.be.Spr.Posisi\",\"id\":\"qX|j!kb7nyToCctsbxX#\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\",6,]t5YfA,j1|);-Ok$J\",\"fields\":{\"VAR\":{\"id\":\"U/P;57A.cj6i*`rQ:Wkm\"}}}},\"x\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"}LjN/+0E]/xy3cDrL9g@\",\"fields\":{\"NUM\":160}}},\"y\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"Y7N1PTUZ#u59/)BoxI`*\",\"fields\":{\"NUM\":120}}}}}}}}}}}]},\"variables\":[{\"name\":\"img\",\"id\":\"U/P;57A.cj6i*`rQ:Wkm\"}]}"
        },
        {
            "id": "1702787373422",
            "type": "project",
            "nama": "00 draw image 2",
            "parentId": "-1"
        },
        {
            "id": "1702787373423",
            "type": "file",
            "nama": "",
            "parentId": "1702787373422",
            "wspace": "{\"blocks\":{\"languageVersion\":0,\"blocks\":[{\"type\":\"procedures_defnoreturn\",\"id\":\"@iZs`-A.)`GZTz%?Wh_j\",\"x\":607,\"y\":136,\"icons\":{\"comment\":{\"text\":\"Describe this function...\",\"pinned\":false,\"height\":80,\"width\":160}},\"fields\":{\"NAME\":\"update\"},\"inputs\":{\"STACK\":{\"block\":{\"type\":\"ha.be.Be.Bersih\",\"id\":\"(7d4VY9ISHI3=xQXw=c0\",\"next\":{\"block\":{\"type\":\"ha.be.Spr.Gambar_no_frame\",\"id\":\":kEktmNw)h?c2[3u!fL0\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\";1C`O0Jr|:xxP@Zbjr5=\",\"fields\":{\"VAR\":{\"id\":\"99*3xs_.J9FLSB`sp](v\"}}}}}}}}}}},{\"type\":\"ha.be.Be.Grafis\",\"id\":\"HaDx$m%9L0)lj6v$4@k*\",\"x\":187,\"y\":160,\"inputs\":{\"width\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"1Yjl.$%bS/5z=@5Qd]V~\",\"fields\":{\"NUM\":320}}},\"height\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"?(lT9dOGdzVnQ.vcHAEI\",\"fields\":{\"NUM\":240}}}},\"next\":{\"block\":{\"type\":\"variables_set\",\"id\":\"?BBuRH-xfVFsVL#ivCx)\",\"fields\":{\"VAR\":{\"id\":\"99*3xs_.J9FLSB`sp](v\"}},\"inputs\":{\"VALUE\":{\"block\":{\"type\":\"ha.be.Spr.Muat\",\"id\":\"-Wwr3nwkx~$;z$;b1tzu\",\"inputs\":{\"url\":{\"shadow\":{\"type\":\"text\",\"id\":\"tjz/~)*VQIRK@:47=aoI\",\"fields\":{\"TEXT\":\"./imgs/box.png\"}}}}}}},\"next\":{\"block\":{\"type\":\"ha.be.Spr.Posisi\",\"id\":\"qo2(},A;@#H-Z;YgF(xL\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\":Exf|Z^~.L=e7[h3jaVb\",\"fields\":{\"VAR\":{\"id\":\"99*3xs_.J9FLSB`sp](v\"}}}},\"x\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"c(0$wroFAKXvuB~2[?VL\",\"fields\":{\"NUM\":100}}},\"y\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"VN~B`rOccf5-r!TJdI.P\",\"fields\":{\"NUM\":100}}}}}}}}}]},\"variables\":[{\"name\":\"image\",\"id\":\"99*3xs_.J9FLSB`sp](v\"}]}"
        },
        {
            "id": "1702788345641",
            "type": "file",
            "nama": "",
            "parentId": "1702788345640",
            "wspace": "{\"blocks\":{\"languageVersion\":0,\"blocks\":[{\"type\":\"procedures_defnoreturn\",\"id\":\"@iZs`-A.)`GZTz%?Wh_j\",\"x\":607,\"y\":136,\"icons\":{\"comment\":{\"text\":\"Describe this function...\",\"pinned\":false,\"height\":80,\"width\":160}},\"fields\":{\"NAME\":\"update\"},\"inputs\":{\"STACK\":{\"block\":{\"type\":\"ha.be.Be.Bersih\",\"id\":\"(7d4VY9ISHI3=xQXw=c0\",\"next\":{\"block\":{\"type\":\"ha.be.Spr.Ubin\",\"id\":\"5=rhF0|B(~0#T71UJr;2\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\"01V2on##LigG~5V:^wX)\",\"fields\":{\"VAR\":{\"id\":\"99*3xs_.J9FLSB`sp](v\"}}}},\"x\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"LuI!![saa}/6iFs;NB=]\",\"fields\":{\"NUM\":0}}},\"y\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"d/Dbm}13j1g2;r2$S-dT\",\"fields\":{\"NUM\":0}}},\"frame\":{\"shadow\":{\"type\":\"math_number\",\"id\":\":c@8t]ujv0eaU$c4q4/x\",\"fields\":{\"NUM\":0}}}}}}}}}},{\"type\":\"ha.be.Be.Grafis\",\"id\":\"HaDx$m%9L0)lj6v$4@k*\",\"x\":187,\"y\":160,\"inputs\":{\"width\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"1Yjl.$%bS/5z=@5Qd]V~\",\"fields\":{\"NUM\":320}}},\"height\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"?(lT9dOGdzVnQ.vcHAEI\",\"fields\":{\"NUM\":240}}}},\"next\":{\"block\":{\"type\":\"ha.be.Be.Bersih\",\"id\":\"P=3%M?Ud(^qXZB;*oeeA\",\"next\":{\"block\":{\"type\":\"variables_set\",\"id\":\"?BBuRH-xfVFsVL#ivCx)\",\"fields\":{\"VAR\":{\"id\":\"99*3xs_.J9FLSB`sp](v\"}},\"inputs\":{\"VALUE\":{\"block\":{\"type\":\"ha.be.Spr.Muat\",\"id\":\"-Wwr3nwkx~$;z$;b1tzu\",\"inputs\":{\"url\":{\"shadow\":{\"type\":\"text\",\"id\":\"tjz/~)*VQIRK@:47=aoI\",\"fields\":{\"TEXT\":\"./imgs/box.png\"}}}}}}}}}}}}]},\"variables\":[{\"name\":\"image\",\"id\":\"99*3xs_.J9FLSB`sp](v\"}]}"
        },
        {
            "id": "1702822414257",
            "type": "file",
            "nama": "",
            "parentId": "1702822414256",
            "wspace": "{\"blocks\":{\"languageVersion\":0,\"blocks\":[{\"type\":\"procedures_defnoreturn\",\"id\":\"@iZs`-A.)`GZTz%?Wh_j\",\"x\":607,\"y\":136,\"icons\":{\"comment\":{\"text\":\"Describe this function...\",\"pinned\":false,\"height\":80,\"width\":160}},\"fields\":{\"NAME\":\"update\"},\"inputs\":{\"STACK\":{\"block\":{\"type\":\"ha.be.Be.Bersih\",\"id\":\"(7d4VY9ISHI3=xQXw=c0\",\"next\":{\"block\":{\"type\":\"ha.be.Spr.Gambar\",\"id\":\"TKi]Pbe|YLS%b}yYe+1L\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\"Oxp^k?rAe(XG%z7DGmrI\",\"fields\":{\"VAR\":{\"id\":\"99*3xs_.J9FLSB`sp](v\"}}}},\"x\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"iR^9X(~I02#.l.kt.[;:\",\"fields\":{\"NUM\":120}}},\"y\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"Sn*[t/Kt[]3J~cg5t9-K\",\"fields\":{\"NUM\":100}}}}}}}}}},{\"type\":\"ha.be.Be.Grafis\",\"id\":\"HaDx$m%9L0)lj6v$4@k*\",\"x\":187,\"y\":160,\"inputs\":{\"width\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"1Yjl.$%bS/5z=@5Qd]V~\",\"fields\":{\"NUM\":320}}},\"height\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"?(lT9dOGdzVnQ.vcHAEI\",\"fields\":{\"NUM\":240}}}},\"next\":{\"block\":{\"type\":\"ha.be.Be.Bersih\",\"id\":\"P=3%M?Ud(^qXZB;*oeeA\",\"next\":{\"block\":{\"type\":\"variables_set\",\"id\":\"?BBuRH-xfVFsVL#ivCx)\",\"fields\":{\"VAR\":{\"id\":\"99*3xs_.J9FLSB`sp](v\"}},\"inputs\":{\"VALUE\":{\"block\":{\"type\":\"ha.be.Spr.Muat\",\"id\":\"-Wwr3nwkx~$;z$;b1tzu\",\"inputs\":{\"url\":{\"shadow\":{\"type\":\"text\",\"id\":\"tjz/~)*VQIRK@:47=aoI\",\"fields\":{\"TEXT\":\"./imgs/box.png\"}}}}}}}}}}}}]},\"variables\":[{\"name\":\"image\",\"id\":\"99*3xs_.J9FLSB`sp](v\"}]}"
        },
        {
            "id": "1702890361398",
            "type": "file",
            "nama": "1702737718631",
            "parentId": "1702890361397",
            "wspace": "{\"blocks\":{\"languageVersion\":0,\"blocks\":[{\"type\":\"ha.be.Be.Grafis\",\"id\":\"A;e@.|QUk^%DE2Wr6c9Q\",\"x\":-92,\"y\":2,\"inputs\":{\"width\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"9WA==wu6RE`1Nr.%61pq\",\"fields\":{\"NUM\":640}}},\"height\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"T!Z_3t%]S(C#0`bfmDti\",\"fields\":{\"NUM\":480}}}},\"next\":{\"block\":{\"type\":\"variables_set\",\"id\":\"YBoGw+3Rg1cuPu)JolG5\",\"fields\":{\"VAR\":{\"id\":\"VkK%wOG:^w4r+jR3OSwl\"}},\"inputs\":{\"VALUE\":{\"block\":{\"type\":\"math_number\",\"id\":\"bJrtrVrtc4%NV9dI1Wq3\",\"fields\":{\"NUM\":45}}}},\"next\":{\"block\":{\"type\":\"ha.be.Teks.Goto\",\"id\":\"k9DLyzGc1_k#Os$XYkz*\",\"inputs\":{\"x\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"|ma{5u-?y$g#_hweQ)x$\",\"fields\":{\"NUM\":320}}},\"y\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"2+SV7hG]^$,RBfx8]1|_\",\"fields\":{\"NUM\":20}}}},\"next\":{\"block\":{\"type\":\"note\",\"id\":\"G%OY2#dt*Rz4qZ;Z^~U2\",\"inputs\":{\"comment\":{\"shadow\":{\"type\":\"text\",\"id\":\"v3087sp%gW4$n^~ucU@z\",\"fields\":{\"TEXT\":\"img #1\"}}}},\"next\":{\"block\":{\"type\":\"variables_set\",\"id\":\"X9|QK7pf:.KI1pjVBr@2\",\"fields\":{\"VAR\":{\"id\":\"A0k8Ck#PrIl*XMc%C6nq\"}},\"inputs\":{\"VALUE\":{\"block\":{\"type\":\"ha.be.Spr.Muat\",\"id\":\"N,2n_hb^fPOwr8DlO!*I\",\"inputs\":{\"url\":{\"shadow\":{\"type\":\"text\",\"id\":\")TQI_DPDerl)m](sER.K\",\"fields\":{\"TEXT\":\"./imgs/box.png\"}}}}}}},\"next\":{\"block\":{\"type\":\"ha.be.Spr.Handle\",\"id\":\"5:J*wMjGliCM^t03VG*C\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\"Yp`Bet]Ar)c?I@|;0k|n\",\"fields\":{\"VAR\":{\"id\":\"A0k8Ck#PrIl*XMc%C6nq\"}}}},\"x\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"G6cFxu**`XNruep9MpB!\",\"fields\":{\"NUM\":320}}},\"y\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"6Ns]nL?7f_A4NqZBg?]4\",\"fields\":{\"NUM\":32}}}},\"next\":{\"block\":{\"type\":\"ha.be.Spr.Ukuran\",\"id\":\"dHbX$*E0*9Z*5]W|deJm\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\"yretwz!G3N-d*:;EoROz\",\"fields\":{\"VAR\":{\"id\":\"A0k8Ck#PrIl*XMc%C6nq\"}}}},\"width\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"`RxA]@U[8RNHCgjh+NJy\",\"fields\":{\"NUM\":640}}},\"height\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"@3Y-8t%pPVw.BMCb,cdh\",\"fields\":{\"NUM\":64}}}},\"next\":{\"block\":{\"type\":\"note\",\"id\":\"|5{!gO]{dlwElR^d6K[I\",\"inputs\":{\"comment\":{\"shadow\":{\"type\":\"text\",\"id\":\"ENb@L[r3Aae`lTXs%(o}\",\"fields\":{\"TEXT\":\"img #2\"}}}},\"next\":{\"block\":{\"type\":\"variables_set\",\"id\":\".UQ/*_w,CBSIqMPI(Rgx\",\"fields\":{\"VAR\":{\"id\":\"3P(-*k,iL46@4$m:4]?+\"}},\"inputs\":{\"VALUE\":{\"block\":{\"type\":\"ha.be.Spr.Muat\",\"id\":\"M[ZZf;mRYmbmP*W6-l`M\",\"inputs\":{\"url\":{\"shadow\":{\"type\":\"text\",\"id\":\"tb_Gt@GP/=[w}i:S(MpB\",\"fields\":{\"TEXT\":\"./imgs/box.png\"}}}}}}},\"next\":{\"block\":{\"type\":\"ha.be.Spr.Ukuran\",\"id\":\"_a=s)|9SkqfLN^3vXN(-\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\"#2{mAR:kQ7{:^]O5SzZ@\",\"fields\":{\"VAR\":{\"id\":\"3P(-*k,iL46@4$m:4]?+\"}}}},\"width\":{\"shadow\":{\"type\":\"math_number\",\"id\":\";_56uv/c2J?I),uDG7hr\",\"fields\":{\"NUM\":120}}},\"height\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"BQ/QMf=26dMvaqcR$BbN\",\"fields\":{\"NUM\":120}}}}}}}}}}}}}}}}}}}}}}},{\"type\":\"procedures_defnoreturn\",\"id\":\"tiLTEq`Rv!*_k(!M,VN)\",\"x\":483,\"y\":8,\"icons\":{\"comment\":{\"text\":\"Describe this function...\",\"pinned\":false,\"height\":80,\"width\":160}},\"fields\":{\"NAME\":\"update\"},\"inputs\":{\"STACK\":{\"block\":{\"type\":\"math_change\",\"id\":\"KRBqB8EgETwA]%)VMr0g\",\"fields\":{\"VAR\":{\"id\":\"VkK%wOG:^w4r+jR3OSwl\"}},\"inputs\":{\"DELTA\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"FgtD*,GO6xMW`?v8Xumx\",\"fields\":{\"NUM\":1}}}},\"next\":{\"block\":{\"type\":\"ha.be.Spr.Rotasi\",\"id\":\"Osj,XwZ!%WtmRf}+rxsV\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\"!7WQR(S~--zTC)3B:fj2\",\"fields\":{\"VAR\":{\"id\":\"A0k8Ck#PrIl*XMc%C6nq\"}}}},\"angle\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"m:E^C%|i:+XOeWLbmNw[\",\"fields\":{\"NUM\":0}},\"block\":{\"type\":\"variables_get\",\"id\":\"^7L[^l{LSudIG$G#{SK9\",\"fields\":{\"VAR\":{\"id\":\"VkK%wOG:^w4r+jR3OSwl\"}}}}},\"next\":{\"block\":{\"type\":\"variables_set\",\"id\":\"bR`e[i]y6OomcC;ucHR}\",\"fields\":{\"VAR\":{\"id\":\"/(Z|)5mME319$T[cI@SG\"}},\"inputs\":{\"VALUE\":{\"block\":{\"type\":\"ha.be.Spr.TabrakanXY\",\"id\":\"_mjvdsf.76n9,uc3g1u3\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\"@f`+TE*82|LE3WX^3ygv\",\"fields\":{\"VAR\":{\"id\":\"A0k8Ck#PrIl*XMc%C6nq\"}}}},\"x1\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"oX^E@LFHS7YkYN:9#$z;\",\"fields\":{\"NUM\":200}}},\"y1\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"oJM=bwYR+9p5[Z{]!Gjp\",\"fields\":{\"NUM\":240}}},\"sprite2\":{\"block\":{\"type\":\"variables_get\",\"id\":\"8jl}SEc!-)|g8Ztq40k?\",\"fields\":{\"VAR\":{\"id\":\"3P(-*k,iL46@4$m:4]?+\"}}}},\"x2\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"d`QLgoIB)2nz0QpeQ*$p\",\"fields\":{\"NUM\":480}}},\"y2\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"}*x/+|i/@D?Jji%,,;qh\",\"fields\":{\"NUM\":240}}}}}}},\"next\":{\"block\":{\"type\":\"note\",\"id\":\"_4,KD+3jC,KH7ctm|5I3\",\"inputs\":{\"comment\":{\"shadow\":{\"type\":\"text\",\"id\":\"kzm1RNB*N`Q(|XNA}|LJ\",\"fields\":{\"TEXT\":\"render\"}}}},\"next\":{\"block\":{\"type\":\"ha.be.Be.Bersih\",\"id\":\"w=[?@!uJYM;BE1l}IwBv\",\"next\":{\"block\":{\"type\":\"ha.be.Spr.Gambar\",\"id\":\"Y;nVsZ:mkO;Ic=/ptF_o\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\"FLC|ovT@!v4+ngvkZ_?S\",\"fields\":{\"VAR\":{\"id\":\"A0k8Ck#PrIl*XMc%C6nq\"}}}},\"x\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"3zkk85CZoTYUgaZ!U,xk\",\"fields\":{\"NUM\":200}}},\"y\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"Dj,A@l:)6CTSh:dVXnwJ\",\"fields\":{\"NUM\":240}}}},\"next\":{\"block\":{\"type\":\"ha.be.Spr.Gambar\",\"id\":\"Nw-$nL`8SObe|htVm:n=\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\"C/yB=`ta]TyAka+[L6IH\",\"fields\":{\"VAR\":{\"id\":\"3P(-*k,iL46@4$m:4]?+\"}}}},\"x\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"Ve!!=inpzwLYsRHZpNTE\",\"fields\":{\"NUM\":480}}},\"y\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"(AoM#T@+IG*,W1;=^XR2\",\"fields\":{\"NUM\":240}}}},\"next\":{\"block\":{\"type\":\"ha.be.Teks.Write\",\"id\":\"#e*iN4d((~HOq[2$uP6_\",\"inputs\":{\"text\":{\"shadow\":{\"type\":\"text\",\"id\":\"{9L3ji6|(|4Hj36|j#FK\",\"fields\":{\"TEXT\":\"collision status\"}},\"block\":{\"type\":\"text_join\",\"id\":\"SK~3!r4HLp-9/4Pm6U(*\",\"extraState\":{\"itemCount\":2},\"inputs\":{\"ADD0\":{\"block\":{\"type\":\"text\",\"id\":\"bQU!{3B:#tUArk!k`GRE\",\"fields\":{\"TEXT\":\"collision status:\"}}},\"ADD1\":{\"block\":{\"type\":\"variables_get\",\"id\":\"p_7e~BdibNM4`4AXZn#N\",\"fields\":{\"VAR\":{\"id\":\"/(Z|)5mME319$T[cI@SG\"}}}}}}}}}}}}}}}}}}}}}}}}}}]},\"variables\":[{\"name\":\"img\",\"id\":\"A0k8Ck#PrIl*XMc%C6nq\"},{\"name\":\"rotation\",\"id\":\"VkK%wOG:^w4r+jR3OSwl\"},{\"name\":\"img2\",\"id\":\"3P(-*k,iL46@4$m:4]?+\"},{\"name\":\"collisionStat\",\"id\":\"/(Z|)5mME319$T[cI@SG\"}]}"
        },
        {
            "id": "1702890662383",
            "type": "file",
            "nama": "1702739076684",
            "parentId": "1702890662382",
            "wspace": "{\"blocks\":{\"languageVersion\":0,\"blocks\":[{\"type\":\"ha.be.Be.Grafis\",\"id\":\"A;e@.|QUk^%DE2Wr6c9Q\",\"x\":38,\"y\":21,\"inputs\":{\"width\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"9WA==wu6RE`1Nr.%61pq\",\"fields\":{\"NUM\":640}}},\"height\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"T!Z_3t%]S(C#0`bfmDti\",\"fields\":{\"NUM\":480}}}},\"next\":{\"block\":{\"type\":\"variables_set\",\"id\":\"YBoGw+3Rg1cuPu)JolG5\",\"fields\":{\"VAR\":{\"id\":\"VkK%wOG:^w4r+jR3OSwl\"}},\"inputs\":{\"VALUE\":{\"block\":{\"type\":\"math_number\",\"id\":\"bJrtrVrtc4%NV9dI1Wq3\",\"fields\":{\"NUM\":45}}}},\"next\":{\"block\":{\"type\":\"variables_set\",\"id\":\"k;tBJ#cBag7(Zw#][ook\",\"fields\":{\"VAR\":{\"id\":\"/(Z|)5mME319$T[cI@SG\"}},\"inputs\":{\"VALUE\":{\"block\":{\"type\":\"logic_boolean\",\"id\":\"B3yb)A`kSlBP*s|wtU2p\",\"fields\":{\"BOOL\":\"TRUE\"}}}},\"next\":{\"block\":{\"type\":\"ha.be.Teks.Goto\",\"id\":\"k9DLyzGc1_k#Os$XYkz*\",\"inputs\":{\"x\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"|ma{5u-?y$g#_hweQ)x$\",\"fields\":{\"NUM\":320}}},\"y\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"2+SV7hG]^$,RBfx8]1|_\",\"fields\":{\"NUM\":20}}}},\"next\":{\"block\":{\"type\":\"note\",\"id\":\"p#VVS,I]6Pw#Xpehh;Xq\",\"inputs\":{\"comment\":{\"shadow\":{\"type\":\"text\",\"id\":\"h,;=wn!e:M-:lT-IjVHn\",\"fields\":{\"TEXT\":\"Image #1\"}}}},\"next\":{\"block\":{\"type\":\"variables_set\",\"id\":\"X9|QK7pf:.KI1pjVBr@2\",\"fields\":{\"VAR\":{\"id\":\"A0k8Ck#PrIl*XMc%C6nq\"}},\"inputs\":{\"VALUE\":{\"block\":{\"type\":\"ha.be.Spr.Muat\",\"id\":\"N,2n_hb^fPOwr8DlO!*I\",\"inputs\":{\"url\":{\"shadow\":{\"type\":\"text\",\"id\":\")TQI_DPDerl)m](sER.K\",\"fields\":{\"TEXT\":\"./imgs/box.png\"}}}}}}},\"next\":{\"block\":{\"type\":\"ha.be.Spr.Handle\",\"id\":\"5:J*wMjGliCM^t03VG*C\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\"Yp`Bet]Ar)c?I@|;0k|n\",\"fields\":{\"VAR\":{\"id\":\"A0k8Ck#PrIl*XMc%C6nq\"}}}},\"x\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"G6cFxu**`XNruep9MpB!\",\"fields\":{\"NUM\":320}}},\"y\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"6Ns]nL?7f_A4NqZBg?]4\",\"fields\":{\"NUM\":32}}}},\"next\":{\"block\":{\"type\":\"ha.be.Spr.Ukuran\",\"id\":\"dHbX$*E0*9Z*5]W|deJm\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\"yretwz!G3N-d*:;EoROz\",\"fields\":{\"VAR\":{\"id\":\"A0k8Ck#PrIl*XMc%C6nq\"}}}},\"width\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"`RxA]@U[8RNHCgjh+NJy\",\"fields\":{\"NUM\":640}}},\"height\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"@3Y-8t%pPVw.BMCb,cdh\",\"fields\":{\"NUM\":64}}}},\"next\":{\"block\":{\"type\":\"ha.be.Spr.Posisi\",\"id\":\"H|[Q67B#8)WxKlJ.{ybJ\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\"KA~CkZlu9bCsn_KSep:V\",\"fields\":{\"VAR\":{\"id\":\"A0k8Ck#PrIl*XMc%C6nq\"}}}},\"x\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"N3boLkiZC)YQw1i//ERI\",\"fields\":{\"NUM\":200}}},\"y\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"hv@u!0-+?v4f,8t{1kZ#\",\"fields\":{\"NUM\":240}}}},\"next\":{\"block\":{\"type\":\"note\",\"id\":\"Ob/8Uah9`;4K#:mvNy[;\",\"inputs\":{\"comment\":{\"shadow\":{\"type\":\"text\",\"id\":\"9(qw$5_^aWqbbd[E~$gw\",\"fields\":{\"TEXT\":\"Image #2\"}}}},\"next\":{\"block\":{\"type\":\"variables_set\",\"id\":\".UQ/*_w,CBSIqMPI(Rgx\",\"fields\":{\"VAR\":{\"id\":\"3P(-*k,iL46@4$m:4]?+\"}},\"inputs\":{\"VALUE\":{\"block\":{\"type\":\"ha.be.Spr.Muat\",\"id\":\"M[ZZf;mRYmbmP*W6-l`M\",\"inputs\":{\"url\":{\"shadow\":{\"type\":\"text\",\"id\":\"tb_Gt@GP/=[w}i:S(MpB\",\"fields\":{\"TEXT\":\"./imgs/box.png\"}}}}}}},\"next\":{\"block\":{\"type\":\"ha.be.Spr.Ukuran\",\"id\":\"_a=s)|9SkqfLN^3vXN(-\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\"#2{mAR:kQ7{:^]O5SzZ@\",\"fields\":{\"VAR\":{\"id\":\"3P(-*k,iL46@4$m:4]?+\"}}}},\"width\":{\"shadow\":{\"type\":\"math_number\",\"id\":\";_56uv/c2J?I),uDG7hr\",\"fields\":{\"NUM\":120}}},\"height\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"BQ/QMf=26dMvaqcR$BbN\",\"fields\":{\"NUM\":120}}}},\"next\":{\"block\":{\"type\":\"ha.be.Spr.Posisi\",\"id\":\"y~+Mo8`)=Kp,F6qj8:Tg\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\"*KQ68BiF9B[j+Z-^(|KX\",\"fields\":{\"VAR\":{\"id\":\"3P(-*k,iL46@4$m:4]?+\"}}}},\"x\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"-*$8#u*x-((?1SQdNNx`\",\"fields\":{\"NUM\":480}}},\"y\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"yc#g1HYbc+QZR$NQ;|MT\",\"fields\":{\"NUM\":240}}}}}}}}}}}}}}}}}}}}}}}}}}}}},{\"type\":\"procedures_defnoreturn\",\"id\":\"tiLTEq`Rv!*_k(!M,VN)\",\"x\":521,\"y\":3,\"icons\":{\"comment\":{\"text\":\"Describe this function...\",\"pinned\":false,\"height\":80,\"width\":160}},\"fields\":{\"NAME\":\"update\"},\"inputs\":{\"STACK\":{\"block\":{\"type\":\"math_change\",\"id\":\"KRBqB8EgETwA]%)VMr0g\",\"fields\":{\"VAR\":{\"id\":\"VkK%wOG:^w4r+jR3OSwl\"}},\"inputs\":{\"DELTA\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"FgtD*,GO6xMW`?v8Xumx\",\"fields\":{\"NUM\":1}}}},\"next\":{\"block\":{\"type\":\"ha.be.Spr.Rotasi\",\"id\":\"Osj,XwZ!%WtmRf}+rxsV\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\"!7WQR(S~--zTC)3B:fj2\",\"fields\":{\"VAR\":{\"id\":\"A0k8Ck#PrIl*XMc%C6nq\"}}}},\"angle\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"m:E^C%|i:+XOeWLbmNw[\",\"fields\":{\"NUM\":0}},\"block\":{\"type\":\"variables_get\",\"id\":\"^7L[^l{LSudIG$G#{SK9\",\"fields\":{\"VAR\":{\"id\":\"VkK%wOG:^w4r+jR3OSwl\"}}}}},\"next\":{\"block\":{\"type\":\"variables_set\",\"id\":\"hSOZrjQ`CuX8-2%pi8eH\",\"fields\":{\"VAR\":{\"id\":\"/(Z|)5mME319$T[cI@SG\"}},\"inputs\":{\"VALUE\":{\"block\":{\"type\":\"ha.be.Spr.Tabrakan\",\"id\":\"1DBTb@!UzRaU1%fx]q#t\",\"inputs\":{\"sprite1\":{\"block\":{\"type\":\"variables_get\",\"id\":\"TRN#!(4g4(TCiqm6ACdl\",\"fields\":{\"VAR\":{\"id\":\"A0k8Ck#PrIl*XMc%C6nq\"}}}},\"sprite2\":{\"block\":{\"type\":\"variables_get\",\"id\":\"0,3e(8*X#}G=[;K9*e)l\",\"fields\":{\"VAR\":{\"id\":\"3P(-*k,iL46@4$m:4]?+\"}}}}}}}},\"next\":{\"block\":{\"type\":\"note\",\"id\":\"TnU!#mE8:T_8@^qFnz0c\",\"inputs\":{\"comment\":{\"shadow\":{\"type\":\"text\",\"id\":\"qwfy+@{N[2vI(FOO1G:c\",\"fields\":{\"TEXT\":\"render\"}}}},\"next\":{\"block\":{\"type\":\"ha.be.Be.Bersih\",\"id\":\"w=[?@!uJYM;BE1l}IwBv\",\"next\":{\"block\":{\"type\":\"ha.be.Spr.GambarSemua\",\"id\":\"=HKU#|TWzo9Fg:c_4uLr\",\"next\":{\"block\":{\"type\":\"ha.be.Teks.Write\",\"id\":\"#e*iN4d((~HOq[2$uP6_\",\"inputs\":{\"text\":{\"shadow\":{\"type\":\"text\",\"id\":\"{9L3ji6|(|4Hj36|j#FK\",\"fields\":{\"TEXT\":\"collision status\"}},\"block\":{\"type\":\"text_join\",\"id\":\"SK~3!r4HLp-9/4Pm6U(*\",\"extraState\":{\"itemCount\":2},\"inputs\":{\"ADD0\":{\"block\":{\"type\":\"text\",\"id\":\"bQU!{3B:#tUArk!k`GRE\",\"fields\":{\"TEXT\":\"collision status:\"}}},\"ADD1\":{\"block\":{\"type\":\"variables_get\",\"id\":\"p_7e~BdibNM4`4AXZn#N\",\"fields\":{\"VAR\":{\"id\":\"/(Z|)5mME319$T[cI@SG\"}}}}}}}}}}}}}}}}}}}}}}}}]},\"variables\":[{\"name\":\"img\",\"id\":\"A0k8Ck#PrIl*XMc%C6nq\"},{\"name\":\"rotation\",\"id\":\"VkK%wOG:^w4r+jR3OSwl\"},{\"name\":\"img2\",\"id\":\"3P(-*k,iL46@4$m:4]?+\"},{\"name\":\"collisionStat\",\"id\":\"/(Z|)5mME319$T[cI@SG\"}]}"
        },
        {
            "id": "69231702908083910",
            "type": "project",
            "nama": "00 draw image 3",
            "parentId": "-1"
        },
        {
            "id": "69231702908083911",
            "type": "file",
            "nama": "1702787373423",
            "parentId": "69231702908083910",
            "wspace": "{\"blocks\":{\"languageVersion\":0,\"blocks\":[{\"type\":\"procedures_defnoreturn\",\"id\":\"@iZs`-A.)`GZTz%?Wh_j\",\"x\":607,\"y\":136,\"icons\":{\"comment\":{\"text\":\"Describe this function...\",\"pinned\":false,\"height\":80,\"width\":160}},\"fields\":{\"NAME\":\"update\"},\"inputs\":{\"STACK\":{\"block\":{\"type\":\"ha.be.Be.Bersih\",\"id\":\"(7d4VY9ISHI3=xQXw=c0\",\"next\":{\"block\":{\"type\":\"ha.be.Spr.GambarSemua\",\"id\":\"0W^U:kI9KR*ZPkNNDZ1E\"}}}}}},{\"type\":\"ha.be.Be.Grafis\",\"id\":\"HaDx$m%9L0)lj6v$4@k*\",\"x\":28,\"y\":109,\"inputs\":{\"width\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"1Yjl.$%bS/5z=@5Qd]V~\",\"fields\":{\"NUM\":320}}},\"height\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"?(lT9dOGdzVnQ.vcHAEI\",\"fields\":{\"NUM\":240}}}},\"next\":{\"block\":{\"type\":\"variables_set\",\"id\":\"?BBuRH-xfVFsVL#ivCx)\",\"fields\":{\"VAR\":{\"id\":\"99*3xs_.J9FLSB`sp](v\"}},\"inputs\":{\"VALUE\":{\"block\":{\"type\":\"ha.be.Spr.Muat\",\"id\":\"-Wwr3nwkx~$;z$;b1tzu\",\"inputs\":{\"url\":{\"shadow\":{\"type\":\"text\",\"id\":\"tjz/~)*VQIRK@:47=aoI\",\"fields\":{\"TEXT\":\"./imgs/box.png\"}}}}}}},\"next\":{\"block\":{\"type\":\"ha.be.Spr.Posisi\",\"id\":\"qo2(},A;@#H-Z;YgF(xL\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\":Exf|Z^~.L=e7[h3jaVb\",\"fields\":{\"VAR\":{\"id\":\"99*3xs_.J9FLSB`sp](v\"}}}},\"x\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"c(0$wroFAKXvuB~2[?VL\",\"fields\":{\"NUM\":100}}},\"y\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"VN~B`rOccf5-r!TJdI.P\",\"fields\":{\"NUM\":100}}}}}}}}}]},\"variables\":[{\"name\":\"image\",\"id\":\"99*3xs_.J9FLSB`sp](v\"}]}"
        },
        {
            "id": "69231702908083912",
            "type": "project",
            "nama": "00 resize image",
            "parentId": "-1"
        },
        {
            "id": "69231702908083913",
            "type": "file",
            "nama": "69231702908083911",
            "parentId": "69231702908083912",
            "wspace": "{\"blocks\":{\"languageVersion\":0,\"blocks\":[{\"type\":\"procedures_defnoreturn\",\"id\":\"@iZs`-A.)`GZTz%?Wh_j\",\"x\":607,\"y\":136,\"icons\":{\"comment\":{\"text\":\"Describe this function...\",\"pinned\":false,\"height\":80,\"width\":160}},\"fields\":{\"NAME\":\"update\"},\"inputs\":{\"STACK\":{\"block\":{\"type\":\"ha.be.Be.Bersih\",\"id\":\"(7d4VY9ISHI3=xQXw=c0\",\"next\":{\"block\":{\"type\":\"ha.be.Spr.GambarSemua\",\"id\":\"0W^U:kI9KR*ZPkNNDZ1E\"}}}}}},{\"type\":\"ha.be.Be.Grafis\",\"id\":\"HaDx$m%9L0)lj6v$4@k*\",\"x\":28,\"y\":109,\"inputs\":{\"width\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"1Yjl.$%bS/5z=@5Qd]V~\",\"fields\":{\"NUM\":320}}},\"height\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"?(lT9dOGdzVnQ.vcHAEI\",\"fields\":{\"NUM\":240}}}},\"next\":{\"block\":{\"type\":\"variables_set\",\"id\":\"?BBuRH-xfVFsVL#ivCx)\",\"fields\":{\"VAR\":{\"id\":\"99*3xs_.J9FLSB`sp](v\"}},\"inputs\":{\"VALUE\":{\"block\":{\"type\":\"ha.be.Spr.Muat\",\"id\":\"-Wwr3nwkx~$;z$;b1tzu\",\"inputs\":{\"url\":{\"shadow\":{\"type\":\"text\",\"id\":\"tjz/~)*VQIRK@:47=aoI\",\"fields\":{\"TEXT\":\"./imgs/box.png\"}}}}}}},\"next\":{\"block\":{\"type\":\"ha.be.Spr.Posisi\",\"id\":\"qo2(},A;@#H-Z;YgF(xL\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\":Exf|Z^~.L=e7[h3jaVb\",\"fields\":{\"VAR\":{\"id\":\"99*3xs_.J9FLSB`sp](v\"}}}},\"x\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"c(0$wroFAKXvuB~2[?VL\",\"fields\":{\"NUM\":100}}},\"y\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"VN~B`rOccf5-r!TJdI.P\",\"fields\":{\"NUM\":100}}}},\"next\":{\"block\":{\"type\":\"ha.be.Spr.Ukuran\",\"id\":\"[m`#KzslgmuC]?3I/^|r\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\"f7^p9C=7O=b6-z_EeP;S\",\"fields\":{\"VAR\":{\"id\":\"99*3xs_.J9FLSB`sp](v\"}}}},\"width\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"#(N%B8`.s/6H$#TZ5d~p\",\"fields\":{\"NUM\":48}}},\"height\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"%JAw}/@{Cvnnu@;-B`YF\",\"fields\":{\"NUM\":24}}}}}}}}}}}]},\"variables\":[{\"name\":\"image\",\"id\":\"99*3xs_.J9FLSB`sp](v\"}]}"
        },
        {
            "id": "69231702908083915",
            "type": "file",
            "nama": "69231702908083913",
            "parentId": "69231702908083914",
            "wspace": "{\"blocks\":{\"languageVersion\":0,\"blocks\":[{\"type\":\"procedures_defnoreturn\",\"id\":\"@iZs`-A.)`GZTz%?Wh_j\",\"x\":607,\"y\":136,\"icons\":{\"comment\":{\"text\":\"Describe this function...\",\"pinned\":false,\"height\":80,\"width\":160}},\"fields\":{\"NAME\":\"update\"},\"inputs\":{\"STACK\":{\"block\":{\"type\":\"ha.be.Be.Bersih\",\"id\":\"(7d4VY9ISHI3=xQXw=c0\",\"next\":{\"block\":{\"type\":\"ha.be.Spr.GambarSemua\",\"id\":\"0W^U:kI9KR*ZPkNNDZ1E\"}}}}}},{\"type\":\"ha.be.Be.Grafis\",\"id\":\"HaDx$m%9L0)lj6v$4@k*\",\"x\":28,\"y\":109,\"inputs\":{\"width\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"1Yjl.$%bS/5z=@5Qd]V~\",\"fields\":{\"NUM\":320}}},\"height\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"?(lT9dOGdzVnQ.vcHAEI\",\"fields\":{\"NUM\":240}}}},\"next\":{\"block\":{\"type\":\"variables_set\",\"id\":\"?BBuRH-xfVFsVL#ivCx)\",\"fields\":{\"VAR\":{\"id\":\"99*3xs_.J9FLSB`sp](v\"}},\"inputs\":{\"VALUE\":{\"block\":{\"type\":\"ha.be.Spr.Muat\",\"id\":\"-Wwr3nwkx~$;z$;b1tzu\",\"inputs\":{\"url\":{\"shadow\":{\"type\":\"text\",\"id\":\"tjz/~)*VQIRK@:47=aoI\",\"fields\":{\"TEXT\":\"./imgs/box.png\"}}}}}}},\"next\":{\"block\":{\"type\":\"ha.be.Spr.Posisi\",\"id\":\"qo2(},A;@#H-Z;YgF(xL\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\":Exf|Z^~.L=e7[h3jaVb\",\"fields\":{\"VAR\":{\"id\":\"99*3xs_.J9FLSB`sp](v\"}}}},\"x\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"c(0$wroFAKXvuB~2[?VL\",\"fields\":{\"NUM\":100}}},\"y\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"VN~B`rOccf5-r!TJdI.P\",\"fields\":{\"NUM\":100}}}},\"next\":{\"block\":{\"type\":\"ha.be.Spr.Ukuran\",\"id\":\"[m`#KzslgmuC]?3I/^|r\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\"f7^p9C=7O=b6-z_EeP;S\",\"fields\":{\"VAR\":{\"id\":\"99*3xs_.J9FLSB`sp](v\"}}}},\"width\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"#(N%B8`.s/6H$#TZ5d~p\",\"fields\":{\"NUM\":48}}},\"height\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"%JAw}/@{Cvnnu@;-B`YF\",\"fields\":{\"NUM\":24}}}}}}}}}}}]},\"variables\":[{\"name\":\"image\",\"id\":\"99*3xs_.J9FLSB`sp](v\"}]}"
        },
        {
            "id": "60931702940518014",
            "type": "project",
            "nama": "00 rotate image",
            "parentId": "-1"
        },
        {
            "id": "60931702940518015",
            "type": "file",
            "nama": "69231702908083915",
            "parentId": "60931702940518014",
            "wspace": "{\"blocks\":{\"languageVersion\":0,\"blocks\":[{\"type\":\"procedures_defnoreturn\",\"id\":\"@iZs`-A.)`GZTz%?Wh_j\",\"x\":607,\"y\":136,\"icons\":{\"comment\":{\"text\":\"Describe this function...\",\"pinned\":false,\"height\":80,\"width\":160}},\"fields\":{\"NAME\":\"update\"},\"inputs\":{\"STACK\":{\"block\":{\"type\":\"ha.be.Be.Bersih\",\"id\":\"(7d4VY9ISHI3=xQXw=c0\",\"next\":{\"block\":{\"type\":\"ha.be.Spr.GambarSemua\",\"id\":\"0W^U:kI9KR*ZPkNNDZ1E\"}}}}}},{\"type\":\"ha.be.Be.Grafis\",\"id\":\"HaDx$m%9L0)lj6v$4@k*\",\"x\":28,\"y\":109,\"inputs\":{\"width\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"1Yjl.$%bS/5z=@5Qd]V~\",\"fields\":{\"NUM\":320}}},\"height\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"?(lT9dOGdzVnQ.vcHAEI\",\"fields\":{\"NUM\":240}}}},\"next\":{\"block\":{\"type\":\"variables_set\",\"id\":\"?BBuRH-xfVFsVL#ivCx)\",\"fields\":{\"VAR\":{\"id\":\"99*3xs_.J9FLSB`sp](v\"}},\"inputs\":{\"VALUE\":{\"block\":{\"type\":\"ha.be.Spr.Muat\",\"id\":\"-Wwr3nwkx~$;z$;b1tzu\",\"inputs\":{\"url\":{\"shadow\":{\"type\":\"text\",\"id\":\"tjz/~)*VQIRK@:47=aoI\",\"fields\":{\"TEXT\":\"./imgs/box.png\"}}}}}}},\"next\":{\"block\":{\"type\":\"ha.be.Spr.Posisi\",\"id\":\"qo2(},A;@#H-Z;YgF(xL\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\":Exf|Z^~.L=e7[h3jaVb\",\"fields\":{\"VAR\":{\"id\":\"99*3xs_.J9FLSB`sp](v\"}}}},\"x\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"c(0$wroFAKXvuB~2[?VL\",\"fields\":{\"NUM\":100}}},\"y\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"VN~B`rOccf5-r!TJdI.P\",\"fields\":{\"NUM\":100}}}},\"next\":{\"block\":{\"type\":\"ha.be.Spr.Rotasi\",\"id\":\"4jP/`k;BKHMS{K`n,Kl#\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\"g3x.WZ]i:}OJLJQRqp!@\",\"fields\":{\"VAR\":{\"id\":\"99*3xs_.J9FLSB`sp](v\"}}}},\"angle\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"Z%|s32Y(kp;;GiGGr-k@\",\"fields\":{\"NUM\":45}}}}}}}}}}}]},\"variables\":[{\"name\":\"image\",\"id\":\"99*3xs_.J9FLSB`sp](v\"}]}"
        },
        {
            "id": "60931702940518016",
            "type": "project",
            "nama": "00 alpha",
            "parentId": "-1"
        },
        {
            "id": "60931702940518017",
            "type": "file",
            "nama": "60931702940518015",
            "parentId": "60931702940518016",
            "wspace": "{\"blocks\":{\"languageVersion\":0,\"blocks\":[{\"type\":\"procedures_defnoreturn\",\"id\":\"@iZs`-A.)`GZTz%?Wh_j\",\"x\":607,\"y\":136,\"icons\":{\"comment\":{\"text\":\"Describe this function...\",\"pinned\":false,\"height\":80,\"width\":160}},\"fields\":{\"NAME\":\"update\"},\"inputs\":{\"STACK\":{\"block\":{\"type\":\"ha.be.Be.Bersih\",\"id\":\"(7d4VY9ISHI3=xQXw=c0\",\"next\":{\"block\":{\"type\":\"ha.be.Spr.GambarSemua\",\"id\":\"0W^U:kI9KR*ZPkNNDZ1E\"}}}}}},{\"type\":\"ha.be.Be.Grafis\",\"id\":\"HaDx$m%9L0)lj6v$4@k*\",\"x\":28,\"y\":109,\"inputs\":{\"width\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"1Yjl.$%bS/5z=@5Qd]V~\",\"fields\":{\"NUM\":320}}},\"height\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"?(lT9dOGdzVnQ.vcHAEI\",\"fields\":{\"NUM\":240}}}},\"next\":{\"block\":{\"type\":\"variables_set\",\"id\":\"0qTPLVR!=Z21Z?Piw2^~\",\"fields\":{\"VAR\":{\"id\":\"@_1XdzR]tc/ME}gXoN$`\"}},\"inputs\":{\"VALUE\":{\"block\":{\"type\":\"ha.be.Spr.Muat\",\"id\":\"pU92]I%o~x}W*3^j]-AG\",\"inputs\":{\"url\":{\"shadow\":{\"type\":\"text\",\"id\":\"u`[R1I:3@`lVM!S/dq/f\",\"fields\":{\"TEXT\":\"./imgs/box.png\"}}}}}}},\"next\":{\"block\":{\"type\":\"ha.be.Spr.Posisi\",\"id\":\"eehmk.p@^E|^%2I._4V^\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\"p6QB5EF~p2QB@L4,HrsW\",\"fields\":{\"VAR\":{\"id\":\"@_1XdzR]tc/ME}gXoN$`\"}}}},\"x\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"[f{LKdau39]o2clRZJk-\",\"fields\":{\"NUM\":116}}},\"y\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"^*Vmy0`-nEqTQX;),kBG\",\"fields\":{\"NUM\":116}}}},\"next\":{\"block\":{\"type\":\"variables_set\",\"id\":\"?BBuRH-xfVFsVL#ivCx)\",\"fields\":{\"VAR\":{\"id\":\"99*3xs_.J9FLSB`sp](v\"}},\"inputs\":{\"VALUE\":{\"block\":{\"type\":\"ha.be.Spr.Muat\",\"id\":\"-Wwr3nwkx~$;z$;b1tzu\",\"inputs\":{\"url\":{\"shadow\":{\"type\":\"text\",\"id\":\"tjz/~)*VQIRK@:47=aoI\",\"fields\":{\"TEXT\":\"./imgs/box.png\"}}}}}}},\"next\":{\"block\":{\"type\":\"ha.be.Spr.Posisi\",\"id\":\"qo2(},A;@#H-Z;YgF(xL\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\":Exf|Z^~.L=e7[h3jaVb\",\"fields\":{\"VAR\":{\"id\":\"99*3xs_.J9FLSB`sp](v\"}}}},\"x\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"c(0$wroFAKXvuB~2[?VL\",\"fields\":{\"NUM\":100}}},\"y\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"VN~B`rOccf5-r!TJdI.P\",\"fields\":{\"NUM\":100}}}},\"next\":{\"block\":{\"type\":\"ha.be.Spr.Alpha\",\"id\":\".(U|j_y_9p[:OnWq$=-e\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\"(6bo:Bv*EGJ`lZtP7PuG\",\"fields\":{\"VAR\":{\"id\":\"99*3xs_.J9FLSB`sp](v\"}}}},\"alpha\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"er*E@YsF;drC{_L2G!|?\",\"fields\":{\"NUM\":50}}}}}}}}}}}}}}}]},\"variables\":[{\"name\":\"image\",\"id\":\"99*3xs_.J9FLSB`sp](v\"},{\"name\":\"image2\",\"id\":\"@_1XdzR]tc/ME}gXoN$`\"}]}"
        },
        {
            "id": "60931702940518018",
            "type": "project",
            "nama": "00 draw image 4",
            "parentId": "-1"
        },
        {
            "id": "60931702940518019",
            "type": "file",
            "nama": "60931702940518017",
            "parentId": "60931702940518018",
            "wspace": "{\"blocks\":{\"languageVersion\":0,\"blocks\":[{\"type\":\"procedures_defnoreturn\",\"id\":\"@iZs`-A.)`GZTz%?Wh_j\",\"x\":770,\"y\":178,\"icons\":{\"comment\":{\"text\":\"Describe this function...\",\"pinned\":false,\"height\":80,\"width\":160}},\"fields\":{\"NAME\":\"update\"},\"inputs\":{\"STACK\":{\"block\":{\"type\":\"ha.be.Be.Bersih\",\"id\":\"(7d4VY9ISHI3=xQXw=c0\",\"next\":{\"block\":{\"type\":\"ha.be.Spr.GambarSemua\",\"id\":\"0W^U:kI9KR*ZPkNNDZ1E\"}}}}}},{\"type\":\"ha.be.Be.Grafis\",\"id\":\"HaDx$m%9L0)lj6v$4@k*\",\"x\":81,\"y\":218,\"inputs\":{\"width\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"1Yjl.$%bS/5z=@5Qd]V~\",\"fields\":{\"NUM\":320}}},\"height\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"?(lT9dOGdzVnQ.vcHAEI\",\"fields\":{\"NUM\":240}}}},\"next\":{\"block\":{\"type\":\"ha.be.Spr.Posisi\",\"id\":\"qo2(},A;@#H-Z;YgF(xL\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"ha.be.Spr.Muat\",\"id\":\"-Wwr3nwkx~$;z$;b1tzu\",\"inputs\":{\"url\":{\"shadow\":{\"type\":\"text\",\"id\":\"tjz/~)*VQIRK@:47=aoI\",\"fields\":{\"TEXT\":\"./imgs/box.png\"}}}}}},\"x\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"c(0$wroFAKXvuB~2[?VL\",\"fields\":{\"NUM\":100}}},\"y\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"VN~B`rOccf5-r!TJdI.P\",\"fields\":{\"NUM\":100}}}}}}}]}}"
        },
        {
            "id": "80981702940635833",
            "type": "project",
            "nama": "00 draw image",
            "parentId": "-1"
        },
        {
            "id": "80981702940635834",
            "type": "file",
            "nama": "1702699321358",
            "parentId": "80981702940635833",
            "wspace": "{\"blocks\":{\"languageVersion\":0,\"blocks\":[{\"type\":\"procedures_defnoreturn\",\"id\":\"@iZs`-A.)`GZTz%?Wh_j\",\"x\":607,\"y\":136,\"icons\":{\"comment\":{\"text\":\"Describe this function...\",\"pinned\":false,\"height\":80,\"width\":160}},\"fields\":{\"NAME\":\"update\"},\"inputs\":{\"STACK\":{\"block\":{\"type\":\"ha.be.Be.Bersih\",\"id\":\"(7d4VY9ISHI3=xQXw=c0\",\"next\":{\"block\":{\"type\":\"ha.be.Spr.Gambar\",\"id\":\"TKi]Pbe|YLS%b}yYe+1L\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\"Oxp^k?rAe(XG%z7DGmrI\",\"fields\":{\"VAR\":{\"id\":\"99*3xs_.J9FLSB`sp](v\"}}}},\"x\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"iR^9X(~I02#.l.kt.[;:\",\"fields\":{\"NUM\":120}}},\"y\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"Sn*[t/Kt[]3J~cg5t9-K\",\"fields\":{\"NUM\":100}}}}}}}}}},{\"type\":\"ha.be.Be.Grafis\",\"id\":\"HaDx$m%9L0)lj6v$4@k*\",\"x\":135,\"y\":130,\"inputs\":{\"width\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"1Yjl.$%bS/5z=@5Qd]V~\",\"fields\":{\"NUM\":320}}},\"height\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"?(lT9dOGdzVnQ.vcHAEI\",\"fields\":{\"NUM\":240}}}},\"next\":{\"block\":{\"type\":\"variables_set\",\"id\":\"?BBuRH-xfVFsVL#ivCx)\",\"fields\":{\"VAR\":{\"id\":\"99*3xs_.J9FLSB`sp](v\"}},\"inputs\":{\"VALUE\":{\"block\":{\"type\":\"ha.be.Spr.Muat\",\"id\":\"-Wwr3nwkx~$;z$;b1tzu\",\"inputs\":{\"url\":{\"shadow\":{\"type\":\"text\",\"id\":\"tjz/~)*VQIRK@:47=aoI\",\"fields\":{\"TEXT\":\"./imgs/box.png\"}}}}}}}}}}]},\"variables\":[{\"name\":\"image\",\"id\":\"99*3xs_.J9FLSB`sp](v\"}]}"
        },
        {
            "id": "73961702940864448",
            "type": "project",
            "nama": "00 collision 2",
            "parentId": "-1"
        },
        {
            "id": "73961702940864449",
            "type": "file",
            "nama": "1702739076684",
            "parentId": "73961702940864448",
            "wspace": "{\"blocks\":{\"languageVersion\":0,\"blocks\":[{\"type\":\"ha.be.Be.Grafis\",\"id\":\"A;e@.|QUk^%DE2Wr6c9Q\",\"x\":38,\"y\":21,\"inputs\":{\"width\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"9WA==wu6RE`1Nr.%61pq\",\"fields\":{\"NUM\":640}}},\"height\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"T!Z_3t%]S(C#0`bfmDti\",\"fields\":{\"NUM\":480}}}},\"next\":{\"block\":{\"type\":\"variables_set\",\"id\":\"YBoGw+3Rg1cuPu)JolG5\",\"fields\":{\"VAR\":{\"id\":\"VkK%wOG:^w4r+jR3OSwl\"}},\"inputs\":{\"VALUE\":{\"block\":{\"type\":\"math_number\",\"id\":\"bJrtrVrtc4%NV9dI1Wq3\",\"fields\":{\"NUM\":45}}}},\"next\":{\"block\":{\"type\":\"variables_set\",\"id\":\"k;tBJ#cBag7(Zw#][ook\",\"fields\":{\"VAR\":{\"id\":\"/(Z|)5mME319$T[cI@SG\"}},\"inputs\":{\"VALUE\":{\"block\":{\"type\":\"logic_boolean\",\"id\":\"B3yb)A`kSlBP*s|wtU2p\",\"fields\":{\"BOOL\":\"TRUE\"}}}},\"next\":{\"block\":{\"type\":\"ha.be.Teks.Goto\",\"id\":\"k9DLyzGc1_k#Os$XYkz*\",\"inputs\":{\"x\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"|ma{5u-?y$g#_hweQ)x$\",\"fields\":{\"NUM\":320}}},\"y\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"2+SV7hG]^$,RBfx8]1|_\",\"fields\":{\"NUM\":20}}}},\"next\":{\"block\":{\"type\":\"note\",\"id\":\"p#VVS,I]6Pw#Xpehh;Xq\",\"inputs\":{\"comment\":{\"shadow\":{\"type\":\"text\",\"id\":\"h,;=wn!e:M-:lT-IjVHn\",\"fields\":{\"TEXT\":\"Image #1\"}}}},\"next\":{\"block\":{\"type\":\"variables_set\",\"id\":\"X9|QK7pf:.KI1pjVBr@2\",\"fields\":{\"VAR\":{\"id\":\"A0k8Ck#PrIl*XMc%C6nq\"}},\"inputs\":{\"VALUE\":{\"block\":{\"type\":\"ha.be.Spr.Muat\",\"id\":\"N,2n_hb^fPOwr8DlO!*I\",\"inputs\":{\"url\":{\"shadow\":{\"type\":\"text\",\"id\":\")TQI_DPDerl)m](sER.K\",\"fields\":{\"TEXT\":\"./imgs/box.png\"}}}}}}},\"next\":{\"block\":{\"type\":\"ha.be.Spr.Handle\",\"id\":\"5:J*wMjGliCM^t03VG*C\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\"Yp`Bet]Ar)c?I@|;0k|n\",\"fields\":{\"VAR\":{\"id\":\"A0k8Ck#PrIl*XMc%C6nq\"}}}},\"x\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"G6cFxu**`XNruep9MpB!\",\"fields\":{\"NUM\":320}}},\"y\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"6Ns]nL?7f_A4NqZBg?]4\",\"fields\":{\"NUM\":32}}}},\"next\":{\"block\":{\"type\":\"ha.be.Spr.Ukuran\",\"id\":\"dHbX$*E0*9Z*5]W|deJm\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\"yretwz!G3N-d*:;EoROz\",\"fields\":{\"VAR\":{\"id\":\"A0k8Ck#PrIl*XMc%C6nq\"}}}},\"width\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"`RxA]@U[8RNHCgjh+NJy\",\"fields\":{\"NUM\":640}}},\"height\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"@3Y-8t%pPVw.BMCb,cdh\",\"fields\":{\"NUM\":64}}}},\"next\":{\"block\":{\"type\":\"ha.be.Spr.Posisi\",\"id\":\"H|[Q67B#8)WxKlJ.{ybJ\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\"KA~CkZlu9bCsn_KSep:V\",\"fields\":{\"VAR\":{\"id\":\"A0k8Ck#PrIl*XMc%C6nq\"}}}},\"x\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"N3boLkiZC)YQw1i//ERI\",\"fields\":{\"NUM\":200}}},\"y\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"hv@u!0-+?v4f,8t{1kZ#\",\"fields\":{\"NUM\":240}}}},\"next\":{\"block\":{\"type\":\"note\",\"id\":\"Ob/8Uah9`;4K#:mvNy[;\",\"inputs\":{\"comment\":{\"shadow\":{\"type\":\"text\",\"id\":\"9(qw$5_^aWqbbd[E~$gw\",\"fields\":{\"TEXT\":\"Image #2\"}}}},\"next\":{\"block\":{\"type\":\"variables_set\",\"id\":\".UQ/*_w,CBSIqMPI(Rgx\",\"fields\":{\"VAR\":{\"id\":\"3P(-*k,iL46@4$m:4]?+\"}},\"inputs\":{\"VALUE\":{\"block\":{\"type\":\"ha.be.Spr.Muat\",\"id\":\"M[ZZf;mRYmbmP*W6-l`M\",\"inputs\":{\"url\":{\"shadow\":{\"type\":\"text\",\"id\":\"tb_Gt@GP/=[w}i:S(MpB\",\"fields\":{\"TEXT\":\"./imgs/box.png\"}}}}}}},\"next\":{\"block\":{\"type\":\"ha.be.Spr.Ukuran\",\"id\":\"_a=s)|9SkqfLN^3vXN(-\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\"#2{mAR:kQ7{:^]O5SzZ@\",\"fields\":{\"VAR\":{\"id\":\"3P(-*k,iL46@4$m:4]?+\"}}}},\"width\":{\"shadow\":{\"type\":\"math_number\",\"id\":\";_56uv/c2J?I),uDG7hr\",\"fields\":{\"NUM\":120}}},\"height\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"BQ/QMf=26dMvaqcR$BbN\",\"fields\":{\"NUM\":120}}}},\"next\":{\"block\":{\"type\":\"ha.be.Spr.Posisi\",\"id\":\"y~+Mo8`)=Kp,F6qj8:Tg\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\"*KQ68BiF9B[j+Z-^(|KX\",\"fields\":{\"VAR\":{\"id\":\"3P(-*k,iL46@4$m:4]?+\"}}}},\"x\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"-*$8#u*x-((?1SQdNNx`\",\"fields\":{\"NUM\":480}}},\"y\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"yc#g1HYbc+QZR$NQ;|MT\",\"fields\":{\"NUM\":240}}}}}}}}}}}}}}}}}}}}}}}}}}}}},{\"type\":\"procedures_defnoreturn\",\"id\":\"tiLTEq`Rv!*_k(!M,VN)\",\"x\":521,\"y\":3,\"icons\":{\"comment\":{\"text\":\"Describe this function...\",\"pinned\":false,\"height\":80,\"width\":160}},\"fields\":{\"NAME\":\"update\"},\"inputs\":{\"STACK\":{\"block\":{\"type\":\"math_change\",\"id\":\"KRBqB8EgETwA]%)VMr0g\",\"fields\":{\"VAR\":{\"id\":\"VkK%wOG:^w4r+jR3OSwl\"}},\"inputs\":{\"DELTA\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"FgtD*,GO6xMW`?v8Xumx\",\"fields\":{\"NUM\":1}}}},\"next\":{\"block\":{\"type\":\"ha.be.Spr.Rotasi\",\"id\":\"Osj,XwZ!%WtmRf}+rxsV\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\"!7WQR(S~--zTC)3B:fj2\",\"fields\":{\"VAR\":{\"id\":\"A0k8Ck#PrIl*XMc%C6nq\"}}}},\"angle\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"m:E^C%|i:+XOeWLbmNw[\",\"fields\":{\"NUM\":0}},\"block\":{\"type\":\"variables_get\",\"id\":\"^7L[^l{LSudIG$G#{SK9\",\"fields\":{\"VAR\":{\"id\":\"VkK%wOG:^w4r+jR3OSwl\"}}}}},\"next\":{\"block\":{\"type\":\"variables_set\",\"id\":\"hSOZrjQ`CuX8-2%pi8eH\",\"fields\":{\"VAR\":{\"id\":\"/(Z|)5mME319$T[cI@SG\"}},\"inputs\":{\"VALUE\":{\"block\":{\"type\":\"ha.be.Spr.Tabrakan\",\"id\":\"1DBTb@!UzRaU1%fx]q#t\",\"inputs\":{\"sprite1\":{\"block\":{\"type\":\"variables_get\",\"id\":\"TRN#!(4g4(TCiqm6ACdl\",\"fields\":{\"VAR\":{\"id\":\"A0k8Ck#PrIl*XMc%C6nq\"}}}},\"sprite2\":{\"block\":{\"type\":\"variables_get\",\"id\":\"0,3e(8*X#}G=[;K9*e)l\",\"fields\":{\"VAR\":{\"id\":\"3P(-*k,iL46@4$m:4]?+\"}}}}}}}},\"next\":{\"block\":{\"type\":\"note\",\"id\":\"TnU!#mE8:T_8@^qFnz0c\",\"inputs\":{\"comment\":{\"shadow\":{\"type\":\"text\",\"id\":\"qwfy+@{N[2vI(FOO1G:c\",\"fields\":{\"TEXT\":\"render\"}}}},\"next\":{\"block\":{\"type\":\"ha.be.Be.Bersih\",\"id\":\"w=[?@!uJYM;BE1l}IwBv\",\"next\":{\"block\":{\"type\":\"ha.be.Spr.GambarSemua\",\"id\":\"=HKU#|TWzo9Fg:c_4uLr\",\"next\":{\"block\":{\"type\":\"ha.be.Teks.Write\",\"id\":\"#e*iN4d((~HOq[2$uP6_\",\"inputs\":{\"text\":{\"shadow\":{\"type\":\"text\",\"id\":\"{9L3ji6|(|4Hj36|j#FK\",\"fields\":{\"TEXT\":\"collision status\"}},\"block\":{\"type\":\"text_join\",\"id\":\"SK~3!r4HLp-9/4Pm6U(*\",\"extraState\":{\"itemCount\":2},\"inputs\":{\"ADD0\":{\"block\":{\"type\":\"text\",\"id\":\"bQU!{3B:#tUArk!k`GRE\",\"fields\":{\"TEXT\":\"collision status:\"}}},\"ADD1\":{\"block\":{\"type\":\"variables_get\",\"id\":\"p_7e~BdibNM4`4AXZn#N\",\"fields\":{\"VAR\":{\"id\":\"/(Z|)5mME319$T[cI@SG\"}}}}}}}}}}}}}}}}}}}}}}}}]},\"variables\":[{\"name\":\"img\",\"id\":\"A0k8Ck#PrIl*XMc%C6nq\"},{\"name\":\"rotation\",\"id\":\"VkK%wOG:^w4r+jR3OSwl\"},{\"name\":\"img2\",\"id\":\"3P(-*k,iL46@4$m:4]?+\"},{\"name\":\"collisionStat\",\"id\":\"/(Z|)5mME319$T[cI@SG\"}]}"
        },
        {
            "id": "85241702941026738",
            "type": "project",
            "nama": "00 tile",
            "parentId": "-1"
        },
        {
            "id": "85241702941026739",
            "type": "file",
            "nama": "1702788345641",
            "parentId": "85241702941026738",
            "wspace": "{\"blocks\":{\"languageVersion\":0,\"blocks\":[{\"type\":\"procedures_defnoreturn\",\"id\":\"@iZs`-A.)`GZTz%?Wh_j\",\"x\":607,\"y\":136,\"icons\":{\"comment\":{\"text\":\"Describe this function...\",\"pinned\":false,\"height\":80,\"width\":160}},\"fields\":{\"NAME\":\"update\"},\"inputs\":{\"STACK\":{\"block\":{\"type\":\"ha.be.Be.Bersih\",\"id\":\"(7d4VY9ISHI3=xQXw=c0\",\"next\":{\"block\":{\"type\":\"ha.be.Spr.Ubin\",\"id\":\"5=rhF0|B(~0#T71UJr;2\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\"01V2on##LigG~5V:^wX)\",\"fields\":{\"VAR\":{\"id\":\"99*3xs_.J9FLSB`sp](v\"}}}},\"x\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"LuI!![saa}/6iFs;NB=]\",\"fields\":{\"NUM\":0}}},\"y\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"d/Dbm}13j1g2;r2$S-dT\",\"fields\":{\"NUM\":0}}},\"frame\":{\"shadow\":{\"type\":\"math_number\",\"id\":\":c@8t]ujv0eaU$c4q4/x\",\"fields\":{\"NUM\":0}}}}}}}}}},{\"type\":\"ha.be.Be.Grafis\",\"id\":\"HaDx$m%9L0)lj6v$4@k*\",\"x\":187,\"y\":160,\"inputs\":{\"width\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"1Yjl.$%bS/5z=@5Qd]V~\",\"fields\":{\"NUM\":320}}},\"height\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"?(lT9dOGdzVnQ.vcHAEI\",\"fields\":{\"NUM\":240}}}},\"next\":{\"block\":{\"type\":\"variables_set\",\"id\":\"?BBuRH-xfVFsVL#ivCx)\",\"fields\":{\"VAR\":{\"id\":\"99*3xs_.J9FLSB`sp](v\"}},\"inputs\":{\"VALUE\":{\"block\":{\"type\":\"ha.be.Spr.Muat\",\"id\":\"-Wwr3nwkx~$;z$;b1tzu\",\"inputs\":{\"url\":{\"shadow\":{\"type\":\"text\",\"id\":\"tjz/~)*VQIRK@:47=aoI\",\"fields\":{\"TEXT\":\"./imgs/box.png\"}}}}}}}}}}]},\"variables\":[{\"name\":\"image\",\"id\":\"99*3xs_.J9FLSB`sp](v\"}]}"
        },
        {
            "id": "16121702941428244",
            "type": "file",
            "nama": "",
            "parentId": "16121702941428243",
            "wspace": "{\"blocks\":{\"languageVersion\":0,\"blocks\":[{\"type\":\"procedures_defnoreturn\",\"id\":\"@iZs`-A.)`GZTz%?Wh_j\",\"x\":607,\"y\":136,\"icons\":{\"comment\":{\"text\":\"Describe this function...\",\"pinned\":false,\"height\":80,\"width\":160}},\"fields\":{\"NAME\":\"update\"},\"inputs\":{\"STACK\":{\"block\":{\"type\":\"ha.be.Be.Bersih\",\"id\":\"(7d4VY9ISHI3=xQXw=c0\",\"next\":{\"block\":{\"type\":\"ha.be.Spr.Gambar\",\"id\":\"TKi]Pbe|YLS%b}yYe+1L\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\"Oxp^k?rAe(XG%z7DGmrI\",\"fields\":{\"VAR\":{\"id\":\"99*3xs_.J9FLSB`sp](v\"}}}},\"x\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"iR^9X(~I02#.l.kt.[;:\",\"fields\":{\"NUM\":120}}},\"y\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"Sn*[t/Kt[]3J~cg5t9-K\",\"fields\":{\"NUM\":100}}}}}}}}}},{\"type\":\"ha.be.Be.Grafis\",\"id\":\"HaDx$m%9L0)lj6v$4@k*\",\"x\":187,\"y\":160,\"inputs\":{\"width\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"1Yjl.$%bS/5z=@5Qd]V~\",\"fields\":{\"NUM\":320}}},\"height\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"?(lT9dOGdzVnQ.vcHAEI\",\"fields\":{\"NUM\":240}}}},\"next\":{\"block\":{\"type\":\"ha.be.Be.Bersih\",\"id\":\"P=3%M?Ud(^qXZB;*oeeA\",\"next\":{\"block\":{\"type\":\"variables_set\",\"id\":\"?BBuRH-xfVFsVL#ivCx)\",\"fields\":{\"VAR\":{\"id\":\"99*3xs_.J9FLSB`sp](v\"}},\"inputs\":{\"VALUE\":{\"block\":{\"type\":\"ha.be.Spr.Muat\",\"id\":\"-Wwr3nwkx~$;z$;b1tzu\",\"inputs\":{\"url\":{\"shadow\":{\"type\":\"text\",\"id\":\"tjz/~)*VQIRK@:47=aoI\",\"fields\":{\"TEXT\":\"./imgs/box.png\"}}}}}}},\"next\":{\"block\":{\"type\":\"ha.be.Spr.Alpha\",\"id\":\"|ERV/8S]=B#Dx6Ej^[H`\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\"MvI{1nhmW]C%S%E;Q#;z\",\"fields\":{\"VAR\":{\"id\":\"99*3xs_.J9FLSB`sp](v\"}}}},\"alpha\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"5rPlkCipD;1@#H/qpfe/\",\"fields\":{\"NUM\":50}}}}}}}}}}}]},\"variables\":[{\"name\":\"image\",\"id\":\"99*3xs_.J9FLSB`sp](v\"}]}"
        },
        {
            "id": "80111702941619918",
            "type": "project",
            "nama": "00 text",
            "parentId": "-1"
        },
        {
            "id": "80111702941619919",
            "type": "file",
            "nama": "",
            "parentId": "80111702941619918",
            "wspace": "{\"blocks\":{\"languageVersion\":0,\"blocks\":[{\"type\":\"ha.be.Be.Grafis\",\"id\":\"HaDx$m%9L0)lj6v$4@k*\",\"x\":187,\"y\":160,\"inputs\":{\"width\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"1Yjl.$%bS/5z=@5Qd]V~\",\"fields\":{\"NUM\":320}}},\"height\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"?(lT9dOGdzVnQ.vcHAEI\",\"fields\":{\"NUM\":240}}}},\"next\":{\"block\":{\"type\":\"ha.be.Be.Bersih\",\"id\":\"]wTBw//Qh{z3I$TSq57h\",\"next\":{\"block\":{\"type\":\"ha.be.Teks.WriteLn\",\"id\":\"%gU^{8yYRaWZ,:`.B7k}\",\"inputs\":{\"text\":{\"shadow\":{\"type\":\"text\",\"id\":\"d%9~#n]1~6ix%NkghT6A\",\"fields\":{\"TEXT\":\"this is first line\"}}}},\"next\":{\"block\":{\"type\":\"ha.be.Teks.WriteLn\",\"id\":\"[Sp%OJ539Tk9EHl0dD-0\",\"inputs\":{\"text\":{\"shadow\":{\"type\":\"text\",\"id\":\"-W2F.o_{EjN+pq!I{AU7\",\"fields\":{\"TEXT\":\"this is the second line\"}}}},\"next\":{\"block\":{\"type\":\"ha.be.Teks.Write\",\"id\":\"QkO|n90UjHxUd@g}u4HR\",\"inputs\":{\"text\":{\"shadow\":{\"type\":\"text\",\"id\":\"dWY#p5q}F9%o.w%pvXlf\",\"fields\":{\"TEXT\":\"this iis the third line\"}}}},\"next\":{\"block\":{\"type\":\"ha.be.Teks.Goto\",\"id\":\"vFyXY=I^Ya+_@Dg@w=7.\",\"inputs\":{\"x\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"V2O(@EeRo~uTmhYdZ[c9\",\"fields\":{\"NUM\":160}}},\"y\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"*VV[e|oXD9N,c_!u!O:z\",\"fields\":{\"NUM\":120}}}},\"next\":{\"block\":{\"type\":\"ha.be.Teks.Rata\",\"id\":\"9hS5Z=O8s]Stn`S7P@|v\",\"inputs\":{\"align\":{\"shadow\":{\"type\":\"text\",\"id\":\"`2nz+=_{}/p*c#P|VvHk\",\"fields\":{\"TEXT\":\"center\"}}}},\"next\":{\"block\":{\"type\":\"ha.be.Teks.WriteLn\",\"id\":\"@LG[:FnvDN~Wv?.ScsH.\",\"inputs\":{\"text\":{\"shadow\":{\"type\":\"text\",\"id\":\"CzOth,v)oP$lMP8:jS_*\",\"fields\":{\"TEXT\":\"this is the fourth line\"}}}},\"next\":{\"block\":{\"type\":\"ha.be.Teks.Rata\",\"id\":\"icfyw[GRO?%o]J^8nw-h\",\"inputs\":{\"align\":{\"shadow\":{\"type\":\"text\",\"id\":\"=A2Qz}_gXh)2+iG^~{YQ\",\"fields\":{\"TEXT\":\"right\"}}}},\"next\":{\"block\":{\"type\":\"ha.be.Teks.Write\",\"id\":\"IblnzPNHNvHplPH?SQEh\",\"inputs\":{\"text\":{\"shadow\":{\"type\":\"text\",\"id\":\"?_F{,y^X2hZBUvzfKv|F\",\"fields\":{\"TEXT\":\"this is the six line\"}}}}}}}}}}}}}}}}}}}}}}}]},\"variables\":[{\"name\":\"image\",\"id\":\"99*3xs_.J9FLSB`sp](v\"}]}"
        },
        {
            "id": "29951702998582066",
            "type": "file",
            "nama": "1702786941239",
            "parentId": "29951702998582065",
            "wspace": "{\"blocks\":{\"languageVersion\":0,\"blocks\":[{\"type\":\"procedures_defnoreturn\",\"id\":\"YAeHvg0folHqbP|w!o~O\",\"x\":479,\"y\":121,\"icons\":{\"comment\":{\"text\":\"Describe this function...\",\"pinned\":false,\"height\":80,\"width\":160}},\"fields\":{\"NAME\":\"update\"},\"inputs\":{\"STACK\":{\"block\":{\"type\":\"ha.be.Be.Bersih\",\"id\":\"(-Hw93,LiU7imvX*I;$%\",\"next\":{\"block\":{\"type\":\"ha.be.Teks.Goto\",\"id\":\"cItlX(@5nI;}y0xA==6r\",\"inputs\":{\"x\":{\"shadow\":{\"type\":\"math_number\",\"id\":\",E!hcTV.3ant6.uK$_K4\",\"fields\":{\"NUM\":0}}},\"y\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"03?s7IKPPKq=F)G@WfB-\",\"fields\":{\"NUM\":10}}}},\"next\":{\"block\":{\"type\":\"ha.be.Teks.WriteLn\",\"id\":\"eN|RC/,MiRt7HAq-~c0a\",\"inputs\":{\"text\":{\"shadow\":{\"type\":\"text\",\"id\":\"%ZN/U%LcDNU#%(/tMvbr\",\"fields\":{\"TEXT\":\"\"}},\"block\":{\"type\":\"text_join\",\"id\":\"!ldfwVre0mT6]+,|NmZr\",\"extraState\":{\"itemCount\":2},\"inputs\":{\"ADD0\":{\"block\":{\"type\":\"text\",\"id\":\"4JwLyvo+}b]uz!SSOe4K\",\"fields\":{\"TEXT\":\"Drag Image, \"}}},\"ADD1\":{\"block\":{\"type\":\"text_join\",\"id\":\"v)}nR+gu]dv4:e7S3g`-\",\"extraState\":{\"itemCount\":4},\"inputs\":{\"ADD0\":{\"block\":{\"type\":\"text\",\"id\":\"V}EA$f{zUiwyd^O^sCW#\",\"fields\":{\"TEXT\":\"position x: \"}}},\"ADD1\":{\"block\":{\"type\":\"ha.be.Spr.PosisiX\",\"id\":\"9dH!Y@XZSz1s@qP;9~-R\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\"^0Wl)nI]3IU[|D=e_y=+\",\"fields\":{\"VAR\":{\"id\":\"U/P;57A.cj6i*`rQ:Wkm\"}}}}}}},\"ADD2\":{\"block\":{\"type\":\"text\",\"id\":\"$i==hNm{|,%cD2r6=VN0\",\"fields\":{\"TEXT\":\" y: \"}}},\"ADD3\":{\"block\":{\"type\":\"ha.be.Spr.PosisiY\",\"id\":\"ZH}IKSsJbiUb-/w6Hs2~\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\"e8EQdI$On6Q8EVv0WDIG\",\"fields\":{\"VAR\":{\"id\":\"U/P;57A.cj6i*`rQ:Wkm\"}}}}}}}}}}}}}},\"next\":{\"block\":{\"type\":\"ha.be.Teks.WriteLn\",\"id\":\"Rz~7x}4,5MO`~m155a_I\",\"inputs\":{\"text\":{\"shadow\":{\"type\":\"text\",\"id\":\"OwLy6E^XyeXy0qVn+Q~5\",\"fields\":{\"TEXT\":\"\"}},\"block\":{\"type\":\"text_join\",\"id\":\"bR9|f|58}ZRpOn|?S%%E\",\"extraState\":{\"itemCount\":2},\"inputs\":{\"ADD0\":{\"block\":{\"type\":\"text\",\"id\":\"CBK$c.}e0L#16B:]q?ir\",\"fields\":{\"TEXT\":\"drag status: \"}}},\"ADD1\":{\"block\":{\"type\":\"ha.be.Spr.StatusDrag\",\"id\":\"X=`r4~_^:;K)^?RBAPfl\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\"x?Y9:~nw)[-G=66eNcv+\",\"fields\":{\"VAR\":{\"id\":\"U/P;57A.cj6i*`rQ:Wkm\"}}}}}}}}}}},\"next\":{\"block\":{\"type\":\"ha.be.Spr.GambarSemua\",\"id\":\".$2vnJV),.KPkOP$^`5H\"}}}}}}}}}}}},{\"type\":\"ha.be.Be.Grafis\",\"id\":\"+0cX1W]m4NbL#=Srz!0M\",\"x\":34,\"y\":17,\"inputs\":{\"width\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"pLz:_^C5wQ?SC*?o/tan\",\"fields\":{\"NUM\":320}}},\"height\":{\"shadow\":{\"type\":\"math_number\",\"id\":\":v-Gueqp;NeddO.fYkb/\",\"fields\":{\"NUM\":240}}}},\"next\":{\"block\":{\"type\":\"variables_set\",\"id\":\"g?Cp~3Fu590VYAhLs^Za\",\"fields\":{\"VAR\":{\"id\":\"U/P;57A.cj6i*`rQ:Wkm\"}},\"inputs\":{\"VALUE\":{\"block\":{\"type\":\"ha.be.Spr.Muat\",\"id\":\"vPfhzXl?GTZ@N~P+m3NC\",\"inputs\":{\"url\":{\"shadow\":{\"type\":\"text\",\"id\":\"pXgmitjH}Vj$av`a$Jn1\",\"fields\":{\"TEXT\":\"./imgs/box.png\"}}}}}}},\"next\":{\"block\":{\"type\":\"ha.be.Spr.DragMode\",\"id\":\"q3WCO0B]_`uxuyH9b/^;\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\"9qk,l~#6tZ@[9G1egxsZ\",\"fields\":{\"VAR\":{\"id\":\"U/P;57A.cj6i*`rQ:Wkm\"}}}},\"dragMode\":{\"shadow\":{\"type\":\"math_number\",\"id\":\":dId7|[V*VSg,ydUrw^_\",\"fields\":{\"NUM\":1}}}},\"next\":{\"block\":{\"type\":\"ha.be.Spr.Posisi\",\"id\":\"qX|j!kb7nyToCctsbxX#\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\",6,]t5YfA,j1|);-Ok$J\",\"fields\":{\"VAR\":{\"id\":\"U/P;57A.cj6i*`rQ:Wkm\"}}}},\"x\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"}LjN/+0E]/xy3cDrL9g@\",\"fields\":{\"NUM\":160}}},\"y\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"Y7N1PTUZ#u59/)BoxI`*\",\"fields\":{\"NUM\":120}}}}}}}}}}}]},\"variables\":[{\"name\":\"img\",\"id\":\"U/P;57A.cj6i*`rQ:Wkm\"}]}"
        },
        {
            "id": "29951702998582067",
            "type": "project",
            "nama": "00 drag rotate image",
            "parentId": "-1"
        },
        {
            "id": "29951702998582068",
            "type": "file",
            "nama": "29951702998582066",
            "parentId": "29951702998582067",
            "wspace": "{\"blocks\":{\"languageVersion\":0,\"blocks\":[{\"type\":\"procedures_defnoreturn\",\"id\":\"YAeHvg0folHqbP|w!o~O\",\"x\":479,\"y\":121,\"icons\":{\"comment\":{\"text\":\"Describe this function...\",\"pinned\":false,\"height\":80,\"width\":160}},\"fields\":{\"NAME\":\"update\"},\"inputs\":{\"STACK\":{\"block\":{\"type\":\"ha.be.Be.Bersih\",\"id\":\"(-Hw93,LiU7imvX*I;$%\",\"next\":{\"block\":{\"type\":\"ha.be.Teks.Goto\",\"id\":\"cItlX(@5nI;}y0xA==6r\",\"inputs\":{\"x\":{\"shadow\":{\"type\":\"math_number\",\"id\":\",E!hcTV.3ant6.uK$_K4\",\"fields\":{\"NUM\":0}}},\"y\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"03?s7IKPPKq=F)G@WfB-\",\"fields\":{\"NUM\":10}}}},\"next\":{\"block\":{\"type\":\"ha.be.Teks.WriteLn\",\"id\":\"eN|RC/,MiRt7HAq-~c0a\",\"inputs\":{\"text\":{\"shadow\":{\"type\":\"text\",\"id\":\"%ZN/U%LcDNU#%(/tMvbr\",\"fields\":{\"TEXT\":\"\"}},\"block\":{\"type\":\"text_join\",\"id\":\"!ldfwVre0mT6]+,|NmZr\",\"extraState\":{\"itemCount\":2},\"inputs\":{\"ADD0\":{\"block\":{\"type\":\"text\",\"id\":\"4JwLyvo+}b]uz!SSOe4K\",\"fields\":{\"TEXT\":\"Drag Image, \"}}},\"ADD1\":{\"block\":{\"type\":\"text_join\",\"id\":\"v)}nR+gu]dv4:e7S3g`-\",\"extraState\":{\"itemCount\":4},\"inputs\":{\"ADD0\":{\"block\":{\"type\":\"text\",\"id\":\"V}EA$f{zUiwyd^O^sCW#\",\"fields\":{\"TEXT\":\"position x: \"}}},\"ADD1\":{\"block\":{\"type\":\"ha.be.Spr.PosisiX\",\"id\":\"9dH!Y@XZSz1s@qP;9~-R\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\"^0Wl)nI]3IU[|D=e_y=+\",\"fields\":{\"VAR\":{\"id\":\"U/P;57A.cj6i*`rQ:Wkm\"}}}}}}},\"ADD2\":{\"block\":{\"type\":\"text\",\"id\":\"$i==hNm{|,%cD2r6=VN0\",\"fields\":{\"TEXT\":\" y: \"}}},\"ADD3\":{\"block\":{\"type\":\"ha.be.Spr.PosisiY\",\"id\":\"ZH}IKSsJbiUb-/w6Hs2~\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\"e8EQdI$On6Q8EVv0WDIG\",\"fields\":{\"VAR\":{\"id\":\"U/P;57A.cj6i*`rQ:Wkm\"}}}}}}}}}}}}}},\"next\":{\"block\":{\"type\":\"ha.be.Teks.WriteLn\",\"id\":\"Rz~7x}4,5MO`~m155a_I\",\"inputs\":{\"text\":{\"shadow\":{\"type\":\"text\",\"id\":\"OwLy6E^XyeXy0qVn+Q~5\",\"fields\":{\"TEXT\":\"\"}},\"block\":{\"type\":\"text_join\",\"id\":\"bR9|f|58}ZRpOn|?S%%E\",\"extraState\":{\"itemCount\":2},\"inputs\":{\"ADD0\":{\"block\":{\"type\":\"text\",\"id\":\"CBK$c.}e0L#16B:]q?ir\",\"fields\":{\"TEXT\":\"drag status: \"}}},\"ADD1\":{\"block\":{\"type\":\"ha.be.Spr.StatusDrag\",\"id\":\"X=`r4~_^:;K)^?RBAPfl\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\"x?Y9:~nw)[-G=66eNcv+\",\"fields\":{\"VAR\":{\"id\":\"U/P;57A.cj6i*`rQ:Wkm\"}}}}}}}}}}},\"next\":{\"block\":{\"type\":\"ha.be.Teks.WriteLn\",\"id\":\"{!48@T^bC#z!9dJzR59K\",\"inputs\":{\"text\":{\"shadow\":{\"type\":\"text\",\"id\":\"5[6V8w0#UNI:7;(:}oWY\",\"fields\":{\"TEXT\":\"\"}},\"block\":{\"type\":\"text_join\",\"id\":\"#CUqGDn|1ujNZ.%l#:TY\",\"extraState\":{\"itemCount\":2},\"inputs\":{\"ADD0\":{\"block\":{\"type\":\"text\",\"id\":\":b,bk@Lhac|Sd9GvG|s6\",\"fields\":{\"TEXT\":\"angle : \"}}},\"ADD1\":{\"block\":{\"type\":\"ha.be.Spr.Rotasi_get\",\"id\":\"#uyDm#]]`rKl`rIF3Maf\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\"GfVMp|70SHfb?FEkY3|[\",\"fields\":{\"VAR\":{\"id\":\"U/P;57A.cj6i*`rQ:Wkm\"}}}}}}}}}}},\"next\":{\"block\":{\"type\":\"ha.be.Spr.GambarSemua\",\"id\":\".$2vnJV),.KPkOP$^`5H\"}}}}}}}}}}}}}},{\"type\":\"ha.be.Be.Grafis\",\"id\":\"+0cX1W]m4NbL#=Srz!0M\",\"x\":34,\"y\":17,\"inputs\":{\"width\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"pLz:_^C5wQ?SC*?o/tan\",\"fields\":{\"NUM\":320}}},\"height\":{\"shadow\":{\"type\":\"math_number\",\"id\":\":v-Gueqp;NeddO.fYkb/\",\"fields\":{\"NUM\":240}}}},\"next\":{\"block\":{\"type\":\"variables_set\",\"id\":\"g?Cp~3Fu590VYAhLs^Za\",\"fields\":{\"VAR\":{\"id\":\"U/P;57A.cj6i*`rQ:Wkm\"}},\"inputs\":{\"VALUE\":{\"block\":{\"type\":\"ha.be.Spr.Muat\",\"id\":\"vPfhzXl?GTZ@N~P+m3NC\",\"inputs\":{\"url\":{\"shadow\":{\"type\":\"text\",\"id\":\"pXgmitjH}Vj$av`a$Jn1\",\"fields\":{\"TEXT\":\"./imgs/box.png\"}}}}}}},\"next\":{\"block\":{\"type\":\"ha.be.Spr.DragMode\",\"id\":\"q3WCO0B]_`uxuyH9b/^;\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\"9qk,l~#6tZ@[9G1egxsZ\",\"fields\":{\"VAR\":{\"id\":\"U/P;57A.cj6i*`rQ:Wkm\"}}}},\"dragMode\":{\"shadow\":{\"type\":\"math_number\",\"id\":\":dId7|[V*VSg,ydUrw^_\",\"fields\":{\"NUM\":2}}}},\"next\":{\"block\":{\"type\":\"ha.be.Spr.Posisi\",\"id\":\"qX|j!kb7nyToCctsbxX#\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\",6,]t5YfA,j1|);-Ok$J\",\"fields\":{\"VAR\":{\"id\":\"U/P;57A.cj6i*`rQ:Wkm\"}}}},\"x\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"}LjN/+0E]/xy3cDrL9g@\",\"fields\":{\"NUM\":160}}},\"y\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"Y7N1PTUZ#u59/)BoxI`*\",\"fields\":{\"NUM\":120}}}},\"next\":{\"block\":{\"type\":\"ha.be.Spr.Handle\",\"id\":\"h3JJ$C%,n[ar.W;,-J`$\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\"FVMJxxx/Q#`39gKI{hgq\",\"fields\":{\"VAR\":{\"id\":\"U/P;57A.cj6i*`rQ:Wkm\"}}}},\"x\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"nN^}YeXv@0Uh-`IaQ8t=\",\"fields\":{\"NUM\":16}}},\"y\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"c8ch*7TmxHJl=ifI.V`k\",\"fields\":{\"NUM\":16}}}}}}}}}}}}}]},\"variables\":[{\"name\":\"img\",\"id\":\"U/P;57A.cj6i*`rQ:Wkm\"}]}"
        },
        {
            "id": "46641702999323848",
            "type": "file",
            "nama": "",
            "parentId": "46641702999323847",
            "wspace": "{\"blocks\":{\"languageVersion\":0,\"blocks\":[{\"type\":\"procedures_defnoreturn\",\"id\":\"@iZs`-A.)`GZTz%?Wh_j\",\"x\":264,\"y\":423,\"icons\":{\"comment\":{\"text\":\"Describe this function...\",\"pinned\":false,\"height\":80,\"width\":160}},\"fields\":{\"NAME\":\"update\"},\"inputs\":{\"STACK\":{\"block\":{\"type\":\"procedures_callnoreturn\",\"id\":\"2r|Vn{|[(OcO16CkO=`:\",\"extraState\":{\"name\":\"update frame\"},\"next\":{\"block\":{\"type\":\"ha.be.Be.Bersih\",\"id\":\"(7d4VY9ISHI3=xQXw=c0\",\"next\":{\"block\":{\"type\":\"ha.be.Teks.Write\",\"id\":\"l{kQe_5^I#A5D,.yjQC{\",\"inputs\":{\"text\":{\"shadow\":{\"type\":\"text\",\"id\":\"Rtws@X-xlmt-kQb?RZs[\",\"fields\":{\"TEXT\":\"\"}},\"block\":{\"type\":\"text_join\",\"id\":\"brxn{b;@m_U*QVLvr/@P\",\"extraState\":{\"itemCount\":2},\"inputs\":{\"ADD0\":{\"block\":{\"type\":\"text\",\"id\":\"PfY6Iy-I7MFOW0HI;ker\",\"fields\":{\"TEXT\":\"frame: \"}}},\"ADD1\":{\"block\":{\"type\":\"math_round\",\"id\":\";_$[P9_?}6k;plc=(+W~\",\"fields\":{\"OP\":\"ROUNDDOWN\"},\"inputs\":{\"NUM\":{\"block\":{\"type\":\"variables_get\",\"id\":\"N![gY,vK;ECzOh2ol|@_\",\"fields\":{\"VAR\":{\"id\":\"14,q=34P-]+cC/{+,tae\"}}}}}}}}}}},\"next\":{\"block\":{\"type\":\"ha.be.Spr.Gambar_animasi\",\"id\":\"@t:k#2W]~UKFZx%dh;;^\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\"lG:BJ?bN[MA9cXWUB5{k\",\"fields\":{\"VAR\":{\"id\":\"99*3xs_.J9FLSB`sp](v\"}}}},\"frame\":{\"block\":{\"type\":\"math_round\",\"id\":\"9]=uAPNvJs1=b8?;;Q]t\",\"fields\":{\"OP\":\"ROUNDDOWN\"},\"inputs\":{\"NUM\":{\"block\":{\"type\":\"variables_get\",\"id\":\"Sdqxcu[d}r|}yf3sLKZQ\",\"fields\":{\"VAR\":{\"id\":\"14,q=34P-]+cC/{+,tae\"}}}}}}}}}}}}}}}}}},{\"type\":\"procedures_defnoreturn\",\"id\":\"-QX1:T*VSlp2:VGC3y{_\",\"x\":-77,\"y\":474,\"icons\":{\"comment\":{\"text\":\"Describe this function...\",\"pinned\":false,\"height\":80,\"width\":160}},\"fields\":{\"NAME\":\"update frame\"},\"inputs\":{\"STACK\":{\"block\":{\"type\":\"math_change\",\"id\":\"F_`Kg14fcdlbYdjfK{G-\",\"fields\":{\"VAR\":{\"id\":\"14,q=34P-]+cC/{+,tae\"}},\"inputs\":{\"DELTA\":{\"shadow\":{\"type\":\"math_number\",\"id\":\")7m0[B;nySnYp!/7UsgW\",\"fields\":{\"NUM\":0.2}}}},\"next\":{\"block\":{\"type\":\"controls_if\",\"id\":\"DA?qk|z);(56$r/P#d!v\",\"inputs\":{\"IF0\":{\"block\":{\"type\":\"logic_compare\",\"id\":\"~]qGCqR:4R2y,N7MVeV?\",\"fields\":{\"OP\":\"GT\"},\"inputs\":{\"A\":{\"block\":{\"type\":\"variables_get\",\"id\":\"$odE${1@F?;$=]=nLhex\",\"fields\":{\"VAR\":{\"id\":\"14,q=34P-]+cC/{+,tae\"}}}},\"B\":{\"block\":{\"type\":\"math_number\",\"id\":\"aQj,NT[xf+(~z1+SLZW9\",\"fields\":{\"NUM\":15}}}}}},\"DO0\":{\"block\":{\"type\":\"variables_set\",\"id\":\"I_{~gU?=IC8b^].z`Po6\",\"fields\":{\"VAR\":{\"id\":\"14,q=34P-]+cC/{+,tae\"}},\"inputs\":{\"VALUE\":{\"block\":{\"type\":\"math_number\",\"id\":\"RqVEmMgQS%1~;zoDU.AM\",\"fields\":{\"NUM\":0}}}}}}}}}}}}},{\"type\":\"ha.be.Be.Grafis\",\"id\":\"(Ssq97)og2|H2wT$r~pK\",\"x\":-79,\"y\":258,\"inputs\":{\"width\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"dV5^wFjsu0=ORpl.ORp-\",\"fields\":{\"NUM\":320}}},\"height\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"6DUuGO.L/.#-~i5Zx=/}\",\"fields\":{\"NUM\":240}}}},\"next\":{\"block\":{\"type\":\"variables_set\",\"id\":\"=;lB?kWc]]+Na9-Z%{nP\",\"fields\":{\"VAR\":{\"id\":\"99*3xs_.J9FLSB`sp](v\"}},\"inputs\":{\"VALUE\":{\"block\":{\"type\":\"ha.be.Spr.MuatAnimasi\",\"id\":\"AevqXV_P~JlAD4x,uA#O\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"text\",\"id\":\"ms_[}sABD4;P`EA4Dp0O\",\"fields\":{\"TEXT\":\"./imgs/exp2_0.png\"}}},\"fw\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"bt8.$b3Y+!Vfw^QsFfBY\",\"fields\":{\"NUM\":64}}},\"fh\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"M6LlW}ydBsvqp@bS`swv\",\"fields\":{\"NUM\":64}}}}}}},\"next\":{\"block\":{\"type\":\"ha.be.Spr.Posisi\",\"id\":\"ve3|J8-`v:naL1+1eon6\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\".QAH+@AJg~?aFq_]4`V{\",\"fields\":{\"VAR\":{\"id\":\"99*3xs_.J9FLSB`sp](v\"}}}},\"x\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"~d_qQQbE2#K9{rHMuNEZ\",\"fields\":{\"NUM\":100}}},\"y\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"yUr$(NTy%5u)3A-Q7^m`\",\"fields\":{\"NUM\":100}}}},\"next\":{\"block\":{\"type\":\"variables_set\",\"id\":\"~dviayPhABFW3`Ev(-Qt\",\"fields\":{\"VAR\":{\"id\":\"14,q=34P-]+cC/{+,tae\"}},\"inputs\":{\"VALUE\":{\"block\":{\"type\":\"math_number\",\"id\":\"5n,1$?O!ww77}bGHaJhY\",\"fields\":{\"NUM\":0}}}}}}}}}}}]},\"variables\":[{\"name\":\"image\",\"id\":\"99*3xs_.J9FLSB`sp](v\"},{\"name\":\"frame\",\"id\":\"14,q=34P-]+cC/{+,tae\"}]}"
        },
        {
            "id": "66751703229686225",
            "type": "project",
            "nama": "00 animation",
            "parentId": "-1"
        },
        {
            "id": "66751703229686226",
            "type": "file",
            "nama": "",
            "parentId": "66751703229686225",
            "wspace": "{\"blocks\":{\"languageVersion\":0,\"blocks\":[{\"type\":\"procedures_defnoreturn\",\"id\":\"@iZs`-A.)`GZTz%?Wh_j\",\"x\":377,\"y\":314,\"icons\":{\"comment\":{\"text\":\"Describe this function...\",\"pinned\":false,\"height\":80,\"width\":160}},\"fields\":{\"NAME\":\"update\"},\"inputs\":{\"STACK\":{\"block\":{\"type\":\"note\",\"id\":\"F~}T(DjhVcW2f:)EV@$D\",\"inputs\":{\"comment\":{\"shadow\":{\"type\":\"text\",\"id\":\"Bk^MoV#hhwbPyjsC:E1j\",\"fields\":{\"TEXT\":\"increment frame slowly for slow animation\"}}}},\"next\":{\"block\":{\"type\":\"math_change\",\"id\":\"MzM5.PNyK^t-g6hqkVB$\",\"fields\":{\"VAR\":{\"id\":\"~{T|4gQEwB$53dyM{^xV\"}},\"inputs\":{\"DELTA\":{\"shadow\":{\"type\":\"math_number\",\"id\":\")M-~bWrsA?uoQvepS2N?\",\"fields\":{\"NUM\":0.2}}}},\"next\":{\"block\":{\"type\":\"controls_if\",\"id\":\"1a#5KACJ#eV_l3:ym~4j\",\"inputs\":{\"IF0\":{\"block\":{\"type\":\"logic_compare\",\"id\":\"kx~=Dq8)P-,sKxMjXGWD\",\"fields\":{\"OP\":\"GT\"},\"inputs\":{\"A\":{\"block\":{\"type\":\"variables_get\",\"id\":\"5jpZH%]pd4A%fN+h!*1d\",\"fields\":{\"VAR\":{\"id\":\"~{T|4gQEwB$53dyM{^xV\"}}}},\"B\":{\"block\":{\"type\":\"math_number\",\"id\":\"wduE*l5U@-UJBd4bam{9\",\"fields\":{\"NUM\":12}}}}}},\"DO0\":{\"block\":{\"type\":\"variables_set\",\"id\":\"lY@E1qd[t@|Mr]E^GlG{\",\"fields\":{\"VAR\":{\"id\":\"~{T|4gQEwB$53dyM{^xV\"}},\"inputs\":{\"VALUE\":{\"block\":{\"type\":\"math_number\",\"id\":\"O|^G4_XPA[u%$5W!9~q/\",\"fields\":{\"NUM\":0}}}}}}},\"next\":{\"block\":{\"type\":\"ha.be.Be.Bersih\",\"id\":\"(7d4VY9ISHI3=xQXw=c0\",\"next\":{\"block\":{\"type\":\"ha.be.Spr.Gambar_animasi\",\"id\":\"oSUW959#3i=p^JnnK67D\",\"inputs\":{\"sprite\":{\"block\":{\"type\":\"variables_get\",\"id\":\"V$O!Sc?CAMS/mol6:rAl\",\"fields\":{\"VAR\":{\"id\":\"99*3xs_.J9FLSB`sp](v\"}}}},\"frame\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"IGz5B;6lv[fcAU870`Av\",\"fields\":{\"NUM\":0}},\"block\":{\"type\":\"math_round\",\"id\":\"qg;KwMFoPiq}D)XlH7*b\",\"fields\":{\"OP\":\"ROUNDDOWN\"},\"inputs\":{\"NUM\":{\"block\":{\"type\":\"variables_get\",\"id\":\"SaU6NKz_RdG#t{_pR7lg\",\"fields\":{\"VAR\":{\"id\":\"~{T|4gQEwB$53dyM{^xV\"}}}}}}}}}}}}}}}}}}}},{\"type\":\"ha.be.Be.Grafis\",\"id\":\"HaDx$m%9L0)lj6v$4@k*\",\"x\":187,\"y\":160,\"inputs\":{\"width\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"1Yjl.$%bS/5z=@5Qd]V~\",\"fields\":{\"NUM\":320}}},\"height\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"?(lT9dOGdzVnQ.vcHAEI\",\"fields\":{\"NUM\":240}}}},\"next\":{\"block\":{\"type\":\"variables_set\",\"id\":\"?BBuRH-xfVFsVL#ivCx)\",\"fields\":{\"VAR\":{\"id\":\"99*3xs_.J9FLSB`sp](v\"}},\"inputs\":{\"VALUE\":{\"block\":{\"type\":\"ha.be.Spr.MuatAnimasi\",\"id\":\"(n8a`uP|0k+k|15SU2B9\",\"inputs\":{\"url\":{\"shadow\":{\"type\":\"text\",\"id\":\"a5NlkjwJ|`FWk8UA:,6f\",\"fields\":{\"TEXT\":\"./imgs/exp2_0.png\"}}},\"fw\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"u83`^RR66C|_qC|dE@pe\",\"fields\":{\"NUM\":64}}},\"fh\":{\"shadow\":{\"type\":\"math_number\",\"id\":\"?D38/C/puel(r#V8k,Kf\",\"fields\":{\"NUM\":64}}}}}}},\"next\":{\"block\":{\"type\":\"variables_set\",\"id\":\"5Yx~yy_lz2g[1d$VaC.X\",\"fields\":{\"VAR\":{\"id\":\"~{T|4gQEwB$53dyM{^xV\"}},\"inputs\":{\"VALUE\":{\"block\":{\"type\":\"math_number\",\"id\":\"-_,SOM%_fOTPz^peZ:k6\",\"fields\":{\"NUM\":0}}}}}}}}}]},\"variables\":[{\"name\":\"image\",\"id\":\"99*3xs_.J9FLSB`sp](v\"},{\"name\":\"frame\",\"id\":\"~{T|4gQEwB$53dyM{^xV\"}]}"
        }
    ];
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
            static beUrl = `./js/be.js`;
            static beUrlProd = `https://forkhub.github.io/blockly/js/be.js`;
            static dataTemplate = `
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
        `;
            static dataHtml = `
<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0,
        target-densityDpi=device-dpi">
    <title>Basic Blockly</title>
</head>

<body>
    <canvas></canvas>

    <!-- copy be.js script to your local to help save bandwith, thanks -->
    <script src="<!--be-js-here-->"></script>

    <!-- main  -->
    <script>
        /** template **/
    </script>
</body>

</html>
        `;
            static export(code, prod = false) {
                console.group("export:");
                console.log(code);
                console.groupEnd();
                let data2 = this.dataHtml.replace('<!--be-js-here-->', prod ? this.beUrlProd : this.beUrl);
                data2 = data2.replace('/** template **/', this.dataTemplate);
                data2 = data2.replace('/** script here **/', code);
                // debugger
                return data2;
            }
        }
        blockly.Export = Export;
    })(blockly = ha.blockly || (ha.blockly = {}));
})(ha || (ha = {}));
// namespace ha.blockly {
//     export class HalExport {
//         static init() {
//             let simpan = window.localStorage.getItem("blocklyExport");
//             let textArea = document.querySelector('textarea') as HTMLTextAreaElement;
//             textArea.value = simpan;
//         }
//         static modal() {
//             let simpan = window.localStorage.getItem("blocklyExport");
//             let textArea = document.querySelector('textarea') as HTMLTextAreaElement;
//             textArea.value = simpan;
//         }
//     }
// }
// namespace ha.blockly {
//     export class HalPublish {
//         static init() {
//             let simpan = window.localStorage.getItem("blocklycode");
//             let textArea = document.querySelector('textarea') as HTMLTextAreaElement;
//             textArea.value = simpan;
//         }
//     }
// }
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
                toolbox_1.toolbox.contents.push(getCategory("Graphics", blockly.BlitzData.list)); //registerBlitz());
                toolbox_1.toolbox.contents.push(getCategory("Image 1", blockly.ImageBlockData.list));
                toolbox_1.toolbox.contents.push(getCategory("Image 2", blockly.ImageBlockData2.list));
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
                        if (itemBlockData.output == undefined) {
                            code += `\n/*${itemBlockData.message0}*/\n`;
                        }
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
                blockly.Store.devMode = false;
                blockly.HalListProject.init();
                blockly.HalListDemo.init();
                ha.blockly.Entity.init();
                ha.blockly.toolbox.init();
                Index.initWorkSpace();
                blockly.Op.resize();
                blockly.Op.op();
                try {
                    let def = JSON.parse(blockly.Store.defWSpace);
                    console.log(def);
                    Blockly.serialization.workspaces.load(JSON.parse(blockly.Store.defWSpace), Index.workspace);
                    if (blockly.Store.devMode) {
                    }
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
                message0: "Input Hit count",
                tooltip: "return how many time an input is pressed since the last call",
                output: EOutput.Number
            });
            // ha.be.Input.InputX;
            InputBlockData.list.push({
                type: "ha.be.Input.InputX",
                perintah: "InputX",
                message0: "Input X position",
                tooltip: "return the x position of input",
                output: EOutput.Number
            });
            // ha.be.Input.InputY
            InputBlockData.list.push({
                type: "ha.be.Input.InputY",
                perintah: "InputY",
                message0: "Input Y position",
                tooltip: "return the y position of input",
                output: EOutput.Number
            });
            //Input extended
            // ===========
            // ha.be.Input.Pencet
            InputBlockData.list.push({
                type: "ha.be.Input.Pencet",
                perintah: "InputIsDown",
                message0: "Input Is Down",
                tooltip: "return true if an input is pressed",
                output: EOutput.Boolean
            });
            // const GeserX = ha.be.Input.GeserX;
            InputBlockData.list.push({
                type: "ha.be.Input.GeserX",
                perintah: "DragX",
                message0: "Drag X position",
                tooltip: "return drag x position relative to start position",
                output: EOutput.Boolean
            });
            // const DragY = ha.be.Input.GeserY;
            InputBlockData.list.push({
                type: "ha.be.Input.GeserY",
                perintah: "DragY",
                message0: "Drag Y position",
                tooltip: "return drag y position relative to start position",
                output: EOutput.Number
            });
            // const IsDragged = ha.be.Input.Geser;
            InputBlockData.list.push({
                type: "ha.be.Input.Geser",
                perintah: "InputIsDragged",
                message0: "Input Is Dragged",
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
                perintah: "Graphics",
                message0: "Graphics %1 width: %2 height: %3",
                inputsInline: true,
                args: {
                    dummy: '',
                    width: 320,
                    height: 240
                },
                tooltip: `
            Initialize graphics.
            Use this block as the first block in your appp.
            width: prefered canvas width
            height: prefered canvas height
        `
            };
            BlitzData.list.push(BlitzData.Grafis);
            // ha.be.Be.Bersih
            BlitzData.list.push({
                type: "ha.be.Be.Bersih",
                perintah: "Cls",
                message0: 'Cls',
                tooltip: "Clear the screen"
            });
            // Color
            //ha.be.Be.Warna;
            BlitzData.list.push({
                type: "ha.be.Be.Warna",
                perintah: "Color",
                message0: 'Set Fill Color to red %1 green %2 blue %3 alpha %4',
                inputsInline: true,
                args: {
                    red: 0,
                    green: 0,
                    blue: 0,
                    alpha: 100
                },
                tooltip: `
            Set default fill color:
        `
            });
            // const Stroke = ha.be.Be.StrokeColor;    
            BlitzData.list.push({
                type: " ha.be.Be.StrokeColor",
                perintah: "Stroke",
                message0: 'Set Stroke Color to red %1 green %2 blue %3 alpha %4',
                inputsInline: true,
                args: {
                    red: 0,
                    green: 0,
                    blue: 0,
                    alpha: 100
                },
                tooltip: `
            Set default stroke color:
        `
            });
            // const Line = ha.be.Be.Garis;
            BlitzData.list.push({
                type: "ha.be.Be.Garis",
                perintah: "Line",
                message0: 'Draw Line x1 %1 y1 %2 x2 %3 y2 %4',
                inputsInline: true,
                args: {
                    red: 0,
                    green: 0,
                    blue: 0,
                    alpha: 100
                },
                tooltip: `
            Draw Line
        `
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
                tooltip: `
            Pause a program when developer tool is open.
            This is the alias for debugger
        `,
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
                tooltip: "Add note. Will be converted into comment in the real code",
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
                perintah: "LoadImage",
                args: {
                    dummy: '',
                    url: "./imgs/box.png"
                },
                inputsInline: true,
                output: EOutput.Any,
                tooltip: `
            Load an Image from url.
            Url can be local or absolute.
            When you are drawing an image, 
            and the image is still loaded, 
            then it will only draw a blank image
        `
            };
            ImageBlockData.list.push(ImageBlockData.blitz_Muat);
            // LoadAnimImage
            // ha.be.Spr.MuatAnimasi
            ImageBlockData.list.push({
                type: "ha.be.Spr.MuatAnimasi",
                message0: "LoadAnimImage %1 url: %2 frame width: %3 frame height: %4",
                perintah: "LoadAnimImage",
                args: {
                    dummy: '',
                    url: "./imgs/exp2_0.png",
                    fw: 32,
                    fh: 32
                },
                inputsInline: true,
                output: EOutput.Any,
                tooltip: `
        Load image that contains multiple frames (spritesheet)

        Param:
        url: the url of image, can be local or absolute
        fw: frame wdith
        fh: frame height 
        `
            });
            // DrawImage
            // ha.be.Spr.GambarXY
            // DrawImageXY
            ImageBlockData.list.push({
                type: "ha.be.Spr.Gambar",
                message0: "DrawImage: %4 image %1 x: %2 y: %3",
                perintah: "DrawImageXY",
                inputsInline: true,
                args: {
                    sprite: {},
                    x: 0,
                    y: 0,
                    dummy: ""
                },
                tooltip: `
            Draw image at x, y location
        `
            });
            // TileImage
            //ha.be.Spr.Ubin;
            ImageBlockData.list.push({
                type: "ha.be.Spr.Ubin",
                message0: "TileImage: %5 image %1 x: %2 y: %3 frame: %4",
                perintah: "Tile",
                inputsInline: true,
                args: {
                    sprite: {},
                    x: 0,
                    y: 0,
                    frame: 0,
                    dummy: ''
                },
                tooltip: `
            Draw image with tiling effect
        `
            });
            // HandleImage
            // ha.be.Spr.Handle
            ImageBlockData.list.push({
                type: "ha.be.Spr.Handle",
                message0: "HandleImage: %1 image %2 x: %3 y: %4",
                perintah: "Handle",
                inputsInline: true,
                args: {
                    dummy: '',
                    sprite: {},
                    x: 0,
                    y: 0,
                },
                tooltip: `
            Set the position of image handle, 
            useful for rotation when you want to rotate at specific position 
            rather than from top-left position
        `
            });
            // ResizeImage
            // ha.be.Spr.Ukuran;
            ImageBlockData.list.push({
                type: "ha.be.Spr.Ukuran",
                perintah: "ResizeImage",
                message0: "ResizeImage: %1 image %2 width: %3 height: %4",
                inputsInline: true,
                args: {
                    dummy: '',
                    sprite: {},
                    width: 0,
                    height: 0,
                },
                tooltip: `Resize an Image`
            });
            // RotateImage 
            // ha.be.Spr.Rotasi;
            ImageBlockData.list.push({
                type: "ha.be.Spr.Rotasi",
                perintah: "Rotation",
                message0: "RotateImage: %1 image %2 value (0-360): %3",
                inputsInline: true,
                args: {
                    dummy: '',
                    sprite: {},
                    angle: 0
                },
                tooltip: `rotate an image`
            });
            // ImageAlpha
            // ha.be.Spr.Alpha
            ImageBlockData.list.push({
                type: "ha.be.Spr.Alpha",
                perintah: "ImageAlpha",
                message0: "ImageAlpha: %1 image %2 value (0-100): %3",
                inputsInline: true,
                args: {
                    dummy: '',
                    image: {},
                    alpha: 50
                },
                tooltip: `set image alpha`
            });
            // CopyImage
            //TODO
            /**
             * INFO
             * ====
             */
            // ImageWidth
            // ha.be.Spr.Panjang;
            // Width
            ImageBlockData.list.push({
                type: "ha.be.Spr.Panjang",
                perintah: "Width",
                message0: "Image %2 get width %1",
                inputsInline: true,
                args: {
                    dummy: '',
                    sprite: {},
                },
                output: EOutput.Number,
                tooltip: `Return image width`
            });
            // ImageHeight
            // ha.be.Spr.Lebar;
            // Height
            ImageBlockData.list.push({
                type: "ha.be.Spr.Lebar",
                perintah: "Height",
                message0: "%1 Image %2 get height",
                args: {
                    dummy: '',
                    sprite: {},
                },
                inputsInline: true,
                output: EOutput.Number,
                tooltip: 'Return image get height'
            });
            // ImageXHandle
            // ha.be.Spr.HandleX
            ImageBlockData.list.push({
                type: "ha.be.Spr.HandleX",
                perintah: "ha.be.Spr.HandleX",
                message0: "Image %2 get handle X position %1",
                args: {
                    dummy: '',
                    sprite: {},
                },
                tooltip: "Return the image handle X position",
                output: EOutput.Number,
                inputsInline: true
            });
            // ImageYHandle
            // ha.be.Spr.HandleY
            ImageBlockData.list.push({
                type: "ha.be.Spr.HandleY",
                perintah: "ha.be.Spr.HandleY",
                message0: "image %2 get handle Y position %1",
                args: {
                    dummy: '',
                    sprite: {},
                },
                tooltip: "return the image-handle Y position",
                output: EOutput.Number,
                inputsInline: true
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
            // DrawImageAnim
            // DrawImage
            // ha.be.Spr.Gambar animasi
            ImageBlockData2.list.push({
                type: "ha.be.Spr.Gambar_animasi",
                message0: "DrawImage %1 image %2 frame: %3",
                perintah: "DrawImage",
                inputsInline: true,
                args: {
                    dummy: '',
                    sprite: {},
                    frame: 0,
                },
                tooltip: `
            Draw image at specific frame.
        `
            });
            // const DrawAllImage = ha.be.Spr.GambarSemua;
            ImageBlockData2.list.push({
                type: "ha.be.Spr.GambarSemua",
                perintah: "DrawAllImage",
                message0: "DrawAllImage",
                tooltip: 'Draw All Images, ordered by created time'
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
                },
                tooltip: `
            Make an image dragable.

            There are two drag-mode available:
            - 0: no interaction, default
            - 1: drag movement, 
            - 2: drag rotate
        `
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
            // const ImageXPosition = ha.be.Spr.PosisiX;
            // ImageXPosition
            ImageBlockData2.list.push({
                type: "ha.be.Spr.PosisiX",
                perintah: "ImageXPosition",
                message0: "Image %1 get X position",
                args: {
                    sprite: {},
                },
                inputsInline: true,
                output: EOutput.Number,
                tooltip: 'Return Image x position'
            });
            // const ImageYPosition = ha.be.Spr.PosisiY;
            // ImageYPosition
            ImageBlockData2.list.push({
                type: "ha.be.Spr.PosisiY",
                perintah: "ImageYPosition",
                message0: "Image %1 get Y position",
                args: {
                    sprite: {},
                },
                inputsInline: true,
                output: EOutput.Number,
                tooltip: 'Return Image y position'
            });
            //rotation get
            // Rotation
            // ha.be.Spr.Rotasi
            ImageBlockData2.list.push({
                type: "ha.be.Spr.Rotasi_get",
                perintah: "Rotation",
                message0: "Image %1 get rotation",
                args: {
                    sprite: {},
                },
                inputsInline: true,
                output: EOutput.Number,
                tooltip: 'set image rotation'
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
                output: EOutput.Boolean,
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
