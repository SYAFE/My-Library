
// test name : test case 이름 
// expected_data : 기대 결과
// actual_data : 실제 결과
// err_comment : 실패 시 에러 메세지 
// 기대결과와 실제 결과가 equal 인지 확인 

exports.Assert_Equal = function(test_name, expected_data, actual_data, err_comment, NAcondition){ 
    var testResult = "N/A"; 

    if(expected_data == undefined) expected_data = "";
    if(actual_data == undefined) actual_data = "";
    
    if(NAcondition != "N/A") {
        if(expected_data == actual_data){
            testResult = "Pass"; 
        }
        else if(test_name == "Price" && actual_data.includes(expected_data)){
            testResult = "Pass";
        }
        else{
            testResult = "Fail"; 
        }
    }

    let result = {
        name : test_name, 
        result : testResult, 
        data : {
            expected : expected_data,
            actual : actual_data,
            comment : err_comment 
        }
    }; 

    return result; 
}

// 기대결과가 여러개인 경우, 기대결과 중 하나만 맞더라도 Pass 처리 
// test name : test case 이름 
// expected_data : 기대 결과
// actual_data : 실제 결과
// err_comment : 실패 시 에러 메세지 
// 기대결과와 실제 결과가 equal 인지 확인 
exports.Assert_Equal_ExpArray = function(test_name, expected_datas, actual_data, err_comment, NAcondition){ 
    var testResult = "N/A"; 
    var exp_data;

    if(NAcondition != "N/A" && test_name != "Price") {
        var check = false;
        for(var i = 0; i < expected_datas.length; i++ ){
            if(expected_datas[i] == actual_data){
                testResult = "Pass"; 
                exp_data = expected_datas[i]; 
                check = true; 
                break; 
            }
        }

        if(check == false) {
            var falledData = "";
            for(var data of expected_datas){
                if(data!="") falledData += data+"/";
            }            
            exp_data = falledData;
            testResult = "Fail";
        }
    }

    if(NAcondition != "N/A" && test_name == "Price") {
        var check = false;

        if(expected_datas[1] != "" && actual_data.includes(expected_datas[1])){
            testResult = "Pass"; 
            exp_data = expected_datas[1]; 
            check = true; 
        } 
        if(expected_datas[0] != "" && actual_data.includes(expected_datas[0])) {
            testResult = "Pass"; 
            exp_data = expected_datas[0]; 
            check = true; 
        }

        if(check == false) {
            var falledData = "";
            for(var data of expected_datas){
                if(data!="") falledData += data+"/";
            }            
            exp_data = falledData;
            testResult = "Fail";
        }
    }

    let result = {
        name : test_name, 
        result : testResult, 
        data : {
            expected : exp_data,
            actual : actual_data,
            comment : err_comment 
        }
    }; 

    return result; 
}

exports.Assert_Entire_Equal = function (test_name, expected_data, actual_data, err_comment, NAcondition){ 
    var testResult = "N/A"; 

    if(expected_data == undefined) expected_data = "";
    if(actual_data == undefined) actual_data = "";
    
    if(NAcondition != "N/A") {
        if((expected_data == "" && actual_data == "") || (expected_data != "" && actual_data != "")){
            testResult = "Pass"; 
        }
        else{
            testResult = "Fail"; 
        }
    }

    let result = {
        name : test_name, 
        result : testResult, 
        data : {
            expected : expected_data,
            actual : actual_data,
            comment : err_comment 
        }
    }; 

    return result;
}

// test name : test case 이름 
// expected_data : 기대 결과
// actual_data : 실제 결과
// err_comment : 실패 시 에러 메세지 
// 실제 결과 안에 기대 결과가 포함되어 있는지 여부

exports.Assert_Include = function(test_name, expected_data, actual_data, err_comment, NAcondition){ 
    var testResult = "N/A"; 

    if(expected_data == undefined) expected_data = "";
    if(actual_data == undefined) actual_data = "";
    
    if(NAcondition != "N/A") {
        if(actual_data.includes(expected_data)){
            testResult = "Pass"; 
        }
        else{
            testResult = "Fail"; 
        }
    }

    let result = {
        name : test_name, 
        result : testResult, 
        data : {
            expected : expected_data,
            actual : actual_data,
            comment : err_comment 
        }
    }; 

    return result; 
}