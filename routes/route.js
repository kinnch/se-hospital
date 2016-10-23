var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var session = require('express-session');

var Staff = require('../model/staff');
var HospitalEmployee = require("../model/hospitalEmployee");
var staffController = require('../controllers/staff');

module.exports = function(app) {

    //initialize passport
    passport.use(HospitalEmployee.createStrategy());
    // use static serialize and deserialize of model for passport session support
    passport.serializeUser(HospitalEmployee.serializeUser());
    passport.deserializeUser(HospitalEmployee.deserializeUser());

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

   
     var patientController = require('../controllers/patient');
    app.get('/test',staffController.checkAuth, patientController.testt);

    var patientController = require('../controllers/patientController');
    app.get('/testing',  patientController.testing);
    app.post('/api/patient/search',  patientController.search);

    var seederController = require('../controllers/seederController');
    app.get('/seed',  seederController.seed);

    var physicalDataController = require('../controllers/physicalDataController');
    app.post('/api/physicalData/add',  physicalDataController.add);

    var hospitalEmployeeController = require('../controllers/hospitalEmployeeController');
    app.post('/api/hospitalEmployee/isInSystem',  hospitalEmployeeController.isInSystem);
    app.post('/api/hospitalEmployee/add',  hospitalEmployeeController.add);
    //patientController.setDBConnectionsFromApp(app);

    app.post('/login', hospitalEmployeeController.login);
    app.post('/register', hospitalEmployeeController.register);
    app.get('/login', hospitalEmployeeController.getLogin)

}

