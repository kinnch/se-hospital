'use strict'
var dbConnection;
exports.setDBConnectionsFromApp = function(app) {
    console.log("users controller setDBConnectionFromApp Started");
    dbConnection = app.get("dbConnection");
}
var mongoose = require('mongoose');


exports.sendSMS = function(req,res){
    var tel = req.body.tel;
    var message = req.body.message;
    var request = require("request");
    var options = { method: 'POST',
        url: 'https://sms.gipsic.com/api/send',
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        form:{ 
            key: 'k4TQ9727536hhgVmw8DK10yDNBlH5DpO',
            secret: 'KbQNLWCtL82qP0jP8HC1H0ZZM4R3slsv',
            phone: tel,
            sender: 'OTP',
            message: message 
        } 
    };

    request(options, function (error, response, body) {
        if(error){
            return res.send({
                status : "fail",
                msg : "error : cannot send sms"
            });
        }
         
        console.log("======= return from gipsic =======");
        console.log(body);
        res.send({
                status : "success",
                msg : ""
            });
        return;
        

    });
}

