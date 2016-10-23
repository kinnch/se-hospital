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

exports.showAll = function(reg, res){
    Patient.find({},function(err, all_patient){
        Schedule.find({
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

exports.showInDepartment = function(reg, res){

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
            }).then(function(last_data){ res.send(last_data); return; });
        });
    });
    return;
}