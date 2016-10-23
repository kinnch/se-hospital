var dbConnection;

exports.setDBConnectionsFromApp = function(app) {

    console.log("users controller setDBConnectionFromApp Started");
    dbConnection = app.get("dbConnection");
}
var mongoose = require('mongoose');

var Patient = require("../model/patient");
var Department = require("../model/department");

var pbkdf2 = require('pbkdf2')


var hashWithSalt = function(salt){
    salt = salt.toString('hex');
    var derivedKey = pbkdf2.pbkdf2Sync('123456', salt, 25000, 512, 'sha256');
    return derivedKey.toString("hex");
}

exports.requestOTP = function(req, res){
    var otp = randomOTP();


    return res.send(hashWithSalt("4e9910f2030e7fda4c33403aaddf025ff41fab1e707da5b16cc560b147086c14"));

}
var randomOTP = function(){
    return Math.floor(Math.random()* (999999 - 100000))+100000;
}
