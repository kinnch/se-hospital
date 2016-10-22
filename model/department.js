var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var departmentSchema = mongoose.Schema({
        name: {
            type: String,
            required: true
        }
    });

var Department = mongoose.model('Department', departmentSchema);

module.exports = Department;