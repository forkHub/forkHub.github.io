const pData = { "blocks": { "languageVersion": 0, "blocks": [{ "type": "ha.be.Be.Start", "id": "ttDi6Y1piNqKi!GKH=;f", "x": 124, "y": 137, "deletable": false, "inputs": { "width": { "shadow": { "type": "math_number", "id": "!nbtU},x?W~b8S2S9fc;-", "fields": { "NUM": 320 } } }, "height": { "shadow": { "type": "math_number", "id": "(i=R@FswM^]Ps$?-8bzQ", "fields": { "NUM": 240 } } }, "statementst": { "block": { "type": "variables_set", "id": "$b|JC~z(j%E*Hr(EObtMt", "fields": { "VAR": { "id": "99*3xs_.J9FLSBbtsp](v" } }, "inputs": { "VALUE": { "block": { "type": "ha.be.Spr.Muat", "id": "-Wwr3nwkx~$;z$;b1tzu", "inputs": { "url": { "shadow": { "type": "text", "id": "tjz/~)*VQIRK@:47=aoI", "fields": { "TEXT": "./imgs/box.png" } } } } } } }, "next": { "block": { "type": "ha.be.Spr.Posisi", "id": "h@|H{,pNMJ3;RhsXHUyX", "inputs": { "sprite": { "block": { "type": "variables_get", "id": "UhXNf:Mh,0wuQSoV8]bg", "fields": { "VAR": { "id": "99*3xs_.J9FLSBbtsp](v" } } } }, "x": { "shadow": { "type": "math_number", "id": "6efDQ$!;u-:ecjm};|bD", "fields": { "NUM": 100 } } }, "y": { "shadow": { "type": "math_number", "id": "maW^:y7q~0a}(=C!%J}/", "fields": { "NUM": 100 } } } }, "next": { "block": { "type": "variables_set", "id": "5?iJ7*j29,eSZzdU1HcW", "fields": { "VAR": { "id": "_~/OX,;?xJu0d=q2wGym" } }, "inputs": { "VALUE": { "block": { "type": "ha.be.Spr.Muat", "id": "-GD/*xd7C]0Aqgh^|KB/", "inputs": { "url": { "shadow": { "type": "text", "id": "$Jp5ys1OxY#rHSbtxKcD^", "fields": { "TEXT": "./imgs/box.png" } } } } } } }, "next": { "block": { "type": "ha.be.Spr.Handle", "id": "-hJi/iymwt;s:wkl.EKt", "inputs": { "sprite": { "block": { "type": "variables_get", "id": "btqbKOHG@X+~UaGa/Q=]5", "fields": { "VAR": { "id": "_~/OX,;?xJu0d=q2wGym" } } } }, "x": { "shadow": { "type": "math_number", "id": "vRg3Mm%j)=0%|mP-X2nZ", "fields": { "NUM": 16 } } }, "y": { "shadow": { "type": "math_number", "id": ",Fp5{J0Y2=.+sbJ)]*Xc", "fields": { "NUM": 16 } } } }, "next": { "block": { "type": "ha.be.Spr.Posisi", "id": "1sYc{$fyMQE.O8Ym,dag", "inputs": { "sprite": { "block": { "type": "variables_get", "id": "opVTMD,5$_!-(wCX]VcK", "fields": { "VAR": { "id": "_~/OX,;?xJu0d=q2wGym" } } } }, "x": { "shadow": { "type": "math_number", "id": "FwoLWFfhcN!6RB?k+Dgj", "fields": { "NUM": 200 } } }, "y": { "shadow": { "type": "math_number", "id": "/*GS.OmWL1.l:G*+.i}V", "fields": { "NUM": 100 } } } } } } } } } } } } } } } }, { "type": "ha.be.Be.Update", "id": "D!_p@;(TK|!Jb;q9U}?k", "x": 521, "y": 416, "inputs": { "statementst": { "block": { "type": "+=", "id": "6rA]I8[stMq*Yq2!3TbA", "inputs": { "var1": { "block": { "type": "ha.be.Spr.Rotasi_get", "id": "[{Q;2C*kJWxdV+l$B7js", "inputs": { "sprite": { "block": { "type": "variables_get", "id": "q~P7p6IIdxn6#uqAuPB|", "fields": { "VAR": { "id": "99*3xs_.J9FLSBbtsp](v" } } } } } } }, "value": { "shadow": { "type": "math_number", "id": ":ifzxk*Pl1~UJFwQTEsW", "fields": { "NUM": 10 } } } }, "next": { "block": { "type": "+=", "id": "!Q_Y.NEzi1Q%WO0gB^S)", "inputs": { "var1": { "block": { "type": "ha.be.Spr.Rotasi_get", "id": "|!:/hm/%/)jl717uQ+)z", "inputs": { "sprite": { "block": { "type": "variables_get", "id": "cB+6@$RA?a$88jpG(r5=", "fields": { "VAR": { "id": "_~/OX,;?xJu0d=q2wGym" } } } } } } }, "value": { "shadow": { "type": "math_number", "id": "bt+Q((({1F}0nuxeC@;4G", "fields": { "NUM": 10 } } } }, "next": { "block": { "type": "ha.be.Be.Bersih", "id": "(7d4VY9ISHI3=xQXw=c0", "next": { "block": { "type": "ha.be.Spr.GambarSemua", "id": "+XeMS]7,od#~cpbtHK;+Y" } } } } } } } } } }] }, "variables": [{ "name": "image", "id": "99*3xs_.J9FLSBbtsp](v" }, { "name": "image 2", "id": "_~/OX,;?xJu0d=q2wGym" }] }