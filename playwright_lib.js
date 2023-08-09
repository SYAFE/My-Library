const playwright = require('playwright');

exports.fill_Field = async function(page, field, text) {
    await page.waitForLoadState('load');
    try{
        await page.getByLabel(field).fill(text);
        if(await page.getByLabel(field).inputValue() == text) {
            return true;
        } else {
            return false;
        }
    }catch(e){
        return false;
    }  
};

exports.click_locator = async function(page, locator) {
    // await page.waitForLoadState('load');
    await page.locator(locator).first().click();
};

exports.click_button = async function(page, label) {
    await page.waitForLoadState('load');
    try{
        await page.getByRole('button', { name: label }).first().click();
        return true;
    }catch(e){
        return false;
    }   
};

exports.getFetch = async function (URL, cookie, trg) {
    var retry = 0;
    var check = true;
    var api = await playwright.request.newContext();
    // var cook = cookie;

    do {
        try {
            if(trg == "Search") var response = await api.fetch(URL, { insecureHTTPParser: true });
            else if(trg == "PD") var response = await api.fetch(URL, {
                                                                    headers: {
                                                                    cookie : ""
                                                                    }
                                                                });
            // console.log("Fetch OK...")
            check = false;
            if(retry > 0) {
                // logger.info("Fetch retry Pass");
                retry = 0;
            }
        }
        catch(e) {
            console.error(e);
            retry++;
            // logger.error("Fetch error [Retry: " + retry + "] : " + URL);
            check = false;
            var response = {};
        }

    } while(check);

    return response;
};