'use strict'

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

exports.department_name = function(req, res){
    Department.findOne({_id: req.body.departmentID}, function(err, data){
        if(err || !data) return res.send({status: 'fail'});
        return res.send({status: 'success', data: data});
    })
}

exports.getAllEmployee = function(req, res){
    HospitalEmployee.find({},function(err,employees){
        if(err || !employees){
            return res.send({
                status : "fail",
                msg : "error : not found employees"
            });
        }
        res.send({ 'employees':employees});
        return;
    });
}

exports.getAllDoctorInDepartment = function(req, res){
    HospitalEmployee.find({roleID: 2, department: req.body.departmentID}, function(err,data){
        if(err) return res.send({status: "fail"});
        if(!data) return res.send({status: "fail"});
        return res.send(data);
    });
}

exports.getAllDepartment = function(req, res){
    Department.find({},function(err,departments){
        if(err || !departments){
            return res.send({
                status : "fail",
                msg : "error : not found departments"
            });
        }
        res.send({ 'departments':departments});
        return;
    });
}
exports.getAllDepartmentOfDoctor = function(req, res){
    HospitalEmployee.aggregate([
        {  $match: {roleID: 2}  },
        {  $group: {_id: '$department', doctors: {$push: {_id:"$_id",name:"$name"}}}  }
    ]).exec(function(err, populatedDepartment) {
        var departmentIds=[];
		for(let dep of populatedDepartment){
		    departmentIds.push(dep._id);
		}
        Department.find({_id: {'$in':departmentIds}}, function(err, x) {
		    var depMap = {};
		    for(let dep of x) {
		        depMap[dep._id] = dep.name;
		    }
		    for(let index in populatedDepartment) { 
				populatedDepartment[index].dep_name = depMap[populatedDepartment[index]._id];
		    }
    	    res.send({
				'status' : 'success',
				'msg' : '',
				'data': populatedDepartment
			});
		    return;
        });
    });
}

exports.changePassword = function(req,res){
    var data = req.body;
    HospitalEmployee.findOne({
        _id: (data.id)+''
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
        if (err){
            return res.send('error not found');
        };
        data = data.filter(function(doc){
            return doc.appointments.length < 15;
        });
        return res.send({doctorAtTime : data});
    });
}

exports.deleteStaff = function(req,res){
    var data = req.body;
    HospitalEmployee.findOne({
        _id: (data.id)+''
    }).remove().exec();
    res.send("done");
    return;
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

exports.logout = function (req, res, next) {
 
   req.logout();
   res.send(req.user);
 
};
