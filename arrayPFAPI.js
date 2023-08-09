/***********************************************************************
 
    Function : Array search API Data
    Process : arraySearchApi(targetsite, productList, start)
    Writer  : JK
    Data    : 2022-05-10
 
 ***********************************************************************/
// Get API data
const Cvt = require('./convertString.js');

exports.arrayPFApi = async function (targetsite, targetAPI, productList, start) {
    var rsData = new Array();
    var modelList = new Object();
    var line = "";
    
    try{
        for(var i = 0 ; i < productList.length; i++) {
                
            modelList = Object.values(productList[i].modelList);
            var n = start + i;

            for(var j = 0; j < modelList.length; j++){
                var rsJson = new Object();  // Object Reset
                rsJson.sitecode = targetsite;
                // rsJson.APIType = targetAPI;
                rsJson.familyRecord = n;
                rsJson.displayName = Cvt.replaceBr(modelList[j].displayName);
                rsJson.modelCode = modelList[j].modelCode;
                rsJson.pviTypeName = modelList[j].pviTypeName;
                rsJson.pviSubtypeName = modelList[j].pviSubtypeName;
                rsJson.stock = modelList[j].ctaType;
                rsJson.priceDisplay = Cvt.replace00A0(modelList[j].priceDisplay);
                rsJson.promotionPriceDisplay = Cvt.replace00A0(modelList[j].promotionPriceDisplay);
                rsJson.saveText = Cvt.replace00A0(modelList[j].saveText);
                rsJson.PF_URL = targetAPI;
                // rsJson.marketingpdpYN = modelList[j].marketingpdpYN;

                // keySummary Area
                if(modelList[j].keySummary[0] == null){
                rsJson.KeySummaryTitle = "";
                rsJson.KeySummaryImgUrl = "";
                }
                else {
                    if(modelList[j].keySummary[0].title == null){
                        rsJson.KeySummaryTitle = "";
                    } else {
                        for(var k = 0; k < modelList[j].keySummary.length; k++){
                            line = line + Cvt.replace00A0(modelList[j].keySummary[k].title) + " | ";
                        }
                        rsJson.KeySummaryTitle = line;
                        line = "";
                    }

                    if(modelList[j].keySummary[0].imgUrl == null){
                        rsJson.KeySummaryImgUrl = "";
                    } else {
                        for(var h = 0; h < modelList[j].keySummary.length; h++){
                            line = line + modelList[j].keySummary[h].imgUrl + " | ";
                        }
                        rsJson.KeySummaryImgUrl = line;
                        line = "";
                    }
                }

                rsJson.pdpUrl = modelList[j].pdpUrl;
                rsJson.originPdpUrl = modelList[j].originPdpUrl;

                // fmyChipList Area
                try{
                    if(modelList[j].fmyChipList.length == 0){
                        rsJson.fmyChipList = "";
                        rsJson.fmyChipOptionName1 = "";
                        rsJson.fmyChipList2 = "";
                        rsJson.fmyChipOptionName2 = "";
                    } else if(modelList[j].fmyChipList.length == 1) {
                        rsJson.fmyChipList = modelList[j].fmyChipList[0].fmyChipLocalName;
                        rsJson.fmyChipOptionName1 = Cvt.convertChip(Cvt.lowLetter(modelList[j].fmyChipList[0].fmyChipName));

                        rsJson.fmyChipList2 = "";
                        rsJson.fmyChipOptionName2 = "";
                    } else {
                        rsJson.fmyChipList = modelList[j].fmyChipList[0].fmyChipLocalName;
                        rsJson.fmyChipOptionName1 = Cvt.convertChip(Cvt.lowLetter(modelList[j].fmyChipList[0].fmyChipName));

                        rsJson.fmyChipList2 = modelList[j].fmyChipList[1].fmyChipLocalName;
                        rsJson.fmyChipOptionName2 = Cvt.lowLetter(modelList[j].fmyChipList[1].fmyChipName);
                    }
                } catch(e) {
                    rsJson.fmyChipList = "";
                    rsJson.fmyChipOptionName1 = "";
                    rsJson.fmyChipList2 = "";
                    rsJson.fmyChipOptionName2 = "";
                }

                // rsJson.tieredPriceDisplay = modelList[j].tieredPriceDisplay;
                // rsJson.exTieredPriceDisplay = modelList[j].taxExTieredPriceDisplay;


                // var temp = await getPDAPI(modelList[j].modelCode, targetsite);
                // temp = temp.reduce(function(acc,cur) {
                //     return acc.concat(cur);
                // });
                // temp = temp.reduce(function(acc,cur) {
                //     return acc.concat(cur);
                // });
                // rsJson.tieredPrice = temp;
                // console.log(temp);
            

                if(rsJson != "")  rsData = [...rsData, rsJson];
            }
        }
    } catch(e) {
        console.log(e);
        rsJson.sitecode = targetsite;
        rsJson.APIType = targetAPI;
        rsData = [...rsData, rsJson];
        console.log(rsData);
        return rsData;
    }

    return rsData;
}