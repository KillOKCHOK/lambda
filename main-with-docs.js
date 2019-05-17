var flightDao = require('./dao/FlightDao');
var bookingDao = require('./dao/BookingDao');
var airPortDao = require('./dao/AirPortDao');


exports.handler = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    ////////////////////////////////////////////////flights/////////////////////////////////////////////////////
    
    if(event.context['resource-path']==="/flights"){
        if (event.context['http-method'] === 'DELETE') {
            callback( {statusCode:405, message:"Method is not allowed"});




        } else if (event.context['http-method'] === 'GET') {
            if(event.params.querystring.date&&event.params.querystring.depAirportId&&event.params.querystring.arrAirportId){
                flightDao.getFlightList(event.params.querystring.date, event.params.querystring.depAirportId, event.params.querystring.arrAirportId)
                .then(res=>{
                    callback(null,res);
                })
                .catch(err => {
                    callback(null,err);
                });;
            } else {
                callback( null, { statusCode:400, message:"Bad Request"});
            }
        } else if (event.context['http-method'] === 'POST') {
            callback( null,{statusCode:405, message:"Method is not allowed"});


        
        } else if (event.context['http-method'] === 'PUT') {
            let body = event["body-json"];
            if(body.flights&&body.travelerNumber&&body.userId){
                flightDao.decreaseFlightCapacity(body)
                .then(res=>{
                    callback(null, {statusCode:200,result:res});
                })
                .catch(err => {
                    callback(null,err);
                });
            } else {
                callback(null, { statusCode:400, message:"Bad Request"});
            }
        }else{
           callback( null,{statusCode:405, message:"Method is not allowed"});
        }
    }

    ///////////////////////////////////////////////airports///////////////////////////////////////////////////////
    
    else if(event.context['resource-path']==="/airports"){
        if (event.context['http-method'] === 'DELETE') {
            callback(null, {statusCode:405, message:"Method is not allowed"});




        } else if (event.context['http-method'] === 'GET') {
            if(event.params.querystring.name){
                airPortDao.getAirportListByName(event.params.querystring.name) 
                .then(res => {
                    callback(null, res);
                })
                .catch(err => {
                    callback(null,err);
                });
            } else {
                 callback(null, { statusCode:400, message:"Bad Request"});
            }
        } else if (event.context['http-method'] === 'POST') {
           callback(null, {statusCode:405, message:"Method is not allowed"});
        } else if (event.context['http-method'] === 'PUT') {
            callback(null, {statusCode:405, message:"Method is not allowed"});
        }
    }
    
    ////////////////////////////////////////  Bookings ///////////////////////////////////////////////
    




    else if(event.context['resource-path']==="/bookings/{resourceId}"){
        if (event.context['http-method'] === 'DELETE') {
            var data = event.params.path.resourceId;
            bookingDao.cancelbooking(data)
            .then(result=>{
            callback(null,{statusCode:200, result:result});
            })
            .catch(err=>{
            callback(null,err);
            });
        }
    }

    else if(event.context['resource-path']==="/bookings"){
        if (event.context['http-method'] === 'DELETE') {
            callback(null, {statusCode:400, message:"Method is not allowed"});





        } else if (event.context['http-method'] === 'GET') {
            if (event.params.querystring.confirmationNum) {
                bookingDao.readBooking(event.params.querystring.confirmationNum)
                .then(res=>{
                    callback(null,res);
                })
                .catch(err=>{
                callback(err);
                });
            } else {
            callback(null,{statusCode:400, message:"Method is not allowed"});
            }





            
        } else if (event.context['http-method'] === 'POST') {
            var data = event['body-json'];
            bookingDao.createbooking(data)
            .then(result=>{
            callback(null,result);
            })
            .catch(err=>{
            callback(null,err);
            });
        } else if (event.context['http-method'] === 'PUT') {
            callback(null, {statusCode:405, message:"Method is not allowed"});
        }
    }
    
};