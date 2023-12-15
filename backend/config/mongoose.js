const mongoose = require('mongoose')
const {DB_NAME} = require('../utils/constant')


exports.connectDB = async ()=>{
    try {

        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        console.log(`MONGO_DB connected : ${connectionInstance.connection.host}`)

        
    } catch (error) {
        console.log("Error: ", error)
        throw error
    }
}

