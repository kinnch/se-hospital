'use strict'

var dbConnection;

exports.setDBConnectionsFromApp = function(app) {
    console.log("users controller setDBConnectionFromApp Started");
    dbConnection = app.get("dbConnection");
}

function getDateNow(){
    var this_date = new Date(new Date().getTime());
    this_date = new Date(this_date.getFullYear()+'-'+(this_date.getMonth() + 1)+"-"+this_date.getDate());
    return this_date;
}

var Schedule = require("../model/schedule");
var Department = require("../model/department");
var HospitalEmployee = require("../model/hospitalEmployee");
var Appointment = require("../model/appointment");

var notificationController = require('../controllers/notificationController');

function recursiveCSV(data){
    //if(data.length == 0) return {status: 'success'};
    var top = data.pop();
    //return top;
    // insert code here!
    HospitalEmployee.find({
            // roleID:2, 
            // 'name.fname':top.doctor_fname, 
            // 'name.lname':top.doctor_lname
            }, function (err,dr){
            if(err) return {status: 'fail'};
            if(dr == null) return {status: 'fail'};
            return res.send(dr);
            Schedule.find({doctor: top._id, 
                date: {"$gte": new Date(top.date),
                $lt:new Date(new Date(top.date).getTime() + 24 * 3600 * 1000)},
                timePeriod: top.timePeriod}, function(err,schedule){
                if(err) return {status: 'fail'};
                return res.send(schedule);
                if(schedule == null){
                    /*
                    sche = new Schedule({
                        date: schedule.date,
                        timePeriod: schedule.timePeriod,
                        doctor: dr._id,
                        appointments: []
                    });
                    sche.save();
                    */
                    //return 'HELLo';
                    return recursiveCSV(data);
                }
                else{
                    return recursiveCSV(data);
                }
            })
        });
}
exports.importCSV = function(req,res){
    //var arr = req.body.data;
     HospitalEmployee.findOne({
            roleID:2, 
            'name.fname': req.body.data.doctor_fname, 
            'name.lname': req.body.data.doctor_lname
            }, function (err,dr){
            if(err) return res.send({status: 'fail1'});
            if(dr == null) return res.send({status: 'fail2'});
            Schedule.findOne({doctor: dr._id, 
                date: {"$gte": new Date(req.body.data.date),
                $lt:new Date(new Date(req.body.data.date).getTime() + 24 * 3600 * 1000)},
                timePeriod: req.body.data.timePeriod}, function(err,schedule){
                if(err) return res.send({status: 'fail3'});
                //return res.send(schedule);
                if(schedule == null){
                    var sche = new Schedule({
                        date: req.body.data.date,
                        timePeriod: req.body.data.timePeriod,
                        doctor: dr._id,
                        appointments: []
                    });
                    //return res.send(sche);
                    sche.save();
                    return res.send({status: 'success', msg: 'saved'})
                }
                else{
                    return res.send({status: 'success', msg: 'already have'})
                }
            })
        });
}
exports.getTable = function(reg, res){
    Department.findOne({name: reg.body.department}, function(err, department){
        Schedule.aggregate([{
            $group: { 
                _id: {
                    period: "$timePeriod",
                    date: "$date"
                }, //$region is the column name in collection
                doctors: {$sum: 1},
                patients: {$sum: { $size: "$appointments" }}
            }
        }],function(err,result) {
            Schedule.find({doctor: reg.body.doctorID}).
            populate({
                path: "appointments", 
                populate: {
                    path: "patient"
                }
            }).exec(function(err, data){
                return res.send({
                    table: result,
                    thisdoctor: data
                });
            });
        });
    });
};

exports.getTableStaff = function(req, res){
   // return res.send(req.body.departmentID);
    HospitalEmployee.find({roleID: 2, department: req.body.departmentID}, function(err, staffs){
        var arr = [];
        for(var i = 0; i < staffs.length; i++){
            arr.push(staffs[i]._id);
        }
        Schedule.find({doctor: {$in:arr}}).populate('doctor')
        .exec(function(err,data){
            return res.send({table: data, limitDocs: 10});
        });
        //return res.send(arr);
    }).select('_id');
};
    

