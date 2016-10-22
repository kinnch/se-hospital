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
            ref: 'hospitalEmployee',
            required: true
        },
        appointments: [{
            patientID: {
                type: Schema.Types.ObjectId, 
                ref: 'hospitalEmployee' 
            },
            reason: String
        }]
    });

var Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Drug;