var exports = module.exports = {};
const clickItem = require('./puppeteer_lib').clickItem;

exports.CardMaestro = async function (page, site)
{
    try{
        switch(site) {
            case("UK"):{
                await page.frameLocator('internal:attr=[title="Iframe for secured card number"i]').getByPlaceholder(' ').click({timeout: 9999});
                await page.frameLocator('internal:attr=[title="Iframe for secured card number"i]').getByPlaceholder(' ').fill('4444 3333 2222 1111');
                await page.getByLabel('Name on Card').click({timeout: 9999});
                await page.getByLabel('Name on Card').fill('JK');
                await page.frameLocator('internal:attr=[title="Iframe for secured card expiry date"i]').getByPlaceholder(' ').click({timeout: 9999});
                await page.frameLocator('internal:attr=[title="Iframe for secured card expiry date"i]').getByPlaceholder(' ').fill('03/30');
                await page.frameLocator('internal:attr=[title="Iframe for secured card security code"i]').getByPlaceholder('  ').click({timeout: 9999});
                await page.frameLocator('internal:attr=[title="Iframe for secured card security code"i]').getByPlaceholder('  ').fill('737');
                await page.locator('.mat-checkbox-inner-container').first().click({timeout: 9999});
                await page.locator('#uk-checkoutTermsCondition > .mat-checkbox-layout > .mat-checkbox-inner-container').click();
                await page.getByRole('button', { name: 'Place Order' }).click({timeout: 9999});
            }
            case("FR"):{
                return 0;
            }
        }
        return await getOrderNumber(page, site);               
    }catch(e){
        return null;
    }   
     
};

exports.CardMaster = async function (page, site)
{    
    try{
        switch(site){
            case("UK") : {
                if(await clickPaymentTabs(page,"Credit Card")==false) return null;
                await setvalueToiframe(page,"[data-cse='encryptedCardNumber'] > iframe","[id='encryptedCardNumber']",'5555 5555 5555 4444'); //num
                await setvalueToiframe(page,"[data-cse='encryptedExpiryDate'] > iframe","[id='encryptedExpiryDate']",'0330'); //date
                await setvalueToiframe(page,"[data-cse='encryptedSecurityCode'] > iframe","[id='encryptedSecurityCode']",'737');    //cvc            
                await page.type("#input-holder-name","user");
                await page.evaluate(async()=>{
                    await document.querySelector("[id='uk-checkoutMarketing'] div[class='mat-checkbox-frame']").click();
                    await document.querySelector("[id='uk-checkoutTermsCondition'] div[class='mat-checkbox-frame']").click();            
                });
                await page.waitForTimeout(500);
                await page.evaluate(()=>{
                    document.querySelector("[class='pill-btn pill-btn--blue']").click();            
                });
                break;
            }
            case("FR") : {
                if(await clickPaymentTabs(page,"Carte bancaire")==false) return null;
                await setvalueToiframe(page,"[data-cse='encryptedCardNumber'] > iframe","[id='encryptedCardNumber']",'5555 5555 5555 4444'); //num
                await setvalueToiframe(page,"[data-cse='encryptedExpiryDate'] > iframe","[id='encryptedExpiryDate']",'0330'); //date
                await setvalueToiframe(page,"[data-cse='encryptedSecurityCode'] > iframe","[id='encryptedSecurityCode']",'737');    //cvc            
                await page.type("input[class*='checkout__card__holderName']","user");
                await page.evaluate(async()=>{
                    await document.querySelector("[id='creditcardcheckTermsCondition']").click();
                    await document.querySelector("[id='creditcardcheckMarketing']").click();  
                    await (new Promise(rs => setTimeout(rs, 500)));
                    await document.querySelector("[id='webCheckoutAdyenCCbutton']").click();              
                });                
                break;
            }
        }                
        return await getOrderNumber(page, site);
    }catch(e){        
        return null;
    }    
};

