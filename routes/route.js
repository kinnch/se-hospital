module.exports = function(app) {
    var patientController = require('../controllers/patient');
    app.get('/test',ensureAuthenticated, patientController.testt);

    var patientController2 = require('../controllers/patientController');
    app.get('/testing',  patientController2.testing);

    var seederController = require('../controllers/seederController');
    app.get('/seed',  seederController.seed);

    //patientController.setDBConnectionsFromApp(app);

    function ensureAuthenticated(req, res, next){

        if(req.isAuthenticated()){
            return next();
        } else {
            //req.flash('error_msg','You are not logged in');
            res.redirect('/users/login');
        }
    }
}

