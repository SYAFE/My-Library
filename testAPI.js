const playwright = require('playwright');
const S28 = require('./include.js');
const xlsx = require('xlsx');


exports.getPFAPI = async function(now, rt) {
    // Get xlsx Data
    var xlsx_Buffer = xlsx.readFile("./cfg/PF_URL_List.xlsx");
    var xlsx_Data = xlsx.utils.sheet_to_json(xlsx_Buffer.Sheets["Sheet1"]);
    
    const browser = await playwright.chromium.launch({headless: true, args: ['--start-maximized']});
    const context = await browser.newContext();
    const page = await context.newPage();

    let result = new Array();
    let obj = new Object();
    page.on('request', request => {
        let api = request.url();
        // PD API
        // if(api.includes("/**?fields=SIMPLE_INFO") || api.includes("&fields=SIMPLE_INFO"))
        //     console.log('>>', request.method(), request.url());
        // else if(api.includes("/servicesv2/getSimpleProductsInfo?productCodes")){
        //     console.log('>>', request.method(), request.url());
        // }

        //PF API
        if((api.includes("/at/") || api.includes("=ua") || api.includes("=africa_fr")) && (api.includes("searchapi") && api.includes("&filter"))) {

            console.log('>>', request.method(), request.url());
            obj.pfUrl = page.url();
            obj.pfApi = request.url();
            console.log(obj);
        }
        else if(api.includes("/us/") && (api.includes("/pf_search/") || api.includes("/content-library/"))) {

            console.log('>>', request.method(), request.url());
            obj.pfUrl = page.url();
            obj.pfApi = request.url();
            console.log(obj);
        }
        else if(api.includes("searchapi") && api.includes("&familyId=")) {
            
            console.log('>>', request.method(), request.url());
            obj.pfUrl = page.url();
            obj.pfApi = request.url();
            console.log(obj);
        }
        
    });

    if(rt > -1) {
        var URL = xlsx_Data[now][Object.keys(xlsx_Data[now])[rt+1]];
        try{
            console.log(URL);
            await page.goto(URL);
            await page.waitForLoadState('networkidle');
            await page.waitForTimeout(3000);
            if(obj.pfUrl != URL)    throw new Error();
            result.push(obj);
        }catch(e){
            let obj = new Object();
            obj.pfUrl = URL
            obj.pfApi = "";
            result.push(obj);
        }
    
        return result;
    }

    for(var site =1; site<89; site++) {
        var URL = xlsx_Data[now][Object.keys(xlsx_Data[now])[site]];
        try{
            await page.goto(URL);
            await page.waitForLoadState('networkidle');
            await page.waitForTimeout(1000);
            if(obj.pfUrl != URL)    throw new Error();
            result.push(obj);
        }catch(e){
            let obj = new Object();
            obj.pfUrl = URL
            obj.pfApi = "";
            console.log(obj);
            result.push(obj);
        }
        
    }

    return result;
          
};