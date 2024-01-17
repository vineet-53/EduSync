const express = require('express')
const router = express.Router() 

const { resetPasswordToken  , resetPassword} = require('../controllers/resetPassword')
router.post('/reset-password-token' , resetPasswordToken)
router.post('/update-password/:token' , resetPassword)
router.get('/greet' , (req, res)=> { 
    return res.status(200).json({  
        success : true, 
        message : "hello how are you"
    })
})
module.exports = router