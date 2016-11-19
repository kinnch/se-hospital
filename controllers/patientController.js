var dbConnection;

exports.setDBConnectionsFromApp = function(app) {

    console.log("users controller setDBConnectionFromApp Started");
    dbConnection = app.get("dbConnection");
}

var Patient = require("../model/patient");
var Schedule = require("../model/schedule");
var HospitalEmployee = require("../model/hospitalEmployee");
var Department = require("../model/department")
var Appointment = require("../model/appointment");
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
        Patient.findOne({HN: data})
        .populate('allegicDrugs')
        .exec( function(err,patient_data){
            if (err){
                    return res.send({status : 'not found'});
                };
            //res.send(patient_data._id);
            Schedule.find({appointments: {$gt: []}}, function(err, data){
                if (err){
                    return res.send({status : 'not found'});
                };
            }).populate({
                path: 'appointments',
                match: {patient: patient_data._id}
            }).populate({
                path: 'doctor',
                populate: {
                    path: 'department'
                } 
            })
            .exec(function (err, data){
                if (err){
                    return res.send({status : 'not found'});
                };
                data = data.filter(function(doc){
                    return doc.appointments.length
                });
                return res.send({
                    patient_data,
                    appoint: data
                });
            });
        });
    }
    else if(data.length == 13){
        Patient.findOne({nationalID: data})
        .populate('allegicDrugs')
        .exec( function(err,patient_data){
            if (err){
                    return res.send({status : 'not found'});
                };
            if (!patient_data){
                    return res.send({status : 'not found'});
                };
            //res.send(patient_data._id);
            Schedule.find({appointments: {$gt: []}}, function(err, data){
                if (err){
                    return res.send({status : 'not found'});
                };
                if (!data){
                    res.send({
                        patient_data
                    });
                };
            }).populate({
                path: 'appointments',
                match: {patient: patient_data._id}
            }).populate({
                path: 'doctor',
                populate: {
                    path: 'department'
                } 
            })
            .exec(function (err, data){
                if (err){
                    return res.send({status : 'not found'});
                };
                if (!data){
                    res.send({
                        patient_data
                    });
                };
                data = data.filter(function(doc){
                    return doc.appointments.length
                });
                return res.send({
                    patient_data,
                    appoint: data
                });
            });
        });
    }
    else return res.send({status : 'not found'});
       return;
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
                },
                nationalID: data.nationalID,
                HN: data.HN
        }), '845792', function (err, user) {
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

