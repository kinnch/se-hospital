var dbConnection;

exports.setDBConnectionsFromApp = function(app) {

    console.log("users controller setDBConnectionFromApp Started");
    dbConnection = app.get("dbConnection");
}

var HospitalEmployee = require("../model/hospitalEmployee");

exports.isInSystem = function(req, res) {
    HospitalEmployee.findOne({
        userName: req.body.username
    }, function(err, employee){
        if(err) return console.error(err);
        if(employee == null) res.send(false);
        else res.send(true);
    });
}