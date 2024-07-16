const API_VERSION = "/api/v1";
export const courseEndpoints = {
  // cateogry
  CREATE_CATEGORY_API: API_VERSION + "/course/createCategory",
  UPDATE_CATEGORY_API: API_VERSION + "/course/updateCategoryPageDetails",
  GET_ALL_CATEGORY_API: API_VERSION + "/course/showAllCategories",
  GET_CATEGORY_PAGE_DETAILS_API: API_VERSION + "/course/getCategoryPageDetails",
  // course
  CREATE_COURSE_API: API_VERSION + "/course/createCourse",
  GET_ALL_COURSE_API: API_VERSION + "/course/getAllCourses",
  GET_FULL_COURSE_DETAILS_API: API_VERSION + "/course/getFullCourseDetails",
  UPDATE_COURSE_API: API_VERSION + "/course/editCourse",
  DELETE_COURSE_API: API_VERSION + "/course/deleteCourse",
  GET_COURSE_DETAILS_API: API_VERSION + "/course/getCourseDetails",
  // section
  CREATE_SECTION_API: API_VERSION + "/course/addSection",
  UPDATE_SECTION_API: API_VERSION + "/course/updateSection",
  DELETE_SECTION_API: API_VERSION + "/course/deleteSection",

  //SUB SECTION
  CREATE_SUB_SECTION_API: API_VERSION + "/course/addSubSection",
  UPDATE_SUB_SECTION_API: API_VERSION + "/course/updateSubSection",
  DELETE_SUB_SECTION_API: API_VERSION + "/course/deleteSubSection",
  UPDATE_COURSE_PROGRESS_API: API_VERSION + "/course/updateCourseProgress",
  // cart
  ADD_TO_CART: API_VERSION + "/course/add-to-cart",
  GET_FULL_CART_DETAILS_API: API_VERSION + "/course/getFullCartDetails",
  REMOVE_ITEM_FROM_CART_API: API_VERSION + "/course/removeItemFromCart",
};

export const authEndpoints = {
  SIGN_UP_API: API_VERSION + "/auth/signup",
  LOGIN_API: API_VERSION + "/auth/login",
  LOGOUT: API_VERSION + "/auth/logout",
  SEND_OTP_API: API_VERSION + "/auth/sendotp",
  CHANGE_ACCOUNT_TYPE_API: API_VERSION + "/auth/changeAccountType",
  GET_USER: API_VERSION + "/auth/getuser",
};
export const profileEndpoints = {
  UPDATE_PROFILE_PICTURE_API: API_VERSION + "/profile/updateProfilePicture",
  UPDATE_PROFILE_API: API_VERSION + "/profile/updateProfile",
  GET_USER_DETAILS_API: API_VERSION + "/profile/getUserDetails",
  DELETE_PROFILE_API: API_VERSION + "/profile/deleteAccount",
  CHANGE_PASSWORD_API: API_VERSION + "/profile/change-password",
  GET_ENROLLED_COURSES_API: API_VERSION + "/profile/getEnrolledCourses",
  GET_INSTRUCTOR_COURSES_API: API_VERSION + "/profile/getInstructorCourses",
  REMOVE_PROFILE_PICTURE_API: API_VERSION + "/profile/removeProfilePicture",
};

export const rootEndpoints = {
  RESET_PASSWORD_TOKEN_API: API_VERSION + "/reset-password-token",
  UPDATE_PASSWORD: API_VERSION + "/update-password",
  CONTACT_US: API_VERSION + "/contact-us",
};
