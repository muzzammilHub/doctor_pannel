const User = require('../models/user')

exports.registerUser = async (req, res)=>{
    try {
        
        // Extract user registeration data from request body
        const {
            firstName,
            lastName,
            email,
            password,
            speciality,
            qualification
        } = req.body 

        // check for user already exists or not
        let existingUser = await User.findOne({email: email})


        if(existingUser){
            return res.status(400).json({
                success: true,
                message: 'Email already taken'
            })
        }

        // create a new user instance
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password,
            speciality,
            qualification,
        })

        const token = await newUser.generateToken()

        const options = {
            expires: new Date(Date.now() + 20*24*60*60*1000),
            httpOnly: true,
        } 

        return res.status(201).cookie("token", token, options).json({
                success: true,
                newUser,
                token
            })  

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.login = async (req, res)=>{
    try {
        
        const {
            email,
            password,
        } = req.body

        const user = await User.findOne({email: email}).select('+password')

        if(user){

            const isPasswordMatched = await user.passwordMatched(password)

            if(!isPasswordMatched){
                return res.status(401).json({
                    success: false,
                    message: 'Invalid email or password'
                })
            }
        
        const token = await user.generateToken();

        const options = {
            expires: new Date(Date.now() + 10*24*60*60*1000),
            httpOnly: true
        } 


        return res.status(201).cookie("token", token, options).json({
                success: true,
                user,
                token
            })  

        }else{
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password',
            })
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.logout = async (req, res)=>{

    try {
        return res.status(200).cookie("token",null, {
            expires: new Date(Date.now()), 
            httpOnly: true
        }).json({
            success: true,
            message: "successfully logout"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.loginUserData = async(req, res)=>{
    try {

        const user = await User.findById({_id:req.user.id})

        return res.status(200).json({
            success: true,
            user
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.imageUpload = async(req, res)=>{
    try {
        
        console.log('***********',req.file);
        const email = req.query.email;
        console.log('email',email)
        const {filename, path} = req.file;
        console.log('&&&&&&',filename, path)

        const updatedUser = await User.findOneAndUpdate(
            { email },
            { $set: { avatar: { filename, url:path } } },
            { new: true } // Return the updated document
          );

        return res.status(201).json({
            success: true,
            message: 'updated'
        })  

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}