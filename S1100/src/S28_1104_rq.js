    /*********************************************
        Performance PSI Measures Process        
        Process : S28_1101_rq.js
        Writer  : TY
        Date    : 2022-02-22
    **********************************************/
    const   API_PARAMETER = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=";
    const   API_KEY = "AIzaSyCdNbuGIQK7_K7qw9L294MmHIC9mRNebo0";
    const   API_DEVICE = "mobile";
    const   LOOP_COUNT = 1;
    const   fs = require('fs');
    const   https = require('https');
    const   parsePSI = require('../lib/parseLibrary');
    const   toNumber = require('../lib/toNumber');
    const   sleep = require('../lib/sleep');
    const   strFilename = process.argv[2];
    const   o = JSON.parse(fs.readFileSync(strFilename));

    const filters = [
        ['JsonBody','lighthouseResult','requestedUrl'],
        ['JsonBody','loadingExperience','metrics','LARGEST_CONTENTFUL_PAINT_MS','percentile', v => v * 0.001],
        ['JsonBody','loadingExperience','metrics','CUMULATIVE_LAYOUT_SHIFT_SCORE','percentile', v => v*0.01],
        ['JsonBody','loadingExperience','metrics','FIRST_CONTENTFUL_PAINT_MS','percentile', v => v * 0.001],
        ['JsonBody','loadingExperience','metrics','FIRST_INPUT_DELAY_MS','percentile'],
        ['JsonBody','loadingExperience','metrics','EXPERIMENTAL_INTERACTION_TO_NEXT_PAINT','percentile'],
        ['JsonBody','loadingExperience','metrics','EXPERIMENTAL_TIME_TO_FIRST_BYTE','percentile',v => v * 0.001],
        ['JsonBody','lighthouseResult','categories','performance','score', v => v *100],
        ['JsonAudits','interactive','displayValue', v => toNumber(v)],
        ['JsonAudits','first-contentful-paint','displayValue', v => toNumber(v)],
        ['JsonAudits','largest-contentful-paint','displayValue', v => toNumber(v)],
        ['JsonAudits','total-blocking-time','displayValue', v => toNumber(v)],
        ['JsonAudits','cumulative-layout-shift','displayValue', v => toNumber(v)],
        ['JsonAudits','speed-index','displayValue', v => toNumber(v)],      
    ];

    var arrAPITarget = new Array();
    var arrUrlList = new Array();


    
     /*********************************************
        function : URL List up on Array
        Process : URL_List_up()
        Writer  : TY
        Date    : 2022-02-22
     **********************************************/
    function URL_List_up(){
        var i = 0;
        o.target.forEach(t => {
                if(t.flag == 0){
                    arrUrlList[i] = t.url;
                    i++;
                }
        });
    }


    /*********************************************
        function : Set API request on String
        Process : Set_API_Option(Arr)
        Writer  : TY
        Date    : 2022-02-22
     **********************************************/
    function Set_API_Option(arrUrl)
    {        
        var strTarget =""; 
        for(var i =0; i < arrUrl.length; i++)
        {
            strTarget ="";
            strTarget += API_PARAMETER + arrUrl[i] + "&key=" + API_KEY + "&strategy=" + API_DEVICE;
            arrAPITarget[i] = strTarget;
        }
    }

     /*********************************************
        function : Request API
        Process : Request_API(Arr, int)
        Writer  : TY
        Date    : 2022-02-22
     **********************************************/

    function Request_API(arrTarget){
         return new Promise((rs, rj) => {            
            const req = https.get(arrTarget, res => {
                let bodyText = ''; 
                res.on('data', (d) => { bodyText += d; });
                res.on('end', () => rs({status: res.statusCode, body: bodyText}));
            });
            req.on('error', error=> {
                console.error(rj);
            });
            req.end();
        });
    }
    
    /*********************************************
        function : write the PSI score
        Process : WRITE_PSI(Arr)
        Writer  : TY
        Date    : 2022-02-22
     **********************************************/
    function WRITE_PSI(arrTarget){
        const JsonBody = JSON.parse(arrTarget);
        const JsonAudits = JsonBody.lighthouseResult.audits;
        const JsonResource = JsonAudits["resource-summary"].details.items;
        var sPSI = parsePSI({JsonBody, JsonAudits}, filters) + ",";
     /*
        JsonResource.forEach( t => {
            if(t.resourceType == 'total')
                sPSI += t.transferSize+","+t.requestCount+",";       
            else if(t.resourceType == 'script')
                sPSI += t.transferSize+","+t.requestCount+",";
            else if(t.resourceType == 'images')
                sPSI += t.transferSize+","+t.requestCount+",";
            else if(t.resourceType == 'font')
                sPSI += t.transferSize+","+t.requestCount+",";
            else if(t.resourceType == 'stylesheet')
               sPSI += t.transferSize+","+t.requestCount+",";
            else if(t.resourceType == 'other')
              sPSI += t.transferSize+","+t.requestCount+",";
            else if(t.resourceType == 'document')
              sPSI += t.transferSize+","+t.requestCount+",";
            else if(t.resourceType == 'media')
               sPSI += t.transferSize+","+t.requestCount+",";
            else if(t.resourceType == 'third-party')
               sPSI += t.transferSize+","+t.requestCount;
        })
        */
        console.log (sPSI);
    }

     /*********************************************
        function : call API
        Process : Call_API(Arr)
        Writer  : TY
        Date    : 2022-02-22
     **********************************************/
    function Call_API(arrTarget)
    {
        return new Promise(async (rs, rj) => {
            const arrResults = [];
            const temp = [];
            while (arrResults.length < LOOP_COUNT) {
                try {
                    sleep(100);
                    temp.push(await Request_API(arrTarget));
                    if(temp[temp.length-1].status >= 500){
                        console.error (arrTarget, "StatusCode:"+temp[temp.length-1].status);
                        break;
                    }
                    else if(temp[temp.length-1].status < 400){
                        arrResults.push(temp[temp.length-1]);               
                        WRITE_PSI(arrResults[arrResults.length-1].body);     
                    }
                    else
                      console.error (arrTarget, "StatusCode:"+temp[temp.length-1].status);

                } catch(error) {
                    console.error(error);
                    break;
                }
            }
            rs(arrResults.length);
        });
    }
    
     URL_List_up ();
     Set_API_Option(arrUrlList);

     Promise.all(arrAPITarget.map(Call_API)).then(arrResult => {
         arrResult.forEach((iCount, i) => {
            console.error(`${arrUrlList[i]} : ${iCount}`);
         });
     });
     