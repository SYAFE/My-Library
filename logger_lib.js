const moment = require('moment');
require('moment-timezone')
moment.tz.setDefault("Asia/Seoul");
exports.Nor_log = async function (...args)
{
    console.log("["+moment().format('YYYY-MM-DD HH:mm:ss')+"]", ...args);
};

exports.Err_log = async function (...args){
    console.error("["+moment().format('YYYY-MM-DD HH:mm:ss')+"]", ...args);
    // require("child_process").exec("powershell.exe [console]::beep(1000,300)"); 
};