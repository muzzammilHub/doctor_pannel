const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String, 
        required: true, 
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: [true, 'PLease enter a unique email'],
    },
    speciality: {
        type: String,
        required: [true, 'provide specaility in profession']
    },
    qualification: {
        type: [String],
        required: [true]
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'minimum at least 6 length password'],
        select: false,
    },
    avatar: {
        filename: String,
        url: String,
    }
})

// Hash the password before saving
userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})

// Generate a jwt token for the user
userSchema.methods.generateToken = function(){
    const token =  jwt.sign({_id: this._id}, process.env.JWT_SECRET)

    return token
}

// Password Matching
userSchema.methods.passwordMatched = async function(password){
    return await bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('User', userSchema)