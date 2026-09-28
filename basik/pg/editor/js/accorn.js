"use strict";
class Accorn {
    constructor() {
        this.rword = [];
        this.rEvt = [
            //event
            "update",
            //umum
            "mulai",
            "warnaGaris",
            "tebalGaris",
            //gambar
            "muatGambar",
            "muatAnimasi",
            "stempel",
            "gambarTabrakan",
            "poinDidalamGambar",
            "semuaGambarSelesaiDimuat",
            "hapusGAmbar",
            "posisiGambar",
            "ukuranGambar",
            "pusatGambar",
            "geserGambar",
            "putarGambar",
            //input
            "mouseDitahan",
            "mouseDidrag",
            "mouseDragX",
            "mouseDragY",
            "mouseX",
            "mouseY",
            "mouseDragAwalX",
            "mouseDragAwalY",
            "mouseGerakX",
            "mouseGerakY",
            //matematika
            "akar",
            "pi",
            "jarak",
            "jarakSudut",
            "sudut",
            "polarX",
            "polarY",
            "abs",
            "normalisasiSudut",
            "pembulatan",
            //font
            "posisiTeks",
            "tulis",
            "fontTeks",
            "ukuranTeks",
            "perataanTeks",
            //shape
            "bukaPath",
            "garisKe",
            "kurvaKe",
            "lingkaranKe",
            "tutupPath",
            "lingkaran",
            "elips",
            "kotak",
            "pie",
            "garis",
            "polygonTeratur",
            "gambarBintang",
            "gambarSegitiga"
        ];
        this.rEvt.forEach((item) => {
            this.rword.push(item);
        });
    }
    checkVar() {
        // let vars, funcs = this.walk();
    }
    parse(code) {
        let varErr = [];
        // let funErr: string[] = [];
        let funErr = [];
        let callErr = [];
        try {
            let ast = acorn.parse(code, { ecmaVersion: 2020, sourceType: 'module' });
            let { variables, functions, calls } = this.walk(ast);
            console.log("ast: ", ast);
            console.log("code: ", code);
            console.log("variables: ", variables);
            console.log("functions: ", functions);
            variables.forEach((v) => {
                this.rword.forEach((w) => {
                    if (v === w) {
                        varErr.push(v);
                    }
                });
            });
            calls.forEach((f) => {
                this.rEvt.forEach((e) => {
                    if (f.toLowerCase() === e.toLocaleLowerCase()) {
                        if (f !== e) {
                            callErr.push({
                                v: f,
                                b: e
                            });
                        }
                    }
                });
            });
            functions.forEach((f) => {
                this.rEvt.forEach((e) => {
                    if (f.toLowerCase() === e.toLocaleLowerCase()) {
                        if (f !== e) {
                            funErr.push({
                                v: f,
                                b: e
                            });
                        }
                    }
                });
            });
        }
        catch (e) {
            console.log(e);
        }
        console.log({ varErr, funErr, callErr });
        return { varErr, funErr, callErr };
    }
    walk(node, parent = null) {
        var _a, _b, _c, _d;
        const variables = [];
        const functions = [];
        const calls = [];
        parent;
        if (!node || typeof node !== 'object') {
            return { variables, functions, calls };
        }
        // 1. Process current node
        switch (node.type) {
            case 'VariableDeclaration':
                (_a = node.declarations) === null || _a === void 0 ? void 0 : _a.forEach((decl) => {
                    if (decl.id && decl.id.name) {
                        const isFunctionExpr = decl.init && (decl.init.type === 'FunctionExpression' ||
                            decl.init.type === 'ArrowFunctionExpression');
                        if (isFunctionExpr) {
                            functions.push(decl.id.name);
                        }
                        else {
                            variables.push(decl.id.name);
                        }
                    }
                });
                break;
            case 'FunctionDeclaration':
                if (node.id && node.id.name) {
                    functions.push(node.id.name);
                }
                break;
            case 'AssignmentExpression':
                if (((_b = node.left) === null || _b === void 0 ? void 0 : _b.type) === 'Identifier' &&
                    (((_c = node.right) === null || _c === void 0 ? void 0 : _c.type) === 'FunctionExpression' || ((_d = node.right) === null || _d === void 0 ? void 0 : _d.type) === 'ArrowFunctionExpression')) {
                    functions.push(node.left.name);
                }
                break;
            case 'ClassDeclaration':
                if (node.id && node.id.name) {
                    functions.push(node.id.name);
                }
                break;
            case 'MethodDefinition':
                if (node.key && node.key.name) {
                    functions.push(node.key.name);
                }
                break;
            case 'CallExpression':
                if (node.callee && node.callee.name) {
                    calls.push(node.callee.name);
                }
                else {
                    console.warn("invalid CallExpression", node);
                }
                //TODO:
                break;
            default:
                console.warn("undefined type ", node.type);
        }
        // Keys to skip during traversal to avoid redundant processing or circular structure loops
        const ignoredKeys = new Set(['loc', 'range', 'comments', 'tokens', 'parent']);
        // 2. Traverse children and collect recursive results
        for (const key of Object.keys(node)) {
            if (ignoredKeys.has(key))
                continue;
            const child = node[key];
            if (Array.isArray(child)) {
                child.forEach(c => {
                    if (c && typeof c.type === 'string') {
                        const childResult = this.walk(c, node);
                        variables.push(...childResult.variables);
                        functions.push(...childResult.functions);
                        calls.push(...childResult.calls);
                    }
                });
            }
            else if (child && typeof child.type === 'string') {
                const childResult = this.walk(child, node);
                variables.push(...childResult.variables);
                functions.push(...childResult.functions);
                calls.push(...childResult.calls);
            }
        }
        return { variables, functions, calls };
    }
}
var acornParser = new Accorn();
