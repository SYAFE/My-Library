var exports = module.exports = {};
var imei = require('node-imei');
const clickItem = require('./puppeteer_lib').clickItem;

exports.Tradein = async function (page, site)
{
    console.log("add Tradein");
    var IMEI = new imei();
    await page.waitForTimeout(3000);

    switch(site){
        case("UK"):
        if(!await clickItem(page, 3000, 'Tradein Popup', "[class='js-tradein-popup hubble-pd-popup-opener is-async js-tradein-btn']")) { return "Tradein CTA Cannot Click"; }
        await clickItem(page, 1000, 'select Brand', '#brand > li > a');
        await clickItem(page, 1000, 'select Device', '#device > li.is-selected > a');
        await clickItem(page, 1000, 'select Storage', '#storage > li > a');
        await clickItem(page, 1000, 'continue', 'div.trade-in-popup-v3__tradeIn-wrap.trade-in-popup-v3__step--show > div.trade-in-popup-v3__btn-wrap > button.trade-in-popup-v3__btn-continue.cta.cta--contained.cta--emphasis');
        await clickItem(page, 1000, 'condition YES', "[for='accept-rdo2']");
        await clickItem(page, 1000, 'continue', "[an-la='trade-in:check device condition:continue']");
        await page.focus("[id='common-trade-imei']");
        await page.keyboard.type('356556772363249');
        await clickItem(page, 5000, 'Agree Policy', "[for='tradein_tc_imei_0'] [class='checkbox-radio__label-text']");
        await clickItem(page, 5000, 'Add tradein', '#hubble-commontradein-layer > div.trade-in-popup-v3__contents > div.trade-in-popup-v3__imei-wrap.trade-in-popup-v3__step--show > div.trade-in-popup-v3__btn-wrap > button.trade-in-popup-v3__btn-continue.cta.cta--contained.cta--emphasis');
        return 0;

        case("FR"):
        if(!await clickItem(page, 3000, 'Tradein Popup', 'li:nth-child(1) > a > div')) { return "Tradein CTA Cannot Click"; }
        if(!await clickItem(page, 1000, 'select Brand', "[id='brand'] [class='is-selected']")) return "[Added_1] Cannot click Select Brand in Tradein";
        if(!await clickItem(page, 1000, 'select Device', "[id='model'] [class='is-selected']")) return "[Added_1] Cannot click Select Device in Tradein";
        if(!await clickItem(page, 1000, 'select Memory', "[id='capacity'] [class=' is-selected']")) return "[Added_1] Cannot click Select Memory in Tradein";
        if(!await clickItem(page, 4000, 'Continue1', "[an-la='trade-in:select device:continue']")) return "[Added_1] Cannot click Continue1 in Tradein";

        if(!await clickItem(page, 1000, 'check 01', "[for='conditionCheck0-0'] [class='checkbox-radio__label-text']")) return "[Added_1] Cannot click check 01 in Tradein";
        if(!await clickItem(page, 1000, 'check 02', "[for='conditionCheck1-0'] [class='checkbox-radio__label-text']")) return "[Added_1] Cannot click check 02 in Tradein";
        if(!await clickItem(page, 1000, 'check 03', "[for='conditionCheck2-0'] [class='checkbox-radio__label-text']")) return "[Added_1] Cannot click check 03 in Tradein";
        if(!await clickItem(page, 1000, 'check 04', "[for='conditionCheck3-0'] [class='checkbox-radio__label-text']")) return "[Added_1] Cannot click check 04 in Tradein";
        if(!await clickItem(page, 1000, 'check 05', "[for='conditionCheck4-0'] [class='checkbox-radio__label-text']")) return "[Added_1] Cannot click check 05 in Tradein";
        if(!await clickItem(page, 1000, 'check Policy', "[for='tradein_tc_condition_0'] [class='checkbox-radio__label-text']")) return "[Added_1] Cannot click check Policy in Tradein";
        if(!await clickItem(page, 3000, 'Continue2', "[an-la='trade-in:check device condition:continue']")) return "[Added_1] Cannot click Continue2 in Tradein";

        await page.focus("[id='common-trade-imei']");
        await page.keyboard.type(IMEI.random());

        if(!await clickItem(page, 1000, 'IMEI Policy', "[for='tradein_tc_imei_0'] [class='checkbox-radio__label-text']")) return "[Added_1] Cannot click IMEI Policy in Tradein";
        if(!await clickItem(page, 3000, 'Continue3', "[class='trade-in-popup-v3__imei-wrap trade-in-popup-v3__step--show'] [class='trade-in-popup-v3__btn-continue cta cta--contained cta--emphasis']")) return "[Added_1] Cannot click Continue3 in Tradein";
        if(!await clickItem(page, 3000, 'Continue4', "[class='trade-in-popup-v3__btn-apply cta cta--contained cta--emphasis']")) return "[Added_1] Cannot click Continue4 in Tradein";
        return 0;

        default:
            return "Not Scope TradeIn";
    }   
};

