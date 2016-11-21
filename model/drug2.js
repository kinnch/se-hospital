var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var drug2Schema = mongoose.Schema({
        name: {
            type: String,
            required: true
        }
    });

var Drug2 = mongoose.model('Drug2', drug2Schema);

module.exports = Drug2;