var dbConnection;

exports.setDBConnectionsFromApp = function(app) {

    console.log("users controller setDBConnectionFromApp Started");
    dbConnection = app.get("dbConnection");
}

var Diagnosis = require("../model/diagnosis");

exports.add = function(req, res){
    //return req;
    var data = (req.body);
    //res.send(data);
    //mock AUTH
    var doctor_id = "580bacaf7f4d291550f67adb";  //edit value
    var noProblem = true;
    var nowDate = new Date();
    var diseases = []
    //........diseases


     HospitalEmployee.findOne({_id: doctor_id}, function (err, doctor){
        if (err) return console.error(err);
        if (doctor==null) noProblem=false; 
        return doctor;
    }).then(function(doctor){
        if(!noProblem) return null;

    });
    HospitalEmployee.findOne({_id: doctor_id}, function (err, doctor){
        if (err) return console.error(err);
        return doctor;
    }).then(function(doctor){
        isRealDoctor = true;
    });

    {
        var newData = new Diagnosis({
            drugPrescription: data.drugPrescription,
        patient: data.patient,
        doctor: data.doctor,
        timePeriod: nowDate....,
        date: nowDate,
        detail: data.detail,
        disease:  diseases
        })
    }
    
    
    .then(function (nurse){
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
                nurse: nurse_id
            });
            newData.save();
            res.send('done');
        })
    });
}