/**************************************************************************
    Export meta tag on Markup   
    Process : S28_1111_pr.js
    Writer  : Taylor
    Date    : 
    Usage   : node S28_1111_pr.js [inputfile] >> [output.txt]
***************************************************************************/

const playwright = require('playwright');
const strFilename = process.argv[2];
const arrTarget = JSON.parse(require('fs').readFileSync(strFilename));

//const arrTarget = ["https://www.samsung.com/uk/", " https://www.samsung.com/fr/"];
(async () => {

    const browser = await playwright.chromium.launch({headless: true, args: ['--start-maximized']});
    const context = await browser.newContext({viewport: null});
    var apiUrl;
    const page = await context.newPage();
    page.setDefaultTimeout(60000);
    await page.setViewportSize({
      width: 1920,
      height: 1080
    });


    console.log("url , meta_tag")
    for(var i = 0; i<arrTarget.length; i++){
        await page.goto(arrTarget[i]);
        let selector = 'meta';
        const metadata = await page.$$eval(selector, nodes => nodes.map(n => n.outerHTML));
        if(!metadata)
            console.log(arrTarget[i]);
        else
           metadata.forEach(m => {m = m.replace(/(\r\n|\n|\r|\t)/gm, "");  console.log(arrTarget[i]+" || "+m);})
    }
    console.log("the end of meta list :", arrTarget.length);
  await context.close();
  await browser.close();
})();


async function AgreetoCookie (page){
    await page.evaluate(() => {
        if (document.querySelector('#truste-consent-button') != null)
            document.querySelector('#truste-consent-button').click();
    });
} 