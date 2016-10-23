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

    var seederController = require('../controllers/seederController');
    app.get('/seed',  seederController.seed);

    var physicalDataController = require('../controllers/physicalDataController');
    app.post('/api/physicalData/add',  physicalDataController.add);

    var prescriptionController = require("../controllers/prescriptionController");
    app.post('/api/appointment/all',  prescriptionController.showAll);
    app.post('/api/presciption/showInDepartment',  prescriptionController.showInDepartment);
    // app.post('/api/prescriptions',  prescriptionController.showForPharma);
    app.post('/api/check-in-list',  prescriptionController.showInDepartment);
    app.post('/api/prescriptionHistory',  prescriptionController.showHistory);
    app.post('/api/updateStatusPres', prescriptionController.updateStatus);
    app.post('/api/changeRequestPres', prescriptionController.changeRequest);
    app.post('/api/allPrescription', prescriptionController.allPrescription);

    var hospitalEmployeeController = require('../controllers/hospitalEmployeeController');
    app.post('/api/hospitalEmployee/isInSystem',  hospitalEmployeeController.isInSystem);
    app.post('/api/hospitalEmployee/add',  hospitalEmployeeController.add);

    var scheduleController = require('../controllers/scheduleController');
    app.post('/api/schedule/getTable',  scheduleController.getTable);

    //patientController.setDBConnectionsFromApp(app);
    //-----bone not testing zone-----
    app.get('/api/employees',hospitalEmployeeController.getAllEmployee);
    app.get('/api/departments',hospitalEmployeeController.getAllDepartment);
    app.post('/login', hospitalEmployeeController.login);
    app.post('/register', hospitalEmployeeController.register);
    app.get('/login', hospitalEmployeeController.getLogin)

    app.post('/loginPatient', patientController.login);
    app.post('/registerPatient', patientController.register);
    app.get('/loginPatient', patientController.getLogin);

    var otpController = require('../controllers/otpController');
    app.get('/requestOTP', otpController.requestOTP);

}

