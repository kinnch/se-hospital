var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');
 
var staff = mongoose.Schema({
      uuid: {
        type: String,
        required: false
    },
    firstname: {
        type: String,
        required: true
    },
    active: {
        type: String,
        required: false
    }
    });

var options = ({missingPasswordError: "Wrong password"});
staff.plugin(passportLocalMongoose,options);
var Staff = mongoose.model('Staff', staff);

module.exports = Staff;