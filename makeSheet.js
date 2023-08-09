const xlsx = require("xlsx-js-style");
const exc = require("./excIndex.js");

exports.makeSheet = function (name, jsoninfo, workBook, header1, cnt1, header2, cnt2, header3, cnt3, header4, cnt4, header5, cnt5, header6, cnt6) {
    xlsx.utils.book_append_sheet(workBook, {}, name);  
    var ws = xlsx.utils.sheet_add_json(workBook.Sheets[name], jsoninfo, { origin : "A2"});

    try {
        var prodStCol = Object.keys(jsoninfo[0]).length;
        var prodStRow = Object.keys(jsoninfo).length;
        var trg = 0;

        for(var n = 65; n < 65 + prodStCol; n++) {
            for(var m = 1; m < prodStRow + 3; m++) {
                var t = exc.excIndex(n);
                var p = String(m);
                
                // Header
                if(m == 1 && n == 65) { ws[t+p] = {t: 's', v: header1, s: {font: {bold: true}, fill: {fgColor: {rgb: "FFFF33"}}, border: {bottom: {style: "thin"}}}};  trg = 1;}
                else if(m == 1 && n == 65+cnt1) { ws[t+p] = {t: 's', v: header2, s: {font: {bold: true}, fill: {fgColor: {rgb: "E0E0E0"}}, border: {bottom: {style: "thin"}}}};  trg = 2;}
                else if(m == 1 && n == 65+cnt1+cnt2) { ws[t+p] = {t: 's', v: header3, s: {font: {bold: true}, fill: {fgColor: {rgb: "99FFCC"}}, border: {bottom: {style: "thin"}}}};  trg = 3;}
                else if(m == 1 && n == 65+cnt1+cnt2+cnt3) { ws[t+p] = {t: 's', v: header4, s: {font: {bold: true}, fill: {fgColor: {rgb: "FFCCE5"}}, border: {bottom: {style: "thin"}}}};  trg = 4;}
                else if(m == 1 && n == 65+cnt1+cnt2+cnt3+cnt4) { ws[t+p] = {t: 's', v: header5, s: {font: {bold: true}, fill: {fgColor: {rgb: "FFCD28"}}, border: {bottom: {style: "thin"}}}};  trg = 5;}
                else if(m == 1 && n == 65+cnt1+cnt2+cnt3+cnt4+cnt5) { ws[t+p] = {t: 's', v: header6, s: {font: {bold: true}, fill: {fgColor: {rgb: "d2d2d2"}}, border: {bottom: {style: "thin"}}}};  trg = 6;}
                else if(m == 2 && n >= 65 && n < 65+cnt1) ws[t+p] = {t: 's', v: ws[t+p].v, s: {font: {bold: true}, fill: {fgColor: {rgb: "FFFF33"}}, border: {bottom: {style: "thin"}, right: {style: "thin"}}}};
                else if(m == 2 && n >= 65+cnt1 && n < 65+cnt1+cnt2) ws[t+p] = {t: 's', v: ws[t+p].v, s: {font: {bold: true}, fill: {fgColor: {rgb: "E0E0E0"}}, border: {bottom: {style: "thin"}, right: {style: "thin"}}}};
                else if(m == 2 && n >= 65+cnt1+cnt2 && n < 65+cnt1+cnt2+cnt3) ws[t+p] = {t: 's', v: ws[t+p].v, s: {font: {bold: true}, fill: {fgColor: {rgb: "99FFCC"}}, border: {bottom: {style: "thin"}, right: {style: "thin"}}}};
                else if(m == 2 && n >= 65+cnt1+cnt2+cnt3 && n < 65+cnt1+cnt2+cnt3+cnt4) ws[t+p] = {t: 's', v: ws[t+p].v, s: {font: {bold: true}, fill: {fgColor: {rgb: "FFCCE5"}}, border: {bottom: {style: "thin"}, right: {style: "thin"}}}};
                else if(m == 2 && n >= 65+cnt1+cnt2+cnt3+cnt4 && n < 65+cnt1+cnt2+cnt3+cnt4+cnt5) ws[t+p] = {t: 's', v: ws[t+p].v, s: {font: {bold: true}, fill: {fgColor: {rgb: "FFCD28"}}, border: {bottom: {style: "thin"}, right: {style: "thin"}}}};
                else if(m == 2 && n >= 65+cnt1+cnt2+cnt3+cnt4+cnt5 && n < 65+cnt1+cnt2+cnt3+cnt4+cnt5+cnt6) ws[t+p] = {t: 's', v: ws[t+p].v, s: {font: {bold: true}, fill: {fgColor: {rgb: "d2d2d2"}}, border: {bottom: {style: "thin"}, right: {style: "thin"}}}};

                // Data
                else {
                    try {
                        ws[t+p] = {t: 's', v: ws[t+p].v, s: {border: {bottom: {style: "thin"}, right: {style: "thin"}}}};
                    } catch(e) {
                        ws[t+p] = {t: 's', v: '', s: {border: {bottom: {style: "thin"}, right: {style: "thin"}}}};
                    }
                }
            }
        }

        var merge = new Array();
        switch(trg) {
            case 6 :
                merge.push({s: {r:0, c:cnt1+cnt2+cnt3+cnt4+cnt5}, e: {r:0, c:cnt1+cnt2+cnt3+cnt4+cnt5+cnt6-1}});
            case 5 :
                merge.push({s: {r:0, c:cnt1+cnt2+cnt3+cnt4}, e: {r:0, c:cnt1+cnt2+cnt3+cnt4+cnt5-1}});
            case 4 :
                merge.push({s: {r:0, c:cnt1+cnt2+cnt3}, e: {r:0, c:cnt1+cnt2+cnt3+cnt4-1}});
            case 3 :
                merge.push({s: {r:0, c:cnt1+cnt2}, e: {r:0, c:cnt1+cnt2+cnt3-1}});
            case 2 :
                merge.push({s: {r:0, c:cnt1}, e: {r:0, c:cnt1+cnt2-1}});
            case 1 :
                merge.push({s: {r:0, c:0}, e: {r:0, c:cnt1-1}});
                break;
            default:
                break;
        };

        ws["!merges"] = merge;

    } catch(e) {
        // if not exist Fail Data
    }
}


