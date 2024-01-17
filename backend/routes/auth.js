const express  = require('express')
const router = express.Router() 
const  { signup,  sendotp, signIn , changeAccountType } = require('../controllers/auth')
const { setUserToken } = require('../middlewares/auth')
router.post("/signup", signup )
router.post("/login",signIn )
router.post("/sendotp" , sendotp  )
router.post('/changeAccountType' , changeAccountType)
router.get("/" , async ( req , res) => { 
    return res.status(200).json({ 
        message : "atuh routes "
        ,success :true ,
    })
})


module.exports = router