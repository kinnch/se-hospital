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
    // passport.serializeUser(HospitalEmployee.serializeUser());
    // passport.deserializeUser(HospitalEmployee.deserializeUser());

    passport.serializeUser(Patient.serializeUser());
    passport.deserializeUser(Patient.deserializeUser());
    
    passport.use('patient',Patient.createStrategy());
    //need this according to passport guide
    app.use(cookieParser());
    app.use(session({
        secret: 'the princess and the frog',
        saveUninitialized: true,
        resave: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    //patientController.setDBConnectionsFromApp(app);

   

    var patientController = require('../controllers/patientController');
    app.get('/testing',  patientController.testing);
    app.post('/api/patient/search',  patientController.search);
    app.post('api/patient/register', patientController.register);

    var seederController = require('../controllers/seederController');
    app.get('/seed',  seederController.seed);
    
    var physicalDataController = require('../controllers/physicalDataController');
    app.post('/api/physicalData/add',  physicalDataController.add);
    app.post('/api/physicalData/history',  physicalDataController.showHistory);    

    var prescriptionController = require("../controllers/prescriptionController");
    var appointmentController = require("../controllers/appointmentController");
    app.post('/api/departmentAppointment/byTime',  appointmentController.getAppointmentByTime);
    app.post('/api/appointment/showSomeDoctors',  prescriptionController.showSomeDoctors);
    app.post('/api/presciption/History',  prescriptionController.showHistory);
    
    app.post('/api/updateStatusPres', prescriptionController.updateStatus);
    app.post('/api/changeRequestPres', prescriptionController.changeRequest);
    app.post('/api/allPrescription', prescriptionController.allPrescription);

    var hospitalEmployeeController = require('../controllers/hospitalEmployeeController');
    app.post('/api/hospitalEmployee/isInSystem',  hospitalEmployeeController.isInSystem);
    app.post('/api/hospitalEmployee/add',  hospitalEmployeeController.add);
    app.post('/api/hospitalEmployee/showDoctorFromDepartment', hospitalEmployeeController.showDoctorList);
    app.post('/api/timeperiodDoctor', hospitalEmployeeController.getDoctorInTime);
    ///api/timeperiodDoctor

    var scheduleController = require('../controllers/scheduleController');
    app.post('/api/schedule/getTable',  scheduleController.getTable);
    app.post('/api/appointment/delete', scheduleController.deleteAppointment);

    var diagnosisDataController = require('../controllers/diagnosisDataController');
    app.post('/api/diagnosisHistory', diagnosisDataController.diagnosisHistory);

    //patientController.setDBConnectionsFromApp(app);
    
    app.get('/api/employees',hospitalEmployeeController.getAllEmployee);
    app.get('/api/departments',hospitalEmployeeController.getAllDepartment);
    app.get('/api/departmentsDoctors',hospitalEmployeeController.getAllDepartmentOfDoctor);
    app.post('/api/staff/changePassword',hospitalEmployeeController.changePassword);
    app.post('/api/staff/deleteStaff',hospitalEmployeeController.deleteStaff);
    app.post('/login', hospitalEmployeeController.login);
    app.post('/register', hospitalEmployeeController.register);
    app.get('/login', hospitalEmployeeController.getLogin)

    app.post('/loginPatient', patientController.login);
    app.post('/registerPatient', patientController.register);
    app.get('/loginPatient', patientController.getLogin);

    

    var otpController = require('../controllers/otpController');
    app.post('/requestOTP', otpController.requestOTP);

}

