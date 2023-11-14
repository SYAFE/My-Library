/**************************************************************************
    Synthetic Measurement Export for image/video/resource data        
    Process : S28_1107_pr.js
    Writer  : Taylor
    Date    : 
    Usage   : node S28_1107_pr.js [inputfile] >> [output.txt]
                                 (3Q_WPT.json)   (3Q_WPT.txt)
***************************************************************************/

const WebPageTest = require('webpagetest');
const https = require('https');
const parsePSI = require('../lib/parseLibrary');
const wpt = new WebPageTest("www.webpagetest.org", "0c9e0a25-4340-4f93-bcf5-ae23a1e1f61a");
const strFilename = process.argv[2];
const arrTarget = JSON.parse(require('fs').readFileSync(strFilename));


//아래 테스트용 Testid 수기 기입
//const arrTarget = ["230421_BiDcMJ_Q5"];
//txt 파일 복사후 엑셀에 붙여넣고 공백으로 칸 나누면 됨
const chunk = 1;

function KB(n){
	return Math.round(n / 1024 *100)/100;
}
function sleep(ms) {
    return new Promise(rs => {
        setTimeout(rs, ms);
        });
}

async function getResult(arrTarget) { 

    let json;
    try {
        json = await getTestResult(arrTarget);
    } catch(e) {
        console.log('\n\nError: ', e);
        return;
    } 
    await sleep(5000);
    
    if (Object.hasOwn(json.runs[1], "firstView") == false) {
        return;
    }

    console.log("URL    resource_url    statusCode  FileSize    FileType    width   height  ", json.id, json.url) // ,KB(json.average.firstView.bytesIn)/1024, json.average.firstView.fullyLoaded*0.001); // 헤더 출력
   
    const JsonAudits = json.median.firstView;
    if (!JsonAudits || !JsonAudits.requests) {
        return;
    }
    JsonAudits.requests.forEach(req => {
        printRequestLog(req, json.url);
    }); 
};

async function getTestResult(target) { 
    return new Promise((rs, rj) => {
        wpt.getTestResults(target, {timeout: 30}, async (err, data) => {
            if (err) {
                rj(err);
            } else {
                
          //     await sleep(100000);
                rs(data.data);
            }
        });
    });
}

function printRequestLog(req, url) {  
    var result_common = url + "   " + req.full_url + "   " + req.responseCode;
    var contentType = req.contentType;
    if(!contentType)
        return;
    if (contentType.includes('image')) { 
        let resultString = result_common;
        if (req.responseCode == '200') {
            resultString += '   ' + getImageString(req);
        }
        console.log(resultString);  
    } else if(contentType.includes('video') ){
        let resultString = result_common + '   ' +getVideoString(req);
        console.log(resultString);
    } else { 
        return;
    }
 
}

const contentTypeToMetadataKey = {
    'webp': 'RIFF',
    'png': 'PNG',
    'gif': 'GIF',
    'jpeg': 'File',
};

function getVideoString(element) {
    return KB(element.bytesIn)+"    " + element.contentType + " null   null";
}

function getImageString(element) {
    console.log(element.image_details)
    if (element.image_details) {
        const imageType = element.contentType.split('/')[1].toLowerCase();
        if (contentTypeToMetadataKey[imageType] && Object.hasOwn(element.image_details, "metadata")) {
            const key = contentTypeToMetadataKey[imageType];
        //    console.log(key, element.image_details.metadata);
            if(!Object.hasOwn(element.image_details.metadata, key))
               return KB(element.bytesIn) + "   " + element.image_details.metadata.File.FileType +" null    null";
            if(Object.hasOwn(element.image_details.metadata[key],"ImageWidth") && Object.hasOwn(element.image_details.metadata[key],"ImageHeight"))
                return (KB(element.bytesIn) + " " + element.image_details.metadata.File.FileType + "    " + element.image_details.metadata[key].ImageWidth + "  " + element.image_details.metadata[key].ImageHeight);
            return     (KB(element.bytesIn) + " " + element.image_details.metadata.File.FileType + "    null    null");
        }
        return "null    " + element.contentType + " null    null";
    }
    return "null    " + element.contentType + " null   null";
}


/////////////////////////////////////////

function splitIntoChunk(arr, chunk) {
    const result = [];
    for (i = 0; i < arr.length; i += chunk) {
        let tempArray;
        tempArray = arr.slice(i, i + chunk);
        result.push(tempArray);
    }

    return result;
}

async function getResultAll(element) {
    await Promise.all(element.map(getResult));
}

function sleep(ms) {
    return new Promise(rs => {
        setTimeout(rs, ms);
        });
}

const arrChunk = splitIntoChunk(arrTarget, chunk);

(async () => {
    for (arr of arrChunk) {
      //  console.log('start chunk');
         await getResultAll(arr);
    //     console.log('\n\n');
    }

    console.log('\n\ndone');
})();
