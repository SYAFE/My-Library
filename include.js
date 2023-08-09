
const payment_lib = require('./payment_lib.js');
const cart_lib = require('./cart_lib.js');


module.exports = {
    ProcessManager : require('pm2'),
    cluster : require('cluster'),
    fs : require('fs'),
    xlsx : require('xlsx'),

    convertOperator: require('./convert_lib.js').convertOperator,
    parseOperator : require('./convert_lib.js').parseOperator,
    countryNumber : require('./convert_lib.js').countryNumber,

    arrayShift : require('./ArrayShift_lib.js').arrayShift,
    arrayUnshift : require('./ArrayShift_lib.js').arrayUnshift,
   
    loginAEM : require('./login_lib.js').loginAEM,
    loginShop : require('./login_lib.js').loginShop,
    loginBackOffice : require('./login_lib.js').loginBackOffice,
    gotoLogin : require('./login_lib.js').gotoLogin,

    attachtoCart : require ('./attachServer_lib.js').attachtoCart,

    Nor_log : require('./logger_lib').Nor_log,
    Err_log : require('./logger_lib').Err_log,

    gotoPDpage : require('./PD_lib.js').gotoPDpage,

    Tradein : require('./promotion_lib').Tradein,
    TradeinCart : require('./promotion_lib').TradeinCart,
    TradeinCheck : require('./promotion_lib').TradeinCheck,
    EUP : require('./promotion_lib').EUP,
    EUPCart : require('./promotion_lib').EUPCart,
    EUPCheck : require('./promotion_lib').EUPCheck,
    USIM : require('./promotion_lib').USIM,
    USIMCart : require('./promotion_lib').USIMCart,
    USIMCheck : require('./promotion_lib').USIMCheck,
    SmartCare : require('./promotion_lib').SmartCare,
    SmartCareCart : require('./promotion_lib').SmartCareCart,
    SmartCareCheck : require('./promotion_lib').SmartCareCheck,
    SamsungRent : require('./promotion_lib').SamsungRent,
    SamsungRentCheck : require('./promotion_lib').SamsungRentCheck,

    AgreetoCookie : require('./AgreetoCookie.js').AgreetoCookie,

    getPDPage : require('./getPDPage.js').getPDPage,

    setAddress : require('./Order_lib.js').setAddress,
    setDeliveryInfo : require('./Order_lib.js').setDeliveryinfo,

    CardVisa : require('./payment_lib.js').CardVisa,
    CardMaster : require('./payment_lib.js').CardMaster,
    CardMaestro : require('./payment_lib.js').CardMaestro,
    CardAMEX : require('./payment_lib.js').CardAMEX,
    Paypal : require('./payment_lib.js').Paypal,
    PaypalCredit : require('./payment_lib.js').PaypalCredit,
    SliceIt : require('./payment_lib.js').SliceIt,
    ThreeInstallments : require('./payment_lib.js').ThreeInstallments,
    SamsungFinance :  require('./payment_lib.js').SamsungFinance,
    CardMaster3DS :  require('./payment_lib.js').CardMaster3DS,
    CardAMEX3DS :  require('./payment_lib.js').CardAMEX3DS,

    retryList : require('./retry.js').retryList,
    retryCnt : require('./retry.js').retryCnt,
    retryDelete : require('./retry.js').retryDelete,
    retryCheck : require('./retry.js').retryCheck,

    makeORjson : require('./makeORjson.js').makeORjson,
    mergeORjson : require('./makeORjson.js').mergeORjson,
    que : require('./combinQue.js').que,

    today : require('../cfg/today.json').today,
    dateSetup : require('./date.js').dateSetup,

    getStartTime : require('./timeoutCheck.js').getStartTime,
    timeCheck : require('./timeoutCheck.js').timeCheck,
    timeDelete : require('./timeoutCheck.js').timeDelete,

    getFetch : require('./playwright_lib.js').getFetch,
    fill_Field : require('./playwright_lib.js').fill_Field,
    click_locator : require('./playwright_lib.js').click_locator,
    click_button : require('./playwright_lib.js').click_button,

    arrayPDApi : require('./arrayPDAPI.js').arrayPDApi,
    arrayPDApix : require('./arrayPDAPI.js').arrayPDApix,
    arrayPFApi : require('./arrayPFAPI.js').arrayPFApi,
    arraysamplePFAPI : require('./arraysamplePFAPI.js').arraysamplePFAPI

};