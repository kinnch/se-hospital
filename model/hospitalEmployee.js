var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var hospitalEmployeeSchema = mongoose.Schema({
        name: {
            title: String,
            fname: String,
            lname: String,
        },
        roleID: {
            type: Number,
            min: 1,
            max: 4,
            required: true
        },
        department:{
            type: Schema.Types.ObjectId,
            ref: 'Department',
            required: true
        },
        lastPage: String,
        userName: String,
        password: String, //hash
    });

var HospitalEmployee = mongoose.model('HospitalEmployee', hospitalEmployeeSchema);

module.exports = HospitalEmployee;