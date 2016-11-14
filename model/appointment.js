var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var appointmentSchema = mongoose.Schema({
    patient: {
        type: Schema.Types.ObjectId, 
        ref: 'Patient',
    },
    status: {
        type: Number,
        enum: [0,1,2,3,4]
    },
    reason: String    
});

var Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;