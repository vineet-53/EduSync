const API_VERSION = "/api/v1"
export const courseEndpoints = { 

    // cateogry
    CREATE_CATEGORY : API_VERSION +  "/courses/createCategory",
    UPDATE_CATEGORY : API_VERSION +  "/courses/updateCategoryPageDetails",
    GET_ALL_CATEGORY : API_VERSION + "/courses/showAllCategories", 
    GET_CATEGORY_PAGE_DETAILS : API_VERSION +  "/courses/getCategoryPageDetails",
    // course
    CREATE_COURSE : API_VERSION +  "/courses/createCourse",  
    GET_ALL_COURSE : API_VERSION +  "/courses/getAllCourses", 
    GET_FULL_COURSE_DETAILS : API_VERSION +  "/courses/getFullCourseDetails", 
    UPDATE_COURSE : API_VERSION +  "/courses/editCourse" , 
    DELETE_COURSE: API_VERSION +  "/courses/deleteCourse" , 
    GET_COURSE_DETAILS : API_VERSION +  "/courses/getCourseDetails",
    // section 
    CREATE_SECTION : API_VERSION +  "/courses/addSection" , 
    UPDATE_SECTION :API_VERSION +  "/courses/updateSection",  
    DELETE_SECTION :API_VERSION +  "/courses/deleteSection" , 
  
  
    //SUB SECTION 
    CREATE_SUB_SECTION : API_VERSION +  "/courses/addSubSection",  
    UPDATE_SUB_SECTION :API_VERSION +  "/courses/updateSubSection" , 
    DELETE_SUB_SECTION : API_VERSION +  "/courses/deleteSubSection" , 
    UPDATE_COURSE_PROGRESS : API_VERSION +  "/courses/updateCourseProgress"
  }
  
  
  export const authEndpoints = { 
    SIGN_UP : API_VERSION +  "/auth/signup", 
    LOGIN : API_VERSION +  "/auth/login", 
    SEND_OTP: API_VERSION +  "/auth/sendotp", 
    CHANGE_ACCOUNT_TYPE: API_VERSION +  "/auth/changeAccountType", 
  
  }
  export const profileEndpoints = { 
    UPDATE_PROFILE_PICTURE : API_VERSION +  "/profile/updateDisplayPicture" , 
    UPDATE_PROFILE : API_VERSION +  "/profile/updateProfile", 
    GET_USER_DETAILS : API_VERSION +  "/profile/getUserDetails" , 
    DELETE_PROFILE :API_VERSION +  "/profile/deleteProfile",  
    CHANGE_PASSWORD : API_VERSION +  "/profile/change-password" , 
    GET_ENROLLED_COURSES : API_VERSION +  "/profile/getEnrolledCourses", 
    GET_INSTRUCTOR_COURSES : API_VERSION +  "/profile/getInstructorCourses"
  
  }
  
  
  export const rootEndpoints = { 
    RESET_PASSWORD_TOKEN : API_VERSION +  "/reset-password-token",  
  }