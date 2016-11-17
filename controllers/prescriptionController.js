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
var PrescriptionDrug  = require("../model/prescriptionDrug");

function getDateNow(){
    var this_date = new Date(new Date().getTime() + 7 * 3600 * 1000);
    this_date = new Date(this_date.getFullYear()+'-'+(this_date.getMonth() + 1)+"-"+this_date.getDate());
    return this_date;
}

exports.showAll = function(req, res){
    //have to fix '582d28d511121d002c9f34e1'
    Schedule.find({})
    .populate({
        path: 'doctor',
        match: { department: req.body.departmentID }
    })
    .populate('appointments')
    .exec(function(error,data){
        res.send({data: data});
        return;
    });
}

exports.showSomeDoctors = function(reg, res){
    //have to fix 
    Patient.find({},function(err, all_patient){
        Schedule.find({
            doctor: { $in: (reg.body.doctorList)},
            date: getDateNow()
        }, function (err,result){
        }).populate('doctor').exec(function(err, data){
            //res.send(result);
            //return;
            var options = {
                path: 'doctor.department',
                model: 'Department'
            };
            Schedule.populate(data, options, function(err, Schedules){
                var formated_data = [];
                for(var i = 0; i < Schedules.length; i++){
                    var patient_list = [];
                    for(var j = 0; j < Schedules[i].appointments.length; j++){
                        for(var k = 0; k < all_patient.length; k++){
                            if(all_patient[k]._id+'' == Schedules[i].appointments[j].patient+''){
                                patient_list.push(all_patient[k]);
                            }
                        }
                    }
                    var element = {
                        Schedules : Schedules[i],
                        patient_list: patient_list
                    }
                    formated_data.push(element);
                }
                res.send(formated_data);
                return;
            });
        });
    });
}

exports.showHistory = function(req, res){ 
    Patient.findOne({HN: req.body.HN}, function(err, patient){
            Diagnosis.find({patient: patient._id}).populate({
                path: 'drugPrescription',
                populate: {
                    path: 'prescriptions',
                    model: 'PrescriptionDrug',
                    populate: {
                        path: 'drug',
                        model: 'Drug'
                    }
                }
            }).exec( function(err, data){
                res.send(data);
                return;
            });
    });
}

exports.updateStatus = function(reg, res){
    Prescription.findOne({_id: reg.body.id}, function(err, prescription){
        prescription.status = reg.body.status;
        prescription.save(); 
        res.send('done');
    });
    return;
}

exports.changeRequest = function(reg, res){
    Prescription.findOne({_id: reg.body.id}, function(err, prescription){
        prescription.note = reg.body.reason;
        prescription.save();
        res.send('done');
    });
    return;
}

function getDateNow(){
    var this_date = new Date(new Date().getTime() + 7 * 3600 * 1000);
    this_date = new Date(this_date.getFullYear()+'-'+(this_date.getMonth() + 1)+"-"+this_date.getDate());
    return this_date;
}
exports.allPrescription = function(reg, res){
    Diagnosis.find({date: getDateNow() }, function(err, diagnosises){
           res.send(diagnosises); 
    });
}