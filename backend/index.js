// importing necessary modules
require('dotenv').config({path: './.env'})
const express = require("express")
const app = express();
const cookieParser = require('cookie-parser')
const cors = require('cors')
const multer = require('multer')

//using middleware
app.use(cors({
    origin: 'https://docportall.netlify.app',
    credentials: true,
  }));
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const userRoute = require('./routes/user');
const patientRoute = require('./routes/patient')
const pdfRoute = require('./routes/pdf')

app.use("/api/v1", userRoute)
app.use('/api/v1',patientRoute)
app.use('/api/v1', upload.single('pdf'),pdfRoute)


module.exports = app;


