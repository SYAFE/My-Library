var exports = module.exports = {};
var List = {};

exports.retryList = function(processlist) {
    for(var i = 0; i<processlist.length; i++){
        var check = true;
        for(var key in List){ 
            if(processlist[i].name == key) {
                check = false;
            }
        }
        if(check) List[processlist[i].name] = 0;           
    }
};

exports.retryCnt = function(name) {
    for(var key in List){ 
        if(name == key) {
           List[key]++;
        }
    }
};

exports.retryCheck = function(name) {
    for(var key in List){ 
        if(name == key) {
           return List[key];
        }
    }
};

exports.retryDelete = function(name) {
    for(var key in List){ 
        if(name == key) {
            delete List[key];
        }
    }
};
