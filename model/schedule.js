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
            patient: {
                type: Schema.Types.ObjectId, 
                ref: 'Patient',
            },
            status: {
                type: Number,
                enum: [0,1,2,3,4]
            },
            reason: String
        }]
    });

var Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;