exports.merge = async function (name, jsoninfo, cellinfo, workBook) {
    xlsx.utils.book_append_sheet(workBook, {}, name);  
    var ws = xlsx.utils.sheet_add_json(workBook.Sheets[name], jsoninfo, {cellStyles: true});

    try {
        var prodStCol = Object.keys(jsoninfo[0]).length;
        var prodStRow = Object.keys(jsoninfo).length;
        var cnt = 0;
        
        for(var m = 1; m < prodStRow+3; m++) {
            for(var n = 65; n < 65 + prodStCol; n++) {
                var t = exc.excIndex(n);
                var p = String(m);
                
                // Data
                try {
                    if(ws[t+p].v == "Empty")
                        ws[t+p] = {t: 's', v: "", s: {fill: {patternType: "solid", fgColor: {rgb: cellinfo[cnt]}, bgColor: { indexed: 64 }}, border: {bottom: {style: "thin"}, right: {style: "thin"}}}};
                    else if(ws[t+p].v == "N/A")
                        ws[t+p] = {t: 's', v: ws[t+p].v, s: {fill: {patternType: "solid", fgColor: {rgb: "FAF4C0"}, bgColor: { indexed: 64 }}, border: {bottom: {style: "thin"}, right: {style: "thin"}}}};
                    else if(ws[t+p].v == "Fail" || ws[t+p].v == "Fail (CleanUp)")
                        ws[t+p] = {t: 's', v: ws[t+p].v, s: {fill: {patternType: "solid", fgColor: {rgb: "FFC7CE"}, bgColor: { indexed: 64 }}, border: {bottom: {style: "thin"}, right: {style: "thin"}}}};
                    else if(ws[t+p].v == "Pass")
                    ws[t+p] = {t: 's', v: ws[t+p].v, s: {fill: {patternType: "solid", fgColor: {rgb: "C6EFCE"}, bgColor: { indexed: 64 }}, border: {bottom: {style: "thin"}, right: {style: "thin"}}}};
                    else
                        ws[t+p] = {t: 's', v: ws[t+p].v, s: {fill: {patternType: "solid", fgColor: {rgb: cellinfo[cnt]}, bgColor: { indexed: 64 }}, border: {bottom: {style: "thin"}, right: {style: "thin"}}}};
                } catch(e) {
                    ws[t+p] = {t: 's', v: '', s: {fill: {patternType: "solid", fgColor: {rgb: "FFFFFF"}, bgColor: { indexed: 64 }}, border: {bottom: {style: "thin"}, right: {style: "thin"}}}};
                }
                cnt++;
                    
            }
        }
         // Check Empty row
         var row = 1;
         var leng = prodStRow+3;
         for(var m = 1; m < leng; m++){
             if(ws["A"+String(row)].v == "") { await delete_row(ws, row); row--;}
             row++;
         }
    } catch(e) {
        console.log("Not Exist Data in " + name);
        // if not exist Fail Data
    }
}

async function delete_row(ws, idx) {
    const vari = xlsx.utils.decode_range(ws["!ref"])
    for(let r = idx; r <= vari.e.r; ++r){
        var a = 65;
        for(let c = vari.s.c; c <= vari.e.c; ++c){ 
            var t = exc.excIndex(a);
            // console.log(r + " == " + ws["A"+String(r)].v + " :: " + ws["A"+String(r+1)].v);
            ws[t+String(r)] = ws[t+String(r+1)];
            a++;
            if(r == vari.e.r) {ws[t+String(r+1)].s = {border : {bottom: {style: "none"}, right: {style: "none"}}}; }
        }
        
    }
    vari.e.r--;
    // console.log(ws["A11"].v);
}