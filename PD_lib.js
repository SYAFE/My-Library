const fs = require('fs');
const v = JSON.parse(fs.readFileSync('./cfg/countrySetting.json'));
const logger = require('./logger_lib');
const login = require('./login_lib.js');
var exports = module.exports = {};

async function getPDbyOperator (opString)
{
};
exports.gotoPDpage = async function (i, page, country)
{
 //   getPDbyOperator(); 
 await page.goto(v[country].SKU.url);
 await page.waitForTimeout(2000);
 try{    
    await page.evaluate(async(memory, color)=>{
        var element = document.querySelector("[an-la='"+memory+"']");    
        if(element!=null) await element.click();
        element = document.querySelector("[an-la='"+color+"']");    
        if(element!=null) await element.click();
    },v[country].SKU.memory, v[country].SKU.color);

    logger.Nor_log("go to PD and selcect option :", v[country].SKU.url);
    return 1;
 }catch(e){
    logger.Err_log("Cannot find SKU :", e);
    return -1;
 }
}