exports.deleteAppointment = function(req, res){
     Appointment.remove({_id:req.body.appointmentID }, function(err,data){
         if(err) return res.send({status: "Fail"});
         Schedule.update( {appointments: req.body.appointmentID}, 
         { $pullAll: {appointments: [req.body.appointmentID]}},
         function(err,data){
             if(err) return res.send({status : "Fail"});
             return res.send({status : "Success"});
         })
     });
};

exports.changeAppointmentState = function(req, res){
    //return res.send(req.body);
    Appointment.update({_id:req.body.appointmentID},
        {status: req.body.newState},
        function(err,data){
            if(err) return res.send({status : "fail"});
            return res.send({status : "success"});
        });
};


exports.listAll = function(req, res){
    Schedule.find({}).sort({date: 1, timePeriod: 1}).populate({
        path:'doctor',
        match: {department: req.body.departmentID}
    }).exec(function(err,result){
        if(err) return res.send({status: 'Fail'});
        if(!result) return res.send({status: 'Fail'});
        result = result.filter(function(doc){
            return doc.doctor != null
        });
        result = result.filter(function(doc){
            if(res.user != null && req.body.isWalkIn) return doc.appointments.length < 20;
            //if(req.body.isWalkIn) return doc.appointments.length < 20;
            return doc.appointments.length < 15;
        });
        return res.send({status: 'Success', data: result});
    });
}


exports.getDoctorSchedule = function(req, res) {
    let doctorID = req.body.doctor_id; 
    Schedule.find({doctor:doctorID}).sort({date: 1, timePeriod: 1}).populate("doctor").exec(function(err, result) {
		if(err) return res.send({status: 'Fail'});
        if(!result) return res.send({status: 'Fail'});
        result = result.filter(function(doc){
            if(res.user != null && req.body.isWalkIn) return doc.appointments.length < 20;
            //if(req.body.isWalkIn) return doc.appointments.length < 20;
            return doc.appointments.length < 15;
        });
		res.send({
			'status': 'Success',
			'msg': '',
			'data': result
		});
		return;
	});
};

exports.search = function(req, res){
    Schedule.findOne({
        doctor: req.body.doctorID, 
        timePeriod: req.body.timePeriod,
        date: {"$gte": new Date(req.body.date),
                $lt:new Date(new Date(req.body.date).getTime() + 24 * 3600 * 1000)}
    }, function(err, oldSchedule){
        if(err) res.send({status: 'fail'});
        if(!oldSchedule) res.send({status: 'fail'});
        return res.send(oldSchedule);
    });
};

exports.delete = function(req, res){
     Schedule.findOne({_id: req.body.scheduleID}).remove().exec(function (err,data){
         if(err) return res.send({status: 'fail'});
         return res.send({status: 'success'});
     })
}

exports.shiftAppointment = function(req, res){
    Schedule.find({
        doctor: req.body.doctorID,
        date: {"$gt": new Date(req.body.date)}
    }, function(err, schedule){
        if(err || !schedule){
            return res.send({status: 'fail', msg:'cannot find this schedule on database'});
        }
        var schedule = schedule.filter(function(doc){
            return doc.appointments.length < 15;
        });
        Appointment.findOne({_id: req.body.appointmentID}).populate('patient')
        .exec(function (err ,oldApp){
            if(err || !oldApp) return res.send({status: 'fail', msg:'cannot found this appointment on DB'});
            if(schedule.length == 0){
                Appointment.findOne({_id: req.body.appointmentID}).remove().exec( function(err,data){
                    return res.send({status: 'fail', msg:'app was removed cause cannot insert new schedule to it', 
                        data:{
                            patient: oldApp.patient
                        }
                    });
                });
            }
            else{
                Schedule.update({_id: schedule[0]._id},
                {$push: {appointments: req.body.appointmentID}},
                function(err ,data){
                    return res.send({status: 'success', 
                        data:{
                            patient: oldApp.patient,
                            newDate: schedule[0].date
                        }
                    });
                });
            }
        });
    });
}