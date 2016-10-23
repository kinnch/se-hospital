var dbConnection;

exports.setDBConnectionsFromApp = function(app) {
    console.log("users controller setDBConnectionFromApp Started");
    dbConnection = app.get("dbConnection");
}

function getDateNow(){
    var this_date = new Date(new Date().getTime());
    this_date = new Date(this_date.getFullYear()+'-'+(this_date.getMonth() + 1)+"-"+this_date.getDate());
    return this_date;
}

var Schedule = require("../model/schedule");

exports.getTable = function(reg, res){
    //res.send(getDateNow());
    
    Schedule.aggregate([
        {
            $group: { 
                _id: {
                    period: "$timePeriod",
                    date: "$date"
                }, //$region is the column name in collection
                count: {$sum: 1}
            }
        }],
    function(err,result) {
        res.send(result)
       // Result is an array of documents
    });
    //res.send(getDateNow());
    return; 
}