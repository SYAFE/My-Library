const puppeteer = require('puppeteer');
const lighthouse = require('lighthouse');
const {URL} = require('url');

(async() => {
const url = 'https://p6-qaweb-sa.samsung.com/au/smartphones/galaxy-z-flip4/buy/';

// Use Puppeteer to launch headful Chrome and don't use its default 800x600 viewport.
const browser = await puppeteer.launch({
  headless: false,
  defaultViewport: null,
});
const page = await browser.newPage();
await page.goto(url);
await page.waitForTimeout(5000);
await page.type('#username', 'gykim');
await page.type('#password', 'gykim@2021');
await page.click('#submit-button');
await page.waitForTimeout(5000);
await page.click('#header > div.cookie-bar.cookie-bar--type-manage > div > div > div.cookie-bar__manage > a');
await page.waitForTimeout(3000);

// Lighthouse will open the URL.
// Puppeteer will observe `targetchanged` and inject our stylesheet.

const {lhr} = await lighthouse(url, {
  port: (new URL(browser.wsEndpoint())).port,
  output: 'csv',
  onlycategories: 'performance',
  logLevel: 'info',
});

console.log(`Lighthouse scores: ${Object.values(lhr.categories).map(c => c.score).join(', ')}`);

await page.close();
await browser.close();
})();