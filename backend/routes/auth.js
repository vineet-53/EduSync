const express  = require('express')
const router = express.Router() 
const  { signup,  sendOTP, login , changeAccountType, logout } = require('../controllers/auth')
const {auth} =  require('../middlewares/auth')
router.post("/signup", signup )
router.post("/login",login )
router.post("/sendotp" , sendOTP  )
router.post('/logout'  , logout)
router.post('/changeAccountType' , changeAccountType)
router.get("/" , async ( req , res) => { 
    return res.status(200).json({ 
        message : "atuh routes "
        ,success :true ,
    })
})


module.exports = router