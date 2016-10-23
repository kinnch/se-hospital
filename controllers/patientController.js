var dbConnection;

exports.setDBConnectionsFromApp = function(app) {

    console.log("users controller setDBConnectionFromApp Started");
    dbConnection = app.get("dbConnection");
}

var Patient = require("../model/patient");
var Schedule = require("../model/schedule");
var HospitalEmployee = require("../model/hospitalEmployee");
var Department = require("../model/department");


exports.testing = function(req, res) {
    var patient2 = new Patient();
    patient2.name.fname = 'TohOHOH';
    patient2.save();
    console.log("patientCC controller Started");
    res.send('SAVED');
}

exports.search = function(req, res){
    var data = (req.body.key) + '';
    if(data.length == 8){
        Patient.findOne({HN: data}, function (err, patient) {
            if (err) return console.error(err);
        }).populate('allegicDrugs').exec(function(error, patient) {
            return patient;
        }).then(function (patientdata){
            Schedule.find({}, function (err, patient) {
                if (err) return console.error(err);
             }).populate('doctor').exec(function (err, data) {
                    
                    var option = {
                        path: 'doctor.department',
                        model: 'Department'
                    };
                    Schedule.populate(data, option, function(err, Schedules){
                    var all_schedules = [];
                    for(var i = 0; i < Schedules.length; i++){
                        for(var j = 0; j < Schedules[i].appointments.length; j++){
                            if(Schedules[i].appointments[j].patient.equals(patientdata._id)){
                                all_schedules.push(Schedules[i]);
                            }
                        }
                    }
                    var patient_aligh_data = {
                        patientdata,
                        Schedule: all_schedules,
                    };
                    res.send(patient_aligh_data);
                    return;
                    })
                }
            );
        });
    }
    else if(data.length == 13){
        Patient.findOne({nationalID: data}, function (err, patient) {
            if (err) return console.error(err);
        }).populate('allegicDrugs').exec(function(error, patient) {
            return patient;
        }).then(function (patientdata){
            Schedule.find({}, function (err, patient) {
                if (err) return console.error(err);
             }).populate('doctor').exec(function (err, data) {
                    
                    var option = {
                        path: 'doctor.department',
                        model: 'Department'
                    };
                    Schedule.populate(data, option, function(err, Schedules){
                    var all_schedules = [];
                    for(var i = 0; i < Schedules.length; i++){
                        for(var j = 0; j < Schedules[i].appointments.length; j++){
                            if(Schedules[i].appointments[j].patient.equals(patientdata._id)){
                                all_schedules.push(Schedules[i]);
                            }
                        }
                    }
                    var patient_aligh_data = {
                        patientdata,
                        Schedule: all_schedules,
                    };
                    res.send(patient_aligh_data);
                    return;
                    })
                }
            );
        });
    }
    else res.send(null);
    return;
}