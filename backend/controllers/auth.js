const User = require('../models/User')
const  Otp =  require("../models/Otp")
const {generateOtp } = require('../utilities/otp')
const jwt = require('jsonwebtoken');
const { passwordHash } = require('../utilities/password'); 
const Profile = require('../models/Profile')
const bcrypt = require('bcrypt')

exports.signup = async (req ,res) => { 
    try { 
        // get all details 
        const { firstName , lastName , password ,confirmPassword , email , accountType , otp , phoneNumber}  = req.body ;
        // validate details 
        if(!firstName || !lastName || !password ||!confirmPassword || !email || !accountType || !otp) { 
            throw new Error("missing properties")
        }
        // chech password validation 
        if(password !== confirmPassword) { 
            throw new Error("password not matched")
        }
        // check for existing user
        const existingUser = await User.findOne({email}); 
        if(existingUser) { 
            throw new Error("user already existed")
        }
        // check for the latest otp and match it with the given one 
        const recentOtpDoc = await Otp.findOne({email}).sort({createdAt : -1}).limit(1)
        // if validated otp then hash the password 
        if(otp != recentOtpDoc.otpNumber) { 
            throw new Error("otp not matched")
        }
        // hash password 
        const hashPassword = await passwordHash(password , 10) 
        // generate null profile 
        const profileDetails = await Profile.create({  
            gender : null , 
            dob : "" , 
            about : null , 
            contactNumber : phoneNumber
        })

        // create user with given details 
        let userPayload = { 
            firstName , 
            lastName,  
            accountType , 
            email , 
            password : hashPassword, 
            image : `https://ui-avatars.com/api/?name=${firstName}+${lastName}`,
            profile : profileDetails._id, 
            courses : [] ,
            courseProgress : null 
        }
        const userDoc  = await User.create(userPayload)
        if(!userDoc) 
        { 
            throw new Error("user not found")
        }
        // return response success
        return res.status(200).json({ 
            success : true,  
            message : "User Signed In successfully",
            userDoc
        })


    }catch ( err ){ 
        console.error(err.message)
        return res.status(401).json({  
            success : false,
            message : err.message
        })
    }
}
exports.login = async ( req , res ) => { 
    try  { 
        const  {email  ,password } = req.body ;
        if(!email || !password  ) { 
            throw new Error("Please fill all details")
        }
        // find the user with email 
        const userDoc  = await User.findOne({email : email }); 
        if(!userDoc) { 
            throw new Error("User Not Found")
        }
        const result = await bcrypt.compare(password , userDoc.password )
        if(!result) { 
            throw new Error("Password not Matched")
        }
        // create a session for the user 
        const JWT_SECRET = process.env.JWT_SECRET
        // create a jwt with header payload signature 
        const JWT_PAYLOAD = { 
            userId: userDoc._id , 
            email , 
        }
        const token = jwt.sign(JWT_PAYLOAD , JWT_SECRET , {expiresIn : "5h"})
        // store in the browser cookies 
        const cookieOptions  = {
            maxAge: 5 * 3600, 
            path : '/',
            httpOnly: true,       
        }
        // save in cookie
        res.cookie('token', token , cookieOptions)
        userDoc.active = true;
        await userDoc.save()
        return res.status(200).json({ 
            success : true,  
            message : "token generated redirecting user",  
            token , 
            user : userDoc
        })

    }catch( err ) { 
        return res.status(400).json( { 
            message : err.message , 
            success :false
        })
    }
}
exports.changePassword =async(req ,res) => { 
    try { 
        const {oldPassword , newPassword , confirmNewPassword } = req.body; 
        // validate if any thing missing 
        const {email} = req.User
        if(!oldPassword || !newPassword || !confirmNewPassword) { 
            throw new Error("Please fill all details")
        }
        // validate new password with confirm 
        if(newPassword !== confirmNewPassword) { 
            throw new Error("Creadentials not match")
        }
        if(newPassword === oldPassword)  
        { 
            throw new Error("old password connot set again")
        }

        // find the user with email 
        let user = await User.findOne({email}); 
        if(!user) { 
            throw new Error("user not existed")
        }
        // compare with the old passowrd
        let hashPassword = user.password 
        await passwordCompare(oldPassword , hashPassword)

        // hashing password then save to db 
        // update the user with new password 
        user.password = await passwordHash(newPassword ,10 )
        await user.save()
        return res.status(200).json( { 
            success : true, 
            message : "Changed Password Successfully",
            newPassword : user.password , 
            user
        })
    }catch(err) { 
        return res.status(500).json( { 
            success : false , 
            message : err.message
        })
    }

}
exports.sendOTP = async (req, res) => {
    try {
        // input data
        const { email } = req.body
        //validate data 
        if(!email){  
            return res.status(401).json({ 
                message : "please send email" , 
                success : false
            })
        }
        // generate new otp
        let otpNumber = await generateOtp()    
        // create entry to database
        // it pre call the mail sender function and send mail to user
        const otpDoc = await Otp.create({email, otpNumber }) 

        return res.status(200).json( { 
            success : true, 
            message : "otp Sended successfully" , 
            otpDoc
        })
    } catch (error) {
      console.log(error.message)
      return res.status(500).json({ success: false, error: error.message })
    }
  }



  exports.changeAccountType = async(req ,res) => { 
    try {   
        // input details 
        const {userId , ADMIN_ACCESS_KEY , accountType} = req.body ;

        // validate detials
        if(!userId || !ADMIN_ACCESS_KEY) { 
            throw new Error('missing properties')
        }
        if(ADMIN_ACCESS_KEY != process.env.ADMIN_ACCESS_KEY) { 
            throw new Error("you can'n cahnge account type")
        }
        // find user 
        const user = await User.findById(userId) 

        // validate user
        if(!user){ 
            throw new Error("user not exist")
        }
        // change user role 
        user.accountType = accountType
        // save user  
        await user.save()
        // return res
        return res.status(200).json({ 
            success : true,  
            message : "changed user account type"
        })
    }catch(err) { 
        return res.status(401).json({ 
            success : false,  
            message : err.message
        })
    }
  }