exports.CardMaster3DS = async function (page, site)
{    
    try{
        switch(site){
            case("UK"):{
                if(await clickPaymentTabs(page,"Credit Card")==false) return null;    
                await setvalueToiframe(page,"[data-cse='encryptedCardNumber'] > iframe","[id='encryptedCardNumber']",'5212 3456 7890 1234'); //num
                await setvalueToiframe(page,"[data-cse='encryptedExpiryDate'] > iframe","[id='encryptedExpiryDate']",'0330'); //date
                await setvalueToiframe(page,"[data-cse='encryptedSecurityCode'] > iframe","[id='encryptedSecurityCode']",'737');    //cvc            
                await page.type("#input-holder-name","user");      
        
                console.log("check policy and click Button")          
                await page.evaluate(async()=>{
                    await document.querySelector("[id='uk-checkoutMarketing'] div[class='mat-checkbox-frame']").click();
                    await document.querySelector("[id='uk-checkoutTermsCondition'] div[class='mat-checkbox-frame']").click();
                    await (new Promise(rs => setTimeout(rs, 500)));
                    await document.querySelector("[class='pill-btn pill-btn--blue']").click();
                });

                //3ds로 넘어감                
                try{
                    await page.waitForTimeout(7000);
                    await page.type('#username',"user");
                    await page.type('#password',"password");
                    await page.click("input[type='submit']");
                }catch(e){
                    return null;
                }                
                break;    
            }
            case("FR") : {
                if(await clickPaymentTabs(page,"Carte bancaire")==false) return "[Payment] CreditCard Tab Open Fail";
                await setvalueToiframe(page,"[data-cse='encryptedCardNumber'] > iframe","[id='encryptedCardNumber']",'5212 3456 7890 1234'); //num
                await setvalueToiframe(page,"[data-cse='encryptedExpiryDate'] > iframe","[id='encryptedExpiryDate']",'0330'); //date
                await setvalueToiframe(page,"[data-cse='encryptedSecurityCode'] > iframe","[id='encryptedSecurityCode']",'737');    //cvc            
                await page.type("input[class*='checkout__card__holderName']","user");
                await page.evaluate(async()=>{
                    await document.querySelector("[id='creditcardcheckTermsCondition']").click();
                    await document.querySelector("[id='creditcardcheckMarketing']").click();  
                    await (new Promise(rs => setTimeout(rs, 500)));
                    await document.querySelector("[id='webCheckoutAdyenCCbutton']").click();              
                });     

                await page.waitForTimeout(7000);
                try{
                    await page.type('#username',"user");
                    await page.type('#password',"password");
                    await page.click("input[type='submit']");  
                }catch(e){
                    return null;
                }       
                break;
            }
        }                    
        await page.waitForTimeout(10000);
        return await getOrderNumber(page, site);
    }catch(e){        
        return null;
    }    
};

exports.CardAMEX3DS = async function (page, site)
{    
    try{
        switch(site){
            case("UK"):{
                if(await clickPaymentTabs(page,"Credit Card")==false) return null;    
                await setvalueToiframe(page,"[data-cse='encryptedCardNumber'] > iframe","[id='encryptedCardNumber']",'3714 4963 5398 431'); //num
                await setvalueToiframe(page,"[data-cse='encryptedExpiryDate'] > iframe","[id='encryptedExpiryDate']",'0330'); //date
                await setvalueToiframe(page,"[data-cse='encryptedSecurityCode'] > iframe","[id='encryptedSecurityCode']",'7373');    //cvc            
                await page.type("#input-holder-name","user");              
                console.log("check policy and click Button")          
                await page.evaluate(async()=>{
                    await document.querySelector("[id='uk-checkoutMarketing'] div[class='mat-checkbox-frame']").click();
                    await document.querySelector("[id='uk-checkoutTermsCondition'] div[class='mat-checkbox-frame']").click();
                    await (new Promise(rs => setTimeout(rs, 500)));
                    await document.querySelector("[class='pill-btn pill-btn--blue']").click();
                });
                        
                try{
                    await page.waitForTimeout(7000);
                    await setvalueToiframe(page,"[class='adyen-checkout__iframe adyen-checkout__iframe--threeDSIframe']","[type='password']","password")
                    await clickiframeElement(page,"[class='adyen-checkout__iframe adyen-checkout__iframe--threeDSIframe']","[type='submit']"); //이부분
                    
                }catch(e){
                    return null;
                }                
                break;    
            }
            case("FR") : {
                if(await clickPaymentTabs(page,"Carte bancaire")==false) return null;
                await setvalueToiframe(page,"[data-cse='encryptedCardNumber'] > iframe","[id='encryptedCardNumber']",'5212 3456 7890 1234'); //num
                await setvalueToiframe(page,"[data-cse='encryptedExpiryDate'] > iframe","[id='encryptedExpiryDate']",'0330'); //date
                await setvalueToiframe(page,"[data-cse='encryptedSecurityCode'] > iframe","[id='encryptedSecurityCode']",'737');    //cvc            
                await page.type("input[class*='checkout__card__holderName']","user");
                await page.evaluate(async()=>{
                    await document.querySelector("[id='creditcardcheckTermsCondition']").click();
                    await document.querySelector("[id='creditcardcheckMarketing']").click();  
                    await (new Promise(rs => setTimeout(rs, 500)));
                    await document.querySelector("[id='webCheckoutAdyenCCbutton']").click();              
                });     

                await page.waitForTimeout(7000);
                try{
                    await page.type('#username',"user");
                    await page.type('#password',"password");
                    await page.click("input[type='submit']");  
                }catch(e){
                    return null;
                }       
                break;
            }
        }                    
        await page.waitForTimeout(10000);
        return await getOrderNumber(page, site);
    }catch(e){        
        return null;
    }    
};

