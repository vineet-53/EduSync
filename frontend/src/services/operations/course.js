import { setItemToLocalStorage } from "../../utils/localStorage";
import apiConnector from "../apiConnector";
import { courseEndpoints } from "../endpointsAPI";
import { setCart } from "../../slices/cartSlice";
import {
  setCategories,
  setCurrentStep,
  setLoading,
} from "../../slices/courseSlice";
import { toast } from "react-hot-toast";
export const setAllCatalog = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await apiConnector(
      "GET",
      courseEndpoints.GET_ALL_CATEGORY_API,
    );
    if (!response.data.success) {
      throw new Error("Error Fetching Course Catalogs");
    }
    dispatch(setCategories(response?.data?.response));
    setItemToLocalStorage("categories", response?.data?.response);
  } catch (err) {
    console.log(err.message);
  }
  dispatch(setLoading(false));
};
export const addToCart = (courseId, token, navigate) => async (dispatch) => {
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
        Authorization: "Bearer " + token,
      },
    );
    console.log(response);
    dispatch(setCurrentStep(2));
  } catch (err) {
    console.log(err);
    toast.error(err?.response?.data?.message);
  }
  toast.dismiss(toastId);
};
