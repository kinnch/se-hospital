var dbConnection;

exports.setDBConnectionsFromApp = function(app) {

    console.log("users controller setDBConnectionFromApp Started");
    dbConnection = app.get("dbConnection");
}

var PhysicalData = require("../model/physicalChecking");
var HospitalEmployee = require("../model/hospitalEmployee");
var Patient = require("../model/patient");

exports.add = function(req, res){
    //return req;
    var data = (req.body);
    //res.send(data);
    //mock AUTH
    var nurse_id = "580bacaf7f4d291550f67adb";
    HospitalEmployee.findOne({_id: nurse_id}, function (err, nurse){
        if (err) return console.error(err);
        return nurse;
    }).then(function (nurse){
        //res.send(nurse);
        Patient.findOne({HN: data.HN}, function(err, patient){
            var newData = new PhysicalData({
                bloodPresure: {
                    systolic: data.systolic,
                    diastolic: data.diastolic
                },
                heartRate: data.heartRate,
                weight: data.weight,
                height: data.height,
                temp: data.temp,
                patient: patient._id,
                nurse: nurse_id,
                date: new Date()
            });
            newData.save();
            res.send('done');
            return;
        })
    });
}

exports.showHistory = function(req, res){
    Patient.findOne({HN: req.body.HN}, (err,patient)=>{
        PhysicalData.find({patient: patient._id})
                    .sort({date: 1}).exec((err,all_physical_check)=>{
                        res.send({'physical_check':all_physical_check})
                        return;
                    });
    });
}