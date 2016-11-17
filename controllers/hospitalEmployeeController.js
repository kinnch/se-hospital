var dbConnection;

exports.setDBConnectionsFromApp = function(app) {

    console.log("users controller setDBConnectionFromApp Started");
    dbConnection = app.get("dbConnection");
}

var mongoose = require('mongoose');

var HospitalEmployee = require("../model/hospitalEmployee");
var Department = require("../model/department");
var Schedule = require("../model/schedule");

var pbkdf2 = require('pbkdf2');

var hashWithSalt = function(otp,salt){
    salt = salt.toString('hex');
    var derivedKey = pbkdf2.pbkdf2Sync(otp, salt, 25000, 512, 'sha256');
    return derivedKey.toString("hex");
}

exports.getAllEmployee = function(req, res){
    HospitalEmployee.find({},function(err,employees){
        data = { 'employees':employees};
        res.send(data);
        return;
    });
}
exports.getAllDepartment = function(req, res){
    Department.find({},function(err,departments){
        data = { 'departments':departments};
        res.send(data);
        return;
    });
}

exports.changePassword = function(req,res){
    var data = req.body;
    HospitalEmployee.findOne({
        userName: (data.username)+''
    }).select("+salt").exec(function(err, employee){
        var hashed = hashWithSalt(data.password, employee.salt);
        employee.hash = hashed;
        employee.save();
        res.send("done")
        return;
    })
}
exports.getDoctorInTime = function(req,res){
    Schedule.find({
        date: {"$gte": new Date(req.body.date),
                $lt:new Date(new Date(req.body.date).getTime() + 24 * 3600 * 1000)},
        timePeriod: req.body.period
    }).populate({
        path:'doctor',
        match: {department: req.body.dapartmentID}
    }).exec( function(err,data){
        data = data.filter(function(doc){
            return doc.appointments.length < 15;
        });
        return res.send(data);
    });
}

// TODO : Delete Staff
exports.deleteStaff = function(req,res){

}

exports.isInSystem = function(req, res) {
    HospitalEmployee.findOne({
        userName: (req.body.username)+''
    }, function(err, employee){
        if(err) return console.error(err);
        if(employee == null) res.send(false);
        else res.send(true);
        return;
    });
}

exports.login = function (req, res, next) {
 
    HospitalEmployee.authenticate('staff')(req.body.username, req.body.password, function (err, user, options) {
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
exports.register = function (req, res) {
    var data = req.body;
    Department.findOne({name: data.department},function (err, department){
        HospitalEmployee.register(new HospitalEmployee({
            name: {
                    title: data.title,
                    fname: data.fname,
                    lname: data.lname
                },
                roleID: data.roleID,
                userName: data.username,
                department: department._id,
                password: data.password
        }), data.password, function (err, user) {
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
}

 
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

exports.add = function(req, res){
    var data = req.body;
    //res.send(k);
    Department.findOne({name: req.body.department},function (err, department){
        var hospitalEmployee = new HospitalEmployee({
            name: {
                title: data.title,
                fname: data.fname,
                lname: data.lname
            },
            roleID: data.roleID,
            userName: data.username,
            password: data.password,
            department: department._id
        });
        //res.send(hospitalEmployee);
        hospitalEmployee.save();
        res.send('done');
        return;
    });
}

exports.showDoctorList = function (req, res){
    Department.findOne({name: req.body.department}, function(err, department){
        if(err) console.log(err);
        //res.send(department);
        //return;
        HospitalEmployee.find({
            department: department._id,
            roleID: 2
        }).select('_id').exec(function (err, result){
            var item_list = [];
            for(var i = 0; i < result.length; i++){
                item_list.push(result[0]._id);
            }
            res.send(item_list);
            return;
        });
    });
}
