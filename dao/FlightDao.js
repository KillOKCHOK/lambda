var db = require('./Db');
var mysql = require('mysql');
const adminId = 1;
const today = new Date();

exports.getFlightList = function (date, depAirportId, arrAirportId) {

    var query = "SELECT * From flight " +
        "where dep_airport_id =" + mysql.escape(depAirportId) +
        "and arr_airport_id =" + mysql.escape(arrAirportId) +
        "and dep_dateTime >=" + mysql.escape(date) +
        "and dep_dateTime <DATE_ADD(" + mysql.escape(date) + ", INTERVAL 1 DAY)" +
        "order by dep_dateTime";

        return new Promise(function(resolve, reject){
            db.query( query,function(err, result,fields){ 
                if(result === undefined||err){
                    reject(new Error("Error rows is undefined"));
                }else{
                    resolve(result);
                }
            })
        })
}


exports.decreaseFlightCapacity = function (data) {

    return new Promise(function(resolve, reject){
        var flightsArray = data.flights;
        db.beginTransaction(function (err) 
        {
            if (err) {reject("error");}//new Error(err)
            for (var i = 0; i < flightsArray.length; i++) {

                var query = "update flight set capacity = capacity - " + mysql.escape(data.travelerNumber) +
                    ", update_by = " + mysql.escape(data.userId) +
                    ", update_date = " + mysql.escape(today) +
                    " where flight_id = " + mysql.escape(flightsArray[i].flight_id);

                    db.query(query, function (err, result) {
                        if(err) {
                            db.rollback();
                            reject(err);
                        }else{
                            db.commit(function(err,result){
                                if(err)  {reject(err);}
                                else resolve("Updated!");
                            });
                        }
                    });
                            
            };
            
        });
    });
};


