const   fs = require('fs');
const   strFilename = process.argv[2];
const   o = JSON.parse(fs.readFileSync(strFilename));
var arrUrlList = new Array();
var arrInit = new Array();
console.log(strFilename);
     /*********************************************
        function : URL List up on Array
        Process : URL_List_up()
        Writer  : TY
        Date    : 2022-02-22
     **********************************************/
        function URL_List_up(){
            var i = 0;
            o.forEach(t => {
                        arrUrlList[i] = t.url;
                        i++;
            });
        }
        URL_List_up ();

        arrUrlList.forEach( t => {
            var row = {"url": `${t}`, "flag":"0"};
            arrInit.push(row);
        })

        const objInit = JSON.stringify(arrInit);
        fs.writeFileSync(process.argv[3], objInit);