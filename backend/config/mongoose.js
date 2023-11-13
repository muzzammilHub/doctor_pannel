const mongoose = require('mongoose')

exports.connectDatabase = ()=>{
    mongoose.connect(process.env.MONGO_URI)
        .then(()=>{console.log('Database Connected Successfully')})
        .catch((error)=>{console.log(`Error: ${error}`)})
} 

