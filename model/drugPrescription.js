var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var drugPrescriptionSchema = mongoose.Schema({
        prescriptions: [{
            type: Schema.Types.ObjectId, 
            ref: 'PrescriptionDrug'                           
        }],
        status: {
            type: Number,
            enum: [0,1,2,3],
            required: true
            /*  
                0 == phamasist reported to doctor
                1 == doctor create drugList
                2 == approved by phamasist 
                3 == drug was sent to patient
            */
        },
        inspectedBy: {
            type: Schema.Types.ObjectId, 
            ref: 'HospitalEmployee',
        },
        note: String
    });

var DrugPrescription = mongoose.model('DrugPrescription', drugPrescriptionSchema);

module.exports = DrugPrescription;