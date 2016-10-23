var dbConnection;

exports.setDBConnectionsFromApp = function(app) {

    console.log("users controller setDBConnectionFromApp Started");
    dbConnection = app.get("dbConnection");
}

var Prescription = require("../model/drugPrescription");
var Department = require("../model/department");
var HospitalEmployee = require("../model/hospitalEmployee");
var Schedule = require("../model/schedule");

exports.showForPharma = function(reg, res){
    var data = (reg.body.department);
    Department.findOne({
        name: data
    }, function(err, department){
        if (err) return console.error(err);
        if(department == null){
            if(data == 'ทั้งหมด'){
                res.send('DONE');
            }
        }
        else{
            res.send('OH');
        }
    });
    return;
}

exports.showInDepartment = function(reg, res){
    var data = (reg.body.department);
    if(data != 'ทั้งหมด')
    Department.findOne({
        name: data
    }, function(err, department){
        if (err) return console.error(err);
        if(department != null){
            HospitalEmployee.find({
                department: department._id,
                roleID: 2
            }, function(err, doctors){
                if(err) console.log(err);
                //res.send(doctors[0]._id);
                
                schedule_list = [];
                for(var i = 0; i < doctors; i++){
                    //schedule_list.push(doctors[i]._id);
                    Schedule.find({doctor: doctors[i]._id},function(err, schedule){
                        if(err) console.log(err);
                        schedule_list.push(schedule);
                    });
                }
                return schedule_list;
                //res.send(schedule_list);
            
            }).then(function(schedules){
                res.send(schedules);
                return;
            });
        }
        else{
            res.send('fail: department name is invalid')
        }
        return;
    });
    else{

    }
    return;
}