var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var diagnosisSchema = mongoose.Schema({
        drugPrescription: {
            type: Schema.Types.ObjectId, 
            ref: 'DrugPrescription'
        },
        patient: {
            type: Schema.Types.ObjectId, 
            ref: 'Patient',
            required: true
        },
        doctor: {
            type: Schema.Types.ObjectId, 
            ref: 'HospitalEmployee',
            required: true
        },
        timePeriod: {
            type: String,
            enum: ['am', 'pm'],
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        detail: String,
        disease: [{
            type: Schema.Types.ObjectId, 
            ref: 'Disease'
        }]
    });

var Diagnosis = mongoose.model('Diagnosis', diagnosisSchema);

module.exports = Diagnosis;