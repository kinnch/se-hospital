var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var departmentSchema = mongoose.Schema({
        name: {
            type: String,
            required: true
        }
    });

var Deparment = mongoose.model('Deparment', departmentSchema);

module.exports = Deparment;