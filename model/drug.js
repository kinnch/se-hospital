var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var drugSchema = mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        hasInHospital: {
            type: Boolean,
            required: true
        }
    });

var Drug = mongoose.model('Drug', drugSchema);

module.exports = Drug;