var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var prescription_drug_Schema = mongoose.Schema({
    drug: {
        type: Schema.Types.ObjectId, 
        ref: 'Drug' 
    },
    detail: String,
    amount: Number                                 
});

var PrescriptionDrug = mongoose.model('PrescriptionDrug', prescription_drug_Schema);

module.exports = PrescriptionDrug;