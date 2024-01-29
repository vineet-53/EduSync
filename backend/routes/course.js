const express = require('express')
const router = express.Router()
const { createCourse, getAllCourses, getFullCourseDetails, getCourseDetails, updateCourse, deleteCourse, updateCourseProgress, addToCart, getFullCartDetails , removeItemFromCart } = require('../controllers/course')
const { createCategory, showAllCategories, updateCategory, getCategoryPageDetails } = require('../controllers/category')
const { addSection, addSubSection, deleteSection, deleteSubSection, updateSubSection, updateSection } = require('../controllers/section')
const { auth, isAdmin, isStudent, isInstructor } = require('../middlewares/auth')

router.post('/createCategory', auth, isAdmin, createCategory);
router.post('/updateCategoryPageDetails', auth, isAdmin, updateCategory);
router.get('/showAllCategories', showAllCategories);
router.post('/getCategoryPageDetails', getCategoryPageDetails);
// course
router.post("/createCourse", auth, isInstructor, createCourse);
router.get('/getAllCourses', getAllCourses)
router.post('/getFullCourseDetails', getFullCourseDetails)
router.put('/editCourse', auth, isInstructor, updateCourse)
router.delete('/deleteCourse', auth, isInstructor, deleteCourse)
router.post('/getCourseDetails', auth, getCourseDetails)
// section
router.post('/addSection', auth, isInstructor, addSection)
router.post('/updateSection', auth, isInstructor, updateSection)
router.post('/deleteSection', auth, isInstructor, deleteSection)
// sub section
router.post('/addSubSection', auth, isInstructor, addSubSection)
router.post('/updateSubSection', auth, isInstructor, updateSubSection)
router.post('/deleteSubSection', auth, isInstructor, deleteSubSection)

router.post('/updateCourseProgress', auth, updateCourseProgress)
router.post("/add-to-cart", auth, addToCart)
router.get("/getFullCartDetails", auth, getFullCartDetails)
router.post("/removeItemFromCart", auth, removeItemFromCart)

module.exports = router
