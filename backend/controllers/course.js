const User = require("../models/User");
const { uploadToCloudinary } = require("../utilities/imageUploader");
const Course = require("../models/Course");
const Category = require("../models/Category");
const mongoose = require("mongoose");
const { Section, SubSection } = require("../models/Section");
const CourseProgress = require("../models/CourseProgress");
exports.createCourse = async (req, res) => {
  try {
    //get the input data
    const {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      tag,
      categoryId,
      instructions,
    } = req.body;
    const thumbnail = req.files.thumbnailImage;
    const { userId } = req.user;
    // validate data
    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !tag
    ) {
      throw new Error("missing details");
    }
    // find user with user id
    const user = await User.findById(userId);
    // validate user
    if (!user) {
      throw new Error("user not exist");
    }
    if (user.accountType !== "Instructor") {
      throw new Error("user is not authorised and not an instructor");
    }
    // validate the user is not uploading course twice
    let course = await Course.findOne({ instructor: userId });
    if (course && course.courseName === courseName) {
      throw new Error("Course already exists ");
    }
    dispatch(getCartFullDetails(token, navigate));
    // get category of course
    const category = await Category.findById(categoryId);
    // get link to thumbnail
    const thumbnailLink = await uploadToCloudinary(
      thumbnail.tempFilePath,
      process.env.CLOUD_FOLDER,
    );
    //create course
    const courseDetails = await Course.create({
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      tag,
      instructor: userId,
      thumbnailImage: thumbnailLink,
      category: categoryId,
      instructions,
    });
    // push course in user
    user.courses.push(courseDetails._id);
    // push course in category
    category.courses.push(courseDetails._id);
    await user.save();
    await category.save();
    res.status(200).json({
      success: true,
      message: "course created successfully",
      response: courseDetails,
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find(
      {},
      {
        courseName: true,
        courseDetails: true,
        price: true,
        courseContent: true,
        instructor: true,
      },
    )
      .populate("instructor")
      .exec();

    return res.status(200).json({
      success: true,
      message: "fetched all courses ",
      response: courses,
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};
exports.getFullCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;
    if (!courseId) {
      throw new Error("missing details");
    }
    const courseDetails = await Course.findById(courseId)
      .populate({
        path: "instructor",
        populate: {
          path: "profile",
        },
      })
      .populate({
        path: "sections",
        populate: {
          path: "subSection",
        },
      })
      .populate("category")
      // .populate({
      //     path : "ratingAndReviews" ,
      //     populate : {
      //         path : "user"
      //     }
      // })
      .populate({
        path: "tag",
        populate: {
          path: "courses",
        },
      })
      .populate({
        path: "studentEnrolled",
      })
      .exec();
    if (!courseDetails) {
      throw new Error("course not found");
    }
    console.log(courseDetails.tag);
    return res.status(200).json({
      success: true,
      message: "fetched all courses ",
      response: courseDetails,
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};
exports.updateCourse = async (req, res) => {
  try {
    const {
      courseName,
      courseDescription,
      tag,
      price,
      whatYouWillLearn,
      category: categoryId,
      courseId,
    } = req.body;
    const { thumbnailImage } = req.files;
    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !tag
    ) {
      throw new Error("missing details");
    }
    // find the course
    const course = await Course.findById(courseId);
    if (!course) {
      throw new Error("course not found");
    }
    if (categoryId) {
      // find the present category
      const presentCategoryId = course.category;
      const newCategoryId = categoryId;
      // remove course id from present category
      // find category
      const presentCategory = await Category.findById(presentCategoryId);
      presentCategory.courses =
        presentCategory.courses.filter((id) => id.toString() !== courseId) ||
        presentCategory.courses;
      await presentCategory.save();
      // add new category id to coures
      course.category = newCategoryId;
    }
    if (courseName) {
      course.courseName = courseName;
    }
    if (courseDescription) {
      course.courseDescription = courseDescription;
    }
    if (tag) {
      course.tag = tag;
    }
    if (price) {
      course.price = price;
    }
    if (whatYouWillLearn) {
      course.whatYouWillLearn = whatYouWillLearn;
    }
    if (thumbnailImage) {
      const imageLink = await uploadToCloudinary(
        thumbnailImage.tempFilePath,
        process.env.CLOUD_FOLDER,
      );
      course.thumbnailImage = imageLink;
    }
    const updatedCourse = await course.save();
    return res.status(200).json({
      success: true,
      message: "updated course successfully",
      response: updatedCourse,
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};
exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    if (!courseId) {
      throw new Error("course not existed");
    }
    const course = await Course.findById(courseId);
    if (!course) {
      throw new Error("course not found");
    }
    // find user
    const instructorId = course.instructor;
    const instructor = await User.findById(instructorId);
    if (instructor.courses) {
      instructor.courses =
        instructor.courses.filter((id) => id.toString() !== courseId) ||
        instructor.courses;
      await instructor.save();
    }

    const studentEnrolled = course.studentEnrolled;
    console.log(course);
    if (studentEnrolled) {
      for (let userId of studentEnrolled) {
        const user = await User.findById(userId);
        user.courses = user.courses
          ? user.courses.filter((id) => id.toString() !== courseId)
          : user.courses;
        await user.save();
      }
    }
    for (let sectionId of course.sections) {
      const section = await Section.findById(sectionId);
      if (section) {
        if (section.subSection) {
          for (let subSectionId of section.subSection) {
            await SubSection.findByIdAndDelete(subSectionId);
          }
        }
      }
      await Section.findByIdAndDelete(sectionId, {
        $pull: { courses: courseId },
      });
    }
    await Course.findByIdAndDelete(courseId);
    return res.status(200).json({
      success: true,
      message: "deleted course successfully",
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getCourseDetails = async (req, res) => {
  try {
    const courseId = req.body.courseId;
    if (!courseId) {
      throw new Error("missing params");
    }

    const course = await Course.findById(courseId).populate("instructor");
    if (!course) {
      throw new Error("course not found");
    }

    return res.status(200).json({
      success: true,
      message: "fetched course successfully",
      course,
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getInstructorCourses = async (req, res) => {
  try {
    const { userId } = req.user;
    if (!userId) {
      throw new Error("user not valid");
    }
    const allCourses = await Course.find({ instructor: userId });

    return res.status(200).json({
      success: true,
      message: "fetched enrolled courses",
      response: allCourses,
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getEnrolledCourses = async (req, res) => {
  try {
    const { userId } = req.user;
    if (!userId) {
      throw new Error("user not valid");
    }
    const user = await User.findById(userId).populate("courses").exec();
    if (!user) {
      throw new Error("user not exist");
    }
    return res.status(200).json({
      success: true,
      message: "fetched enrolled courses",
      response: user.courses,
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};

exports.updateCourseProgress = async (req, res) => {
  try {
    const { courseId, subsectionId: subSectionId } = req.body;
    // validdate
    if (!courseId || !subSectionId) {
      throw new Error("missing details");
    }
    const { userId } = req.user;
    const course = await Course.findById(courseId);
    const subSection = await SubSection.findById(subSectionId);
    if (!course || !subSection) {
      throw new Error("input model not exist in db");
    }
    let courseProgress = await CourseProgress.findOne({
      courseId: courseId,
      userId: userId,
    });
    if (!courseProgress) {
      throw new Error("course progress not exist");
    }
    if (courseProgress.completedVideos.includes(subSectionId)) {
      throw new Error("already completed subSection");
    }
    courseProgress.couseId = courseId;
    courseProgress.completedVideos.push(subSectionId);
    const updatedCP = await courseProgress.save();
    return res.status(200).json({
      success: true,
      message: "fetched enrolled courses",
      response: updatedCP,
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};

// exports.getProgressPercentage = async ( req ,res ) => {
//     try {
//         const {courseId} = req.body;
//         if(!courseId) {
//             throw new Error('missing details')
//         }
//         const courseProgress = await CourseProgress.find({courseId})
//         if(!courseProgress) {
//             throw new Error("course progress not found")
//         }
//         const course = await Course.findById(courseId)
//         if(!course) {
//             throw new Error("course not found")

//         }

//         return res.status(200).json({
//             success : true,
//             message  : "fetched enrolled courses",
//             courseProgress ,
//             percentage,
//         })
//     }catch(err) {
//         return res.status(401).json( {

//             success : false,
//             message : err.message
//         })
//     }
// }
exports.addToCart = async (req, res) => {
  try {
    const { courseId } = req.body;
    const { userId } = req.user;
    if (!userId) {
      throw new Error("user not authorized");
    }
    if (!courseId) {
      throw new Error("Please send all details ");
    }
    const user = await User.findById(userId);
    user.cart.push(courseId);
    await user.save();
    return res.status(200).json({
      success: true,
      message: "added to cart succcessfully",
      response: user.cart,
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getFullCartDetails = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await User.findById(userId).populate("cart").exec();
    if (!user) {
      throw new Error("user not existed");
    }
    await user.save();
    return res.status(200).json({
      success: true,
      message: "Sended full cart details",
      response: user.cart,
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};

exports.removeItemFromCart = async (req, res) => {
  try {
    const { userId } = req.user;
    const { courseId } = req.body;
    let user = await User.findById(userId).populate("cart");
    user.cart = user.cart.filter((course) => {
      return course._id.toString() !== courseId;
    });
    console.log(user.cart);
    await user.save();

    return res.status(200).json({
      success: true,
      message: "removed item from cart",
      response: user.cart,
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};