exports.CardVisa = async function (page, site)
{    

    try{
        switch(site){
            case("UK") : {
                if(await clickPaymentTabs(page,"Credit Card")==false) return null;            
                await setvalueToiframe(page,"[data-cse='encryptedCardNumber'] > iframe","[id='encryptedCardNumber']",'4444 3333 2222 1111'); //num     
                await setvalueToiframe(page,"[data-cse='encryptedExpiryDate'] > iframe","[id='encryptedExpiryDate']",'0330'); //date
                await setvalueToiframe(page,"[data-cse='encryptedSecurityCode'] > iframe","[id='encryptedSecurityCode']",'737');    //cvc                                      
                await page.type("#input-holder-name","TY KIM");              

                await page.evaluate(async()=>{
                    await document.querySelector("[id='uk-checkoutMarketing'] div[class='mat-checkbox-frame']").click();
                    await document.querySelector("[id='uk-checkoutTermsCondition'] div[class='mat-checkbox-frame']").click();
                    await document.querySelector("[class='pill-btn pill-btn--blue']").click();
                })
                break;

            }
            case("FR") : {
                if(await clickPaymentTabs(page,"Carte bancaire")==false) return null;
                await setvalueToiframe(page,"[data-cse='encryptedCardNumber'] > iframe","[id='encryptedCardNumber']",'4111 1111 1111 1111'); //num
                await setvalueToiframe(page,"[data-cse='encryptedExpiryDate'] > iframe","[id='encryptedExpiryDate']",'0330'); //date
                await setvalueToiframe(page,"[data-cse='encryptedSecurityCode'] > iframe","[id='encryptedSecurityCode']",'737');    //cvc            
                await page.type("input[class*='checkout__card__holderName']","user");
                await page.evaluate(async()=>{
                    await document.querySelector("[id='creditcardcheckTermsCondition']").click();
                    await document.querySelector("[id='creditcardcheckMarketing']").click();  
                    await (new Promise(rs => setTimeout(rs, 500)));
                    await document.querySelector("[id='webCheckoutAdyenCCbutton']").click();              
                });                
                break;
            }
        }       
        await page.waitForTimeout(10000);        
        return await getOrderNumber(page, site);

    }catch(e){        
        return null;
    }    
};

