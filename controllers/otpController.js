var dbConnection;

exports.setDBConnectionsFromApp = function(app) {

    console.log("users controller setDBConnectionFromApp Started");
    dbConnection = app.get("dbConnection");
}
var mongoose = require('mongoose');

var Patient = require("../model/patient");
var Department = require("../model/department");

var pbkdf2 = require('pbkdf2')


var hashWithSalt = function(otp,salt){
    salt = salt.toString('hex');
    var derivedKey = pbkdf2.pbkdf2Sync(otp, salt, 25000, 512, 'sha256');
    return derivedKey.toString("hex");
}

exports.requestOTP = function(req, res){
    var otp = randomOTP();
    otp = otp.toString();
    var hashed = hashWithSalt(otp,"f1780da01d1c3d4f8cf66ccfcddcc2c1a627f1aa61dd4eb9c38e0990134dbf23");
    updateHash("0984593556",hashed,otp,req,res);

}
var randomOTP = function(){
    return Math.floor(Math.random()* (999999 - 100000))+100000;
}

// update hash of otp and sent otp
var updateHash = function(tel,hash,otp,req,res){

    Patient.findOne({tel: tel}, function (err, patient) {
        if(patient != null && !err){
            patient.hash = hash;
            patient.OTP.generatedDate = new Date()
            patient.save(function (err, patient, numAffected) {
                if(!err){
                    console.log(patient);
                    console.log(numAffected);
                    res.send({success: true,
                              OTP: otp
                    });
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
            });
        }
    });
}
