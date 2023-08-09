/***********************************************************************
 
    Function : Array search API Data
    Process : arraySearchApi(targetsite, productList, start)
    Writer  : JK
    Data    : 2022-05-10
 
 ***********************************************************************/
// Get API data
const Cvt = require('./convertString.js');

exports.arraysamplePFAPI = async function (targetsite, productList, start) {
    var rsData = new Array();
    var modelList = new Object();
    var line = "";
    
    try{
        for(var i = 0 ; i < productList.length; i++) {
                
            modelList = Object.values(productList[i].modelList);
            var n = start + i;

            for(var j = 0; j < 1; j++){
                var rsJson = new Object();  // Object Reset
                rsJson.sitecode = targetsite;
                rsJson.displayName = Cvt.replaceBr(modelList[j].displayName);
                rsJson.promotionPriceDisplay = modelList[j].promotionPriceDisplay;
                rsJson.originPdpUrl = "www.samsung.com" + modelList[j].originPdpUrl;

                // fmyChipList Area
                try{
                    if(modelList[j].fmyChipList.length == 0){
                        rsJson.fmyChipList = "";
                        rsJson.fmyChipOptionName1 = "";
                        rsJson.fmyChipList2 = "";
                        rsJson.fmyChipOptionName2 = "";
                    } else if(modelList[j].fmyChipList.length == 1) {
                        rsJson.fmyChipList = modelList[j].fmyChipList[0].fmyChipLocalName;
                        rsJson.fmyChipOptionName1 = Cvt.convertChip(lowLetter(modelList[j].fmyChipList[0].fmyChipName));

                        rsJson.fmyChipList2 = "";
                        rsJson.fmyChipOptionName2 = "";
                    } else {
                        rsJson.fmyChipList = modelList[j].fmyChipList[0].fmyChipLocalName;
                        rsJson.fmyChipOptionName1 = Cvt.convertChip(lowLetter(modelList[j].fmyChipList[0].fmyChipName));

                        rsJson.fmyChipList2 = modelList[j].fmyChipList[1].fmyChipLocalName;
                        rsJson.fmyChipOptionName2 = Cvt.lowLetter(modelList[j].fmyChipList[1].fmyChipName);
                    }
                } catch(e) {
                    rsJson.fmyChipList = "";
                    rsJson.fmyChipOptionName1 = "";
                    rsJson.fmyChipList2 = "";
                    rsJson.fmyChipOptionName2 = "";
                }

                if(rsJson != "")  rsData = [...rsData, rsJson];
            }
        }
    } catch(e) {
        console.log(e);
        rsJson.sitecode = targetsite;
        rsJson.displayName = "";
        rsJson.promotionPriceDisplay = "";
        rsData = [...rsData, rsJson];
        console.log(rsData);
        return rsData;
    }

    return rsData;
}