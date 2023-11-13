const express = require('express')
const router = express.Router()
const {sendPdfByEmail} = require('../controllers/pdf_conntroller')
const { isAuthenticated } = require('../middleware/auth')

router.route('/pdf-send').post(isAuthenticated, sendPdfByEmail)

module.exports = router