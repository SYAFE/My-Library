var exports = module.exports = {};
const logger = require('./logger_lib.js');
const clickItem = require('./puppeteer_lib').clickItem;

exports.setAddress = async function (page, countryInfo)
{
    switch(countryInfo){
        case("UK"):
            return new Promise(async function(res,rej){      
                try{
                    await page.waitForTimeout(5000);
                    await page.click('dynamic-material-form-control.col-12.col-md-4.ng-star-inserted > div > dynamic-material-select');
                    await page.waitForTimeout(1000);
                    await page.click('mat-option[tabindex="0"]');
                    await page.focus('input[name="firstName"]');
                    await page.keyboard.type('TY');
                    await page.focus('input[name="lastName"]');
                    await page.keyboard.type('KIM');
                    await page.focus('input[name="email"]');
                    await page.keyboard.type('wwtest.haylie@gmail.com');
                    await page.focus('input[name="phone"]');
                    await page.keyboard.type('7911123456');
                    await page.focus('input[name="postalCode"]');
                    await page.keyboard.type('KT16 0PS');
                    await page.waitForTimeout(5000);
                    await page.click("[class='dropWindow ng-star-inserted'] > app-search-loqate > mat-option");
                    await page.waitForTimeout(3000);
                    
                    await page.reload();
                    await page.waitForTimeout(5000);
        
                    await page.evaluate(()=>{
                        let element = document.querySelector("[name='sameAsShipping']");
                        if(element.getAttribute("aria-checked")=="false") element.click();
                    })
                    await page.waitForTimeout(2000);
                    
                    if(!await clickItem(page, 5000, 'set Address page countinue','[data-an-tr=checkout-order-detail]')) throw new Error("[Set Address] Cannot click CheckOut");
                    res(0);
                }catch(e)
                {
                    logger.Err_log(e);
                    rej(e);
                }
            });
        
        case("FR"):
            await page.click("[data-automation-id='address-title']");
            await page.waitForTimeout(500);
            await page.keyboard.press('ArrowDown');
            await page.type("[data-automation-id='address.firstName']", "TY");
            await page.type("[data-automation-id='address.surname']", "KIM");
            await page.type("input[name='CHECKOUT_CUSTOMER_INFO_telephone']", "101234567");
            return 0;
    }  
};


exports.setDeliveryinfo = async function (page, countryInfo)
{
    switch(countryInfo){
        case("UK"):
            return new Promise(async function(res,rej){
                try{           
                    await page.reload();
                    await page.waitForTimeout(7000);
                    if(!await clickItem(page, 3000, 'Delivery Option Select', "[id='group-0-deliveryMode-SEUK-DPD-FLAGSHIP-CUSTOM-50-G1-CU']")) {
                        if(!await clickItem(page, 2000, 'Delivery Select', 'button.pill-btn.change-time-slot.pill-btn--blue.ng-star-inserted')) throw new Error("[Set Delivery] Cannot click Delivery Select CTA");
                        if(!await clickItem(page, 3000, 'pop Continue', 'button.button.primary.pill-btn.pill-btn--black.view-more'))    throw new Error("[Set Delivery] Cannot click Continue in Popup");
                    }  
                    if(!await clickItem(page, 3000, 'Delivery Continue', '[data-an-la="order detail2:next"]'))  throw new Error("[Set Delivery] Cannot click Continue");
                    res(0);
                }catch(e)
                {
                    logger.Err_log(e);
                    rej(e);
                }
            });
        case("FR"):
            await page.type("input[data-automation-id='address.postcode']", "75007");
            await page.waitForTimeout(2000);
            await page.type("[name='CHECKOUT_SHIPPING_ADDRESS_line1']", "3 PASSAGE DE L UNION");
            await page.waitForTimeout(1000);
            await page.click("[class='ui-menu-item-wrapper']");
            // await page.waitForTimeout(2000);
            // await page.click("[value='fr-vcv-lv250_1']"); 이거 바뀜 클릭안해도 넘어감 
            await page.waitForTimeout(2000);
            await page.click("[data-an-tr='checkout-order-detail']");
            await page.waitForTimeout(5000);
            return 0;
    }   
};


