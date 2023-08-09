const fs = require('fs');
const info = JSON.parse(fs.readFileSync('./cfg/accountSetting.json'));
const logger = require('./logger_lib');
const mysql = require('mysql');
const db = mysql.createConnection({
  host: info["database"].host,
  user: info["database"].user,
  password: info["database"].password,
  database: 'eshop',
  port: '3306',
});  

query()
/**main */
function query(){
  sendQuery(createQuery());
}

function sendQuery(queries){  
  db.connect();  
  if(queries.Order!=null){    
    let orSQL = 'INSERT INTO or_table (trcode,orderdate,added_1,added_2,added_3,added_4,payment,ornum) VALUES';
    for(let [i,query] of queries.Order.entries()){    
      orSQL+=query      
      if(i==queries.Order.length-1) orSQL+=";"      
      else orSQL+=","      
    }
    console.log(orSQL);
    db.query(orSQL, function (err, results, fields) { 
      if (err) {
          if(err.code='ER_DUP_ENTRY'){
            console.error("PK DUPLICATED")
          }
          else{
            console.error("Other Error Case")  
          }
          console.log(err.sql);
      }
      else{
        console.log("DB Insert Success(Order)");
      }     
  });
  }  

  if(queries.Back!=null){    
    let backSQL = 'INSERT INTO bo_table (po,payment_info,customer_name,customer_email,product_code,product_model,product_total_price,product_quantity,added_1,added_2,added_3,added_4,status,so) VALUES';
    for(let [i,query] of queries.Back.entries()){    
      backSQL+=query      
      if(i==queries.Back.length-1) backSQL+=";"      
      else backSQL+=","
      
    }
    console.log("Query: "+backSQL);
    db.query(backSQL, function (err, results, fields) { 
      if (err) {          
          if(err.code='ER_DUP_ENTRY'){
            console.error("PK DUPLICATED")            
          }
          else{
            console.error("Other Error Case")  
          }
          console.log(err.sql);
      }
      else{
        console.log("DB Insert Success(BackOffice)");
      }     
  });
  }  
  
  db.end();  
}

function createQuery(){  
  const orderData = getfiles("or");
  const backOfficeData = getfiles("bo");
  let queryObject = new Object;

  if(orderData!=null){
    let orderQueries = [];
    for(let order of orderData){    
      let sql = "('"+order.TR_Code+"','"+order.Date+"',"+convertToBoolean(order.Added_1)+","+convertToBoolean(order.Added_2)+","+convertToBoolean(order.Added_3)+","+convertToBoolean(order.Added_4)+","+convertToBoolean(order.Payment)+",'"+order.OrNum+"')";
      if(order.OrNum!=false && order.OrNum!=null) orderQueries.push(sql);
      else console.log("orNum is null/false")
      
    }
    queryObject.Order = orderQueries;
  }  
  
  if(backOfficeData!=null){
    let backQueries = [];
    for(let back of backOfficeData){      
      let sql = "('"+back.PO+"','"+back.PaymentInfo+"','"+back.CustomerName+"','"+back.CustomerEmail+"','"+back.ProductCode+"','"+back.ProductModel+"','"+back.ProductTotalPrice+"','"+back.ProductQuantity+"','"+back.Added_1+"','"+back.Added_2+"','"+back.Added_3+"','"+back.Added_4+"','"+back.Status+"','"+back.SO+"')";
      
      if(back.PO!=false && back.PO!=null) backQueries.push(sql);
      else console.log("boNum is null/false")
      
    }
    queryObject.Back = backQueries;
  }
    
  return queryObject
}

function convertToBoolean(data){
  if(data=="N/A" || data=="") return null;
  if(data=="Pass") return true;
  if(data=="Fail") return false;
}

function getfiles(type){    
  console.log('./output/'+getCurrentDate()+'_'+type+'.json');
  try{
    return JSON.parse(fs.readFileSync('./output/'+getCurrentDate()+'_'+type+'.json'));
  }catch(e){
    console.log(type+" FILE IS NULL");
    return null;
  }  
}

function getCurrentDate(){
  var date = new Date();      
  return (date.getFullYear() + "-" +  ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1) + "-" + (date.getDate() < 10 ? '0' : '') + date.getDate());
}

module.exports.query = query;