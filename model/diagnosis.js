var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var drugPrescriptionSchema = mongoose.Schema({
        drugPrescription: {
            type: Schema.Types.ObjectId, 
            ref: 'DrugPrescription' 
        },
        patient: {
            type: Schema.Types.ObjectId, 
            ref: 'DrugPrescription',
            required: true
        },
        doctor: {
            type: Schema.Types.ObjectId, 
            ref: 'DrugPrescription' 
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

var DrugPrescription = mongoose.model('DrugPrescription', drugPrescriptionSchema);

module.exports = Deparment;