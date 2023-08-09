// Get API data
exports.arrayPDApi = function(targetsite, sku, data, type) {
    var rsData = new Array();
    var rsJson = new Object();
    var code = "";
    var price = "";
    var stock = "Not for sale";
    var Added = [];

    data = data.reduce(function(acc,cur) {
        return acc.concat(cur);     
    });

    try {
        code = data.code;
    } catch(e) {
         //console.log("Not Exist Data!");
    }
    
    try {
        price = data.price.formattedValue;
    } catch(e) {
        //console.log("Not Exist Data!");
    }

    try {
        var temp = data.availableServices;
        for(var i = 0; i<temp.length; i++){
            Added.push(temp[i].serviceCategory.code);
        }
    } catch(e) {
         //console.log("Not Exist Data!");
    }

    try{
        var temp = data.supportedAvailableServices;
        for(var i = 0; i<temp.length; i++){
            if(temp[i] == "SIM_PLAN")   Added.push("SIM_PLAN");
        }
    } catch(e) {

    }

    try{
        stock = data.stock.stockLevelStatus;
    } catch(e) {

    }

    rsJson.siteCode = targetsite;
    rsJson.APIType = type;
    rsJson.SKU = code;
    if(code == undefined) rsJson.SKU = sku;
    rsJson.price_formattedValue = price;
    if(price == "") rsJson.price_formattedValue = "Not For Sale";
    for(var k=1; k<=Added.length; k++) {
        eval("rsJson.Added_Option_" + k + " = Added[k-1]");
    }
    
    rsData.push(rsJson);
    return rsData;
};

exports.arrayPDApix = async function(data, type, url) {
    var rsData = new Array();
    var rsJson = new Object();
    var code = "";
    var price = "";
    var promotionPrice = "";
    var stock = "";

    if(type == "shop"){

        try {
            code = data.code;
            if(data.code == null) code ="";
        } catch(e) {
            code = "";
        }
        try {
            price = data.price.formattedValue;
        } catch(e) {
            //console.log("Not Exist Data!");
        }
        try {
            promotionPrice = data.promotionPrice.formattedValue;
        } catch(e) {
            //console.log("Not Exist Data!");
        }
        try{
            stock = data.stock.stockLevelStatus;
        } catch(e) {
            stock = "Not for Sale";
        }

        rsJson.siteCode = sc(url);
        rsJson.model = code;
        rsJson.PD_URL = url;
        rsJson.price_formattedValue = price;
        rsJson.promotionPrice_formattedValue = promotionPrice;
        rsJson.stock = stock;
    }
    else if(type == "getSimple"){
        try {
            code = data.productDatas[0].productCode;
            if(data.productDatas[0].productCode == null) code ="";
        } catch(e) {
            code = "";
        }
        try {
            price = data.productDatas[0].priceFormatted;
        } catch(e) {
            price = "";
        }
        try {
            promotionPrice = data.productDatas[0].promotionPriceFormatted;
        } catch(e) {
            promotionPrice = "";
        }
        try{
            stock = data.productDatas[0].stockLevelStatus;
        } catch(e) {
            stock = "Not for Sale";
        }

        rsJson.siteCode = sc(url);
        rsJson.model = code;
        rsJson.PD_URL = url;
        rsJson.price_formattedValue = price;
        rsJson.promotionPrice_formattedValue = promotionPrice;
        rsJson.stock = stock;
    }
    else if(type == "getRealTime"){
        try {
            code = data.code;
            if(data.code == null) code ="";
        } catch(e) {
            code = "";
        }
        try {
            price = data.price;
        } catch(e) {
            price = "";
        }
        try {
            promotionPrice = data.promotionPrice;
        } catch(e) {
            promotionPrice = "";
        }
        try{
            stock = data.stockLevelStatus;
        } catch(e) {
            stock = "Not for Sale";
        }

        rsJson.siteCode = sc(url);
        rsJson.model = code;
        rsJson.PD_URL = url;
        rsJson.price_formattedValue = price;
        rsJson.promotionPrice_formattedValue = promotionPrice;
        rsJson.stock = stock;
    }
    else if(type == "dotcom"){
        try {
            code = data.productDatas[0].productCode;
            if(data.productDatas[0].productCode == null) code ="";
        } catch(e) {
            code = "";
        }
        try {
            price = data.productDatas[0].priceFormatted;
        } catch(e) {
            price = "";
        }
        try {
            promotionPrice = data.productDatas[0].promotionPriceFormatted;
        } catch(e) {
            promotionPrice = "";
        }
        try{
            stock = data.productDatas[0].stockLevelStatus;
        } catch(e) {
            stock = "Not for Sale";
        }

        rsJson.siteCode = sc(url);
        rsJson.model = code;
        rsJson.PD_URL = url;
        rsJson.price_formattedValue = price;
        rsJson.promotionPrice_formattedValue = promotionPrice;
        rsJson.stock = stock;
    }
    else if(type == "dotcomxml"){
        try {
            code = data.elements[0].elements[7].elements[0].elements[8].elements[0].text;
            if(data.elements[0].elements[7].elements[0].elements[8].elements[0].text == null) code ="";
        } catch(e) {
            code = "";
        }
        try {
            price = data.elements[0].elements[7].elements[0].elements[0].elements[0].text;
        } catch(e) {
            price = "";
        }
        try {
            promotionPrice = data.elements[0].elements[7].elements[0].elements[5].elements[0].text;
        } catch(e) {
            promotionPrice = "";
        }
        try{
            stock = data.elements[0].elements[7].elements[0].elements[5].elements[0].text;
        } catch(e) {
            stock = "Not for Sale";
        }

        rsJson.siteCode = sc(url);
        rsJson.model = code;
        rsJson.PD_URL = url;
        rsJson.price_formattedValue = price;
        rsJson.promotionPrice_formattedValue = promotionPrice;
        rsJson.stock = stock;
    }
    else if(type == "synd"){
        var sku = Object.keys(data.products)[0];

        try {
            code = sku;
            if(sku == null) code ="";
        } catch(e) {
            code = "";
        }
        try {
            price = data.products[sku].price_info[0].msrp_price.value;
        } catch(e) {
            //console.log("Not Exist Data!");
        }
        try {
            promotionPrice = data.products[sku].price_info[0].sale_price.value;
        } catch(e) {
            //console.log("Not Exist Data!");
        }
        try{
            stock = data.products[sku].inventory.status;
        } catch(e) {
            stock = "Not for Sale";
        }

        rsJson.siteCode = sc(url);
        rsJson.model = code;
        rsJson.PD_URL = url;
        rsJson.price_formattedValue = price;
        rsJson.promotionPrice_formattedValue = promotionPrice;
        rsJson.stock = stock;
    }

    rsData.push(rsJson);
    return rsData;
};

function sc(str){
    temp = str.split("/");
    return temp[3];
}