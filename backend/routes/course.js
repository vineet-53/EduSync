const express  = require('express')
const router = express.Router() 
const {createCourse ,getAllCourses , getFullCourseDetails,getCourseDetails  ,updateCourse ,  deleteCourse ,updateCourseProgress} = require('../controllers/course')
const { createCategory , showAllCategories , updateCategory , getCategoryPageDetails } = require('../controllers/category')
const {addSection , addSubSection, deleteSection , deleteSubSection , updateSubSection , updateSection} = require('../controllers/section')
const {auth , isAdmin , isStudent , isInstructor} = require('../middlewares/auth')

router.post('/createCategory' ,auth, isAdmin, createCategory) ;
router.post('/updateCategoryPageDetails',  auth, isAdmin,updateCategory) ;
router.get('/showAllCategories' , auth, isAdmin,showAllCategories) ;
router.post('/getCategoryPageDetails', auth, isAdmin, getCategoryPageDetails); 
// course
router.post("/createCourse" , auth , isInstructor ,createCourse); 
router.get('/getAllCourses' ,auth , isInstructor , getAllCourses)
router.post('/getFullCourseDetails' ,auth , isInstructor , getFullCourseDetails)
router.put('/editCourse' , auth , isInstructor , updateCourse)
router.delete('/deleteCourse' ,auth , isInstructor , deleteCourse)
router.post('/getCourseDetails' , auth ,isInstructor , getCourseDetails)
// section
router.post('/addSection' , auth , isInstructor , addSection)
router.post('/updateSection' , auth , isInstructor , updateSection)
router.post('/deleteSection' , auth ,isInstructor , deleteSection)
// sub section
router.post('/addSubSection' , auth , isInstructor , addSubSection)
router.post('/updateSubSection' , auth , isInstructor , updateSubSection)
router.post('/deleteSubSection' , auth ,isInstructor , deleteSubSection)

router.post('/updateCourseProgress',  auth , updateCourseProgress)


module.exports = router
