// Get PDAPI data
const S28 = require('./include.js');

exports.getPDPage = async function(page, cardIndex, type) {
    let resultArray = new Object();
    resultArray.displayName = "";
    resultArray.price = "";
    resultArray.memory = "";
    resultArray.color = "";
    resultArray.stock = "";
    resultArray.lease = "";
    resultArray.tariff = "";
    resultArray.samsungUpgrade = "";
    resultArray.purchase = "";
    resultArray.samsungCare = "";
    
    // BuyNow CTA
    if(type == "buynow") {
        try{
            await page.locator("[data-productidx='"+cardIndex+"'] [an-ca='buy cta']").first().click();
        }catch{
            resultArray.pdURL = "";
            // console.log(resultArray);
            return resultArray;     
        }   
        await page.waitForTimeout(1000);
    }

    // Learnmore CTA
    if(type == "learnmore") {
        await page.locator("[data-productidx='"+cardIndex+"'] [an-la='learn more click']").first().click();
        await page.waitForTimeout(1000);
        resultArray.PDType = await getPDType(page);

        if(resultArray.PDType == "FEATURE"){
            resultArray.featureDisplayName = await page.locator("[class='pd-header-navigation__headline-text']").innerText();
            resultArray.featurePrice = await page.locator("[class='pd-buying-price__new-price']").innerText();
            await page.locator("[class='cta cta--contained cta--emphasis anchorBtn']").click();
        }
        else if(resultArray.PDType == "STANDARD"){
            resultArray.featureDisplayName = "";
            resultArray.featurePrice = "";
        }
        else{
            resultArray.featureDisplayName = "";
            resultArray.featurePrice = "";
            
            // console.log(resultArray);
            return resultArray;
        }
    }

    let PDurl = page.url();
    resultArray.pdURL = PDurl;

    //Newest Page
    if(PDurl.includes('/buy/') && PDurl.includes('modelCode')){
        resultArray.displayName = await page.locator("[class='s-option-box hubble-pd-radio js-radio-wrap is-checked'] [class='s-rdo-text']").first().innerText();
        resultArray.price = await page.locator("[class='s-option-box hubble-pd-radio js-radio-wrap is-checked'] [class='s-rdo-price']").first().innerText();
        resultArray.memory = await page.locator("[class='s-option-box hubble-pd-radio js-radio-wrap is-checked'] [class='s-rdo-text']").nth(1).innerText();
        try{
            resultArray.color = await page.locator("[class*='hubble-pd-radio s-type-color js-radio-wrap is-checked'] [class='s-color-name']").innerText();
        }catch{
            resultArray.color = await page.locator("[class*='is-checked'] [name='basic-color']").getAttribute("data-displayname");
        }
        try{
            resultArray.stock = await page.locator("[class='cta cta--contained cta--emphasis add-to-cart-btn']").getAttribute("an-ac") == "stock alert" ? "outOfStock" : "inStock";
        }catch{
            resultArray.stock = "Not for Sale";
        }       
        resultArray.lease = await page.locator("[id='lease']").getAttribute("style") == "display:none" ? "N" : "Y";
        resultArray.tariff = await page.locator("[id='tariff']").getAttribute("style") == "display:none" ? "N" : "Y";
        resultArray.samsungUpgrade = await page.locator("[id='samsung-upgrade']").getAttribute("style") == "display:none" ? "N" : "Y";
        resultArray.purchase = await page.locator("[id='purchase']").getAttribute("style") == "display:none" ? "N" : "Y";
        resultArray.samsungCare = await page.locator("[id='samsung-care']").getAttribute("style") == "display:none" ? "N" : "Y";
    }
    // Old Page
    else if(PDurl.includes('/buy/') && !PDurl.includes('modelCode')){
        resultArray.displayName = await page.locator("[class='product-detail-kv__buying-tool'] [class='pd-info__title']").innerText();
        resultArray.price = await page.locator("[class='cost-box__price']").innerText();
        resultArray.memory = await page.locator("[for='pd-device-memory-0'] [class='pd-option-selector__main-text']").innerText();
        resultArray.color = await page.locator("[id='multiColorText']").innerText();
        resultArray.stock = await page.locator("[class='cost-box__cta'] [class*='cta cta--contained cta--emphasis']").getAttribute("an-ac");
        resultArray.lease = "N/A";
        resultArray.tariff = await page.locator("[class='pd-select-option off-change option-tariff has-component']").getAttribute("style") == "display:none" ? "N" : "Y";
        resultArray.samsungUpgrade = "N/A";
        resultArray.purchase = "N/A";
        resultArray.samsungCare = await page.locator("[class='pd-select-option off-change option-care has-component']").getAttribute("style") == "display:none" ? "N" : "Y";
    }
    // Not PD Page

    return resultArray;
}


async function getPDType(page){

    let pdNAVbar = null;     
    try{
        pdNAVbar = await page.waitForSelector("[class='pd11-anchor-nav bg-black']", {timeout:2000});
    }catch(e){
        // console.log('pdnavbar X');
    }

    let buyConfigurator = null;
    try{        
        buyConfigurator = await page.waitForSelector("[class~='bu-pd-g-product-detail-kv']", {timeout:2000});
    }catch(e){
        // console.log('buyConfigurator X');
    }
    
    if(pdNAVbar!=null & buyConfigurator!=null){
        return "STANDARD";
    }
    else if(pdNAVbar!= null & buyConfigurator==null){
        return "FEATURE";
    }
    else{

        //PCD
        // var PCDList = [
        //     settings.TargetServer.live+"/"+sitecode+"/business/smartphones/",
        //     settings.TargetServer.hshopfront+"/"+sitecode+"/business/smartphones/",
        //     settings.TargetServer.live+"/"+sitecode+"/smartphones/",
        //     settings.TargetServer.hshopfront+"/"+sitecode+"/smartphones/"
        // ]
        // for(PCD of PCDList){
        //     if(page.url()==PCD) return "PCD";
        // }        

        //MKT 
        try{
            let mktBar = await page.waitForSelector("[class='floating-navigation__button-wrap']",{timeout:2000});
            // console.log('MKT');
            return "MKT";
        }catch(e){
            // console.log('MKT X');
        }   
        
        //MKT 
        // var MKTList = [
        //     settings.TargetServer.live+"/"+sitecode+"/business/smartphones/galaxy-note10/",
        //     settings.TargetServer.hshopfront+"/"+sitecode+"/business/smartphones/galaxy-note10/",
        //     settings.TargetServer.live+"/"+sitecode+"/business/smartphones/galaxy-s10/",
        //     settings.TargetServer.hshopfront+"/"+sitecode+"/business/smartphones/galaxy-s10/",
        //     settings.TargetServer.live+"/"+sitecode+"/smartphones/galaxy-note10/",
        //     settings.TargetServer.hshopfront+"/"+sitecode+"/smartphones/galaxy-note10/",
        //     settings.TargetServer.live+"/"+sitecode+"/smartphones/galaxy-s10/",
        //     settings.TargetServer.hshopfront+"/"+sitecode+"/smartphones/galaxy-s10/"
        // ]
        // for(MKT of MKTList){
        //     if(page.url()==MKT) return "MKT";
        // }            
        
        //OTHER
        return "OTHER";
    }

}