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
var ha;
(function (ha) {
    var comp;
    (function (comp) {
        class Util {
            static getEl(query, parent = null, err = true) {
                let el;
                if (!parent)
                    parent = document.body;
                el = parent.querySelector(query);
                if (el) {
                    return el;
                }
                else {
                    console.log(parent);
                    console.log(query);
                    if (err) {
                        throw new Error('query not found ');
                    }
                    else {
                        return null;
                    }
                }
            }
            //default error
            static error(e) {
                console.error(e);
                comp.dialog.tampil(e.message);
            }
            //shared
            static kirimWa(teks) {
                return "whatsapp://send?text=" + teks;
            }
            static getUrl(url, params) {
                let urlHasil = url;
                console.group('get url');
                console.log('url: ' + url);
                console.log('params: ' + JSON.stringify(params));
                params.forEach((item) => {
                    console.log('reg: ' + urlHasil.search(/\:[a-zA-Z_0-9]+/));
                    urlHasil = urlHasil.replace(/\:[a-zA-Z_0-9]+/, item + '');
                    console.log('item: ' + item);
                    console.log('url: ' + urlHasil);
                });
                console.log('url hasil: ' + urlHasil);
                console.groupEnd();
                return urlHasil;
            }
            static AjaxLogin(type_1, urlServer_1, dataStr_1, loginUrl_1) {
                return __awaiter(this, arguments, void 0, function* (type, urlServer, dataStr, loginUrl, pf = null) {
                    let xml;
                    xml = yield this.Ajax(type, urlServer, dataStr, pf);
                    if (401 == xml.status) {
                        window.top.location.href = loginUrl;
                        return null;
                    }
                    else {
                        return xml;
                    }
                });
            }
            static Ajax2(type_1, url_1, dataStr_1) {
                return __awaiter(this, arguments, void 0, function* (type, url, dataStr, pf = null) {
                    let x = yield this.Ajax(type, url, dataStr, pf);
                    if (x.status == 200 || x.status == 0) {
                        return x.responseText;
                    }
                    console.log('error status code: ' + x.status);
                    throw Error(x.responseText);
                });
            }
            //TODO: hapus
            static sql(query) {
                return __awaiter(this, void 0, void 0, function* () {
                    query;
                    return [];
                });
            }
            static Ajax(type_1, url_1, dataStr_1) {
                return __awaiter(this, arguments, void 0, function* (type, url, dataStr, pf = null) {
                    return new Promise((resolve, reject) => {
                        try {
                            console.group('send data');
                            // console.log(dataStr);
                            console.log("type " + type);
                            comp.loading.attach(document.body);
                            let xhr = new XMLHttpRequest();
                            xhr.onload = () => {
                                comp.loading.detach();
                                resolve(xhr);
                            };
                            xhr.onerror = (e) => {
                                console.log('xhr error');
                                console.log(e);
                                comp.loading.detach();
                                reject(new Error(e.message));
                            };
                            xhr.onprogress = (p) => {
                                if (pf) {
                                    pf(p);
                                }
                            };
                            xhr.open(type, url + "", true);
                            xhr.setRequestHeader('Content-type', 'application/json');
                            // xhr.setRequestHeader('from', window.sessionStorage.getItem(Util.sUserId));
                            // xhr.setRequestHeader('id', window.sessionStorage.getItem(Util.sUserId));
                            xhr.send(dataStr);
                            // console.log("type " + type);
                            // console.log("url " + url);
                            console.groupEnd();
                        }
                        catch (e) {
                            console.log('Util error');
                            console.log(e);
                            comp.loading.detach();
                            reject(new Error(e.message));
                        }
                    });
                });
            }
        }
        Util.sUserId = 'user_id';
        Util.sLevel = 'level';
        Util.sFilter = 'filter';
        Util.storageId = 'xyz.hagarden.tugas';
        comp.Util = Util;
    })(comp = ha.comp || (ha.comp = {}));
})(ha || (ha = {}));