exports.CardAMEX = async function (page, site)
{    
    try{
        switch(site){
            case("UK") : {
                if(await clickPaymentTabs(page,"Credit Card")==false) return null;    
                await setvalueToiframe(page,"[data-cse='encryptedCardNumber'] > iframe","[id='encryptedCardNumber']",'3700 000000 00002'); //num
                await setvalueToiframe(page,"[data-cse='encryptedExpiryDate'] > iframe","[id='encryptedExpiryDate']",'0330'); //date
                await setvalueToiframe(page,"[data-cse='encryptedSecurityCode'] > iframe","[id='encryptedSecurityCode']",'7373');    //cvc            
                await page.type("#input-holder-name","user");      

                await page.evaluate(async()=>{
                    await document.querySelector("[id='uk-checkoutMarketing'] div[class='mat-checkbox-frame']").click();
                    await document.querySelector("[id='uk-checkoutTermsCondition'] div[class='mat-checkbox-frame']").click();
                    await (new Promise(rs => setTimeout(rs, 500)));
                    await document.querySelector("[class='pill-btn pill-btn--blue']").click();
                });
                break;
            }

            case("FR") : {
                if(await clickPaymentTabs(page,"Carte bancaire")==false) return null;
                await setvalueToiframe(page,"[data-cse='encryptedCardNumber'] > iframe","[id='encryptedCardNumber']",'3700 0000 0000 002'); //num
                await setvalueToiframe(page,"[data-cse='encryptedExpiryDate'] > iframe","[id='encryptedExpiryDate']",'0330'); //date
                await setvalueToiframe(page,"[data-cse='encryptedSecurityCode'] > iframe","[id='encryptedSecurityCode']",'7373');    //cvc            
                await page.type("input[class*='checkout__card__holderName']","user");
                await page.evaluate(async()=>{
                    await document.querySelector("[id='creditcardcheckTermsCondition']").click();
                    await document.querySelector("[id='creditcardcheckMarketing']").click();  
                    await (new Promise(rs => setTimeout(rs, 500)));
                    await document.querySelector("[id='webCheckoutAdyenCCbutton']").click();              
                });                
                break;
            }
        }               

        await page.waitForTimeout(10000);        
        return await getOrderNumber(page, site);

    }catch(e){        
        return null;
    }    
};

exports.Paypal = async function (page, site)
{

    try{
        switch(site){
            case("UK") : {
                if(await clickPaymentTabs(page,"PayPal")==false) return null;    
                await page.waitForTimeout(5000);
                await page.evaluate(()=>{
                    document.querySelector("[id='uk-checkoutMarketing'] div[class='mat-checkbox-frame']").click();
                    document.querySelector("[id='uk-checkoutTermsCondition'] div[class='mat-checkbox-frame']").click();            
                })
                await page.waitForTimeout(2000);
                await clickiframeElement(page,"[title='PayPal']","[data-funding-source='paypal']");  
                try{
                    const newPagePromise = new Promise(event => page.once('popup', event));                            
                    const popup = await newPagePromise;    
                    await popup.waitForTimeout(7000);        
                    await popup.type("#email","wisewires.test.paypal1@gmail.com");    
                    await popup.click("[id='btnNext']");     
                    await popup.waitForTimeout(5000);        
                    await popup.type("#password","wise1234");     
                    await popup.click("#btnLogin");   
                    await popup.waitForTimeout(10000);                                  
                    await popup.waitForSelector("[id='payment-submit-btn']");
                    await popup.evaluate(()=>{
                        document.querySelector("[id='payment-submit-btn']").click();
                    })    

                }catch(e){
                    return null;
                }         
    
            }
            case("FR") : {
                if(await clickPaymentTabs(page,"PAYPAL")==false) return null;    
                await page.waitForTimeout(5000);
                await page.evaluate(()=>{
                    document.querySelector("[id='payPalcheckTermsCondition']").click();
                    document.querySelector("[id='payPalcheckMarketing']").click();            
                })
                await page.waitForTimeout(2000);
                await clickiframeElement(page,"[title='PayPal']","[data-funding-source='paypal']");  
                try{
                    const newPagePromise = new Promise(event => page.once('popup', event));                            
                    const popup = await newPagePromise;    
                    await popup.waitForTimeout(7000);        
                    await popup.type("#email","wisewires.test.paypal1@gmail.com");                                                
                    await popup.type("#password","accenture*02");     
                    await popup.waitForTimeout(2000);                
                    await popup.click("#btnLogin");   
                    await popup.waitForTimeout(10000);                                  
                    await popup.waitForSelector("[id='payment-submit-btn']");
                    await popup.evaluate(()=>{
                        document.querySelector("[id='payment-submit-btn']").click();
                    })    
                }catch(e){
                    return null;
                }         
                
            }
        }                                       
        await page.waitForTimeout(10000);
        return await getOrderNumber(page, site);     
    }catch(e){
        return null;
    }
    
   
};


