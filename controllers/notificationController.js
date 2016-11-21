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
            sender: 'โรงพยาบาลเทพพดุงพร',
            message: message 
        } 
    };

    // request(options, function (error, response, body) {
    //     if(error){
    //         return res.send({
    //             status : "fail",
    //             msg : "error : cannot send sms"
    //         });
    //     }
    //     console.log("======= return from gipsic =======");
    //     console.log(body);
    //     res.send({
    //             status : "success",
    //             msg : ""
    //         });
    //     return;
    // });
    return res.send({
                status : "success",
                msg : message
            })
}

exports.sendEmail = function(req,res){
    var nodemailer = require('nodemailer');
    var receiver = req.body.receiver;
    var subject = req.body.subject;
    var text = req.body.text;
    // create reusable transporter object using the default SMTP transport 
    var transporter = nodemailer.createTransport('smtps://leaplaunchteam%40gmail.com:L2E2A2016p@smtp.gmail.com');
    
    // setup e-mail data with unicode symbols 
    var mailOptions = {
        from: 'โรงพยาบาลเทพพดุงพร <leaplaunchteam@gmail.com>', // sender address 
        to: receiver, // list of receivers 
        subject: subject, // Subject line 
        // text: text, // plaintext body 
        html: text // html body 
    };
    
    // send mail with defined transport object 
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
            return res.send({
                status : "fail",
                msg : "error : cannot send email"
            });
        }
        res.send({
                status : "success",
                msg : ""
            })
        console.log('Message sent: ' + info.response);
        return;
    });
}

