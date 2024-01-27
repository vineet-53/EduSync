const {sendMail} = require("../utilities/sendMail")
require('dotenv').config()
const {contactUsEmail} = require('../mail/contactUs')
exports.contactUs = async (req, res) => { 
    try { 

        const {firstName , lastName , phoneNumber , email , message} = req.body 
        if(!firstName || !email || !phoneNumber || !message) { 
            throw new Error("Please Enter all details")
        }
        // send mail to me 
        const response = await sendMail(email, "Your Message Sended Successfully",contactUsEmail(email , firstName , lastName , message , phoneNumber , countryCode ="+91"))

        return res.status(200).json({ 
            success : true,  
            message : "Message Sended Successfully", 
            response
        })
    }catch(err) { 
        return res.status(401).json({  
            success : false, 
            message : err.message
        })
    }
}