exports.ONEY_3X4X = async function(page,site)
{
    try{
        switch(site){
            case("UK") : {
                return 0;                         
            }
            case("FR") : {
                if(await clickPaymentTabs(page,"3X4XONEY")==false) return null;    
                await page.waitForTimeout(5000);
                await page.evaluate(()=>{
                    document.querySelector("#oney3x4xcheckTermsCondition").click();
                })
                await page.waitForTimeout(5000);
                await page.click("#oneySubmit");

                try{
                    //여기서부터 3-party
                    await page.click("[class='primary-button']");
                    await page.waitForTimeout(10000);

                    await page.evaluate(async()=>{
                        await document.querySelector("#missCivility").click();                        
                    });
                    await page.type("#birthDate","12/12/1970");
                    await page.waitForTimeout(500);
                    await page.click("#birthCity");
                    await page.waitForTimeout(2000);
                    await page.click("[role='listbox'] mat-option")
                    await page.waitForTimeout(500);
                                        
                    await page.type("#cardNumber","4970 1097 7784 5931");
                    await page.type("#cardExpirationDate","1023");
                    await page.type("#cvv","123");

                    await page.evaluate(()=>{
                        document.querySelector("#generalTermsAndConditions").click();
                    })

                    await page.waitForTimeout(3000);
                    await page.click("[type='submit']");
                
                }catch(e){
                    return null;
                }         
                
            }
        }        
                                 
        await page.waitForTimeout(30000);
        return await getOrderNumber(page, site);     
    }catch(e){
        return null;
    }
    
}


exports.PaypalCredit = async function (page, site)
{
    //1207 기준 현재 UK만
    if(site!="UK") return false;
    if(await clickPaymentTabs(page,"PayPal Credit")==false) return null;    
    try{
        await page.waitForTimeout(5000);
        await page.evaluate(()=>{
            document.querySelector("[id='uk-checkoutMarketing'] div[class='mat-checkbox-frame']").click();
            document.querySelector("[id='uk-checkoutTermsCondition'] div[class='mat-checkbox-frame']").click();            
        })
        await page.waitForTimeout(2000);
        await clickiframeElement(page,"[title='PayPal']","[data-funding-source='paypal']");

        try{
            const newPagePromise = new Promise(event => page.once('popup', event));                            
            const popup = await newPagePromise;  
            await popup.waitForTimeout(7000);        
            await popup.type("#email","anmol@samsung.com");     
            await popup.click("[id='btnNext']");    
            await popup.waitForTimeout(5000);        
            await popup.type("#password","anmol@123");
            await popup.waitForTimeout(500);  
            await popup.click("#btnLogin");
            await popup.waitForTimeout(8000);     
            
            await popup.evaluate(()=>{
                document.querySelector("[name='PayLaterRadioGroup']").click();    
            })                            
            await popup.waitForTimeout(2000);
            await popup.waitForSelector("[id='payment-submit-btn']");
            await popup.evaluate(()=>{
                document.querySelector("[id='payment-submit-btn']").click();
            })       

            //옵션체크 하고 choose and continue
            await popup.evaluate(async()=>{
                await document.querySelector("[class='offerTileRadio']").click();
                await (new Promise(rs => setTimeout(rs, 1000)));                         
                await document.querySelector("[type='submit']").click();                
            });

            await popup.waitForTimeout(6000);
            await popup.waitForSelector("[id='payment-submit-btn']");
            await popup.evaluate(()=>{
                document.querySelector("[id='payment-submit-btn']").click();
            })      
        }catch(e){
            return null;
        }            
 
        await page.waitForTimeout(10000);
        return await getOrderNumber(page, site);      
    }catch(e){
        return null;
    }
};

exports.SliceIt = async function (page, site)
{
    if(await clickPaymentTabs(page,"Slice it")==false) return null;    
    try{
        await page.waitForTimeout(5000);
        await page.evaluate(()=>{
            document.querySelector("[id='uk-checkoutMarketing'] div[class='mat-checkbox-frame']").click();
            document.querySelector("[id='uk-checkoutTermsCondition'] div[class='mat-checkbox-frame']").click();
        });
        await page.waitForTimeout(2000);
        await page.evaluate(()=>{
            document.querySelector("[data-an-la='slice it']").click();
        });                                                

        try{
            await page.waitForTimeout(12000); 
            await clickiframeElement(page,"[id='klarna-pay-over-time-fullscreen']","[id='onContinue']");        
            await page.waitForTimeout(12000);       
            await setvalueToiframe(page,"[id='klarna-pay-over-time-fullscreen']","[aria-describedby]","123456");        
            await page.waitForTimeout(12000);        
            await clickiframeElement(page,"[id='klarna-pay-over-time-fullscreen']","button[id*='continue-button']");        
            await page.waitForTimeout(15000);
        }catch(e){
            return null;
        }        
        return await getOrderNumber(page, site); 
    }catch(e){
        return null;
    }
};


