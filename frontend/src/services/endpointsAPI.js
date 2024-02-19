const API_VERSION = "/api/v1"
const API_ENDPOINT = "https://study-notion-backend-rust.vercel.app/"
export const courseEndpoints = {
  // cateogry
  CREATE_CATEGORY_API: API_ENDPOINT + API_VERSION + "/courses/createCategory",
  UPDATE_CATEGORY_API: API_ENDPOINT + API_VERSION + "/courses/updateCategoryPageDetails",
  GET_ALL_CATEGORY_API: API_ENDPOINT + API_VERSION + "/courses/showAllCategories",
  GET_CATEGORY_PAGE_DETAILS_API: API_ENDPOINT + API_VERSION + "/courses/getCategoryPageDetails",
  // course
  CREATE_COURSE_API: API_ENDPOINT + API_VERSION + "/courses/createCourse",
  GET_ALL_COURSE_API: API_ENDPOINT + API_VERSION + "/courses/getAllCourses",
  GET_FULL_COURSE_DETAILS_API: API_ENDPOINT + API_VERSION + "/courses/getFullCourseDetails",
  UPDATE_COURSE_API: API_ENDPOINT + API_VERSION + "/courses/editCourse",
  DELETE_COURSE_API: API_ENDPOINT + API_VERSION + "/courses/deleteCourse",
  GET_COURSE_DETAILS_API: API_ENDPOINT + API_VERSION + "/courses/getCourseDetails",
  // section 
  CREATE_SECTION_API: API_ENDPOINT + API_VERSION + "/courses/addSection",
  UPDATE_SECTION_API: API_ENDPOINT + API_VERSION + "/courses/updateSection",
  DELETE_SECTION_API: API_ENDPOINT + API_VERSION + "/courses/deleteSection",


  //SUB SECTION 
  CREATE_SUB_SECTION_API: API_ENDPOINT + API_VERSION + "/courses/addSubSection",
  UPDATE_SUB_SECTION_API: API_ENDPOINT + API_VERSION + "/courses/updateSubSection",
  DELETE_SUB_SECTION_API: API_ENDPOINT + API_VERSION + "/courses/deleteSubSection",
  UPDATE_COURSE_PROGRESS_API: API_ENDPOINT + API_VERSION + "/courses/updateCourseProgress",
  // cart
  ADD_TO_CART : API_ENDPOINT + API_VERSION + "/courses/add-to-cart", 
  GET_FULL_CART_DETAILS_API : API_ENDPOINT + API_VERSION + "/courses/getFullCartDetails", 
  REMOVE_ITEM_FROM_CART_API : API_ENDPOINT + API_VERSION + "/courses/removeItemFromCart"
}


export const authEndpoints = {
  SIGN_UP_API: API_ENDPOINT + API_VERSION + "/auth/signup",
  LOGIN_API: API_ENDPOINT + API_VERSION + "/auth/login",
  LOGOUT : API_ENDPOINT + API_VERSION + "/auth/logout", 
  SEND_OTP_API: API_ENDPOINT + API_VERSION + "/auth/sendotp",
  CHANGE_ACCOUNT_TYPE_API: API_ENDPOINT + API_VERSION + "/auth/changeAccountType",
}
export const profileEndpoints = {
  UPDATE_PROFILE_PICTURE_API: API_ENDPOINT + API_VERSION + "/profile/updateDisplayPicture",
  UPDATE_PROFILE_API: API_ENDPOINT + API_VERSION + "/profile/updateProfile",
  GET_USER_DETAILS_API: API_ENDPOINT + API_VERSION + "/profile/getUserDetails",
  DELETE_PROFILE_API: API_ENDPOINT + API_VERSION + "/profile/deleteAccount",
  CHANGE_PASSWORD_API: API_ENDPOINT + API_VERSION + "/profile/change-password",
  GET_ENROLLED_COURSES_API: API_ENDPOINT + API_VERSION + "/profile/getEnrolledCourses",
  GET_INSTRUCTOR_COURSES_API: API_ENDPOINT + API_VERSION + "/profile/getInstructorCourses",
  REMOVE_PROFILE_PICTURE_API : API_ENDPOINT + API_VERSION + "/profile/removeProfilePicture"
}


export const rootEndpoints = {
  RESET_PASSWORD_TOKEN_API: API_ENDPOINT + API_VERSION + "/reset-password-token",
  UPDATE_PASSWORD: API_ENDPOINT + API_VERSION + "/update-password",
  CONTACT_US: API_ENDPOINT + API_VERSION + "/contact-us",
}