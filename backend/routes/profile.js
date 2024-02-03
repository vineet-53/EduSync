const express = require('express')
const router = express.Router()
const { updateProfilePicture, changePassword, getUserDetails, updateProfile, deleteAccount, removeProfilePicture } = require('../controllers/profile')
const { getEnrolledCourses, getInstructorCourses } = require('../controllers/course')
const { auth, isInstructor } = require('../middlewares/auth')
router.put('/updateDisplayPicture', auth, updateProfilePicture)
router.put('/updateProfile', auth, updateProfile)
router.get('/getUserDetails', auth, getUserDetails)
router.delete('/deleteAccount', auth, deleteAccount)
router.post('/change-password', auth, changePassword)
router.delete('/removeProfilePicture', auth, removeProfilePicture)
router.get('/getEnrolledCourses', auth, getEnrolledCourses)
router.get('/getInstructorCourses', auth, isInstructor, getInstructorCourses)
router.get("/", async (req, res) => {
    return res.status(200).json({
        message: "profile routes "
        , success: true,
    })
})

module.exports = router