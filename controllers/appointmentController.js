var dbConnection;

exports.setDBConnectionsFromApp = function(app) {

    console.log("users controller setDBConnectionFromApp Started");
    dbConnection = app.get("dbConnection");
}

var mongoose = require('mongoose');

var Prescription = require("../model/drugPrescription");
var Department = require("../model/department");
var HospitalEmployee = require("../model/hospitalEmployee");
var Schedule = require("../model/schedule");
var Diagnosis = require("../model/diagnosis");
var Patient = require("../model/patient");
var Drug = require("../model/drug");
exports.getAppointmentByTime = function(req, res){
    if(req.body.departmentID != ''){
        Schedule.find({
            date : {"$gte": new Date(req.body.date),
                    $lt:new Date(new Date(req.body.date).getTime() + 24 * 3600 * 1000)},
            timePeriod : req.body.timePeriod
        })
        .populate({
            path: 'doctor',
            match: { 
                department: req.body.departmentID
            }
        })
        .populate({
            path: 'appointments'
        })
        .exec(function(error,data){
            data = data.filter(function(doc){
                return doc.doctor != null;
            });
            res.send({data: data});
            return;
        });
    }else{
        Schedule.find({
            date : {"$gte": new Date(req.body.date),
                    $lt:new Date(new Date(req.body.date).getTime() + 24 * 3600 * 1000)},
            timePeriod : req.body.timePeriod
        })
        .populate({
            path: 'doctor',
        })
        .populate({
            path: 'appointments',
            populate: {
                path: 'patient',
            }
        })
        .exec(function(error,data){
            res.send({scheduleList: data});
            return;
        });
    }
    
}