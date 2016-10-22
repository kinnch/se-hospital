module.exports = function(app) {
    var patientController = require('../controllers/patient');

    app.get('/test',ensureAuthenticated, patientController.testt);

    patientController.setDBConnectionsFromApp(app);

    function ensureAuthenticated(req, res, next){
        if(req.isAuthenticated()){
            return next();
        } else {
            //req.flash('error_msg','You are not logged in');
            res.redirect('/users/login');
        }
    }
}

