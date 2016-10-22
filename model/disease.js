var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var diseaseSchema = mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        icd10: {
            type: String,
            required: true
        }
    });

var Disease = mongoose.model('Disease', diseaseSchema);

module.exports = Disease;