exports.ThreeInstallments = async function (page, site)
{
    if(await clickPaymentTabs(page,"Three installments")==false) return null;    
    try{
        await page.waitForTimeout(5000);
        await page.evaluate(()=>{
            document.querySelector("[id='uk-checkoutMarketing'] div[class='mat-checkbox-frame']").click();            
            document.querySelector("[id='uk-checkoutTermsCondition'] div[class='mat-checkbox-frame']").click();
        })        

        await page.waitForTimeout(2000);

        await page.evaluate(()=>{
            document.querySelector("[data-an-la='three installments']").click();
        });    

        await page.waitForTimeout(12000);   
        try{
            await clickiframeElement(page,"[id='klarna-pay-over-time-fullscreen']","[id='onContinue']");
            await page.waitForTimeout(7000);   
            await setvalueToiframe(page,"[id='klarna-pay-over-time-fullscreen']","[aria-describedby]","123456");        
            await page.waitForTimeout(7000);        
            await clickiframeElement(page,"[id='klarna-pay-over-time-fullscreen']","button[id*='continue-button']");        
            await page.waitForTimeout(15000);
        }catch(e){
            return null;
        }
        return await getOrderNumber(page, site);  
    }catch(e){
        return null;
    }
};

exports.SamsungUpgrade = async function (page, site)
{    
    try{
        await page.waitForTimeout(5000);
        await page.evaluate(()=>{
            document.querySelector("[id='uk-checkoutMarketing'] div[class='mat-checkbox-frame']").click();
            document.querySelector("[id='uk-payment-klarnaUpgrade'] [class='mat-checkbox-label']").click();
            document.querySelector("[id='uk-checkoutTermsCondition'] div[class='mat-checkbox-frame']").click();
        })
        await page.waitForSelector("[data-an-la='samsung upgrade programme']");
        await page.click("[data-an-la='samsung upgrade programme']");       
        try{
            const newPagePromise = new Promise(event => page.once('popup', event));                            
            const popup = await newPagePromise;        
            await popup.waitForTimeout(10000);              
            await popup.click("#onContinue");       
            await popup.waitForTimeout(10000);           
            await popup.type("[autocomplete='one-time-code']","123456")
            await popup.waitForTimeout(10000);        
            await popup.click("[name='pay_now']");
            await popup.waitForTimeout(2000);         
            await popup.click("[data-testid='select-payment-category']");
            await popup.waitForTimeout(5000);
            await popup.click("[testid='confirm-and-pay']");
            await popup.waitForTimeout(5000);
            await popup.click("[data-testid='PushFavoritePayment:skip-favorite-selection']")        
            await page.waitForTimeout(15000);

        }catch(e){
            return null;
        }                                                       
        return await getOrderNumber(page, site);
    }catch(e){
        return null;
    }
};

exports.SamsungPay = async function (page, site)
{

};

