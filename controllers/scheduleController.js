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
var Appointment = require("../model/appointment");

exports.getTable = function(reg, res){
    //res.send(getDateNow());
    //return res.send(reg.body.department);
    Department.findOne({name: reg.body.department}, function(err, department){
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
        }],function(err,result) {
            Schedule.find({doctor: reg.body.doctorID}, function(err, data){
                return res.send({
                    table: result,
                    thisdoctor: data
                });
            });
        });
    });
};
    

exports.deleteAppointment = function(req, res){
     Appointment.remove({_id:req.body.appointmentID }, function(err,data){
         if(err) return res.send("Fail");
         Schedule.update( {appointments: req.body.appointmentID}, 
         { $pullAll: {appointments: [req.body.appointmentID]}},
         function(err,data){
             if(err) return res.send("Fail");
             return res.send("Success");
         })
     });
};

exports.getDoctorSchedule = function(req, res) {
    let doctorID = req.body.doctor_id; 
    Schedule.find({doctor:doctorID}).populate("doctor").exec(function(err, r) {
		res.send(r);
		return;
    });
};
