var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var physicalCheckingSchema = mongoose.Schema({
        bloodPresure: {
                systolic: {
                    type: Number,
                    min: 0,
                    max: 500,
                },
                diastolic: {
                    type: Number,
                    min: 0,
                    max: 500,
                }
        },
        heartRate: {
            type: Number,
            min: 0,
            max: 500,
        },
        weight: {
            type: Number,
            min: 0,
            max: 500
        },
        height: {
            type: Number,
            min: 0,
            max: 500
        },
        temp: {
            type: Number,
            min: -273,
            max: 100
        },
        date: Date,
        timePeriod: {
            type: String,
            enum: ['am','pm']
        },
        patient: {
            type: Schema.Types.ObjectId, 
            ref: 'Patient',
            required: true
        },
        nurse: {
            type: Schema.Types.ObjectId, 
            ref: 'hospitalEmployee',
            required: true
        }
    });

var PhysicalChecking = mongoose.model('PhysicalChecking', physicalCheckingSchema);

module.exports = PhysicalChecking;