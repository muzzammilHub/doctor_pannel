const app = require('./index')
const {connectDB} = require('./config/mongoose')

connectDB()


app.listen(process.env.PORT, ()=>{
    console.log(`Server is up and running on port: ${process.env.PORT}`)
})