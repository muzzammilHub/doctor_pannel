const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema({  
    appointment: [
        {
            appointmentDate:{
                type: Date,
                required: true
            },
            appointmentTime:{
                type: String,
                required: true,
            },
        },
    ],
    doctor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    patient:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    }
})

module.exports = mongoose.model('Appointment', appointmentSchema)