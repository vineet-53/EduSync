const Profile = require('../models/Profile');
const User = require('../models/User');
const {uploadToCloudinary}  = require('../utilities/imageUploader')

const mongoose = require('mongoose');
const { deleteCourse } = require('./course');
const Course = require('../models/Course');
exports.createProfile = async (req , res )=> { 
    try {   
        const {gender , dob ="" , phone , about =""} =  req.body ; 
        const {userId} = req.user
        if(!gender || !phone ) { 
            throw "missing properties"
        }
        const profileDetails = await Profile.create({
            gender , 
            dob , 
            contactNumber : phone ,
            about
        })
        const userDetails = await User.findById(userId)
        userDetails.profile = profileDetails._id 
        await userDetails.save(err =>{  
            if (err )throw "error saving user details"
        })
        return res.status(200).json({ 
            success : true, 
            message : "Profile created successfully"
        })


    }catch(err ){ 
        return res.status(400).json({ 
            success : false , 
            message : err.message
        })
    }
}

    exports.updateProfile = async (req ,res) => { 
        try { 
            const {gender , dob, contactNumber  , about } =  req.body ;
            const { userId }  = req.user 
            // validate input details
            if(!gender || !dob || !contactNumber || !about) { 
                throw new Error("missing input details")
            }
            const userDetails = await User.findById(userId)
            const profileId = userDetails.profile

            const profileDetails = await Profile.findOneAndUpdate(profileId , { $set : { 
                gender , dob  , contactNumber  , about 
            }}, {new : true})

            console.log(profileDetails)
            return res.status(200).json( {
                success : true, 
                message : "Profile updated successfully"
                ,updatedProfileDetails : profileDetails, 
            })
        }catch(err ){ 
            return res.status(400).json({ 
                success : false , 
                message : err.message
            })
        }
    }


exports.deleteProfile = async (req ,res) => { 

    try { 
        const {userId} = req.user 
        const user = await User.findById(userId) 
        if(!user) { 
            throw new Error("user not exist ")
        }
        if(user.profile) { 
            await Profile.findByIdAndDelete(user.profile)
        }
        // courses 
        await User.findByIdAndDelete(userId) 
        return res.status(200).json({ 
            success : true,
            message : "deleted user"
        })


    }catch(err) { 
        return res.status(401).json({ 
            success : false , 
            message : err.message
        })
    }
}

exports.getUserDetails = async (req , res )=> { 
    try { 
        const {userId}  = req.user 
        if(!userId) { 
            throw new Error("missing properties")
        }
        const user = await User.findById(userId) 
        .populate('profile')
        // .populate('courses')
        // .populate('courseProgress')
        .exec()

        console.log(user)
        return res.status(200).json({  
            success : true, 
            message : "fetched all user details"
            ,user
        })
    }catch(err) { 
        return res.status(400).json( { 
            success : false , 
            message : err.message
        })
    }
}


exports.updateProfilePicture = async (req , res) => { 
    try {   
        const  {displayPicture : image } = req.files ;
        const  {userId} =  req.user ;
        // validate the input s
        if(!image) { 
            throw  new Error("missing image property")
        }
        if(!userId) {
            throw new Error ('user id not found ')
        }
        // find the user 
        const user = await User.findById(userId) ; 
        console.log(user)
        // update the image with cloudinary image link
        const imageupload = await uploadToCloudinary(image.tempFilePath , process.env.CLOUD_FOLDER , 1000 , 1000);
        console.log(imageupload)
        user.image = imageupload 
        await user.save()
        return res.status(200).json({ 
            success : true, 
            message : "updated user profile image"
            ,user
        })
    }catch(err) { 
        return res.status(400).json( { 
            success : false , 
            message : err.message
        })

    }
}