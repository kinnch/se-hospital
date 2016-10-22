var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
      phone: String,
      HN: String,
      address: String,
      OTP: {
        text: String,
        generatedDate: Date
      },
      allegicDrugs: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Drug' 
      }]
    });

var Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
  
  
