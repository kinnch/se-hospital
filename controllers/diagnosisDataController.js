var dbConnection;

exports.setDBConnectionsFromApp = function(app) {

    console.log("users controller setDBConnectionFromApp Started");
    dbConnection = app.get("dbConnection");
}

var Diagnosis = require("../model/diagnosis");
var Patient = require("../model/patient");
var HospitalEmployee = require("../model/hospitalEmployee");
var Drug = require("../model/drug");
var Disease = require("../model/disease");
var Prescription = require("../model/drugPrescription");
var PrescriptionDrug  = require("../model/prescriptionDrug");
var PhysicalData = require("../model/physicalChecking");
var Disease = require("../model/disease");
exports.getAllDiseases = function(req,res){
    Disease.find({},function(err,data){
        if(err){
            return res.send({status:"error"});
        }
        if(!data){
            return res.send({status:"not found"});
        }
        return res.send({diseases:data});
    });
    return ;
}
exports.getDiagnosisAndPhysicalCheck = function(req,res){
    Diagnosis.findOne({_id:req.body.diagnosisID},function(err,data){
        if(err){
            res.send({status:"error"});
        }
        if(!data){
            res.send({status:"not found"});
        }
        // res.send({result:data});  
    })
    .populate({
        path: 'drugPrescription',
        populate:{
            path: 'prescriptions',
            populate:{
                path:'drug'
            }
        }
    })
    .populate('disease')
    .exec(function(err,data){
        if(err){
            res.send({status:"error"});
        }
        if(!data){
            res.send({status:"not found"});
        }
        PhysicalData.findOne({
            patient:data.patient,
            timePeriod: data.timePeriod,
            date: {"$gte": new Date(data.date),
                $lt:new Date(new Date(data.date).getTime() + 24 * 3600 * 1000)},
            },function(err,data2){
                res.send({diagnosis:data,physical:data2});
            })
    });
}
exports.getPatientDiagnosisHistory = function(req,res){
    Diagnosis.find({patient:req.body.id},function(err,data){
        if(err){
            res.send({status:"not found"});
        }
        // res.send({diagnosisHistory: data});
    })
    .populate('doctor')
    .populate({ 
        path: 'drugPrescription',
        populate: {
            path: 'prescriptions',
            populate:{
                path: 'drug'
            }
        } 
    })
    .populate({
        path: 'disease'
    })
    .exec( function(err, data){
        if(err){
            res.send({status:"not found"});
        }
        res.send({diagnosisHistory: data});
    });
}

// exports.add = function(req, res){
//     //return req;
//     var data = (req.body);
//     //res.send(data);
//     //mock AUTH
//     var doctor_id = "580bacaf7f4d291550f67adb";  //edit value
//     var noProblem = true;
//     var nowDate = new Date();
//     var diseases = []
//     //........diseases


//      HospitalEmployee.findOne({_id: doctor_id}, function (err, doctor){
//         if (err) return console.error(err);
//         if (doctor==null) noProblem=false; 
//         return doctor;
//     }).then(function(doctor){
//         if(!noProblem) return null;

//     });
//     HospitalEmployee.findOne({_id: doctor_id}, function (err, doctor){
//         if (err) return console.error(err);
//         return doctor;
//     }).then(function(doctor){
//         isRealDoctor = true;
//     });

//     {
//         var newData = new Diagnosis({
//             drugPrescription: data.drugPrescription,
//         patient: data.patient,
//         doctor: data.doctor,
//         timePeriod: nowDate....,
//         date: nowDate,
//         detail: data.detail,
//         disease:  diseases
//         })
//     }
    
    
//     .then(function (nurse){
//         //res.send(nurse);
//         Patient.findOne({HN: data.HN}, function(err, patient){
//             var newData = new PhysicalData({
//                 bloodPresure: {
//                     systolic: data.systolic,
//                     diastolic: data.diastolic
//                 },
//                 heartRate: data.heartRate,
//                 weight: data.weight,
//                 height: data.height,
//                 temp: data.temp,
//                 patient: patient._id,
//                 nurse: nurse_id
//             });
//             newData.save();
//             res.send('done');
//             return;
//         })
//     });
// }

function createAll(k, ids){
    if(k.length == 0) return ids;
    var top = k.pop();
    var item = new PrescriptionDrug(top);
    item.save();
    ids.push(item._id);
    return createAll(k,ids);
}

exports.create = function(req, res){
    //return res.send('Hello');
    var prescription = new Prescription();
    prescription.status = 1;
    prescription.prescriptions = createAll(req.body.drugList, []);
    prescription.save();
    //return res.send(prescription);
    var diagnose = new Diagnosis();
    diagnose.drugPrescription = prescription._id;
    diagnose.patient = req.body.patientID;
    diagnose.doctor =  request.user._id; //mock
    diagnose.timePeriod =  req.body.timePeriod;
    diagnose.date = req.body.date;
    diagnose.detail = req.body.detail;
    diagnose.disease = req.body.diseaseIDs;
    diagnose.save();

    return res.send({status: 'Success'});
};

exports.diagnosisHistory = function(req, res){
    //TODO have to fix ?
    Drug.find({}, function(err, all_drug){
    Patient.findOne({HN: req.body.HN}, function(err, patient){
        Diagnosis.find({}, function(err, diagnosises){
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
                    info: data[i],
                    drug_list: drug_list
                })
                Patient.findOne({_id : data[i].patient}, function(req, p_detail){
                    var p_data = {
                        name: p_detail.name,
                        HN : p_detail.HN,
                        birthDate : p_detail.birthDate,
                        sex : p_detail.sex
                    };     
                    var data = {
                        info : aligh_data[0].info,
                        patient_detail: p_data,
                        drug_list: aligh_data[0].drug_list
                    }

                    HospitalEmployee.findOne({_id: data.info.doctor}, function(req, d_detail){
                        var d_data = {
                            name: d_detail.name,
                            department: d_detail.department
                        }
                        
                        var dis = []
                        for(var i = 0; i < data.info.disease.length ; i++) {
                            Disease.findOne({_id:data.info.disease[i]}, function(req,dise){
                                dis.push(dise);
                                res.send(dise);
                                return;
                            });
                        }
                        var diagnosis = {
                            info : data.info,
                            patient_detail : data.patient_detail,
                            docter_detail : d_data,
                            drug_list : data.drug_list,
                            disease_list : dis
                        }

                        //res.send(diagnosis);
                    });    
                }); 
               
            }
    
            });
        });
    });
    return;
}