exports.TradeinCart = async function (page, site)
{
    console.log("add Tradein in cart");
    var IMEI = new imei();
    await page.waitForTimeout(3000);
    if(!await clickItem(page, 5000, 'Tradein Popup', "[class='cart-item__services'] [data-an-la='add service:trade-in']")) return "[Added_1] Tradein CTA in Cart Cannot Click";
    if(!await clickItem(page, 5000, 'select Brand', "[name='brand']"))  return "[Added_1] Cannot click Select Brand Tab in TradeinCart";
    if(!await clickItem(page, 2000, 'select Apple', '#mat-option-0 > span'))    return "[Added_1] Cannot click Select Apple in TradeinCart";
    if(!await clickItem(page, 1000, 'select Device', "[id='modelSelection']"))  return "[Added_1] Cannot click Select Device Tab in TradeinCart";
    if(!await clickItem(page, 2000, 'select iPhone', '#mat-option-1'))  return "[Added_1] Cannot click Select iPhone in TradeinCart";
    if(!await clickItem(page, 1000, 'select Storage', "[name='storage']"))  return "[Added_1] Cannot click Select Storage Tab in TradeinCart";
    if(!await clickItem(page, 2000, 'select 128GB', 'span.mat-option-text'))    return "[Added_1] Cannot click Select 128GB in TradeinCart";
    if(!await clickItem(page, 5000, 'select Continue', 'body > ngb-modal-window > div > div > app-trade-in-steps > div > app-step-one > div > div.modal__footer.modal__buttons--inline > button.button.primary.pill-btn.pill-btn--black.view-more'))    return "[Added_1] Cannot click Continue CTA1 in TradeinCart";
    if(!await clickItem(page, 2000, 'click Yes', 'body > ngb-modal-window > div > div > app-trade-in-steps > div > app-step-three > form > div.modal__body > section.d-flex.flex-column > div > label.condition-radio__button.condition-radio__yes.btn'))   return "[Added_1] Cannot click Condition YES in TradeinCart";
    if(!await clickItem(page, 2000, 'select Continue', 'body > ngb-modal-window > div > div > app-trade-in-steps > div > app-step-three > form > div.modal__body > div.modal__footer.modal__buttons--inline > button.button.primary.pill-btn.pill-btn--black')) return "[Added_1] Cannot click Continue CTA2 in TradeinCart";

    await page.focus("[formcontrolname='imeiFormControl']");
    await page.keyboard.type(IMEI.random());
    
    if(!await clickItem(page, 1000, 'Agree Policy', 'label.mat-checkbox-layout'))   return "[Added_1] Cannot click Agree Policy Check in TradeinCart";
    if(!await clickItem(page, 3000, 'Add Discount', "[data-an-tr='move-to-cart-option']")) return "[Added_1] IMEI is not avaliable";
    return 0;
};

exports.TradeinCheck = async function (page, site)
{
    switch(site) {
        case("UK"):
        let check = await page.evaluate(()=>{
            let bills = document.querySelectorAll("[class='cart-totals__container ng-star-inserted'] [class='cx-summary-partials ng-star-inserted'] > div > div [class*='summary-label']");
            for(let bill of bills){
                let Text = bill.innerText;
                if(Text == "Trade In") {              
                  return Text;
                }
            }
        });
        return check;
    }   
};

exports.USIM = async function (page, site)
{
    console.log("add USIM");
    await page.waitForTimeout(3000);

    switch(site){
        case("UK"):
        if(!await clickItem(page, 5000, 'USIM Popup', '#offer_tariff > div.hubble-product__options-content-cta > a > span')) return "[Added_2] Cannot Click USIM CTA";
        if(!await clickItem(page, 1000, 'select Tab', '#tab-1')) return "[Added_2] Cannot Click Tab in USIM";
        if(!await clickItem(page, 1000, 'select USIM', '#O2-1 > div:nth-child(1) > label')) return "[Added_2] Cannot Click USIM in USIM";
        if(!await clickItem(page, 1000, 'continue', '#hubble-tariff-layer > div.tariff-popup__contents > div.tariff-popup__contents-plan > div.tariff-popup__btn-wrap > button.tariff-popup__btn-next.cta.cta--contained.cta--emphasis')) return "[Added_2] Cannot Click Continue in USIM";
        if(!await clickItem(page, 10000, 'choose a plan', '#hubble-tariff-layer > div.tariff-popup__contents > div.tariff-popup__contents-plan-selected > div.tariff-popup__btn-wrap > button.tariff-popup__btn-submit.cta.cta--contained.cta--emphasis')) return "[Added_2] Cannot Click Plan in USIM";
        return 0;

        case("FR"):
        return "[Added_2] Cannot Setting USIM";

        default:
            return "Not Scope USIM";
    }
   
}

exports.USIMCart = async function (page, site)
{
    console.log("add USIM in cart");
    await page.waitForTimeout(3000);
    return "[Added_2] USIM not exist in Cart";
}


exports.USIMCheck = async function (page, site)
{
    switch(site){
        case("UK"):
        let check = await page.evaluate(()=>{
            let bills = document.querySelectorAll("[class*='cx-summary-row ng-star-inserted']");
            for(let bill of bills){
                let Text = bill.innerText;
                if(Text == "O2 250GB (24mths)") {              
                  return Text;
                }
            }
        });
        return check;
    }   
};

