const express = require('express')
const router = express.Router() 

const { resetPasswordToken  , resetPassword} = require('../controllers/resetPassword')
router.post('/reset-password-token' , resetPasswordToken)
router.post('/update-password' , resetPassword)
module.exports = router