const express = require('express')
const router = express.Router()
const {isAuthenticated} = require('../middleware/auth')
const { registerUser , login, logout, loginUserData, imageUpload} = require('../controllers/user_controller')
const upload = require('../config/multerImage')

router.route('/register').post(registerUser)
router.route('/login').post(login)
router.route('/logout').get(isAuthenticated,logout)
router.route('/me').get(isAuthenticated, loginUserData)
router.route('/image').post(upload.single('avatar') ,imageUpload)

module.exports = router