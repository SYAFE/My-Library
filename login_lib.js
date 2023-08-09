var exports = module.exports = {};
const event = require('./puppeteer_lib.js');
const fs = require('fs');
const logger = require('./logger_lib.js');
const v = JSON.parse(fs.readFileSync('./cfg/accountSetting.json'));
const _v = JSON.parse(fs.readFileSync('./cfg/countrySetting.json'));
async function AgreetoCookie (page){
    await page.evaluate(() => {
        if (document.querySelector('#truste-consent-button') != null)
            document.querySelector('#truste-consent-button').click();
    })
    return;
} 
exports.loginAEM = async function (page)
{
    return new Promise (async (res, rej) => {
        try{
            await page.type('#username', v.AEM.id);
            await page.type('#password', v.AEM.pw);
            await page.click('#submit-button');    
            logger.Nor_log("AEM login success :", v.AEM.id);
            res();
    }catch(e){
        logger.Err_log("AEM login failed :", v.AEM.id);
        process.exit(1);
        rej();
    }

    });
};
async function loginShop(i, page)
{
    return new Promise(async (res, rej) => {
        try{
            await page.focus('.gnb__login-btn');
            await page.click('.gnb__login-btn');
            await page.waitForTimeout(3000);
            await page.click('li.gnb__login.before-login-context > div > ul > li:nth-child(1) > a');
            await page.waitForNavigation();
            await page.type('#ctnLgnPlnID', v.User[i].id);  
            await page.click('#signInButton'); 
            await page.waitForTimeout(5000);
            await page.type('#iptLgnPlnPD', v.User[i].pw);   
            await page.waitForTimeout(5000);
            const checkRedirect = await page.url();
            if(checkRedirect.includes('membership/intro')){
                logger.Err_log("page Redirect then Browser Close: ",checkRedirect);
                await browser.close();
            }
            await page.click('#signInButton');
            await page.waitForTimeout(5000);
            await page.click('#btnNotNow');
            await page.waitForTimeout(10000);
            logger.Nor_log("Shop User Login success :", v.User[i].id)
            res (1);
        }catch(e){
            logger.Err_log("Shop User login failed :", e);
            rej(-1);
        }
       
    });
    
};

exports.gotoLogin = async function (i, page, country){
    var r=0;
    try{        
        await page.goto(_v[country].SKU.url);
        await page.waitForTimeout(2000);
        await AgreetoCookie(page);
        await page.waitForTimeout(2000);
        r = await loginShop(i, page);
        if(r > 0)
          logger.Nor_log("Shop Login success :", _v[country].SKU.url);
        else
            logger.Err_log("Shop User login failed :", _v[country].SKU.url);
        return r;
    }catch(e){
        logger.Err_log("Shop Login failed :", e);
         return -1;
    };

};
exports.loginBackOffice = async function (url, id, pw, browser,page, wait)
{
    var result = true; 
    try{
        await page.goto(url, { waitUntil: 'networkidle0' });
        await (new Promise(rs => setTimeout(rs, 2000)));
        
        await event.inputItem_xpath(page, 0, id, "//input[@name='j_username']");
        await event.inputItem_xpath(page, 0, pw,  "//input[@name='j_password']");
        
        await event.clickItem_xpath(page, 1000, 'language_select', "//button[@class ='languageSelectorBtn z-button']");
        await event.clickItem_xpath(page, 1000, 'language_english', "//tr[16]/td/div");
        await event.clickItem_xpath(page, 5000, 'login_btn', "//button[@class='login_btn y-btn-primary z-button']");
        
        await page.goto(url, { waitUntil: 'networkidle0' });
        await (new Promise(rs => setTimeout(rs, wait))); 
    
        await event.clickItem_xpath(page, 500, 'customer_select', "//div[2]/div/div[2]/div/div/div[2]/div/div/div/div/table/tbody/tr[3]/td/div");
        await event.clickItem_xpath(page, 0, 'submit_btn', "//div[2]/div/div/div[2]/div[2]/button");
        await page.waitForNavigation({waitUntil: 'networkidle0'});
        await (new Promise(rs => setTimeout(rs, wait))); 
    
        if(page.url == "https://hbe.ecom-stg.samsung.com/pricing-management"){
            
        }
        (await browser.pages())[(await browser.pages()).length-1].close();
        await (new Promise(rs => setTimeout(rs, wait))); 
    }catch(e){
        logger.Err_log("Back Login failed :", e);
        result = false; 
    }
 
    return result;
};

module.exports.loginShop = loginShop;
