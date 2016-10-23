var dbConnection;

exports.setDBConnectionsFromApp = function(app) {

    console.log("users controller setDBConnectionFromApp Started");
    dbConnection = app.get("dbConnection");
}

var HospitalEmployee = require("../model/hospitalEmployee");
var Department = require("../model/department");

exports.isInSystem = function(req, res) {
    HospitalEmployee.findOne({
        userName: (req.body.username)+''
    }, function(err, employee){
        if(err) return console.error(err);
        if(employee == null) res.send(false);
        else res.send(true);
        return;
    });
}

exports.add = function(req, res){
    var data = req.body;
    //res.send(k);
    Department.findOne({name: req.body.department},function (err, department){
        var hospitalEmployee = new HospitalEmployee({
            name: {
                title: data.title,
                fname: data.fname,
                lname: data.lname
            },
            roleID: data.roleID,
            userName: data.username,
            password: data.password,
            department: department._id
        });
        //res.send(hospitalEmployee);
        hospitalEmployee.save();
        res.send('done');
        return;
    });
}
