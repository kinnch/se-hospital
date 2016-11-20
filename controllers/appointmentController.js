'use strict'

var dbConnection;

exports.setDBConnectionsFromApp = function(app) {

    console.log("users controller setDBConnectionFromApp Started");
    dbConnection = app.get("dbConnection");
}

var mongoose = require('mongoose');

var Appointment = require("../model/appointment");
var Prescription = require("../model/drugPrescription");
var Department = require("../model/department");
var HospitalEmployee = require("../model/hospitalEmployee");
var Schedule = require("../model/schedule");
var Diagnosis = require("../model/diagnosis");
var Patient = require("../model/patient");
var Drug = require("../model/drug");
var Q = require("q");

exports.getAppointmentByTime = function(req, res){
    if(req.body.departmentID != ''){
        Schedule.find({
            date : {"$gte": new Date(req.body.date),
                    $lt:new Date(new Date(req.body.date).getTime() + 24 * 3600 * 1000)},
            timePeriod : req.body.timePeriod
        })
        .populate({
            path: 'doctor',
            match: { 
                department: req.body.departmentID
            }
        })
        .populate({
            path: 'appointments',
			populate: {
                path: 'patient',
            }
        })
        .exec(function(error,data){
            if (error) return res.send({status : 'not found'});
            if (!data)return res.send({status : 'not found'});
            data = data.filter(function(doc){
                return doc.doctor != null;
            });
            res.send({scheduleList: data});
            return;
        });
    }else{
        Schedule.find({
            date : {"$gte": new Date(req.body.date),
                    $lt:new Date(new Date(req.body.date).getTime() + 24 * 3600 * 1000)},
            timePeriod : req.body.timePeriod
        })
        .populate({
            path: 'doctor',
        })
        .populate({
            path: 'appointments',
            populate: {
                path: 'patient',
            }
        })
        .exec(function(error,data){
            if (error) return res.send({status : 'not found'});
            if (!data)return res.send({status : 'not found'});
            res.send({scheduleList: data});
            return;
        });
    }
    
}

exports.create = function(req, res) {
	// Create our deferred object, which we will use in our promise chain
	var user = req.hasOwnProperty('user') ? req.user : null;
	// res.send(user);
	var deferred = Q.defer();
	
	Patient.findOne({_id: req.body.patient_id})
	.then( // Check existing patient
	function(patient) {
			// console.log("0");
			return Schedule.findOne({'_id': req.body.schedule_id}); 
		},
		function(error) {
			res.send({
				'status': 'fail',
				'msg': 'Patient is not exist.'
			});
			// console.log("1");
			deferred.reject(new Error(error));
		}
	)
	.then( // check existing that schedule slot
		function(schedule) {
			// console.log("4");
			// check whether have enough available slot
			// 15 slot (+5 walk-in slot  if staff)
			if( /*LOGGED_IN_USER==STAFF*/ (user && user.hasOwnProperty("roleID") && user.roleID==1) && schedule.appointments.length <= 20 ) {
				console.log("6");
			} else if( /*LOGGED_IN_USER==PATIENT*/ (!user || (user && !user.hasOwnProperty("roleID"))) && schedule.appointments.length <= 15 ) {
				console.log("7");
			} else {
				// console.log("8");		
				res.send({
                	'status': 'fail',
	                'msg': 'That time period is not available.'
	            });
				deferred.reject(new error(error));
			}
			return schedule;
		},
		function(error) {
			res.send({
                'status': 'fail',
                'msg': 'doctor is not available.'
            });
            // console.log("5");
            deferred.reject(new error(error));
		}
	)
	.then( // create appointment & add to schedule 
		function(selectedSchedule) {
			// console.log("100");
			// create appointment
			var newAppointment = new Appointment({
				'patient' : req.body.patient_id,
				'reason' : req.body.reason,
				'status' : 0
			});
			newAppointment.save();
			// console.log("101");

			// add appointment to schedule
			selectedSchedule.appointments.push(newAppointment._id);
			selectedSchedule.save();
			// console.log("102");
			console.log("Create new appointment ID: "+newAppointment._id);
			res.send({
				'status': 'success',
				'msg': '',
				'data': {
					'appointmentID': newAppointment._id
				}
			});	
			return;
		}
	);
}
