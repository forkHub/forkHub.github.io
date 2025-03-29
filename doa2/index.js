"use strict";
let files = [
    "berlindung/b02.png",
    "berlindung/b03.png",
    "berlindung/b04.png",
    "berlindung/b05.png",
    "berlindung/b06.png",
    "berlindung/b07.png",
    "berlindung/b08.png",
    "berlindung/b09.png",
    "berlindung/b10.png",
    "berlindung/b11.png",
    "penawar/p01.png",
    "penawar/p02.png",
    "penawar/p03.png",
    "penawar/p04.png",
    "penawar/p05.png",
    "penawar/p06.png",
    "penawar/te01.png",
    "penawar/te02.png",
    "terhindar/t02.png",
    "terhindar/t03.png",
    "terhindar/t08.png",
    "terhindar/t09.png"
];
class TFile {
    constructor() {
        this.file = "";
        this.ctr = 0;
    }
}
let fileObjs = [];
const STORAGE_ITEM = "ha.doa2";
try {
    let str = window.localStorage.getItem(STORAGE_ITEM);
    fileObjs = JSON.parse(str);
    fileObjs.sort((a, b) => a.ctr - b.ctr);
    console.log("get from local storge");
}
catch (e) {
    fileObjs = [];
    files.forEach((item) => {
        let fileObj = new TFile();
        fileObj.file = item;
        fileObj.ctr = 0;
        fileObjs.push(fileObj);
    });
    fileObjs.sort((a, b) => a.ctr - b.ctr);
    console.log("recreate items");
}
window.onload = () => {
    //get counter =0;
    let fileObj = fileObjs[Math.floor(Math.random() * 3)];
    fileObj.ctr++;
    console.log(fileObj);
    //simpan
    window.localStorage.setItem("ha.doa2", JSON.stringify(fileObjs));
    //renders
    document.querySelector(".img-cont img").src = fileObj.file;
};
