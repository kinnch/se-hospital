var dbConnection;

exports.setDBConnectionsFromApp = function(app) {

    console.log("users controller setDBConnectionFromApp Started");
    dbConnection = app.get("dbConnection");
}

var mongoose = require('mongoose');
var Staff = require('../model/staff');
var Department = require("../model/department");

exports.register = function (req, res) {
    console.log("registering aaaa : " + req.body.firstname);
    var data = req.body;
    Department.findOne({name: data.department},function (err, department){

        Staff.register(new Staff({
            userName: data.username,
            department: department._id
        }), req.body.password, function (err, user) {
            if (err) {
                console.log(err);
                return res.send(err);
            } else {
                res.send({
                    success: true,
                    user: user
                });
            }
        });
        return;
    });
};

 
exports.login = function (req, res, next) {
 
    Staff.authenticate()(req.body.username, req.body.password, function (err, user, options) {
        if (err) return next(err);
        if (user === false) {
            res.send({
                message: options.message,
                success: false
            });
        } else {
            req.login(user, function (err) {
                res.send({
                    success: true,
                    user: user
                });
            });
        }
    });
 
};
 
exports.getLogin = function (req, res) {
    console.log(req.user);
    if (req.user) {
 
        return res.send({
            success: true,
            user: req.user
        });
 
    } //res.send(500, {status:500, message: 'internal error', type:'internal'}); == deprecated
 
 
    res.send({
        success: false,
        message: 'not authorized'
    });
};

exports.checkAuth = function(req, res, next){
    console.log("checking authentication");
    if(req.user){
        return next();
    }
    else res.redirect('/users/login');
};