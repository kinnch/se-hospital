var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var session = require('express-session');

var Staff = require('../model/staff');
var HospitalEmployee = require("../model/hospitalEmployee");
var Patient = require('../model/patient');

module.exports = function(app) {

    //initialize passport
    passport.use('staff',HospitalEmployee.createStrategy());
    // use static serialize and deserialize of model for passport session support
    // passport.serializeUser(function(user, done) {
    //     console.log("serialize");
    //     done(null, user.get(options.usernameField));
    //     // done(null, {
    //     //     username : user.get(options.usernameField),
    //     //     isHN : user.HN 
    //     // });
        
    // });
    // passport.deserializeUser(function(data, done) {
    //     console.log("data isHn :" +data.isHN);
    //     // if(data.isHN){
    //     //     console.log("isHN")
    //     //     Patient.findByUsername(data.username, function(err, user) {
    //     //         done(err, user);
    //     //     });
    //     // }else{
    //         console.log("no HN")
    //         HospitalEmployee.findByUsername(data, function(err, user) {
    //             done(err, user);
    //         });
    //     // }
            
    // });


    passport.serializeUser(HospitalEmployee.serializeUser());
    passport.deserializeUser(HospitalEmployee.deserializeUser());


    
    passport.use('patient',Patient.createStrategy());
    // passport.serializeUser(Patient.serializeUser());
    // passport.deserializeUser(Patient.deserializeUser());
    //need this according to passport guide
    app.use(cookieParser());
    app.use(session({
        secret: 'the princess and the frog',
        saveUninitialized: true,
        resave: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
    });
    //patientController.setDBConnectionsFromApp(app);

    var notificationController = require('../controllers/notificationController');
    app.post('/api/sendSMS',notificationController.sendSMS);
    app.post('/api/sendEmail',notificationController.sendEmail);

    var patientController = require('../controllers/patientController');
    app.get('/testing',  patientController.testing);
    app.post('/api/patient/search',  patientController.search);
    app.post('/api/patient/register', patientController.register);
    app.post('/api/patient/getObjIdFromHN', patientController.getObjIdFromHN);

    var seederController = require('../controllers/seederController');
    app.get('/seed',  seederController.seed);
    
    var physicalDataController = require('../controllers/physicalDataController');
    app.post('/api/physicalData/add',  physicalDataController.add);
    app.post('/api/physicalData/history',  physicalDataController.showHistory);    
    app.post('/api/patient/physicalCheck/edit',  physicalDataController.editPhysicalCheck);    

    var prescriptionController = require("../controllers/prescriptionController");
    app.post('/api/doctor/prescriptionChangeRequest/makeChange', prescriptionController.makeChange);
    
    var appointmentController = require("../controllers/appointmentController");
    app.post('/api/departmentAppointment/byTime',  appointmentController.getAppointmentByTime);
    app.post('/api/appointment/create',  appointmentController.create);
    app.post('/api/appointment/showSomeDoctors',  prescriptionController.showSomeDoctors);
    app.post('/api/prescription/History',  prescriptionController.showHistory);
    app.post('/api/appointment/getInfo', appointmentController.getInfo);
    
    app.post('/api/updateStatusPres', prescriptionController.updateStatus);
    app.post('/api/pharma/prescription/requestChange', prescriptionController.requestChange);
    app.post('/api/allPrescription', prescriptionController.allPrescription);
    app.post('/api/pharma/prescription/requestDone', prescriptionController.requestDone);
    app.post('/api/pharma/prescription/requestApprove', prescriptionController.requestApprove);
    app.post('/api/doctor/prescriptionChangeRequest/list', prescriptionController.rejectedPrescription);
    app.post('/api/doctor/getPrescription',prescriptionController.getPrescription);
    app.get('/api/drugs', prescriptionController.getAllDrugs);

    var hospitalEmployeeController = require('../controllers/hospitalEmployeeController');
    app.post('/api/hospitalEmployee/isInSystem',  hospitalEmployeeController.isInSystem);
    app.post('/api/hospitalEmployee/add',  hospitalEmployeeController.add);
    app.post('/api/hospitalEmployee/showDoctorFromDepartment', hospitalEmployeeController.showDoctorList);
    app.post('/api/hospitalEmployee/getAllDoctorInDepartment', hospitalEmployeeController.getAllDoctorInDepartment);
    app.post('/api/timeperiodDoctor', hospitalEmployeeController.getDoctorInTime);
    ///api/timeperiodDoctor

    var scheduleController = require('../controllers/scheduleController');
    app.post('/api/schedule/getTable',  scheduleController.getTable);
    app.post('/api/appointment/delete', scheduleController.deleteAppointment);
    app.post('/api/appointment/changeState', scheduleController.changeAppointmentState);
    app.post('/api/doctorAvailable',  scheduleController.getDoctorSchedule);
    app.post('/api/schedule/getTableStaff', scheduleController.getTableStaff);
    app.post('/api/schedule/all', scheduleController.listAll);
    app.post('/api/schedule/delete', scheduleController.delete);
    app.post('/api/importCSV',scheduleController.importCSV);
    var diagnosisDataController = require('../controllers/diagnosisDataController');
    // app.post('/api/diagnosisHistory', diagnosisDataController.diagnosisHistory); //TODO :REMOVE IF no one blame.
    app.post('/api/patient/diagnosisHistory',diagnosisDataController.getPatientDiagnosisHistory);
    app.post('/api/diagnosis/create', diagnosisDataController.create);
    app.post('/api/getDiagnosisAndPhysicalCheck',diagnosisDataController.getDiagnosisAndPhysicalCheck);
    app.get('/api/diseases',diagnosisDataController.getAllDiseases);
    //patientController.setDBConnectionsFromApp(app);
    
    app.get('/api/employees',hospitalEmployeeController.getAllEmployee);
    app.get('/api/departments',hospitalEmployeeController.getAllDepartment);
    app.get('/api/departmentsDoctors',hospitalEmployeeController.getAllDepartmentOfDoctor);
    app.post('/api/staff/changePassword',hospitalEmployeeController.changePassword);
    app.post('/api/staff/deleteStaff',hospitalEmployeeController.deleteStaff);
    app.post('/login', hospitalEmployeeController.login);
    app.post('/register', hospitalEmployeeController.register);
    app.get('/login', hospitalEmployeeController.getLogin);
    app.get('/logout', hospitalEmployeeController.logout);

    app.post('/loginPatient', patientController.login);
    app.post('/registerPatient', patientController.register);
    app.get('/loginPatient', patientController.getLogin);
   
    var otpController = require('../controllers/otpController');
    app.post('/requestOTP', otpController.requestOTP);

}

