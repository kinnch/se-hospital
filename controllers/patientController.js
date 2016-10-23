var dbConnection;

exports.setDBConnectionsFromApp = function(app) {

    console.log("users controller setDBConnectionFromApp Started");
    dbConnection = app.get("dbConnection");
}

var Patient = require("../model/patient");
var Schedule = require("../model/schedule");
var HospitalEmployee = require("../model/hospitalEmployee");
var Department = require("../model/department")
var timeLimit = 15;

var checkTimeExceedOtp = function(tel){
      Patient.findOne({tel: tel}, function (err, patient) {
          if(patient == null || err) return true;
          var current = new Date();
          var generated = new Date(patient.OTP.generatedDate);
          var timediff =  Math.abs(current.getTime() - generated.getTime());
          timediff = Math.ceil(timediff / (1000*60) );
          console.log(timediff > timeLimit);
          if(timediff > timeLimit ) return true;
          return false;
      });
}

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
}

exports.login = function (req, res, next) {

    Patient.authenticate('patient')(req.body.username , req.body.password, function (err, user, options) {
        if (err) return next(err);
        if (user === false) {
            res.send({
                message: options.message,
                success: false
            });
        } else {
                // checkTimeExceedOtp
              Patient.findOne({tel: req.body.username}, function (err, patient) {
                    if(patient != null && !err){
                        var current = new Date();
                        var generated = new Date(patient.OTP.generatedDate);
                        var timediff =  Math.abs(current.getTime() - generated.getTime());
                        timediff = Math.ceil(timediff / (1000*60) );
                        console.log(timediff > timeLimit);
                        if(timediff <= timeLimit ){
                            console.log("okayy")
                            req.login(user, function (err) {
                                res.send({
                                    success: true,
                                    user: user
                                });
                            });
                        }else{
                            // Time Limit Exceed
                            res.send({
                                message: "Time limit exceed",
                                success: false
                            });
                        }
                    } 
                });
        }
    });
 
};

exports.register = function (req, res) {
    var data = req.body;
        Patient.register(new Patient({
            name: {
                    title: data.title,
                    fname: data.fname,
                    lname: data.lname
                },
                sex: data.sex,
                tel: data.tel,
                OTP: {
                    text: "NOTUSE",
                    generatedDate: new Date()
                }
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