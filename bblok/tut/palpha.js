const pData = { "workspaceComments": [{ "height": 135, "width": 389, "id": "Uw^ikj2H==n@)A1OkVBL", "x": 653, "y": 29, "text": "Anda bisa mengatur transparansi dari image dengan mengeset property alpha.\n\nNilai alpha mulai dari 0 hingga 1" }], "blocks": { "languageVersion": 0, "blocks": [{ "type": "ha.be.Be.Start", "id": "ttDi6Y1piNqKi!GKH=;f", "x": 124, "y": 137, "deletable": false, "inputs": { "width": { "shadow": { "type": "math_number", "id": "!n`U},x?W~b8S2S9fc;-", "fields": { "NUM": 320 } } }, "height": { "shadow": { "type": "math_number", "id": "(i=R@FswM^]Ps$?-8bzQ", "fields": { "NUM": 240 } } }, "statementst": { "block": { "type": "set var", "id": "7.Y0mzuWNOz-1ww5A-;H", "data": "{\"readonly\":false,\"property\":false}", "inputs": { "var1": { "block": { "type": "variables_get", "id": "H_J]$xXnvA5KercS;S2,", "fields": { "VAR": { "id": "99*3xs_.J9FLSB`sp](v" } } } }, "value": { "shadow": { "type": "math_number", "id": "khXUsrivc6mT58,?_?WL", "fields": { "NUM": 0 } }, "block": { "type": "ha.be.Spr.Muat", "id": "-Wwr3nwkx~$;z$;b1tzu", "inputs": { "url": { "shadow": { "type": "text", "id": "tjz/~)*VQIRK@:47=aoI", "fields": { "TEXT": "./imgs/box.png" } } } } } } }, "next": { "block": { "type": "set var", "id": "2OgU+{U[MzmA.%c$k8SA", "data": "{\"readonly\":false,\"property\":false}", "inputs": { "var1": { "block": { "type": "variables_get", "id": "3!rB.jt?QlH|/UX9YU.H", "fields": { "VAR": { "id": "Jb*nbt]LBWUz{F~PHIx~" } } } }, "value": { "shadow": { "type": "math_number", "id": "khXUsrivc6mT58,?_?WL", "fields": { "NUM": 0 } }, "block": { "type": "ha.be.Spr.Muat", "id": "S?~ursUf}aOCivoMl:P]", "inputs": { "url": { "shadow": { "type": "text", "id": "$.,J$`z/FU9G@;ib,E~6", "fields": { "TEXT": "./imgs/box.png" } } } } } } }, "next": { "block": { "type": "ha.be.Spr.Posisi", "id": "dsodgwEAyQ^rQZdJ?AxQ", "inputs": { "sprite": { "block": { "type": "variables_get", "id": "S$1,:`S6v:IVMscoF4a)", "fields": { "VAR": { "id": "Jb*nbt]LBWUz{F~PHIx~" } } } }, "x": { "shadow": { "type": "math_number", "id": ";tk0JQKWKQ`yq|E(PcR=", "fields": { "NUM": 15 } } }, "y": { "shadow": { "type": "math_number", "id": "cSA!M[kl*p)pQn,Mt6E=", "fields": { "NUM": 15 } } } }, "next": { "block": { "type": "set var", "id": "1%/V:ZGtkzM77lr7UCep", "data": "{\"readonly\":false,\"property\":false}", "inputs": { "var1": { "block": { "type": "alpha prop", "id": "vL2QW-=ri+-He6Y53QY?", "inputs": { "sprite": { "block": { "type": "variables_get", "id": "ITT^WuUa${yq:kVv2Mu`", "fields": { "VAR": { "id": "Jb*nbt]LBWUz{F~PHIx~" } } } } } } }, "value": { "shadow": { "type": "math_number", "id": "TIfz82qkJ]khWGS4@^hx", "fields": { "NUM": 0.5 } } } } } } } } } } } } } }, { "type": "ha.be.Be.Update", "id": "D!_p@;(TK|!Jb;q9U}?k", "x": 376, "y": 411, "inputs": { "statementst": { "block": { "type": "ha.be.Be.Bersih", "id": "(7d4VY9ISHI3=xQXw=c0", "next": { "block": { "type": "ha.be.Spr.GambarSemua", "id": "+XeMS]7,od#~cp`HK;+Y" } } } } } }] }, "variables": [{ "name": "image", "id": "99*3xs_.J9FLSB`sp](v" }, { "name": "image 2", "id": "Jb*nbt]LBWUz{F~PHIx~" }] }