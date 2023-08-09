var exports = module.exports = {};
var List = {};

exports.getStartTime = function(process) {
    var time = new Date();
    List[process] = (time.getHours() * 100) + time.getMinutes();
    console.log(process + " : " + List[process]);        
};

exports.timeCheck = function(process) {
    var time = new Date();
    for(var key in List){ 
        if(process == key && (time.getHours() * 100) + time.getMinutes() > carcTime(List[key])) {
            console.log(process + " is Frozen!");
            return true;
        }
    }
    return false;
};

exports.timeDelete = function(process) {
    for(var key in List){ 
        if(process == key) {
            delete List[process];
        }
    }
};

function carcTime(time) {
    var lim = time + 10;
    if(lim%100 >= 60) lim = ((parseInt(lim/100) + 1) * 100) + (lim%100 - 60);
    return lim;
}