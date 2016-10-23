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

function getDateNow(){
    var this_date = new Date(new Date().getTime() + 7 * 3600 * 1000);
    this_date = new Date(this_date.getFullYear()+'-'+(this_date.getMonth() + 1)+"-"+this_date.getDate());
    return this_date;
}

exports.showAll = function(reg, res){
    Patient.find({},function(err, all_patient){
        Schedule.find({
            date: getDateNow()
        }, function (err,result){
        }).populate('doctor').exec(function(err, data){
            var option = {
                path: 'doctor.department',
                model: 'Department'
            };
            Schedule.populate(data, option, function(err, Schedules){
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
                res.send({appointments:formated_data});
                return;
            });
        });
    });
}

exports.showSomeDoctors = function(reg, res){
    res.send(getAllDoctorInDepartment(reg.body.department));
    Patient.find({},function(err, all_patient){
        Schedule.find({
            doctor: { $in: getAllDoctorInDepartment(reg.body.doctorList)},
            date: getDateNow()
        }, function (err,result){
        }).populate('doctor').exec(function(err, data){
            //res.send(result);
            //return;
            var option = {
                path: 'doctor.department',
                model: 'Department'
            };
            Schedule.populate(data, option, function(err, Schedules){
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

exports.showHistory = function(reg, res){
    Drug.find({}, function(err, all_drug){
    Patient.findOne({HN: reg.body.HN}, function(err, patient){
        Diagnosis.find({patient: patient._id}, function(err, diagnosises){
        }).populate('drugPrescription').exec( function(err, data){
            var aligh_data = [];
            for(var i = 0; i < data.length; i++){
                var drug_list = [];
                //res.send(data[i].drugPrescription.prescription);
                //return;   
                for(var j = 0; j < data[i].drugPrescription.prescription.length; j++){
                    //return;
                    var id = data[i].drugPrescription.prescription[j].drug;
            
                    for(var k = 0; k < all_drug.length; k++){
                        //res.send(all_drug[k]._id);
                        //return;
                        if(all_drug[k]._id+'' == id+''){
                            drug_list.push(all_drug[k]);
                        }
                    }
                }
                aligh_data.push({
                    data: data[i],
                    drug_list: drug_list
                });
            }
                return aligh_data;
            }).then(function(last_data){ res.send({history:last_data}); return; });
        });
    });
    return;
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