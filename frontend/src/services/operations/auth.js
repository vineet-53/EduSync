import apiConnector from "../apiConnector";
import { authEndpoints } from "../endpointsAPI";
import { ToastBar, toast } from "react-hot-toast";
import { setLoading, setToken } from "../../slices/authSlice";
import { setProfile, setUser } from "../../slices/profileSlice";
import { setItemToLocalStorage } from "../../utils/localStorage";

export const getLocalUser = async (token) => {
  try {
    // make call to backend and
    const response = await apiConnector("post", authEndpoints.GET_USER, {
      token,
    });
    if (response.success == false) {
      throw new Error("Error Fetching User");
    }
    const user = response?.data?.user;
    console.log("Fetched User Out of token ", user);
    // set the user to local storage
    return user;
  } catch (err) {
    console.log(err.message);
    return null;
  }
};

export const login = (email, password, navigate) => async (dispatch) => {
  const toastId = toast.loading("Loading...");
  dispatch(setLoading(true));
  try {
    const response = await apiConnector("post", authEndpoints.LOGIN_API, {
      email,
      password,
    });

    console.log("LOGIN API RESPONSE............", response?.data);

    if (!response.data.success || response.status !== 200) {
      throw new Error(response.data.message);
    }

    toast.success("Login Successful");
    dispatch(setToken(response?.data?.response?.token));
    dispatch(
      setUser({
        ...response?.data?.response?.user,
      }),
      setProfile(response?.data?.response?.profile),
    );
    setItemToLocalStorage("token", response?.data?.response?.token);
    setItemToLocalStorage("user", {
      ...response?.data?.response?.user,
      profile: response?.data?.response?.profile,
    });
    navigate("/dashboard/my-profile");
  } catch (error) {
    console.log("LOGIN API ERROR............", error);
    toast.error("Login Failed");
  }
  dispatch(setLoading(false));
  toast.dismiss(toastId);
};

export const sendOTP = (email, navigate) => async (dispatch) => {
  const toastId = toast.loading("Loading...");
  dispatch(setLoading(true));
  try {
    const response = await apiConnector("post", authEndpoints.SEND_OTP_API, {
      email,
    });
    console.log(response);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    toast.success("succesfully sended OTP");
    navigate("/verify-email");
  } catch (err) {
    console.log("Error sending OTP", err.message);
    toast.error("Could not send OTP");
  }
  dispatch(setLoading(false));
  toast.dismiss(toastId);
};

export const signup = (signupData, otp, navigate) => async (dispatch) => {
  const toastId = toast.loading("Signing up...");
  dispatch(setLoading(true));
  try {
    const response = await apiConnector("post", authEndpoints.SIGN_UP_API, {
      ...signupData,
      otp,
    });
    if (!response.data.success) {
      // make a call to api to server
      throw new Error(response.data.message);
    }
    toast.success(response.data.message);
    navigate("/login");
  } catch (err) {
    console.log("SIGN UP ERROR.......", err);
    toast.error("Signup Failed");
  }
  dispatch(setLoading(true));
  toast.dismiss(toastId);
};

export const logout = (email, navigate) => async (dispatch) => {
  try {
    if (email !== null) {
      await apiConnector("post", authEndpoints.LOGOUT, { email });
    }
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // clear the user and token from redux store
    dispatch(setToken(null));
    dispatch(setUser(null));
    toast.success("Logged Out!");
    navigate("/");
  } catch (err) {
    console.log("LOGOUT FAILED ----> ", err);
    toast.error("Logout Failed!");
  }
};
