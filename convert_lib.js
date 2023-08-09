var exports = module.exports = {};
const fs = require('fs');
const info = JSON.parse(fs.readFileSync('./cfg/countrySetting.json'));

exports.convertOperator = function (command, site){
    //Argument : [2toN] Promotion [M] payment [O] delivery...
    //let opMap = { 0: "Tradein", 1: "USIM", 2: "SmartCare", 3: "EUP" };
    //let payMap = { 0: "CardMaestro", 1: "CardMaster", 2:"CardVisa", 3:"CardAMEX", 4:"ThreeInstallments", 5:"PaypalCredit", 6:"SliceIt", 7:"Paypal", 8:"SamsungFinance", 9:"CreditCard"};
    let opMap = new Object();
    let payMap = new Object();
    let pro = info[site].promotion;
    let pay = info[site].payment;
    for(var i=0; i<pro.length; i++) {
        opMap[i] = pro[i];
    }
    for(var k=0; k<pay.length; k++) {
        payMap[k] = pay[k];
    }
    let idx = 0;
    let op = new Array();

    for(const arg of command){
        if(idx === command.length-1)
        {
           var k = parseInt(Object.keys(payMap).find(key => payMap[key] === arg), 10).toString(16);
           op.push(k); break;
        }
        if (arg === opMap[idx]){ op[idx]="1"; }
        else if (arg === 'NA' || arg !== opMap[idx]) { op[idx]="0"};
        
        idx++;
    }

    return op.join('');
};

exports.parseOperator = function (opString, site)
{
    // const opMap = { 0: "Tradein", 1: "USIM", 2: "SmartCare", 3: "EUP" };
    // const payMap = {0: "CardMaestro", 1: "CardMaster", 2:"CardVisa", 3:"CardAMEX", 4:"ThreeInstallments", 5:"PaypalCredit", 6:"SliceIt", 7:"Paypal", 8:"SamsungFinance", 9:"CreditCard"};

    let opMap = new Object();
    let payMap = new Object();
    let pro = info[site].promotion;
    let pay = info[site].payment;
    for(var i=0; i<pro.length; i++) {
        opMap[i] = pro[i];
    }
    for(var k=0; k<pay.length; k++) {
        payMap[k] = pay[k];
    }

    const promoCnt = Object.keys(opMap).length;
    const payCnt = Object.keys(payMap).length;
    let arrResult = new Array();   
    for(let i  = 0; i < promoCnt+1; i++) { 
        if ( i == promoCnt)
        {            
            var k = parseInt(opString[i], 16).toString(10);
            arrResult.push(payMap[k]);
            break;
        }
        if (opString[i] === '1') { arrResult.push(opMap[i]);  } 
    }  

    console.log("Parsing to Operator :", opString);
    return arrResult;
};

exports.countryNumber = function (code)
{
    switch(code){
        case("UK"):
            return "1501";
        case("FR"):
            return "1802";
        default:
            return "Not Scope Country";
    }
};