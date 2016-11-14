var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var drugPrescriptionSchema = mongoose.Schema({
        prescription: [{
            type: Schema.Types.ObjectId, 
            ref: 'PrescriptionDrug'                           
        }],
        status: {
            type: Number,
            enum: [0,1,2,3],
            required: true
        },
        inspectedBy: {
            type: Schema.Types.ObjectId, 
            ref: 'HospitalEmployee',
        },
        note: String
    });

var DrugPrescription = mongoose.model('DrugPrescription', drugPrescriptionSchema);

module.exports = DrugPrescription;