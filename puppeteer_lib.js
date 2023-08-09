//import { logger } from './logger.js';
const logger = require('./logger_lib.js');
/***********************************************************************
    Function : click item for cssselector 
    Parameter : page : puppeteer page / wait : wait time / item : click item title / path : click item path (css selector)
    Writer  : MJ
    Data    : 2022-09-20
***********************************************************************/
async function clickItem(page, wait, item, path){
    try{
        await page.evaluate((path)=>{    
            document.querySelector(path).click();
        },path);
        await (new Promise(rs => setTimeout(rs, wait)));                         
     //   logger.info(item + " click success");
        logger.Nor_log(item + " click success");
        return true; 
    }catch(e){
    //    logger.error(item + " click fail");  
       logger.Err_log(item + " click fail");
        return false;     
    }
}

/***********************************************************************
    Function : click item for xpath  
    Parameter : page : puppeteer page / wait : wait time / item : click item title / path : click item path (css selector)
    Writer  : MJ
    Data    : 2022-10-25
***********************************************************************/
async function clickItem_xpath(page, wait, item, path){
    try{
        let element = await page.$x(path);
	    await element[0].click();
        
        await (new Promise(rs => setTimeout(rs, wait)));                         
        //logger.info(item + " click success");
        logger.Nor_log(item + " click success")
        return true; 
    }catch(e){
        //logger.error(item + " click fail");  
        logger.Err_log(item + " click fail")
        return false;     
    }
}

/***********************************************************************
    Function : click Dialog 
    Parameter : page : puppeteer page / wait : wait time 
    >> page.on 은 다이얼로그가 뜰때마다 확인 / 한번만 확인 하고 싶으면 once
    Writer  : MJ
    Data    : 2022-10-25
***********************************************************************/
async function clickDialog(page, wait){
    try{
        await page.on('dialog', async dialog => {
            logger.Nor_log(dialog.message());
            await dialog.dismiss();      
            //await dialog.accept();                
        }); 
        await (new Promise(rs => setTimeout(rs, wait)));  
    }catch(e){
        //logger.error(item + " click fail");  
        logger.Err_log(e + " clickDialog fail");    
    } 
}

/***********************************************************************
    Function : clickItem_FindText_xpath 
    Parameter : page : puppeteer page / wait : wait time / item : click item title / attributeValue : find attribude / expactedText : 매칭할 expacted text / path : xpath 
    >> attributeValue 의 text와 찾을 비교대상 text를 비교하여 매칭되는 xpath가 있을 경우 클릭한다 
    Writer  : MJ
    Data    : 2022-10-25
***********************************************************************/
async function clickItem_FindText_xpath(page, wait, item, attributeValue, expactedText, path){
    try{

        let elements = await page.$x(path);

        for(let el of elements){
            const textObject = await el.getProperty(attributeValue);
            const valueText = textObject._remoteObject.value;
            if(valueText.includes(expactedText)){
                await el.click();
                break;
            }     
        }
        
        await (new Promise(rs => setTimeout(rs, wait)));                         
        //logger.info(item + " click success");
        console.log('\x1b[30m%s',item + " click success")
        return true; 
    }catch(e){
        //logger.error(item + " click fail");  
        console.log('\x1b[31m%s',item + " click fail")
        return false;     
    }
}

/***********************************************************************
    Function : input item for xpath  
    Parameter : page : puppeteer page / wait : wait time / input : input Text / path : click item path (css selector)
    Writer  : MJ
    Data    : 2022-10-25
***********************************************************************/
async function inputItem_xpath(page, wait, input, path){
    try{
        let element = await page.$x(path);
        await element[0].type(input);
        await (new Promise(rs => setTimeout(rs, wait)));                         
        //logger.info(input + " input success");
        logger.Nor_log(input + " input success")
        return true; 
    }catch(e){
        //logger.error(input + " input fail");  
        logger.Err_log(input + " input fail")
        return false;     
    }
}


/***********************************************************************
    Function : getAttributeValue_xpath 
    Parameter : page : puppeteer page / value : value to attribute / path : xpath 
    Writer  : MJ
    Data    : 2022-10-25
***********************************************************************/
async function getAttributeValue_xpath(page, value, path){
    var valueText = null; 
    try{
        let element = await page.$x(path);
        //const propertyHandle = await element[0].getProperty(value);
        //valueText = await propertyHandle.jsonValue();

        const textObject = await element[0].getProperty(value);
        valueText = textObject._remoteObject.value;

        //logger.info(item + " click success");
        logger.Nor_log("get getAttribute text : " + valueText)
        return valueText; 
    }catch(e){
        //logger.error(item + " click fail");  
        logger.Err_log("get getAttribute text : " + valueText )
        return valueText;     
    }
}

/***********************************************************************
    Function : getInnerText_xpath 
    Parameter : page : puppeteer page  path : xpath 
    Writer  : MJ
    Data    : 2022-10-25
***********************************************************************/
async function getInnerText_xpath(page, path){
    var innerText = null; 
    try{
        let element = await page.$x(path);
        const textObject = await element[0].getProperty('textContent');
        innerText = textObject._remoteObject.value;

        //logger.info(item + " click success");
        logger.Nor_log("get innerText text : " + innerText)
        return innerText; 
    }catch(e){
        //logger.error(item + " click fail");  
        logger.Err_log("get innerText text : " + innerText )
        return innerText;     
    }
}

/**********************************************************************
    Function : 페이지가 로드 되는 시간동안 기다리기  
    Parameter : 
    loadload- 이벤트가 발생 하면 탐색이 완료되는 것으로 간주합니다 .
    domcontentloadedDOMContentLoaded- 이벤트가 발생 하면 탐색이 완료되는 것으로 간주합니다 .
    networkidle0500- 최소한 ms 동안 0개 이하의 네트워크 연결이 없을 때 탐색이 완료된 것으로 간주합니다 .
    networkidle2500- 최소 ms 동안 2개 이하의 네트워크 연결이 없을 때 탐색이 완료된 것으로 간주합니다 .
    Writer  : MJ
    Data    : 2022-10-31
***********************************************************************/
async function watiForLoadPage(page){
    await page.waitForNavigation({waitUntil: 'networkidle0'});
}

module.exports.clickItem = clickItem;
module.exports.clickItem_xpath = clickItem_xpath; 
module.exports.inputItem_xpath = inputItem_xpath; 
module.exports.clickItem_FindText_xpath = clickItem_FindText_xpath; 
module.exports.getAttributeValue_xpath = getAttributeValue_xpath; 
module.exports.getInnerText_xpath = getInnerText_xpath; 
module.exports.watiForLoadPage = watiForLoadPage; 
module.exports.clickDialog = clickDialog; 
