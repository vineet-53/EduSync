const Profile = require('../models/Profile');
const User = require('../models/User');
const Course = require('../models/Course');
const CourseProgress = require('../models/CourseProgress');
const RatingAndReview = require('../models/RatingAndReview');
const { uploadToCloudinary } = require('../utilities/imageUploader')
const { passwordHash } = require('../utilities/password');
const { destroyFromCloudinary } = require('../utilities/imageDestroyer')
exports.createProfile = async (req, res) => {
    try {
        const { gender, dob = "", contactNumber: phone, about = "" } = req.body;
        const { userId } = req.user
        if (!gender || !phone) {
            throw "missing properties"
        }
        const profileDetails = await Profile.create({
            gender,
            dob,
            contactNumber: phone,
            about
        })
        const userDetails = await User.findById(userId)
        userDetails.profile = profileDetails._id
        await userDetails.save(err => {
            if (err) throw "error saving user details"
        })
        return res.status(200).json({
            success: true,
            message: "Profile created successfully"
        })


    } catch (err) {
        return res.status(400).json({
            success: false,
            message: err.message
        })
    }
}

exports.updateProfile = async (req, res) => {
    try {
        const { firstName, lastName, gender, dob, contactNumber, countryCode, about } = req.body;
        const { userId } = req.user
        // validate input details
        if (!firstName || !gender || !dob || !contactNumber || !about) {
            throw new Error("missing input details")
        }
        let userDetails = await User.findById(userId)
        userDetails.firstName = firstName
        if (lastName != ' ') {
            userDetails.lastName = lastName
        }
        const profileId = userDetails.profile
        const profileDetails = await Profile.findOneAndUpdate(profileId, {
            $set: {
                gender, dob, contactNumber: `${countryCode} ${contactNumber}`, about
            }
        }, { new: true })
        await userDetails.save()
        console.log(profileDetails)
        userDetails = await User.findById(userId).populate('profile').exec()
        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: userDetails,
        })
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: err.message
        })
    }
}


exports.deleteAccount = async (req, res) => {

    try {
        const { userId } = req.user
        const user = await User.findById(userId)
        if (!user) {
            throw new Error("user not exist ")
        }
        if (user.profile) {
            let profile = await Profile.findByIdAndDelete(user.profile._id, { new: true })
            console.log("DELETED  USER PROFILE --- ", profile)
        }
        if (!user.courses.length) {
            for (let courseId in user.courses) {
                const course = await Course.findAndUpdate(
                    { _id: courseId },
                    { $pull: { studentEnrolled: userId } },
                    { new: true }
                );
                console.log("DELETED USER FROM COURSE --- ", course)
                const allRatings = await RatingAndReview.find({ userId }, { new: true })
                for (let ratingId in allRatings) {
                    let rating = await RatingAndReview.findByIdAndDelete(ratingId, { new: true })
                    console.log("DELETED USER FROM RATINGS ---- ", rating)
                }
            }
        }
        if (!user.courseProgress.length) {
            let cp = await CourseProgress.findOneAndDelete({ userId })
            console.log("DELETED USER FROM COURSE PROGRESS ---", cp)
        }
        // DELTE USER PROFILE IAMGE 
        const url = user?.image
        if (!!url.split('.').find(word => word === 'cloudinary')) {
            destroyFromCloudinary(url?.split('upload')[1])
        }
        // courses 
        let deletedUser = await User.findByIdAndDelete(userId, { new: true })
        console.log("DELETD USER ----", deletedUser)
        return res.status(200).json({
            success: true,
            message: "DELETED ACCOUNT SUCCESSFULLY",
            deletedUser,
            redirectTo: '/login'
        })
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: err.message
        })
    }
}

exports.getUserDetails = async (req, res) => {
    try {
        const { userId } = req.user
        if (!userId) {
            throw new Error("missing properties")
        }
        let user = await User.findById(userId).populate("profile").exec()
        console.log(user)
        return res.status(200).json({
            success: true,
            message: "fetched all user details",
            user,
        })
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: err.message
        })
    }
}


exports.updateProfilePicture = async (req, res) => {
    try {
        const { image } = req.files;
        const { userId } = req.user;
        // validate the input s
        if (!image) {
            throw new Error("missing image property")
        }
        if (!userId) {
            throw new Error('user id not found ')
        }
        // find the user 
        const user = await User.findById(userId);
        console.log(user)
        // update the image with cloudinary image link
        const imageupload = await uploadToCloudinary(image.tempFilePath, process.env.CLOUD_FOLDER, 1000, 1000);
        console.log(imageupload)
        user.image = imageupload
        await user.save()
        return res.status(200).json({
            success: true,
            message: "updated user profile image",
            user
        })
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: err.message
        })

    }
}
exports.changePassword = async (req, res) => {
    try {
        const { password, confirmPassword } = req.body;
        // validate if any thing missing 
        const { email } = req.user
        if (!email) {
            throw new Error("user not authorized")
        }
        if (!password || !confirmPassword) {
            throw new Error("Please fill all details")
        }
        // validate new password with confirm 
        if (password !== confirmPassword) {
            throw new Error("Creadentials not match")
        }
        // find the user with email 
        let user = await User.findOne({ email });
        if (!user) {
            throw new Error("user not existed")
        }
        // hashing password then save to db 
        // update the user with new password 
        user.password = await passwordHash(password, 10)
        await user.save()
        return res.status(200).json({
            success: true,
            message: "Changed Password Successfully",
            user
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }

}


exports.removeProfilePicture = async (req, res) => {
    try {
        const { userId } = req.user
        if (!userId) {
            throw new Error("User IS not authorized")
        }
        const resetImageUrl = `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}`
        const user = await User.findById(userId)
        user.image = resetImageUrl
        await user.save()
        return res.status(200).json({
            success: true,
            message: "Removed User Profile picture",
            user
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}