exports.SamsungFinance = async function (page,site)
{
    try{
        if(await clickPaymentTabs(page,"Samsung Finance (powered by Glow)")==false) return null;    
        await page.waitForTimeout(10000);            
        await page.evaluate(async()=>{
            await document.querySelector("[for='uk-checkoutMarketing-input']").click();
            await document.querySelector("[for='uk-checkoutTermsCondition-input']").click();           
            await (new Promise(rs => setTimeout(rs, 500)));
            await document.querySelector("[data-an-tr='checkout-payment']").click();
        });
        try{
            await page.waitForTimeout(12000);                     
            //about you
            await setvalueToiframe(page,"[data-cy='glow-application-iframe']","[id='identityForm-phoneNumber']","7911123456");
            await page.waitForTimeout(3000);
            await setvalueToiframe(page,"[data-cy='glow-application-iframe']","#dateOfBirth","24/11/1993");
            await page.waitForTimeout(3000);
            await clickiframeElement(page,"[data-cy='glow-application-iframe']","#customerDetails-nextAddress");
            await page.waitForTimeout(3000);
            //history
            await clickiframeElement(page,"[data-cy='glow-application-iframe']","#addressesForm-radio-0-option");                
            await clickiframeElement(page,"[data-cy='glow-application-iframe']","#addressesForm-morethenthreeyears-radio-0");
            await page.waitForTimeout(5000);
            await clickiframeElement(page,"[data-cy='glow-application-iframe']","#customerDetails-nextBankDetails");                    
            await page.waitForTimeout(5000);                
            await setvalueToiframe(page,"[data-cy='glow-application-iframe']","#financialsForm-inputAccountName","test");
            await setvalueToiframe(page,"[data-cy='glow-application-iframe']","#financialsForm-inputSordCode","609242");
            await setvalueToiframe(page,"[data-cy='glow-application-iframe']","#financialsForm-inputAccountNumber","11111111");
            await clickiframeElement(page,"[data-cy='glow-application-iframe']","#financialsForm-checkbox");                    
            await setvalueToiframe(page,"[data-cy='glow-application-iframe']","#financialsForm-inputRentMortgageCost","100");            
            await setvalueToiframe(page,"[data-cy='glow-application-iframe']","#financialsForm-select","1");
            await page.waitForTimeout(1000);
            await page.keyboard.press('Enter');
            await page.waitForTimeout(3000);
            await clickiframeElement(page,"[data-cy='glow-application-iframe']","#customerDetails-nextEmployment");                    
            await page.waitForTimeout(3000);
            await clickiframeElement(page,"[data-cy='glow-application-iframe']","#mui-component-select-occupationType");           
            await page.waitForTimeout(500);         
            await clickiframeElement(page,"[data-cy='glow-application-iframe']","[data-value='1']");                                    
            await setvalueToiframe(page,"[data-cy='glow-application-iframe']","#employmentForm-inputOccupation-label","QA");
            await setvalueToiframe(page,"[data-cy='glow-application-iframe']","#employmentForm-inputEmployerName-label","TEST");
            await setvalueToiframe(page,"[data-cy='glow-application-iframe']","#yearWithEmployee","02/2000");
            await setvalueToiframe(page,"[data-cy='glow-application-iframe']","#employmentForm-inputSalary","1");
            await page.waitForTimeout(1000);
            await page.keyboard.press('Enter');
            await page.waitForTimeout(3000);  
            await clickiframeElement(page,"[data-cy='glow-application-iframe']","#customerDetails-nextConfirmData");                                    
            await page.waitForTimeout(5000);
            await clickiframeElement(page,"[data-cy='glow-application-iframe']","#customerDetails-continue");                                    
            return true;
        }catch(e){
            return null;
        }        
    }catch(e){
        return null;
    }
};

exports.Tariff = async function (page, site)
{

};

async function clickPaymentTabs(page,target,site){    
    if(site=="UK"){
        console.log("initialize active tab");
        await page.evaluate(()=>{
            document.querySelector("[role='button'][class*='mat-expanded']").click();                
        });
        await page.waitForTimeout(5000);   
    }        
    console.log("Open "+target);
    let result = await page.evaluate((target)=>{
        let payments = document.querySelectorAll("[class*='payment-title']");
        for(let pay of payments){
            let payText = pay.innerText;
            if(payText==target) {
                pay.click();                
                return true;
            }
        }
        return false;
    },target);
    await page.waitForTimeout(5000);    
    return result;
}

async function setvalueToiframe(page,iframePath,elementPath,value){
    const elementHandle = await page.waitForSelector(iframePath);
    const frame = await elementHandle.contentFrame();
    await frame.waitForSelector(elementPath);
    const inputText = await frame.$(elementPath);
    await inputText.type(value);        
}

async function getOrderNumber(page,site){
    await page.waitForTimeout(15000);
    let orderNumber = null;    
    orderNumber =await page.evaluate((site)=>{        
        try{
            switch(site){
                case("UK"):{
                    return document.querySelector("[class*='order-number'] [class='ng-star-inserted']").innerText;                    
                }
                case("FR"):{
                    return document.querySelector("[class='text-center'] [class*='order-number']").innerText;
                }
            }
        }catch(e){
            return "[Payment] getOrderNumber Fail";
        }
    },site);
    return orderNumber;
}

async function clickiframeElement(page,iframePath,elementPath){
    const elementHandle = await page.waitForSelector(iframePath);
    const frame = await elementHandle.contentFrame();
    await frame.waitForSelector(elementPath);
    const element = await frame.$(elementPath);
    await element.click();
}