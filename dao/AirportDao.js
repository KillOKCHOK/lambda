var db = require('./Db');
var mysql = require('mysql');


var getAirportListByName = function(airport_name){
    var name = "%" + airport_name + "%";
    var query = "SELECT * FROM city inner join airport using(city_id)" + 
        "WHERE city_name like "+ mysql.escape(name)+
        "or country like "+mysql.escape(name)+
        "or airport_code like "+mysql.escape(name); 
        
    return new Promise(function(resolve, reject){
        db.query( query,function(err, result,fields){ if(result === undefined||err){
                reject(new Error("Error rows is undefined"));
            }else{
                resolve(result);
            }
        })
    })
}

var getAirportList = function(cb){
    var query = "SELECT * FROM airport";
    return new Promise(function(resolve, reject){
        db.query( query,function(err, result,fields){ 
            if (result === undefined||err) {
                reject(new Error("Error rows is undefined"));
            } else {
                resolve(result);
            }
        })
    })
}

module.exports = {
    getAirportListByName: getAirportListByName,
    getAirportList: getAirportList
}

