/**************************************************************************
    Synthetic Measurement request        
    Process : S28_1105_rq.js
    Writer  : Taylor
    Date    : 
    Usage   : node S28_1105_rq.js [url File] [serverlocation] [outputfile]
                                  (3Q_URL.json)    (3)        (3Q_WPT.json)
    options : 3GFast , LTE , emulateMobile 0:1 ? desktop:mobile
***************************************************************************/

const WebPageTest = require('webpagetest');
const   https = require('https');
const   fs = require('fs');
const wpt = new WebPageTest("www.webpagetest.org","0c9e0a25-4340-4f93-bcf5-ae23a1e1f61a");
const   strFilename = process.argv[2];
const   o = JSON.parse(fs.readFileSync(strFilename));

const testArray = new Array();
var arrUrlList = new Array();
//아래 테스트용 URL 수기기입
//const target = ['https://www.samsung.com/us/business/shop/all-deals/volume-pricing/'];

//ServerLocation -> location id 확인 사이트 참고해서 설정 가능
const ServerLocation = {
  '0' : 'gce-asia-southeast2', //indonesia
  '1': 'ec2-ap-southeast-2', //sydney
  '2': 'ec2-ap-northeast-2', //seoul
  '3': 'ec2-ap-northeast-1', //tokyo
  '4': 'ec2-ap-northeast-3', //osaka
  '5': 'ap-south-1', //india
  '6': 'ec2-eu-central-1'//Frankfurt, Germany
};

var arrscript = new Array();
const block_options = {
    location: ServerLocation[process.argv[3]],
    connectivity : "3GFast",
    firstViewOnly : true,
    emulateMobile : 0, //desktop
    block : "adobe google bv"
}

const options = {
    location: ServerLocation[process.argv[3]],
    connectivity : "LTE",
    firstViewOnly : true,
    emulateMobile : 1 //mobile
}

  async function runWPT(arg){
    return new Promise((rs, rj)=> {    
            wpt.runTest(arg, block_options, async (err, data) => {
              testArray.push(data.data.testId);         
             rs();
            })
  })
}

async function cancelWPT(arg){
  return new Promise((rs, rj)=> {
    wpt.cancelTest(arg, async (err, data) => {
     // testArray.push(data.data.testId);   
     console.log(err, data);      
     rs();
    })
  })
}

