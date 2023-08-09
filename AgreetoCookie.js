async function AgreetoCookie (page){
    await page.evaluate(() => {
        if (document.querySelector('button#truste-consent-button.truste-button1') != null)
            document.querySelector('button#truste-consent-button.truste-button1').click();
        else if(document.querySelector("[an-ac='cookie bar:accept']") != null)
            document.querySelector("[an-ac='cookie bar:accept']").click();
    });
} 

module.exports.AgreetoCookie = AgreetoCookie;