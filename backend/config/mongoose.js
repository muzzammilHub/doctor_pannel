const mongoose = require('mongoose')


exports.connectDB = async ()=>{
    try {

        const connectionInstance = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MONGO_DB connected : ${connectionInstance.connection.host}`)

        
    } catch (error) {
        console.log("Error: ", error)
        throw error
    }
}