exports.SmartCare = async function (page, site)
{
    console.log("add SmartCare");
    await page.waitForTimeout(2000);

    switch(site){
        case("UK"):
        if(!await clickItem(page, 3000, 'SmartCare Add', "[for='care-rdo3']"))    return "[Added_3] Cannot click SmartCare";
        if(!await clickItem(page, 1000, 'Check policy1', "[for='care-chk1'] [class='checkbox-radio__label-text']"))    return "[Added_3] Cannot click policy1 in SmartCare";
        if(!await clickItem(page, 1000, 'Check policy2', "[for='care-chk2'] [class='checkbox-radio__label-text']"))    return "[Added_3] Cannot click policy2 in SmartCare";
        if(!await clickItem(page, 2000, 'Confirm', "[an-la='samsung care:confirm']"))    return "[Added_3] Cannot click Confirm in SmartCareCart";
        return 0;

        case("FR"):
        if(!await clickItem(page, 3000, 'SmartCare Add', "[an-la='samsung care:Samsung Care+ Paiement unique']"))    return "[Added_3] Cannot click SmartCare";
        if(!await clickItem(page, 1000, 'Confirm', "[an-la='samsung care:confirm']"))    return "[Added_3] Cannot click Confirm in SmartCare";
        return 0;
    }
   
}

exports.SmartCareCart = async function (page, site)
{
    console.log("add SmartCare in cart");
    await page.waitForTimeout(3000);
    if(!await clickItem(page, 5000, 'SmartCare Add', 'body > app-root > cx-storefront > main > cx-page-layout > cx-page-slot.TokoLeftContent.has-components.ng-star-inserted > cx-cart-details > div > cx-cart-item-list > div > div > cx-cart-item > div > div.cart-item__services > app-cart-added-services > div:nth-child(1) > div.service-item__actions > div > button'))  return "[Added_3] Cannot click SC+ CTA in Cart";
    if(!await clickItem(page, 5000, 'select Option', 'div.mat-radio-container'))    return "[Added_3] Cannot click Select Option in SmartCareCart";
    if(!await clickItem(page, 2000, 'check policy', 'div.mat-checkbox-inner-container'))    return "[Added_3] Cannot click Agree Policy check in SmartCareCart";
    if(!await clickItem(page, 2000, 'Add to basket', 'div.modal__footer.modal__buttons--inline > button.button.primary.pill-btn.pill-btn--black.view-more'))    return "[Added_3] Cannot click Add to Basket in SmartCareCart";
    return 0;
}

exports.SmartCareCheck = async function (page, site)
{ 
    let check = await page.evaluate(()=>{
        let bills = document.querySelectorAll("[class='cart-totals__container ng-star-inserted'] [class='cx-summary-partials ng-star-inserted'] > div > div [class*='summary-label']");
        for(let bill of bills){
          let Text = bill.innerText;
          if(Text == "Samsung Care+") {              
            return Text;
          }
        }
    });
    return check;
};

exports.EUP = async function (page, site)
{
    console.log("add EUP");
    await page.waitForTimeout(3000);
    switch(site){
        case("UK"):
        if(!await clickItem(page, 5000, 'EUP Popup', "[an-la='upgrade program:add to order']")) return "[Added_4] Cannot Click EUP CTA";
        if(!await clickItem(page, 5000, 'Policy Check', "[for='upgrade-seuk-chk0'] [class='checkbox-v2__label-box']")) return "[Added_4] Cannot Click Policy in EUP";
        if(!await clickItem(page, 3000, 'Agree', "[class='cta cta--contained cta--emphasis cta--abled']")) return "[Added_4] Cannot Click Agree in EUP";
        return 0;

        default:
            return "Not Scope EUP";
    }
    
}

exports.EUPCart = async function (page, site)
{
    console.log("add EUP in cart");
    await page.waitForTimeout(3000);
    return "[Added_4] EUP not exist in Cart";
}

exports.EUPCheck = async function (page, site)
{ 
    let check = await page.evaluate(()=>{
        let bills = document.querySelectorAll("[class='cart-totals__container ng-star-inserted'] [class='cx-summary-partials ng-star-inserted'] > div > div [class*='summary-label']");
        for(let bill of bills){
          let Text = bill.innerText;
          if(Text == "Current Device") {              
            return Text;
          }
        }
    });
    return check;
};

exports.SamsungRent = async function (page, site)
{
    console.log("add SamsungRent");
    await page.waitForTimeout(3000);
    switch(site){
        case("FR"):
        if(!await clickItem(page, 3000, 'SamsungRent Click', "[an-la='choose between:uptoyou lease']")) return "[Added_4] Cannot Click SamsungRent CTA";
        //if(!await clickItem(page, 3000, 'SamsungRent Popup', "[class='cta cta--contained cta--emphasis js-product-del']")) return "[Added_4] Cannot Click SamsungRent Popup";
        return 0;

        default:
            return "Not Scope SamsungRent";
    }   
}

exports.SamsungRentCheck = async function (page, site)
{ 
    return "Checked";
};