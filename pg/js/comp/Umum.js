"use strict";
var ha;
(function (ha) {
    var comp;
    (function (comp) {
        class Umum {
            formCariHandler(form) {
                form.onsubmit = () => {
                    try {
                        console.log('form on submit get');
                        let formData = new FormData(form);
                        let kunci = '';
                        for (let item of formData.entries()) {
                            if (item[0] == "cari") {
                                kunci = window.encodeURI(item[1].toString());
                            }
                        }
                        let url = form.getAttribute('action');
                        let id = form.getAttribute('anggota-id');
                        if (url == RouterKOns.g_anggota_id_pas_tambah_kunci_hal) {
                            url = Util.getUrl(url, [id, kunci, 0]);
                        }
                        else if (url == RouterKOns.g_anggota_daftar_kunci_hal) {
                            url = Util.getUrl(url, [kunci, 0]);
                        }
                        else if (url == RouterKOns.g_anggota_id_anak_tambah_kunci_hal) {
                            url = Util.getUrl(url, [id, kunci, 0]);
                        }
                        else {
                            throw Error('url belum didefinisikan');
                        }
                        console.log('url');
                        console.log(url);
                        console.log('kunci:');
                        console.log(kunci);
                        console.log('form action: ' + form.action);
                        console.log('form anggota id : ' + id);
                        window.location.href = url;
                    }
                    catch (e) {
                        Util.error(e);
                    }
                    return false;
                };
            }
            formPostJSONHandler(form) {
                form.onsubmit = () => {
                    console.log('form on submit');
                    try {
                        console.log('form on submit, action= ' + form.action);
                        let formData = this.formPopulate(form);
                        console.log(form.action);
                        Util.Ajax("post", form.action, JSON.stringify(formData)).then((xml) => {
                            console.log('xml finish, status ' + xml.status);
                            // console.log('aj-url ' + form.getAttribute('aj-url'));
                            if (xml.status >= 200 && (xml.status <= 300)) {
                                console.debug('ajax sukses');
                                console.debug(xml.responseText);
                                if (form.hasAttribute(Param.HA_DLG)) {
                                    dialog.tampil(form.getAttribute(Param.HA_DLG));
                                    dialog.okTbl.onclick = () => {
                                        if (form.hasAttribute(Param.HA_URL)) {
                                            window.top.location.href = form.getAttribute(Param.HA_URL);
                                        }
                                    };
                                }
                                else if (form.hasAttribute(Param.HA_URL)) {
                                    window.top.location.href = form.getAttribute(Param.HA_URL);
                                }
                            }
                            else {
                                throw Error(xml.responseText);
                            }
                        }).catch((e) => {
                            Util.error(e);
                        });
                    }
                    catch (e) {
                        Util.error(e);
                    }
                    console.debug('form end');
                    return false;
                };
            }
            formPopulate(form) {
                let hasil = {};
                let input = form.querySelectorAll('input');
                let textArea = form.querySelectorAll('textarea');
                let select = form.querySelectorAll('select');
                input.forEach((item) => {
                    let value = '';
                    if (item.hasAttribute(Param.HA_MD5)) {
                        value = md5(item.value);
                    }
                    else if (item.hasAttribute(Param.HA_TINYMCE)) {
                        value = tinyMCE.editors[0].getContent();
                        console.debug('tinymce get content:');
                        console.debug(tinyMCE.editors[0].getContent());
                    }
                    else if (item.getAttribute("type") == "radio") {
                        value = form[item.name].value;
                    }
                    else {
                        value = item.value;
                    }
                    hasil[item.name] = value;
                });
                textArea.forEach((item) => {
                    //TODO: validation, tinymce
                    if (item.hasAttribute(Param.HA_TINYMCE)) {
                        hasil[item.name] = tinyMCE.editors[0].getContent();
                    }
                    else {
                        hasil[item.name] = item.value;
                    }
                });
                select.forEach((item) => {
                    hasil[item.name] = item.value;
                });
                console.log('hasil:');
                console.log(hasil);
                return hasil;
            }
            form() {
                console.log('json submit');
                let formAr = document.body.querySelectorAll('form');
                formAr.forEach((form) => {
                    console.debug(form);
                    if (form.hasAttribute(Param.HA_MANUAL)) {
                        return;
                    }
                    if (form.method.toLowerCase() == 'post') {
                        this.formPostJSONHandler(form);
                    }
                    else if (form.method.toLowerCase() == 'get') {
                        console.log('form get');
                        console.log(form);
                        if (form.getAttribute('type') == "cari") {
                            console.log('form type');
                            console.log(form);
                            this.formCariHandler(form);
                        }
                        else {
                            console.error('belum diimplementasikan');
                        }
                    }
                });
            }
            ajaxKlik(el) {
                if (el.hasAttribute(Param.HA_POST)) {
                    Util.Ajax('post', el.getAttribute(Param.HA_POST), '', null).then((xml) => {
                        console.debug('post selesai');
                        if (xml.status >= 200 && xml.status < 300) {
                            console.debug('status ' + xml.status);
                            console.debug('reload ' + el.hasAttribute(Param.HA_RELOAD));
                            if (el.hasAttribute(Param.HA_RELOAD)) {
                                window.location.reload();
                            }
                            else if (el.hasAttribute(Param.HA_DLG)) {
                                dialog.tampil(el.getAttribute(Param.HA_DLG));
                                dialog.okTbl.onclick = () => {
                                    if (el.hasAttribute(Param.HA_RELOAD)) {
                                        window.location.reload();
                                    }
                                    else if (el.hasAttribute(Param.HA_URL)) {
                                        window.location.href = el.getAttribute(Param.HA_URL);
                                    }
                                };
                            }
                            else if (el.hasAttribute(Param.HA_URL)) {
                                window.location.href = el.getAttribute(Param.HA_URL);
                            }
                        }
                        else {
                            dialog.tampil(xml.responseText);
                        }
                    }).catch((e) => {
                        Util.error(e);
                    });
                }
                else if (el.hasAttribute(Param.HA_GET)) {
                    window.location.href = el.getAttribute(Param.HA_GET);
                }
                else {
                    //errror
                    console.error(el);
                    throw Error('method tidak definisikan post/get');
                }
            }
            klik() {
                let el = document.body.querySelectorAll(`[${Param.HA_KLIK}]`);
                console.log('klik element:');
                console.log(el);
                el.forEach((el2) => {
                    el2.onclick = (e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        if (el2.hasAttribute(Param.HA_KF)) {
                            let ok = confirm(el2.getAttribute(Param.HA_KF));
                            if (ok) {
                                this.ajaxKlik(el2);
                            }
                        }
                        else if (el2.hasAttribute(Param.HA_DLG)) {
                            dialog.tampil(el2.getAttribute(Param.HA_DLG));
                            dialog.okTbl.onclick = () => {
                                this.ajaxKlik(el2);
                            };
                        }
                        else if (el2.hasAttribute(Param.HA_TOGGLE)) {
                            let sel = el2.getAttribute(Param.HA_TOGGLE);
                            let el3 = document.body.querySelector(sel);
                            el3.classList.toggle('disp-none');
                            el3.classList.toggle('disp-block');
                        }
                        else {
                            this.ajaxKlik(el2);
                        }
                    };
                });
            }
            tiny() {
                let el = document.body.querySelectorAll(`textarea[${Param.HA_TINYMCE}]`);
                let el2 = el[0];
                console.log(el);
                console.log(el2);
                if (!el2)
                    return;
                console.debug('tiny mce init');
                console.debug(tinyMCE.init);
                tinyMCE.init({
                    setup: (ed) => {
                        ed.on('init', (_args) => {
                            console.debug('tinymce on loaded');
                            // this.init();
                        });
                        // ed.on('init', () => {
                        // 	this.updateStatusTombolSimpan();
                        // });
                    },
                    selector: `textarea[${Param.HA_TINYMCE}]`
                });
            }
        }
        comp.Umum = Umum;
        var umum = new Umum();
        umum.form();
        umum.klik();
        umum.tiny();
    })(comp = ha.comp || (ha.comp = {}));
})(ha || (ha = {}));
