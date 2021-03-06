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
var Drug2 = require("../model/drug2");
var PrescriptionDrug  = require("../model/prescriptionDrug");

function getDateNow(){
    var this_date = new Date(new Date().getTime() + 7 * 3600 * 1000);
    this_date = new Date(this_date.getFullYear()+'-'+(this_date.getMonth() + 1)+"-"+this_date.getDate());
    return this_date;
}


exports.showSomeDoctors = function(reg, res){
    //have to fix ***
    //Patient
    Schedule.find({
        doctor: { $in: (reg.body.doctorList)},
        date: getDateNow()
    }).populate('doctor')
    .populate({
        path: 'appointments',
        populate: {
            path: 'patient'
        }
    }).exec(function (err, data){
        if(err) return res.send({status: 'not found'});
        if(!data) return res.send({status: 'not found'});
        return res.send(data);
    });
    /*
    Patient.find({},function(err, all_patient){
        Schedule.find({
            doctor: { $in: (reg.body.doctorList)},
            date: getDateNow()
        }, function (err,result){
        }).populate('doctor').exec(function(err, data){
            if (err) return res.send({status : 'not found'});
            if (!data)return res.send({status : 'not found'});
            var options = {
                path: 'doctor.department',
                model: 'Department'
            };
            Schedule.populate(data, options, function(err, Schedules){
                if (err) return res.send({status : 'not found'});
                if (!Schedules)return res.send({status : 'not found'});
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
    */
}

exports.showHistory = function(req, res){ 
    Patient.findOne({HN: req.body.HN}, function(err, patient){
            Diagnosis.find({patient: patient._id}, 'drugPrescription date').populate({
                path: 'drugPrescription',
                populate: {
                    path: 'prescriptions',
                    model: 'PrescriptionDrug',
                    populate: {
                        path: 'drug',
                        model: 'Drug',
                        select: 'name'
                    }
                }
            }) .sort({date: -1})
            .exec( function(err, data){
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

exports.requestChange = function(req, res){
    Prescription.findOne({_id: req.body.prescriptionID}, function(err, prescription){
        if(prescription.status != 1){
            return res.send({
                status : "fail",
                msg : "prescription status not equal to 1"
            });
        }
        prescription.note = req.body.reason;
        prescription.status = 0;
        prescription.inspectedBy = req.body.pharmaID;
        prescription.save();
        res.send({
                status : "success",
                msg : ""
            });
    });
    return;
}

function getDateNow(){
    var this_date = new Date(new Date().getTime() + 7 * 3600 * 1000);
    this_date = new Date(this_date.getFullYear()+'-'+(this_date.getMonth() + 1)+"-"+this_date.getDate());
    return this_date;
}

//done
exports.allPrescription = function(reg, res){
    Diagnosis.find({date: getDateNow()}).populate({
        path: 'drugPrescription',
        populate: {
            path: 'prescriptions',
            model: 'PrescriptionDrug',
            populate: {
                path: 'drug',
                model: 'Drug',
                select: 'name'
            }
        }
    }).populate({
        path: 'patient',
        select: 'name sex birthDate allegicDrugs bloodType HN',
        populate: {
            path: 'allegicDrugs',
            model: 'Drug2'
        }
    }).populate({
        path: 'doctor',
        select: 'name'
    }).exec( function(err, data){
        res.send(data);
        return;
    });
}

exports.rejectedPrescription = function(req, res){
    HospitalEmployee.findOne({_id: req.body.doctorID}, function(err, doctor){
         Diagnosis.find({doctor: doctor}).populate({
             path: 'drugPrescription',
             match: { status: {$in: 0}},
             populate: {
                path: 'prescriptions',
                model: 'PrescriptionDrug',
                populate: {
                    path: 'drug',
                    model: 'Drug',
                    select: 'name'
                }
            }
        }).populate({
            path: 'patient',
            select: 'name sex birthDate allegicDrugs bloodType HN',
            populate: {
                path: 'allegicDrugs',
                model: 'Drug2'
            }
        }).populate({
            path: 'doctor',
            select: 'name'
        }).populate({
            path: 'disease'
        })
        .exec( function(err, data){
            var item_list = [];
            for(var i = 0; i < data.length; i++){
                if(data[i].drugPrescription != null){
                    item_list.push(data[i]);
                }
            }
            res.send(item_list);
            return;
        })
    });
}
// requestDone [Phar]
// input : pharmacistID, prescriptionID
// 2 -> 3
exports.requestDone = function(reg, res){
    Prescription.findOne({_id: reg.body.prescriptionID}, function(err, prescription){
        if(prescription.status != 2){
            return res.send({
                status : "fail",
                msg : "prescription status not equal to 2. it must have been apporved by Phara"
            });
        }
        prescription.status = 3;
        prescription.save(); 
        res.send({
                status : "success",
                msg : ""
            });
    });
    return;
}

exports.requestApprove = function(reg, res){
    Prescription.findOne({_id: reg.body.prescriptionID}, function(err, prescription){
        if(prescription.status != 1){
            return res.send({
                status : "fail",
                msg : "prescription status not equal to 1"
            });
        }
        prescription.status = 2;
        prescription.save(); 
        res.send({
                status : "success",
                msg : ""
            });
    });
    return;
}

function createAll(k, ids){
    if(k.length == 0) return ids;
    var top = k.pop();
    var item = new PrescriptionDrug(top);
    item.save();
    ids.push(item._id);
    return createAll(k,ids);
}

exports.makeChange = function(req, res){
    Prescription.findOne({_id: req.body.prescriptionID}, function(err,prescrition){
        PrescriptionDrug.remove({_id: {$in:prescrition.prescriptions} }, function(err,data){
            Prescription.update({_id: req.body.prescriptionID},
            {status: 1, prescriptions: createAll(req.body.newPrescription,[])},
            function(err,data){
                if(err) return res.send({status: "fail"});
                return res.send({status: "success"});
            });
        });
    });
}


exports.getPrescription = function(req, res){
    Prescription.findOne({_id: req.body.prescriptionID}).populate({
        path: 'prescriptions',
        populate: {
            path: 'drug',
            model: 'Drug',
            select: 'name'
        }
    }).exec( function(err, data){
           res.send(data);
            return;
        })
}

exports.getAllDrugs = function(req, res){
    Drug.find({},function(err,drugs){
        res.send({
            status: 'success',
            msg: drugs
        });
        return;
    });
}

exports.getAllDrugs2 = function(req, res){
    Drug2.find({},function(err,drugs){
        res.send({
            status: 'success',
            msg: drugs
        });
        return;
    });
}