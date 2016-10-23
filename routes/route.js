var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var session = require('express-session');

var Staff = require('../model/staff');
var staffController = require('../controllers/staff');

module.exports = function(app) {
    //var patientController = require('../controllers/patient');
    //app.get('/test',ensureAuthenticated, patientController.testt);
   

    //initialize passport
    passport.use(Staff.createStrategy());
    // use static serialize and deserialize of model for passport session support
    passport.serializeUser(Staff.serializeUser());
    passport.deserializeUser(Staff.deserializeUser());

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

    app.post('/login', staffController.login);
    app.post('/register', staffController.register);
    app.get('/login', staffController.getLogin)

     var patientController = require('../controllers/patient');
    app.get('/test',staffController.checkAuth, patientController.testt);

    var patientController = require('../controllers/patientController');
    app.get('/testing',  patientController.testing);
    app.post('/api/patient/search',  patientController.search);

    var seederController = require('../controllers/seederController');
    app.get('/seed',  seederController.seed);

    var physicalDataController = require('../controllers/physicalDataController');
    app.post('/api/physicalData/add',  physicalDataController.add);

    var prescriptionController = require("../controllers/prescriptionController");
    app.post('/api/prescriptions',  prescriptionController.showForPharma);
    app.post('/api/check-in-list',  prescriptionController.showInDepartment);

    var hospitalEmployeeController = require('../controllers/hospitalEmployeeController');
    app.post('/api/hospitalEmployee/isInSystem',  hospitalEmployeeController.isInSystem);
    app.post('/api/hospitalEmployee/add',  hospitalEmployeeController.add);
    //patientController.setDBConnectionsFromApp(app);

    function ensureAuthenticated(req, res, next){
        // console.log(req.isAuthenticated);
        console.log(req);
        if(req.user){
            return next();
        } else {
            res.redirect('/users/login');
        }
    }
}

