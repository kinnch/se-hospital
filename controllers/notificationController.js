'use strict'
var dbConnection;
exports.setDBConnectionsFromApp = function(app) {
    console.log("users controller setDBConnectionFromApp Started");
    dbConnection = app.get("dbConnection");
}
var mongoose = require('mongoose');


exports.sendNotification = function(){
    var request = require("request");
                    var options = { method: 'POST',
                        url: 'https://sms.gipsic.com/api/send',
                        headers: {'content-type': 'application/x-www-form-urlencoded'},
                        form:{ 
                            key: 'k4TQ9727536hhgVmw8DK10yDNBlH5DpO',
                            secret: 'KbQNLWCtL82qP0jP8HC1H0ZZM4R3slsv',
                            phone: tel,
                            sender: 'OTP',
                            message: otp 
                        } 
                    };

                    // request(options, function (error, response, body) {
                    //     if (!error) {
                    //         console.log("return from gipsic");
                    //         console.log(body);
                    //         return;
                    //     }
                        
                    // });
}

