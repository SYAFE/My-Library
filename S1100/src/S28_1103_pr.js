const puppeteer = require('puppeteer');
//const lighthouse = require('lighthouse');
const   fs = require('fs');
const   toNumber = require('../lib/toNumber');
const   strFilename = process.argv[2];
const   o = JSON.parse(fs.readFileSync(strFilename));
var arrUrlList = new Array();
var idx =0;

//클러스터 큐 만들기


function URL_List_up(){
  var i = 0;
  o.target.forEach(t => {
          if(t.flag == 0){
              arrUrlList[i] = t.url;
              i++;
          }
  });
}

//const url = 'https://www.samsung.com/au/smartphones/galaxy-z-fold4/buy/';
URL_List_up();

var title = arrUrlList[idx].replaceAll('/','_');
//title = title.substring(24);

//const site = 'AU';
//const model ='fold4';
//const pd = 'buy';
(async ()=>{
  const browser = await puppeteer.launch({
      headless: true
  });
  const page = await browser.newPage();

// await page.emulate(S20);
 
 await page.setUserAgent('Mozilla/5.0 (Linux; Android 10; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Mobile Safari/537.36');
 await page.setViewport({
   width: 412,
   height: 915,
   isMobile: true
 });

  await page.goto(arrUrlList[idx]);
//   await page.click('#truste-consent-button');
//   await page.reload();
  await page.waitForTimeout(10000);

  await page.screenshot({
      fullPage: true,
      path: `weekly-${title.substr(24)}-${new Date().toISOString().substr(0, 10)}.jpeg`
    });
// 아래 라이트하우스 엔드포인트

/*
    console.log(arrUrlList[idx]);
    console.log('Score, FCP, TTI, SI, TBT, LCP, CLS') 

//    for(var i =0; i<10; i++){        
    const runnerResult = await lighthouse(arrUrlList[idx], {
      port: (new URL(browser.wsEndpoint())).port,
      output: 'html',
      onlycategories: 'performance',
      logLevel: 'info',
      "emulated-form-factor":'mobile'
    });   

    const reportHtml = runnerResult.report;
    const Score = runnerResult.lhr.categories.performance.score * 100;
    const FCP = toNumber(runnerResult.lhr.audits["first-contentful-paint"].displayValue);
    const TTI = toNumber(runnerResult.lhr.audits['interactive'].displayValue);
    const SI = toNumber(runnerResult.lhr.audits['speed-index'].displayValue);
    const TBT = toNumber(runnerResult.lhr.audits['total-blocking-time'].displayValue);
    const LCP = toNumber(runnerResult.lhr.audits['largest-contentful-paint'].displayValue);
    const CLS = toNumber(runnerResult.lhr.audits['cumulative-layout-shift'].displayValue);

    fs.writeFileSync(`${title}.html`, reportHtml);
   // console.log(`Lighthouse scores: ${Object.values(runnerResult.categories).map(c => c.score).join(', ')}`);
  
   console.log(Score+","+FCP+","+TTI+","+SI+","+TBT+","+LCP+","+CLS);

*/
  await browser.close();

})();

