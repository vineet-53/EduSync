const Contact = require('../models/Contact')
require('dotenv').config()
exports.contactUs = async (req, res) => { 
    try { 

        let {firstName , lastName , phoneNumber , email , message , countryCode = "+91"} = req.body 
        firstName = firstName.replace('/\s/' , "")
        lastName = lastName.replace('/\s/' , "")
        if(!firstName || !email || !phoneNumber || !message) { 
            throw new Error("Please Enter all details")
        }
        // send mail to me 
        const contactDetails = await Contact.create({ 
            name : firstName + " " + lastName , 
            email , 
            phoneNumber : countryCode + " " + phoneNumber, 
            message
        })
        return res.status(200).json({ 
            success : true,  
            message : "User Contacted Successfully", 
            contactDetails
        })
    }catch(err) { 
        return res.status(401).json({  
            success : false, 
            message : err.message
        })
    }
}


