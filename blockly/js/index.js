"use strict";
var EOutput;
(function (EOutput) {
    EOutput["Boolean"] = "Boolean";
    EOutput["Number"] = "Number";
    EOutput["String"] = "String";
    EOutput["Array"] = "Array";
})(EOutput || (EOutput = {}));
var EArgType;
(function (EArgType) {
    EArgType["inputValue"] = "input_value";
})(EArgType || (EArgType = {}));
var ToolBoxKind;
(function (ToolBoxKind) {
    ToolBoxKind["categoryToolbox"] = "categoryToolbox";
    ToolBoxKind["category"] = "category";
    ToolBoxKind["block"] = "block";
})(ToolBoxKind || (ToolBoxKind = {}));
///<reference path="./toolboxType.ts"/>
var ha;
(function (ha) {
    var blockly;
    (function (blockly) {
        var BDef;
        (function (BDef) {
            function defValue(t) {
                if (t.output) {
                }
                else {
                    t.previousStatement = null;
                    t.nextStatement = null;
                }
                if (t.inputsInline == undefined) {
                    t.inputsInline = false;
                }
                ;
                t.colour = 230;
                t.tooltip = t.tooltip || "";
                t.helpUrl = t.helpUrl || "";
            }
            function createShadow(t) {
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
                else if (EOutput.Boolean) {
                    return {
                        shadow: {
                            "type": "logic_boolean",
                            "fields": {
                                "BOOL": t.default
                            }
                        }
                    };
                }
                throw Error('not supported: ' + t.check);
            }
            function addArg(t) {
                function getCheck(n) {
                    if (typeof n == "number")
                        return EOutput.Number;
                    if (typeof n == "string")
                        return EOutput.String;
                    if (typeof n == "boolean")
                        return EOutput.Boolean;
                    throw Error(n);
                }
                t.args0 = [];
                for (let i in t.args) {
                    t.args0.push({
                        check: getCheck(t.args[i]),
                        type: EArgType.inputValue,
                        default: t.args[i] + '',
                        name: i + ''
                    });
                }
            }
            function addInput(t) {
                if (t.inputs)
                    return;
                let inputs = {};
                t.args0.forEach((item) => {
                    inputs[item.name] = createShadow(item);
                });
                t.inputs = inputs;
            }
            function normal(t) {
                defValue(t);
                addArg(t);
                addInput(t);
            }
            function init() {
                normal(blockly.BlizData.Grafis);
                normal(blockly.BlizData.Muat);
                blockly.BlizData.list.forEach((item) => {
                    normal(item);
                });
            }
            BDef.init = init;
        })(BDef = blockly.BDef || (blockly.BDef = {}));
    })(blockly = ha.blockly || (ha.blockly = {}));
})(ha || (ha = {}));
///<reference path="./toolboxType.ts"/>
var ha;
(function (ha) {
    var blockly;
    (function (blockly) {
        var BlizData;
        (function (BlizData) {
            BlizData.Grafis = {
                type: "Grafis",
                message0: "Graphics width: %1 height: %2",
                args: {
                    width: 320,
                    height: 240
                }
            };
            BlizData.Muat = {
                type: "Muat",
                message0: 'Load Sprite from url: %1',
                inputsInline: false,
                args: {
                    url: "block.png"
                },
                output: EOutput.Number
            };
            BlizData.list = [];
            BlizData.list.push(BlizData.Grafis);
            BlizData.list.push(BlizData.Muat);
            BlizData.list.push({
                type: "Cls",
                message0: 'Clear Screen',
            });
            BlizData.list.push({
                type: "DrawSprite",
                message0: "Draw sprite: %1",
                args: {
                    sprite: 0
                }
            });
        })(BlizData = blockly.BlizData || (blockly.BlizData = {}));
    })(blockly = ha.blockly || (ha.blockly = {}));
})(ha || (ha = {}));
///<reference path="./toolboxType.ts"/>
var ha;
(function (ha) {
    var blockly;
    (function (blockly) {
        var toolbox;
        (function (toolbox_1) {
            function ToolBoxCreateJSDef(t) {
                console.log("test: " + t.type);
                javascript.javascriptGenerator.forBlock[t.type] = function (block, generator) {
                    let code = '';
                    code = t.type + '(';
                    t.args0.forEach((item, idx) => {
                        let value = generator.valueToCode(block, item.name, javascript.Order.ATOMIC);
                        console.log('value to code >>', "item name:", item.name, "value", value);
                        code += value;
                        if (idx < t.args0.length - 1) {
                            code += ',';
                        }
                    });
                    code += ');\n';
                    console.log("code", code);
                    return code;
                };
            }
            toolbox_1.ToolBoxCreateJSDef = ToolBoxCreateJSDef;
            function init() {
                blockly.BDef.init();
                blockly.BlizData.list.forEach((item) => {
                    blockData.push(item);
                });
                Blockly.common.defineBlocksWithJsonArray(blockData);
                //register blitz
                let blitz = {
                    kind: "category",
                    name: "Blitz",
                    contents: []
                };
                //register blitz content 
                blockData.forEach((item) => {
                    let def = {
                        name: item.type,
                        kind: ToolBoxKind.block,
                        type: item.type
                    };
                    if (item.inputs) {
                        def.inputs = item.inputs;
                    }
                    blitz.contents.push(def);
                });
                toolbox_1.toolbox.contents.push(blitz);
                for (let i = 0; i < blockData.length; i++) {
                    let itemBlockData = blockData[i];
                    console.log('type: ' + itemBlockData.type);
                    javascript.javascriptGenerator.forBlock[itemBlockData.type] = (block, generator) => {
                        let code = '';
                        console.group("");
                        code = itemBlockData.type + '(';
                        itemBlockData.args0.forEach((item, idx) => {
                            let value = generator.valueToCode(block, item.name, javascript.Order.ATOMIC);
                            console.log('value to code >>', "item name:", item.name, "value", value);
                            code += value;
                            if (idx < itemBlockData.args0.length - 1) {
                                code += ',';
                            }
                        });
                        code += ')';
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
            toolbox_1.init = init;
            let blockData = [];
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
ha.blockly.toolbox.init();
var options = {
    toolbox: ha.blockly.toolbox.toolbox,
    collapse: true,
    comments: true,
    disable: true,
    maxBlocks: Infinity,
    trashcan: true,
    horizontalLayout: false,
    toolboxPosition: 'start',
    css: true,
    media: 'https://blockly-demo.appspot.com/static/media/',
    rtl: false,
    scrollbars: true,
    sounds: true,
    oneBasedIndex: true
};
/* Inject your workspace */
const workspace = Blockly.inject("blocklyDiv", options);
workspace;
/* Load Workspace Blocks from XML to workspace. Remove all code below if no blocks to load */
/* TODO: Change workspace blocks XML ID if necessary. Can export workspace blocks XML from Workspace Factory. */
// var workspaceBlocks = document.getElementById("workspaceBlocks");
/* Load blocks to workspace. */
// Blockly.Xml.domToWorkspace(workspaceBlocks, workspace);
let w = window;
w.test = () => {
    let simpan = Blockly.serialization.workspaces.save(workspace);
    window.localStorage.setItem("blocklytest", JSON.stringify(simpan));
    console.log(simpan);
};
w.load = () => {
    let simpan = window.localStorage.getItem("blocklytest");
    let code = JSON.parse(simpan);
    Blockly.serialization.workspaces.load(code, workspace);
};
w.code = () => {
    let code = javascript.javascriptGenerator.workspaceToCode(workspace);
    console.log(code);
};
w.tambahVar = () => {
    let var1 = prompt('variable baru');
    let simpan = Blockly.serialization.workspaces.save(workspace);
    if (!simpan.variables) {
        simpan.variables = [];
    }
    simpan.variables.push({
        id: 'random_id' + Math.floor(Math.random() * 1000),
        name: var1
    });
    Blockly.serialization.workspaces.load(simpan, workspace);
};
// console.log(window);
window.onload = () => {
    // console.log('test');
    // console.log(w.test);
    // console.log("=================");
};
// javascript.javascriptGenerator.forBlock['blitz_graphics'] = function (block: any, generator: any) {
// 	var value_width = generator.valueToCode(block, 'width', javascript.Order.ATOMIC) || 240;
// 	var value_height = generator.valueToCode(block, 'height', javascript.Order.ATOMIC) || 320;
// 	var checkbox_name = block.getFieldValue('fullScreen') === 'TRUE';
// 	var checkbox_name2 = block.getFieldValue('handleInput') === 'TRUE';
// 	// TODO: Assemble javascript into code variable.
// 	var code = `Graphics (${value_width}, ${value_height}, ${checkbox_name}, ${checkbox_name2} )\n`;
// 	return code;
// };
console.log(Blockly);
