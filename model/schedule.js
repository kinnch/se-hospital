var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var scheduleSchema = mongoose.Schema({
        timePeriod: {
            type: String,
            enum: ['am', 'pm'],
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        doctor: {
            type: Schema.Types.ObjectId, 
            ref: 'HospitalEmployee',
            required: true
        },
        appointments: [{
            type: Schema.Types.ObjectId, 
            ref: 'Appointment' 
        }]
    });

var Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;