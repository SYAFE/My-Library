const S28 = require('./include');

function setProcessName (type, arrCommand)
{
  var countryInfo = arrCommand[0];
  var processName, script;

  S28.arrayShift(arrCommand, 1); 
  if (type == "OR"){    
    processName = countryInfo+"_"+S28.convertOperator(arrCommand, countryInfo)+"_OR";
    script = 'S28_' + S28.countryNumber(countryInfo) + '_or.js';
  }
  else if (type == "BO"){
    processName = countryInfo+"_"+S28.convertOperator(arrCommand, countryInfo)+"_BO";
    script = 'S28_' + S28.countryNumber(countryInfo) + '_bo.js';
  }

  S28.arrayUnshift(arrCommand, countryInfo);
  
  return {processName, script};
};

async function startBackOffice(command, OrderNumber)
{
  var arrCommand = command;
  var BOIndex = 1;
  const processInfo = setProcessName('BO', arrCommand);
  await S28.arrayUnshift(arrCommand, OrderNumber);
  
  S28.ProcessManager.connect(function(err) {  
    if (err) {
      S28.Err_log(err);
      process.exit(2);
    }

    S28.ProcessManager.list(async (err, list) => {
      for(var i = 0; i<list.length; i++){
        if(list[i].name.includes("_BO")){
          BOIndex++;
        }
      }
      await S28.arrayUnshift(arrCommand, BOIndex);
    });

    S28.ProcessManager.start({
      script    : processInfo.script,
      name      : processInfo.processName,
      autorestart : false,
      args : arrCommand
    }, function(err, apps) {
      if (err) {
        S28.Err_log("process Attach failed", processInfo.processName, err);
        return S28.ProcessManager.disconnect();
      } 
      S28.Nor_log("process Attach :", processInfo.processName);
      S28.ProcessManager.disconnect();
    })
  });   
};

async function startWorker(processList, command, key)
{    
  var arrCommand = command.split(' ');
  const processInfo = setProcessName('OR', arrCommand);
  S28.arrayUnshift(arrCommand, key);
  var name = processInfo.processName;
  processList.push({key, name});
  S28.getStartTime(name);
 
  S28.ProcessManager.connect(function(err) {
    if (err) {
      S28.Err_log(err);
      process.exit(2);
    }
    S28.ProcessManager.start({
      script    : processInfo.script,
      name      : processInfo.processName,
      autorestart : false,
      args : arrCommand
    }, function(err, apps) {

      if (err) {
        S28.Err_log("process Attach failed", processInfo.processName, err);
        return S28.ProcessManager.disconnect()
      } 
      S28.Nor_log("process Attach :", processInfo.processName);
      S28.ProcessManager.disconnect();
    });
  });
};

async function restartWorker(name)
{    
  S28.ProcessManager.connect(function(err) {
    if (err) {
      S28.Err_log(err);
      process.exit(2);
    } 
    S28.ProcessManager.restart(name, function(err, apps) {
      if (err) {
        S28.Err_log("restart failed", name, err);
        return S28.ProcessManager.disconnect()
      } 
      S28.Nor_log("restart :", name);
      S28.ProcessManager.disconnect();
    });
  });
};


async function checkWorker(processlist, command, site)
{   
    return new Promise(function(res, rej){        
        S28.ProcessManager.connect(function(err) {
            if (err) {
              S28.Err_log(err);
              process.exit(2);
            } 
           S28.ProcessManager.list((err, list) => {
              S28.retryList(processlist);
              for(var i = 0; i<processlist.length; i++){
                if(list.find(proc => proc.name === processlist[i].name)){
                    var p = list.find(proc => proc.name === processlist[i].name);
                    var Cnt = S28.retryCheck(p.name);
                    console.log(p.pm2_env.status + " , " + p.pm2_env.exit_code);
                      
                    if((p.pm2_env.status === 'stopped') && (p.pm2_env.exit_code === 0 || Cnt >= 2))
                    {
                        S28.retryDelete(p.name);
                        S28.timeDelete(p.name);
                     //   processlist = processlist.filter(o=> o.name !== p.name);
                        if(command){
                            startWorker(processlist, command, processlist[i].key);  
                            processlist.splice(processlist.findIndex(proc => proc.name === p.name), 1);
                    //        console.log("변경 ", processlist);               
                            S28.ProcessManager.disconnect();
                            res (1);
                            break;
                        }
                        else{                        
                            S28.Nor_log("End of Test Process");
                            S28.timeDelete(p.name);
                            S28.mergeORjson(S28.today, site);
                            processlist.splice(processlist.findIndex(proc => proc.name === p.name), 1);
                            S28.ProcessManager.disconnect();
                           res (-1);
                           break;
                        }
                    }
                    else if(p.pm2_env.status === 'stopped' && p.pm2_env.exit_code === 1) {
                      restartWorker(p.name);
                      S28.retryCnt(p.name);
                      S28.getStartTime(p.name);
                      S28.ProcessManager.disconnect();
                      res (0);
                    }
                    else{
                        if(S28.timeCheck(p.name)) {
                          restartWorker(p.name);
                          S28.retryCnt(p.name);
                          S28.getStartTime(p.name);
                        }
                        S28.ProcessManager.disconnect();
                        res (0);
                    }
              }   
          }
        });
    });
    }) 
};

module.exports.checkWorker = checkWorker;
module.exports.startWorker = startWorker;
module.exports.restartWorker = restartWorker;
module.exports.startBackOffice = startBackOffice;