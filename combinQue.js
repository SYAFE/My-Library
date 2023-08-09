const fs = require('fs');
var exports = module.exports = {};
const info = JSON.parse(fs.readFileSync('./cfg/countrySetting.json'));

exports.que = function(site) {
    let queueList = [];
    const arr = info[site].promotion;
    const pay = info[site].payment;

    let totalCount = Math.pow(2,arr.length);
    let codelength = totalCount.toString(2).length-1;

    pay.forEach((payment) => {
        for(var i = 0; i < totalCount ; i++){    
            // making Binary Code
            let code = i.toString(2);
            let cnt = codelength - code.length; 
            if(cnt>0) {
                for(var k=0; k < cnt; k++){
                    code = "0" + code;
                }
            }

            // Matching with Binary Code
            let temp = [];
            let queString = '';
            temp=arr.slice();

            // exception handling
            if(site == "UK" && code[0] == 1 && code[1] == 1) continue;
            if(site == "UK" && code[3] == 1 && payment != "SliceIt") continue;
            if(site == "FR" && code[0] == 1 && code[1] == 1) continue;
            if(site == "FR" && code[2] == 1 && code[3] == 1) continue;

            // if Binary Code is 0, Que is NA
            for(var h=0; h<code.length; h++){
                if(code[h] == 0) temp[h] = "NA";
            }
            temp.push(payment);
            
            // Making Que String
            for(var k=0; k<temp.length; k++){
                queString = queString + temp[k] + ' ';
            }
            queString = queString.slice(0, -1);
            queString = site + ' ' + queString;

            queueList.push(queString);
        }
    });

    console.log(queueList);
    console.log("Total Que Index : " + queueList.length);
    return queueList;
}
