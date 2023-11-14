const WebPageTest = require('webpagetest');
const   https = require('https');
const   parsePSI = require('../lib/parseLibrary');
const wpt = new WebPageTest("www.webpagetest.org","0c9e0a25-4340-4f93-bcf5-ae23a1e1f61a");
const arrAPITarget = JSON.parse(require('fs').readFileSync('wptresult_nonblock_0206_AU.json'));
//const arrAPITarget = ['221018_BiDcCA_2A5','221018_BiDc9B_2A8','221018_AiDcDK_2BP','221018_BiDcCA_2A7','221018_BiDc0B_2AC','221018_AiDcXE_2BQ','221018_AiDcF1_2BM','221018_AiDcEH_2BR','221018_AiDc3E_2BS'];
const filters = [
    ['Json', 'testUrl'],['Json', 'summary'],['JsonAudits','TotalBlockingTime'],
    ['JsonAudits','loadTime'],['JsonAudits','docTime'],['JsonAudits','fullyLoaded'],['JsonAudits','bytesOut'],
    ['JsonAudits','bytesOutDoc'],['JsonAudits','bytesIn'],['JsonAudits','bytesInDoc'],['JsonAudits','requests'],
    ['JsonAudits','requestsFull'],['JsonAudits','requestsDoc'],['JsonAudits','responses_200'],['JsonAudits','responses_404'],
    ['JsonAudits','responses_other'],['JsonAudits','chromeUserTiming.loadEventStart'],['JsonAudits','chromeUserTiming.loadEventEnd'],  
    ['JsonAudits','chromeUserTiming.domContentLoadedEventStart'],['JsonAudits','chromeUserTiming.domContentLoadedEventEnd'],  
    ['JsonAudits','chromeUserTiming.domComplete'],['JsonAudits','connections'],['JsonAudits','chromeUserTiming.CumulativeLayoutShift'],  
    ['JsonAudits','chromeUserTiming.LargestContentfulPaint'],['JsonAudits','chromeUserTiming.firstContentfulPaint'],  
    ['JsonAudits','FirstInteractive'], ['JsonAudits','TimeToInteractive'],['JsonAudits','chromeUserTiming.domInteractive'],
    ['JsonAudits','domComplete'],['JsonAudits','renderBlockingCSS'], ['JsonAudits','renderBlockingJS'],['JsonAudits','TTFB']
];
console.log('url, result, TBT, loadtime, docTime, fullyLoaded, bytesOut, bytesOutDoc, bytesIn, bytesInDoc, requests, requestaFull, requestsDoc, responses_200, responses_404, responses_other, chromeUserTiming.loadEventStart, chromeUserTiming.loadEventEnd, chromeUserTiming.domContentLoadedEventStart, chromeUserTiming.domContentLoadedEventEnd, chromeUserTiming.domComplete, connections,chromeUserTiming.CumulativeLayoutShift, chromeUserTiming.LargestContentfulPaint, chromeUserTiming.firstContentfulPaint, FirstInteractive, TimeToInteractive, chromeUserTiming.domInteractive, domComplete, renderBlockingCSS, renderBlockingJS, TTFB')
   
async function getResult (arrTarget){
    return new Promise((rs,rj) => {
        wpt.getTestResults(arrTarget, (err, data) => {
            const Json = data.data
            if(Object.hasOwn(data.data.average,"firstView") == false)
                rs();
            const JsonAudits = data.data.average.firstView;   
            try{
                    var result = parsePSI({Json, JsonAudits}, filters) + ",";                    
                    console.log (result);
                    rs();           
            }catch(e){
                rj();
            }
    })
})
};

Promise.all(arrAPITarget.map(getResult));

const sleep = (ms) => {
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
  }

  