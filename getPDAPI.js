// Get PDAPI data
const S28 = require('./include.js');
const xml = require('xml-js');
const request = require('request');
const https = require('https');

exports.getPDAPI = async function(sku, targetsite, type) {

    var resultList = new Array();
    let data;
    var cookie = "";
    var retry = 0;
    var check = true;
    var URL = "https://api.shop.samsung.com/tokocommercewebservices/v2/" + targetsite + "/products?productCodes=" + sku;

    // Check Request
    var response = await S28.getFetch(URL, cookie, "PD");

    // Check Response API
    if(response.ok) {
        do { 
            try{
                if(retry > 0) {
                    S28.Nor_log("Retry Get Json [Retry: " + retry + "] : " + URL);
                }
                data = await response.json();
                console.log(URL + " : Get Json OK...");
                // if(data.response.statusCode >= 300) throw "connectError";
                check = false;
                if(retry > 0) {
                    S28.Nor_log("Get Json retry Pass : " + URL);
                    retry = 0;
                }
            } catch (e) {
                retry++;
                if(e == "connectError") S28.Err_log("Connection Failed [" + data.response.statusCode + "] : " + URL);   
                else S28.Err_log("Get Json error : " + URL);
                var response = await getFetch(URL, cookie, "PD");
                check = true;
            } 
        } while(check && retry < 5);
        
        if(retry != 0) {
            S28.Err_log("Cannot Save API Data : " + URL);
            retry = 0;
        }
        else console.log(targetsite + "_" + sku + "_Status OK...");

    }
    resultList.push(S28.arrayPDApi(targetsite, sku, data, type));

    return resultList;

};

