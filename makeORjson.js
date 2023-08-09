var exports = module.exports = {};
const fs = require('fs');

exports.makeORjson = async function(code, orNum, result, today, TC, err) {
    var output = new Object();
    var trCode = code.slice(0, -3);
    output.TR_Code = trCode;
    output.TestCase = TC;
    output.Date = today; 
    for(var i=2; i < Object.keys(result).length; i++) {
        if(i == Object.keys(result).length-1)   output["Payment"] = Object.values(result)[i];
        else if(Object.values(result)[i] == "Fail") output["Added_"+ (i-1)] = null;
        else if(Object.values(result)[i] == "Pass") output["Added_"+ (i-1)] = Object.keys(result)[i];
        else if(Object.values(result)[i] == "N/A") output["Added_"+ (i-1)] = "N/A";
    }
    output.OrNum = orNum;
    output.Comment = err;

    const book = JSON.stringify(output, null, 2);
    const dir = fs.existsSync("./output/" + today + "_OR");
    if(!dir) fs.mkdirSync("./output/" + today + "_OR");
    fs.writeFileSync("./output/" + today + "_OR/" + trCode + ".json", book);
};

exports.mergeORjson = function(today, site) {  
    new Promise(function(res,rej){
        var mergeJson = new Array();
        fs.readdir("./output/" + today + "_OR", function(err, filelist){
            filelist.forEach((file) => {
                if(file.includes(site)) {
                    var file_Buffer = fs.readFileSync('./output/' + today + '_OR/' + file);
                    var file_String = file_Buffer.toString();
                    var file_Data = JSON.parse(file_String);
                    mergeJson.push(file_Data);
                }        
            });
            return res(mergeJson);
        });  
    }).then((rst => {
        const output = JSON.stringify(rst, null, 2);
        fs.writeFileSync("./output/" + today + "_" + site + "_or.json", output);
    }));

};