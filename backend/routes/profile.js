const express  = require('express')
const { changePassword } = require('../controllers/auth')
const router = express.Router() 
const  {updateProfilePicture, getUserDetails ,updateProfile , deleteProfile} = require('../controllers/profile')
const {getEnrolledCourses , getInstructorCourses} = require('../controllers/course')
const {auth , isInstructor} = require('../middlewares/auth')
router.put('/updateDisplayPicture' ,auth ,  updateProfilePicture)
router.put('/updateProfile' ,auth ,  updateProfile)
router.get('/getUserDetails' ,auth ,  getUserDetails)
router.delete('/deleteProfile' ,auth ,  deleteProfile)
router.post('/change-password' , auth , changePassword)

router.get('/getEnrolledCourses' , auth , getEnrolledCourses)
router.get('/getInstructorCourses' , auth , isInstructor , getInstructorCourses)
router.get("/" , async ( req , res) => { 

    return res.status(200).json({ 
        message : "profile routes "
        ,success :true ,
    })
})

module.exports = router