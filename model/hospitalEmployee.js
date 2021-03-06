var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

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
            /*
                1 == hospitalStaff
                2 == doctor
                3 == nurse
                4 == pharmacist 
            */
        },
        sex: {
            type: String,
            enum: ['male', 'female']
        },
        department:{
            type: Schema.Types.ObjectId,
            ref: 'Department',
            required : true
        },
        lastPage: String,
        userName:{
            type: String,
            required: true
        },
        salt: {
            type: String,
            select: false,
            toJSON: true,
            hide: false
      },
      hash: String
    });

var options = ({usernameField: "userName"});
hospitalEmployeeSchema.plugin(passportLocalMongoose,options);
var HospitalEmployee = mongoose.model('HospitalEmployee', hospitalEmployeeSchema);

module.exports = HospitalEmployee;