exports.getPDAPI = async function(api, url) {
    return new Promise(async (rs, rj) => {
        var resultList = new Array();
        let data;
        let data2;
        var cookie = "";
        var retry = 0;
        var check = true;
        var URL = api;
        var type = "";
        
        // if(api.includes("/**?fields=SIMPLE_INFO") || api.includes("&fields=SIMPLE_INFO")) type = "shop";
        // else if(api.includes("/servicesv2/getSimpleProductsInfo?productCodes")) type = "getSimple";

        try{
            var ttt = await gethttps(URL);
        }catch{
        }
            
        console.log(ttt + " : " + URL );

        if(ttt == "application/json;charset=UTF-8" || ttt == "application/json; charset=utf-8"){
            // Check Request
            var response = await S28.getFetch(URL, cookie, "PD");
            // Check Response API
            if(response.ok) {
                do { 
                    try{
                        if(retry > 0) {
                            S28.Nor_log("Retry Get Json [Retry: " + retry + "] : " + URL);
                        }
                        data = await response.json();
                        // console.log(URL + " : Get Json OK...");
                        // if(data.response.statusCode >= 300) throw "connectError";
                        check = false;
                        if(retry > 0) {
                            S28.Nor_log("Get Json retry Pass : " + URL);
                            retry = 0;
                        }
                    } catch (e) {
                        retry++;
                        if(e == "connectError") S28.Err_log("Connection Failed [" + data.response.statusCode + "] : " + URL);   
                        else S28.Err_log("Get Json error : " + e);
                    } 
                } while(check && retry < 2);
                
                if(retry != 0) {
                    S28.Err_log("Cannot Save API Data : " + URL);
                    retry = 0;
                }
                // else console.log(URL + " : Status OK...");
                if(URL.includes("/syndicated-product")) resultList.push(await S28.arrayPDApix(data, "synd", url));
                else if(URL.includes("/getSimpleProductsInfo?")) resultList.push(await S28.arrayPDApix(data, "getSimple", url));
                else resultList.push(await S28.arrayPDApix(data, "shop", url));
            }
        }
        else if(ttt == "application/javascript;charset=UTF-8" ){
            // Check Request
            var response = await S28.getFetch(URL, cookie, "PD");
            // Check Response API
            if(response.ok) {
                do { 
                    try{
                        if(retry > 0) {
                            S28.Nor_log("Retry Get Json [Retry: " + retry + "] : " + URL);
                        }
                        data = await response.text();                        
                        data = JSON.parse(textTojson(data));
                        // console.log(URL + " : Get Json OK...");
                        // if(data.response.statusCode >= 300) throw "connectError";
                        check = false;
                        if(retry > 0) {
                            S28.Nor_log("Get Json retry Pass : " + URL);
                            retry = 0;
                        }
                    } catch (e) {
                        retry++;
                        if(e == "connectError") S28.Err_log("Connection Failed [" + data.response.statusCode + "] : " + URL);   
                        else S28.Err_log("Get Json error : " + e);
                    } 
                } while(check && retry < 2);
                
                if(retry != 0) {
                    S28.Err_log("Cannot Save API Data : " + URL);
                    retry = 0;
                }
                // else console.log(URL + " : Status OK...");
                resultList.push(await S28.arrayPDApix(data, "getSimple", url));
            }
        }
        else if(ttt == "text/javascript; charset=utf-8" ){
            // Check Request
            var response = await S28.getFetch(endP(URL), cookie, "PD");
            // Check Response API
            if(response.ok) {
                do { 
                    try{
                        if(retry > 0) {
                            S28.Nor_log("Retry Get Json [Retry: " + retry + "] : " + URL);
                        }
                        data = await response.text();                        
                        data = JSON.parse(textTojson(data));                  
                        // console.log(URL + " : Get Json OK...");
                        // if(data.response.statusCode >= 300) throw "connectError";
                        check = false;
                        if(retry > 0) {
                            S28.Nor_log("Get Json retry Pass : " + URL);
                            retry = 0;
                        }
                    } catch (e) {
                        retry++;
                        if(e == "connectError") S28.Err_log("Connection Failed [" + data.response.statusCode + "] : " + URL);   
                        else S28.Err_log("Get Json error : " + e);
                    } 
                } while(check && retry < 2);
                
                if(retry != 0) {
                    S28.Err_log("Cannot Save API Data : " + URL);
                    retry = 0;
                }
                // else console.log(URL + " : Status OK...");
                resultList.push(await S28.arrayPDApix(data, "getRealTime", url));
            }
        }

        else if(ttt == "application/xml;charset=UTF-8" || ttt == "text/html"){
            if(URL.includes("/getSimpleProductsInfo?")) {
                var response = await S28.getFetch(endP(URL), cookie, "PD");
                try{
                    if(data == undefined) throw new Error();
                    data = await response.text();
                    data = JSON.parse(textTojson(data));       
                    resultList.push(await S28.arrayPDApix(data, "getSimple", url));
                }catch{
                    resultList.push([{
                        siteCode : sc(url),
                        model : "",
                        PD_URL : url,
                        PD_API : URL,
                        price_formattedValue : "",
                        promotionPrice_formattedValue : "",
                        stock : ""}]);
                }
            }
        }
        else{
            if(URL.includes("/dotcom/")) {
                var dtc = await doRequest(URL);
                dtc = JSON.parse(dtc);
                resultList.push(await S28.arrayPDApix(dtc, "dotcomxml", url));
            }
            else {
                resultList.push([{
                    siteCode : sc(url),
                    model : "",
                    PD_URL : url,
                    PD_API : URL,
                    price_formattedValue : "",
                    promotionPrice_formattedValue : "",
                    stock : ""}]);
            }
        }
        
        if(resultList.length != 1) {
            console.log(URL + " : " + resultList.length);
            resultList.push([{
                siteCode : sc(url),
                model : "",
                PD_URL : url,
                PD_API : URL,
                price_formattedValue : "",
                promotionPrice_formattedValue : "",
                stock : ""}]);
        }
        rs(resultList);
    });
};

async function doRequest(url) {
    return new Promise(function (resolve, reject) {
        request.get(url, (err,res,body) =>{
            if(err){
                console.log(`err => ${err}`)
                reject();
            }
            else {
                if(res.statusCode == 200){
                    var result = body              
                    var xmlToJson = xml.xml2json(result);         
                    resolve(xmlToJson);
                }                
            }
        });
    });
}

function gethttps(url) {
    return new Promise(function (resolve, reject) {
        https.get(url, function(res) {
            var contentType = res.headers['content-type'];
            // console.log(contentType);
            resolve(contentType);
        });
    });
}

function sc(str){
    temp = str.split("/");
    return temp[3];
}

function endP(str){
    if(str.search('&')){
        str = str.split("&");
        return str[0];
    }
    else{
        return str;
    }
}

function textTojson(str){
    str = str.slice(0, -1);
    var idx = str.indexOf("(");
    str = str.substring(idx+1);
    return str;
}