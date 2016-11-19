'use strict'

var dbConnection;

exports.setDBConnectionsFromApp = function(app) {
    console.log("users controller setDBConnectionFromApp Started");
    dbConnection = app.get("dbConnection");
}

function getDateNow(){
    var this_date = new Date(new Date().getTime());
    this_date = new Date(this_date.getFullYear()+'-'+(this_date.getMonth() + 1)+"-"+this_date.getDate());
    return this_date;
}

var Schedule = require("../model/schedule");
var Department = require("../model/department");
var HospitalEmployee = require("../model/hospitalEmployee");

exports.getTable = function(reg, res){
    //res.send(getDateNow());
    Department.find({
        name: reg.body.department
    }, function(err, department){
        HospitalEmployee.find({department: department._id}, function(err, doctors){
            return doctors;
        });
    }).then(function (doctors){
        Schedule.aggregate([
        {
            $group: { 
                _id: {
                    period: "$timePeriod",
                    date: "$date"
                }, //$region is the column name in collection
                doctors: {$sum: 1},
                patients: {$sum: { $size: "$appointments" }}
            }
        }],
        function(err,result) {
            res.send(result)
        // Result is an array of documents
        });
    })
    //res.send(getDateNow());
    return; 
}

exports.getDoctorSchedule = function(req, res) {
    let doctorID = req.body.doctor_id; 
    Schedule.find({doctor:doctorID}).populate("doctor").exec(function(err, r) {
		res.send(r);
		return;
    });
}
