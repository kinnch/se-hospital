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

exports.getTable = function(reg, res){
    //res.send(getDateNow());
    //return res.send(reg.body.department);
    Department.findOne({name: reg.body.department}, function(err, department){
        Schedule.aggregate([
        {
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
         if(err) return res.send("Fail");
         Schedule.update( {appointments: req.body.appointmentID}, 
         { $pullAll: {appointments: [req.body.appointmentID]}},
         function(err,data){
             if(err) return res.send("Fail");
             return res.send("Success");
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
    Schedule.find({}).sort({date: 1, timePeriod: 1}).populate({path:'doctor', match: {department: req.body.departmentID}})
    .exec(function(err,result){
        if(err) return res.send({status: 'Fail'});
        if(!result) return res.send({status: 'Fail'});
        result = result.filter(function(doc){
            if(res.user != null && req.body.isWalkIn) return doc.appointments.length < 20;
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
