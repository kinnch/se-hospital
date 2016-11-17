var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var appointmentSchema = mongoose.Schema({
    patient: {
        type: Schema.Types.ObjectId, 
        ref: 'Patient',
        required: true
    },
    status: {
        type: Number,
        enum: [0,1,2,3,4],
        /*  
            0 == create in website
            1 == ปรินท์ใบนัดแล้ว
            2 == ตรวจร่างกายแล้ว
            3 == ตรวจอยู่
            4 == ตรวจเสร็จ
        */
        required: true
    },
    reason: String    
});

var Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;