var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var patientSchema = mongoose.Schema({
      email: String,
      name: {
        title: String,
        fname: String,
        lname: String,
      },
      sex: {
        type: String,
        enum: ['male', 'female']
      },
      birthDate: Date,
      tel: String,
      nationalID: String,
      HN: String,
      address: {
        detail: String,
        subDistrict: String,
        distict: String,
        province: String,
        postCode: String,
      },
      OTP: {
        text: String,
        generatedDate: Date
      },
      allegicDrugs: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Drug' 
      }],
      salt: {
        type: String,
        select: false,
        toJSON: true,
        hide: false
      },
      hash: String
    });

var options = ({usernameField: "tel" });
options.errorMessages = { IncorrectPasswordError:'Password are incorrect', IncorrectUsernameError:' username are incorrect'}
patientSchema.plugin(passportLocalMongoose,options);
var Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
  
  
