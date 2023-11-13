const User = require('../models/user')
const jwt = require('jsonwebtoken')

exports.isAuthenticated = async (req, res, next)=>{

    
    let {token} = req.cookies;
    if(!token)
        token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if(!token){
        return res.status(401).json({
            message: 'Please login first'
        })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.user = await User.findById(decoded._id)

    next()
}