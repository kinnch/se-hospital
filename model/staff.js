var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');
 
var staff = mongoose.Schema({
     
    department: {
        type: String,
        required: true
    }
    });

var options = ({usernameField: "userName"});
staff.plugin(passportLocalMongoose,options);
var Staff = mongoose.model('Staff', staff);

module.exports = Staff;