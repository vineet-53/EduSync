import { setItemToLocalStorage } from "../../utils/localStorage";
import apiConnector from "../apiConnector";
import { courseEndpoints } from "../endpointsAPI";
import { setCart } from "../../slices/cartSlice";
import {
  setCategories,
  setCourse,
  setCurrentStep,
  setEditStatus,
  setLoading,
} from "../../slices/courseSlice";
import toast from "react-hot-toast";
export const setAllCatalog = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await apiConnector(
      "GET",
      courseEndpoints.GET_ALL_CATEGORY_API,
    );
    if (!response?.data?.success) {
      throw new Error("Error Fetching Course Catalogs");
    }
    dispatch(setCategories(response?.data?.response));
    setItemToLocalStorage("categories", response?.data?.response);
  } catch (err) {
    console.log(err.message);
  }
  dispatch(setLoading(false));
};
export const addToCart = (courseId, token, navigate) => async () => {
  const toastId = toast.loading("Adding To Cart ....");
  try {
    const response = await apiConnector(
      "POST",
      courseEndpoints.ADD_TO_CART,
      {
        courseId,
      },
      {
        Authorization: "Bearer " + token,
      },
    );
    if (!response.data.success) {
      toast.error("Error Adding To Cart");
      throw new Error("Error Adding To Cart");
    }
    toast.success("Added To cart Succesfully!");
    navigate("/dashboard/cart");
  } catch (err) {
    console.log(err);
  }
  toast.dismiss(toastId);
};

export const getCartFullDetails = (token, navigate) => async (dispatch) => {
  try {
    const response = await apiConnector(
      "GET",
      courseEndpoints.GET_FULL_CART_DETAILS_API,
      null,
      {
        Authorization: "Bearer " + token,
      },
    );
    dispatch(setCart(response.data.cart));
    setItemToLocalStorage("cart", response.data.cart);
  } catch (err) {
    console.log(err);
  }
};
export const removeItemFromCart =
  (courseId, token, navigate) => async (dispatch) => {
    try {
      const response = await apiConnector(
        "POST",
        courseEndpoints.REMOVE_ITEM_FROM_CART_API,
        { courseId },
        {
          Authorization: "Bearer " + token,
        },
      );
      dispatch(setCart(response.data.cart));
      setItemToLocalStorage("cart", response.data?.cart);
    } catch (err) {
      console.log(err);
      navigate("/404-not-found");
    }
  };

export const createCourse = (data, token) => async (dispatch) => {
  const toastId = toast.loading("Creating New Course");
  try {
    const response = await apiConnector(
      "POST",
      courseEndpoints.CREATE_COURSE_API,
      data,
      {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token,
      },
    );
    if (!response.data?.success) {
      toast.error("Error Adding Course");
      throw new Error("Error Adding Course");
    }
    console.log("COURSE INFORMATION CREATED:- \n", response);
    setItemToLocalStorage("course", response.data.response);
    dispatch(setCourse(response.data.response));
    dispatch(setEditStatus(true));
    dispatch(setCurrentStep(2));
    setItemToLocalStorage("currentStep", 2);
    toast.success("Proceeding to next step...");
  } catch (err) {
    console.log(err);
    toast.error(err?.response?.data?.message);
  }
  toast.dismiss(toastId);
};
export const createSection = (data, token) => async (dispatch) => {
  try {
    const response = await apiConnector(
      "POST",
      courseEndpoints.CREATE_SECTION_API,
      data,
      {
        Authorization: "Bearer " + token,
      },
    );
    if (!response.data?.success) {
      toast.error("Error Adding Section");
      throw new Error("Error Adding Section");
    }
    console.log("New Section CREATED:- \n", response);
    dispatch(setCourse(response.data.response.updatedCourse));
    setItemToLocalStorage("course", response.data.response.updatedCourse);
    toast.success("Section Created Succesfully");
  } catch (err) {
    console.log(err);
    toast.error(err?.response?.data?.message);
  }
};
export const getCourseDetails = async (courseId, token) => {
  try {
    const response = await apiConnector(
      "POST",
      courseEndpoints.GET_COURSE_DETAILS_API,
      { courseId },
      {
        Authorization: `Bearer ${token}`,
      },
    );
    if (
      response.data?.success == false ||
      response.data?.response?.success == false
    ) {
      throw new Error("Error Fetching course details");
    }
    console.log("Course Details Fetched Successfully");
    return response;
  } catch (err) {
    console.log(err);
    throw new Error("Error fetching course details");
  }
};
export const setCurrentCourse = (courseId, token) => async (dispatch) => {
  const toastId = toast.loading("Fetching Course Information");
  try {
    const response = await getCourseDetails(courseId, token);
    console.log("UPDATED COURSE -:", response);
    const updatedCourse = response.data?.course;
    dispatch(setCourse(updatedCourse));
    setItemToLocalStorage("course", updatedCourse);
  } catch (err) {
    toast.error("Error Fetching Course Information");
    console.log(err);
  }
  toast.dismiss(toastId);
};
export const deleteSectionReq = async (data, token) => {
  try {
    const response = await apiConnector(
      "DELETE",
      courseEndpoints.DELETE_SECTION_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      },
    );
    if (response.data?.success == false) {
      throw new Error(response.data?.message);
    }
    console.log("Deleted Section Successfully");
    return response;
  } catch (err) {
    console.log(err);
    throw new Error("Deleted Section Successfully");
  }
};
export const deleteSection = (data, token) => async (dispatch) => {
  const toastId = toast.loading("Deleting Section");
  try {
    const response = await deleteSectionReq(data, token);
    const updatedCourse = response.data.course;
    dispatch(setCourse(updatedCourse));
    setItemToLocalStorage("course", updatedCourse);
  } catch (err) {
    console.log(err);
    toast.error("Error Deleting Section");
  }
  toast.dismiss(toastId);
};
export const updateSection = (data, token) => async (dispatch) => {
  const toastId = toast.loading("Updating Section...");
  try {
    const response = await apiConnector(
      "POST",
      courseEndpoints.UPDATE_SECTION_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      },
    );
    console.log(response);
    toast.success("Upadted Section details");
    dispatch(setCurrentCourse(data.courseId, token));
  } catch (err) {
    console.log("Error updating section");
    toast.error("Error updating section");
  }
  toast.dismiss(toastId);
};
export const createLecture = (data, token) => async (dispatch) => {
  const toastId = toast.loading("Adding Lecture");
  try {
    const response = await apiConnector(
      "POST",
      courseEndpoints.CREATE_SUB_SECTION_API,
      data,
      {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    );
    console.log(response);
    toast.success("Upadted Section details");
    dispatch(setCurrentCourse(data.courseId, token));
  } catch (err) {
    console.log("Error updating section");
    toast.error("Error updating section");
  }
  toast.dismiss(toastId);
};