(async () => {
  for(v of o) 
  {
    await arrscript.push ( wpt.scriptToString([
        {setCookie:	['https://www.samsung.com',	   'cmapi_cookie_privacy=permit 1,2,3,4;Path=/;Domain=.samsung.com']},
        {setCookie:	['https://www.samsung.com',	   'notice_gdpr_prefs=0,1,2,3::implied,eu;Path=/;Domain=.samsung.com']},
        {setCookie:	['https://www.samsung.com',	  'notice_behavior=implied,eu;Path=/;Domain=.samsung.com']},
        { navigate: v } 
    ]));
//     await arrscript.push ( wpt.scriptToString([
//       {setCookie:	['https://www.samsung.com',	   'cmapi_cookie_privacy=permit 1,2,3,4;Path=/;Domain=.samsung.com']},
//       {setCookie:	['https://www.samsung.com',	   'notice_gdpr_prefs=0,1,2,3::implied,eu;Path=/;Domain=.samsung.com']},
//       {setCookie:	['https://www.samsung.com',	  'notice_behavior=implied,eu;Path=/;Domain=.samsung.com']},
//       { navigate: v } 
//   ]));
//   await arrscript.push ( wpt.scriptToString([
//     {setCookie:	['https://www.samsung.com',	   'cmapi_cookie_privacy=permit 1,2,3,4;Path=/;Domain=.samsung.com']},
//     {setCookie:	['https://www.samsung.com',	   'notice_gdpr_prefs=0,1,2,3::implied,eu;Path=/;Domain=.samsung.com']},
//     {setCookie:	['https://www.samsung.com',	  'notice_behavior=implied,eu;Path=/;Domain=.samsung.com']},
//     { navigate: v } 
// ]));
// await arrscript.push ( wpt.scriptToString([
//   {setCookie:	['https://www.samsung.com',	   'cmapi_cookie_privacy=permit 1,2,3,4;Path=/;Domain=.samsung.com']},
//   {setCookie:	['https://www.samsung.com',	   'notice_gdpr_prefs=0,1,2,3::implied,eu;Path=/;Domain=.samsung.com']},
//   {setCookie:	['https://www.samsung.com',	  'notice_behavior=implied,eu;Path=/;Domain=.samsung.com']},
//   { navigate: v } 
// ]));
// await arrscript.push ( wpt.scriptToString([
//   {setCookie:	['https://www.samsung.com',	   'cmapi_cookie_privacy=permit 1,2,3,4;Path=/;Domain=.samsung.com']},
//   {setCookie:	['https://www.samsung.com',	   'notice_gdpr_prefs=0,1,2,3::implied,eu;Path=/;Domain=.samsung.com']},
//   {setCookie:	['https://www.samsung.com',	  'notice_behavior=implied,eu;Path=/;Domain=.samsung.com']},
//   { navigate: v } 
// ]));
// await arrscript.push ( wpt.scriptToString([
//   {setCookie:	['https://www.samsung.com',	   'cmapi_cookie_privacy=permit 1,2,3,4;Path=/;Domain=.samsung.com']},
//   {setCookie:	['https://www.samsung.com',	   'notice_gdpr_prefs=0,1,2,3::implied,eu;Path=/;Domain=.samsung.com']},
//   {setCookie:	['https://www.samsung.com',	  'notice_behavior=implied,eu;Path=/;Domain=.samsung.com']},
//   { navigate: v } 
// ]));
// await arrscript.push ( wpt.scriptToString([
//   {setCookie:	['https://www.samsung.com',	   'cmapi_cookie_privacy=permit 1,2,3,4;Path=/;Domain=.samsung.com']},
//   {setCookie:	['https://www.samsung.com',	   'notice_gdpr_prefs=0,1,2,3::implied,eu;Path=/;Domain=.samsung.com']},
//   {setCookie:	['https://www.samsung.com',	  'notice_behavior=implied,eu;Path=/;Domain=.samsung.com']},
//   { navigate: v } 
// ]));
// await arrscript.push ( wpt.scriptToString([
//   {setCookie:	['https://www.samsung.com',	   'cmapi_cookie_privacy=permit 1,2,3,4;Path=/;Domain=.samsung.com']},
//   {setCookie:	['https://www.samsung.com',	   'notice_gdpr_prefs=0,1,2,3::implied,eu;Path=/;Domain=.samsung.com']},
//   {setCookie:	['https://www.samsung.com',	  'notice_behavior=implied,eu;Path=/;Domain=.samsung.com']},
//   { navigate: v } 
// ]));
// await arrscript.push ( wpt.scriptToString([
//   {setCookie:	['https://www.samsung.com',	   'cmapi_cookie_privacy=permit 1,2,3,4;Path=/;Domain=.samsung.com']},
//   {setCookie:	['https://www.samsung.com',	   'notice_gdpr_prefs=0,1,2,3::implied,eu;Path=/;Domain=.samsung.com']},
//   {setCookie:	['https://www.samsung.com',	  'notice_behavior=implied,eu;Path=/;Domain=.samsung.com']},
//   { navigate: v } 
// ]));
// await arrscript.push ( wpt.scriptToString([
//   {setCookie:	['https://www.samsung.com',	   'cmapi_cookie_privacy=permit 1,2,3,4;Path=/;Domain=.samsung.com']},
//   {setCookie:	['https://www.samsung.com',	   'notice_gdpr_prefs=0,1,2,3::implied,eu;Path=/;Domain=.samsung.com']},
//   {setCookie:	['https://www.samsung.com',	  'notice_behavior=implied,eu;Path=/;Domain=.samsung.com']},
//   { navigate: v } 
// ]));
  };

    Promise.all (arrscript.map(runWPT)).then(rs => {
      fs.writeFileSync(process.argv[4],JSON.stringify(testArray));
  });

})();


//취소
/*
(async () => {
  
    Promise.all (o.map(cancelWPT)).then(rs => {
      console.log(rs);
    //  fs.writeFileSync(process.argv[4],JSON.stringify(testArray));
  });

})();
*/