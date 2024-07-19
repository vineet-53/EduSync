const express = require("express");
const courseRouter = express.Router();
const {
  createCourse,
  getAllCourses,
  getFullCourseDetails,
  getCourseDetails,
  updateCourse,
  deleteCourse,
  updateCourseProgress,
  addToCart,
  getFullCartDetails,
  removeItemFromCart,
} = require("../controllers/course");
const {
  createCategory,
  showAllCategories,
  updateCategory,
  getCategoryPageDetails,
} = require("../controllers/category");
const {
  addSection,
  addSubSection,
  deleteSection,
  deleteSubSection,
  updateSubSection,
  updateSection,
} = require("../controllers/section");
const {
  auth,
  isAdmin,
  isStudent,
  isInstructor,
} = require("../middlewares/auth");

courseRouter.get("/", (req, res) => {
  res.send("Course Route");
});

courseRouter.post("/createCategory", auth, isAdmin, createCategory);
courseRouter.post("/updateCategoryPageDetails", auth, isAdmin, updateCategory);
courseRouter.get("/showAllCategories", showAllCategories);
courseRouter.post("/getCategoryPageDetails", getCategoryPageDetails);
// course
courseRouter.post("/createCourse", auth, isInstructor, createCourse);
courseRouter.get("/getAllCourses", getAllCourses);
courseRouter.post("/getFullCourseDetails", getFullCourseDetails);
courseRouter.put("/editCourse", auth, isInstructor, updateCourse);
courseRouter.delete("/deleteCourse", auth, isInstructor, deleteCourse);
// section
courseRouter.post("/getCourseDetails", auth, getCourseDetails);
courseRouter.post("/addSection", auth, isInstructor, addSection);
courseRouter.post("/updateSection", auth, isInstructor, updateSection);
courseRouter.delete("/deleteSection", auth, isInstructor, deleteSection);
// sub section
courseRouter.post("/addSubSection", auth, isInstructor, addSubSection);
courseRouter.post("/updateSubSection", auth, isInstructor, updateSubSection);
courseRouter.delete("/deleteSubSection", auth, isInstructor, deleteSubSection);

courseRouter.post("/updateCourseProgress", auth, updateCourseProgress);
courseRouter.post("/add-to-cart", auth, addToCart);
courseRouter.get("/getFullCartDetails", auth, getFullCartDetails);
courseRouter.post("/removeItemFromCart", auth, removeItemFromCart);

module.exports = courseRouter;
