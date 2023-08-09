// Get PDAPI data
const S28 = require('./include.js');
const cfg = require('../cfg/countrySetting.json');


exports.getPFAPI = async function(targetAPI, targetsite) {

    return new Promise(async (rs, rj) => {
        var resultList = new Array();
        var productList = new Array();
        var total = 1;
        var retry = 0;
        var check = true;

        for(var u = 0; u < total; u = u+10) {
            
            var start = 1;
            start = start + u;
            var URL = "https://searchapi.samsung.com/v6/front/b2c/product/finder/newhybris?type=" + targetAPI + "&siteCode=" + targetsite + "&start=" + start + "&num=10&sort=recommended&onlyFilterInfoYN=N&keySummaryYN=Y&specHighlightYN=Y";
            console.log(URL);
        
            // Check Fetch
            var response = await S28.getFetch(URL, "", "Search");
            
            // Check Response API
            if(response.ok) {
                do {
                    let data;
                    try{
                        if(retry > 0) {
                            S28.Nor_log("Retry Get Json [Retry: " + retry + "] : " + URL);
                        }
                        data = await response.json();
                        //console.log("Get Json OK...")
                        productList = data.response.resultData.productList;
                        total = data.response.resultData.common.totalRecord;
                        if(data.response.statusCode >= 300) throw "connectError";
                        check = false;
                        if(retry > 0) {
                            S28.Nor_log("Get Json retry Pass : " + URL);
                            retry = 0;
                        }
                    } catch (e) {
                        retry++;
                        if(e == "connectError") S28.Err_log("Connection Failed [" + data.response.statusCode + "] : " + URL);   
                        else S28.Err_log("Get Json error : " + URL);
                        response = await S28.getFetch(URL, cookie, "Search");
                        check = true;
                    } 
                } while(check && retry < 5);
                
                if(retry != 0) {
                    S28.Err_log("Cannot Save API Data : " + URL);
                    retry = 0;
                }
                else  console.log(targetsite + "_" + targetAPI + "_Status OK...");

            }

            resultList.push(await S28.arrayPFApi(targetsite, targetAPI, productList, start));

        }

        rs(resultList);
    });

};