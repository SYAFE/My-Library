/**************************************************************************
    Synthetic Measurement loading for full data        
    Process : S28_1106_rq.js
    Writer  : Taylor
    Date    : 
    Usage   : node S28_1106_pr.js [inputfile] >> [output.txt]
    options : 3GFast , LTE , emulateMobile 0:1 ? desktop:mobile
***************************************************************************/

const WebPageTest = require('webpagetest');
const   https = require('https');
const   parsePSI = require('../lib/parseLibrary');
const wpt = new WebPageTest("www.webpagetest.org","0625c5a4-d822-430b-9882-63893f3ab80d");
const   strFilename = process.argv[2];
const arrAPITarget = JSON.parse(require('fs').readFileSync(strFilename));

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
    ['JsonAudits','domComplete'],['JsonAudits','renderBlockingCSS'], ['JsonAudits','renderBlockingJS'],['JsonAudits','TTFB'],
    ['Jsonhtml','bytes'],['Jsonhtml','requests'],['Jsonjs','bytes'],['Jsonjs','requests'],
    ['Jsoncss','bytes'],['Jsoncss','requests'],['Jsonimage','bytes'],['Jsonimage','requests'],
    ['Jsonflash','bytes'],['Jsonflash','requests'],['Jsonfont','bytes'],['Jsonfont','requests'],
    ['Jsonvideo','bytes'],['Jsonvideo','requests'],['Jsonother','bytes'],['Jsonother','requests']
];
console.log('url, result, TBT, loadtime, docTime, fullyLoaded, bytesOut, bytesOutDoc, bytesIn, bytesInDoc, requests, requestaFull, requestsDoc, responses_200, responses_404, responses_other, chromeUserTiming.loadEventStart, chromeUserTiming.loadEventEnd, chromeUserTiming.domContentLoadedEventStart, chromeUserTiming.domContentLoadedEventEnd, chromeUserTiming.domComplete, connections,chromeUserTiming.CumulativeLayoutShift, chromeUserTiming.LargestContentfulPaint, chromeUserTiming.firstContentfulPaint, FirstInteractive, TimeToInteractive, chromeUserTiming.domInteractive, domComplete, renderBlockingCSS, renderBlockingJS, TTFB, html_bytes, html_request, js_bytes, js_request, css_bytes, css_request, image_bytes, image_request, flash_bytes, flash_request, fort_bytes, font_request, video_bytes, video_request, other_bytes, other_request')
   
async function getResult (arrTarget){
    return new Promise((rs,rj) => {
        wpt.getTestResults(arrTarget, (err, data) => {
            const Json = data.data;
            if(Object.hasOwn(data.data.average,"firstView") == false)
                rs();
            const JsonAudits = data.data.average.firstView;
            const Jsonhtml = data.data.median.firstView.breakdown.html;
            const Jsonjs = data.data.median.firstView.breakdown.js;
            const Jsoncss = data.data.median.firstView.breakdown.css;
            const Jsonimage = data.data.median.firstView.breakdown.image;
            const Jsonflash = data.data.median.firstView.breakdown.flash;
            const Jsonfont = data.data.median.firstView.breakdown.font;
            const Jsonvideo = data.data.median.firstView.breakdown.video;
            const Jsonother = data.data.median.firstView.breakdown.other;
            try{
                    var result = parsePSI({Json, JsonAudits,Jsonhtml,Jsonjs, Jsoncss, Jsonimage,Jsonflash,Jsonfont,Jsonvideo,Jsonother}, filters) + ",";                    
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

  