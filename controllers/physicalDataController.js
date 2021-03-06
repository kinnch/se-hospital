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
    var nurse_id = req.user._id,
        physical_id = data.physicalId;
        hn = data.HN;
    if(req.user.roleID != 3){
        return res.send({
                status : "fail",
                msg : "error : user is not nurse"
            });
    }
    HospitalEmployee.findOne({_id: nurse_id}, function (err, nurse){
        if(err || !nurse){
            return res.send({
                status : "fail",
                msg : "error : not found nurse"
            });
        }
        return nurse;
    }).then(function (nurse){
        //res.send(nurse);
        Patient.findOne({HN: data.HN}, function(err, patient){
            if(err || !patient){
                return res.send({
                    status : "fail",
                    msg : "error : not found patient"
                });
            }
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
            res.send({
                status : "success",
                msg : ""
            });
            return;
        })
    });
}

exports.showHistory = function(req, res){
    Patient.findOne({HN: req.body.HN}, (err,patient)=>{
        if(err || !patient){
            return res.send({
                status : "fail",
                msg : "error : not found patient"
            });
        }
        PhysicalData.find({patient: patient._id})
                    .sort({date: -1}).exec((err,all_physical_check)=>{
                        if(err || !all_physical_check){
                            return res.send({
                                status : "fail",
                                msg : "error : not found physicalCheckData"
                            });
                        }
                        res.send({'physical_check':all_physical_check})
                        return;
                    });
    });
}

exports.editPhysicalCheck = function(req, res){
    var data = (req.body);
    var nurse_id = req.user._id,
        physical_id = data.physicalId;
        hn = data.HN;
    if(req.user.roleID != 3){
        return res.send({
                status : "fail",
                msg : "error : user is not nurse"
            });
    }
    Patient.findOne({HN: hn},function(err,patient){
        if(err || !patient){
            return res.send({
                status : "fail",
                msg : "error : not found patient"
            });
        }
        var patient_id = patient._id;
        PhysicalData.find({patient: patient_id})
                    .sort({date: -1}).exec((err,all_physical_check)=>{
                        if(err || !all_physical_check){
                            return res.send({
                                status : "fail",
                                msg : "error : not found physicalCheckData"
                            });
                        }
                        all_physical_check[0].bloodPresure.systolic = data.systolic;
                        all_physical_check[0].bloodPresure.diastolic = data.diastolic;
                        all_physical_check[0].heartRate = data.heartRate;
                        all_physical_check[0].weight = data.weight;
                        all_physical_check[0].height = data.height;
                        all_physical_check[0].temp = data.temp;
                        all_physical_check[0].nurse = nurse_id;
                        all_physical_check[0].date = new Date();
                        all_physical_check[0].save();
                        res.send({
                                status : "success",
                                msg : ""
                            });
                        return;
                    });
    })
}

