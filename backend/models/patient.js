const mongoose = require('mongoose')

const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true,
    },
    state:{
        type: String
    },
    district:{
        type: String,
        required: false,
    },
    age: {
        type: Number,
        required: true,
    },
    contactNumber: {
        type: String,
        required: [false, 'Enter 10 digit number']
    },
    email: {
        type: String,
    },
    aadhaar: {
        type: String,
        required: [true, 'Please enter Aadhaar number'],
        minlength: [12, 'Aadhaar number must be 12 digits long'],
        maxlength: [12, 'Aadhaar number must be 12 digits long'],
    },
},{timestamps: true})

module.exports = mongoose.model('Patient', patientSchema)