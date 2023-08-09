const fs = require('fs');
const logger = require('./logger_lib');
const login = require('./login_lib');
const info = JSON.parse(fs.readFileSync('./cfg/countrySetting.json'));
var exports = module.exports = {};

exports.attachtoCart = async function (page, county){
    try{
        var u = info[county].AEMServer + info[county].siteCode + info[county].storeDomain + info[county].storeWebDomain + info[county].cart;
        console.log(u);
        await page.goto(u);
        await login.loginAEM(page);
        await page.waitForTimeout(1000);
        await page.goto(u);
        await page.waitForTimeout(3000);    
        logger.Nor_log("Attach to stg2 Server :", u);
        return 1;
    }catch(e){
        logger.Err_log("Faild Attach to stg2 Server");
        return -1;
    }    
};
