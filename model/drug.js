var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var drugSchema = mongoose.Schema({
        name: String,
        hasInHospital: Boolean,
    });

var Drug = mongoose.model('Drug', drugSchema);

module.exports = Drug;