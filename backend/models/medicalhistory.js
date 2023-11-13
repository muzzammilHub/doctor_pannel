const mongoose = require('mongoose')

const medicalHistorySchema = new mongoose.Schema({
    medicalReport: [
        {
            visittype: String,
            chiefcomplaints: String,
            bloodpressure: {
                systolic: Number,
                diastolic: Number,
            },
            height: Number, // Height in meters
            temperature: Number, // Temperature in Celsius
            pulse: Number, // Pulse rate in BPM
            oxygenLevel: Number, // Oxygen levels in percentage
            weight: Number, // Weight in kilograms
            history: String,
            investigation: String,
            result: String,
            treatment: String,
            recordedAt: {
                type: Date,
                default: Date.now,
            },
            doctor: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            }
        }
    ],
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
    }
});

const MedicalHistory = mongoose.model('MedicalHistory', medicalHistorySchema);

module.exports = MedicalHistory;



            
            
           