var dbConnection;

exports.setDBConnectionsFromApp = function(app) {

    console.log("users controller setDBConnectionFromApp Started");
    dbConnection = app.get("dbConnection");
}

var Patient = require("../model/patient");
var Schedule = require("../model/schedule");
var HospitalEmployee = require("../model/hospitalEmployee");

exports.testing = function(req, res) {
    var patient2 = new Patient();
    patient2.name.fname = 'TohOHOH';
    patient2.save();
    console.log("patientCC controller Started");
    res.send('SAVED');
}

exports.search = function(req, res){
    var data = (req.body.data);
    if(data.length == 8){
        Patient.findOne({HN: data}, function (err, patient) {
            if (err) return console.error(err);
        }).populate('allegicDrugs').exec(function(error, patient) {
            patient.name.fname = patient.name.fname + "A";
            return patient;
            //console.log(patient);
        }).then( function(patientdata){
            //res.send(patientdata);
            Schedule.find({}, function (err, patient) {
                if (err) return console.error(err);
             }).populate('doctor').exec(function (err, Schedules) {
                    var all_schedules = [];
                    for(var i = 0; i < Schedules.length; i++){
                        for(var j = 0; j < Schedules[i].appointments.length; j++){
                            console.log(Schedules[i].appointments[j].patient);
                            console.log(patientdata._id);
                            if(Schedules[i].appointments[j].patient.equals(patientdata._id)){
                                all_schedules.push(Schedules[i]);
                                break;
                            }
                        }
                    }
                    var patient_aligh_data = {
                        patientInfo: patientdata,
                        Schedule: all_schedules
                    };
                    res.send(patient_aligh_data);
                }
            );

            /*
            Schedule.find({},{
                "appointments": [{patient: patientdata._id}]
            },function (err, Schedule) {
                if (err) return console.error(err);
                patientdata.hello = 'YO';
                res.send(Schedule);
            })
            */
        });
        /*
        .then(function (patient){
            console.log(patient);
            res.send(bands);
        });
        */
    }
    else if(data.length == 13){
        Patient.findOne({nationalID: data}, function (err, patient) {
            if (err) return console.error(err);
        }).populate('allegicDrugs').exec(function(error, patient) {
            //patient.name.fname = patient.name.fname + "A";
            return patient;
            //console.log(patient);
        }).then( function(patient){
            res.send(patient);
        });
    }
    else res.send(null);
}