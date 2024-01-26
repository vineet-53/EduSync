const crypto = require('crypto')
const User = require('../models/User')
const {sendMail} = require('../utilities/sendMail')
const {passwordHash } = require('../utilities/password'); 

exports.resetPasswordToken = async ( req , res ) => { 
    try  { 
        const {email} = req.body; 
        if(!email) { 
            throw "missing email"
        }
        // generate new token id 
        let token = crypto.randomUUID()
        // create entry to token to user 

        const updatedUser = await User.findOneAndUpdate(
            { email: email },
			{
                token: token,
			},
			{ new: true }
        );
        console.log(updatedUser)
        if(!updatedUser){  
            throw "Email not register in Study notion"
        }
        const url = `http://localhost:${process.env.FRONTEND_PORT || 5173}/update-password/${token}`
        // send url to the email 
        await sendMail(email , "Password reset link" , `<a href=${url}> reset link </a>`)
        return res.status(200).json({ 
            success: true, 
            message : "reset link sended successfully"
            ,user : updatedUser
            ,token 
        })
    }catch( err ) { 
        return res.status(400).json( { 
            success :false,
            message : err.message , 
        })
    }
}

exports.resetPassword  = async(req ,res) => { 
    try { 
        // data
        const { password , confirmPassword ,token } = req.body; 
        // validate
        if(!password || !confirmPassword) { 
            throw new Error("missing all details")
        }   
        if(password !== confirmPassword) { 
            throw new Error("password not matched")
        }
        
        // find the user with token
        const user   = await User.findOne({token : token})
        if(password === user.password)  { 
            throw new Error("Old Password Couldn't be set")
        }
        if(!user){ 
            throw new Error("User not registered")
        }
        if(!user.token) { 
            throw new Error("reset token expired")
        }
        if(user.token !== token){ 
            throw new Error("token not matched")
        }
        // hash password
        user.password = await passwordHash(password , 10)
        // save user 
        await user.save()

        return res.status(200).json({ 
            success : true , 
            message : "password reset successfully",
            user 
        })


    }catch(err) { 
        return res.status(401).json( { 
            message : err.message, 
            success  : false ,
        })
    }
}