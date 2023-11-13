const express = require('express')
const router = express.Router()
const {patientRegisteration, appointment, allPatientDetail, medicalInfo, getMedicalInfo} = require('../controllers/patient_controller')
const {isAuthenticated} = require('../middleware/auth')

router.route('/patient/register').post(isAuthenticated,patientRegisteration)
router.route('/appointment/:id').post(isAuthenticated, appointment)
router.route('/allPatient').get(isAuthenticated, allPatientDetail)
router.route('/patientmedicalinfo').post(isAuthenticated, medicalInfo)
router.route('/getHistory').get(isAuthenticated, getMedicalInfo)

module.exports = router;