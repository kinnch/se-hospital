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

    
    // key is HN
    if(req.body.key.length==8){
        Patient.findOne({HN: req.body.key}).select("+salt").exec(function (err, patient) {
            if(patient != null && !err){
                // console.log(parent);
                var hashed = hashWithSalt(otp, patient.salt);
                updateHash(patient.tel, hashed,otp,req,res);
            }else{
                 res.send({
                    success: false,
                    message: "connot findone patient by HN at requestOTP" 
                });
                return;
            }
        });
    // nationalID
    }else if (req.body.key.length==13){
        Patient.findOne({nationalID: req.body.key}).select("+salt").exec(function(err,patient){
            if(patient != null && !err){
                console.log("salt");
                var hashed = hashWithSalt(otp, patient.salt);
                updateHash(patient.tel, hashed,otp,req,res);
            }else{
                 res.send({
                    success: false,
                    message: "connot findone patient by nationalID at requestOTP" 
                });
                console.log(err);
                return;
            }
        });
    }else{
        res.send({
            success: false,
            message: "key is invalid : accept only string length 8 or 13" 
        });
    }
     

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
                }else{
                    res.send({
                        success: false,
                        message: "connot save patient at updateHash"
                    });
                    return;
                }
            });
        }else{
            res.send({
                success: false,
                message: "connot findone patient by tel."
            });
            return;
        }
    });
}
