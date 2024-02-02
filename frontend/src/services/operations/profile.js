import { setEnrolledCourses, setLoading, setProfile, setUser, setUserImage } from "../../slices/profileSlice"
import { profileEndpoints } from "../endpointsAPI"
import apiConnector from "../apiConnector"
import { toast } from "react-hot-toast"
import { getItemFromLocalStorage, setItemToLocalStorage } from "../../utils/localStorage"
import { logout } from "./auth"
import axios from "axios"
const { REMOVE_PROFILE_PICTURE_API } = profileEndpoints
export const getAndSetUserDetails = (token, navigate) => async (dispatch) => {
    dispatch(setLoading(true))
    try {
        const response = await apiConnector("GET", profileEndpoints.GET_USER_DETAILS_API, null, {
            Authorization: "Bearer " + token
        })
        console.log(response)
        dispatch(setUser(response.data.user))
        setItemToLocalStorage("user", response.data.user)
    } catch (err) {
        console.log(err)
        navigate('/404-not-found')
    }
    dispatch(setLoading(false))
}
export const updateProfile = (token, data) => async (dispatch) => {
    dispatch(setLoading(true))
    const toastId = toast.loading("Fetching user details")
    try {
        const response = await apiConnector("PUT", profileEndpoints.UPDATE_PROFILE_API, { ...data }, {
            Authorization: `Bearer ${token}`
        })
        console.log(response)
        dispatch(setUser(response.data.user))
        setItemToLocalStorage("user", response.data.user)
        toast.success("Updated Profile Details ")
    } catch (err) {
        console.log(err)
        toast.error("Error Updating User Profile")
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false))
}
export const updateProfilePicture = (token, data) => async (dispatch) => {
    dispatch(setLoading(true))
    const toastId = toast.loading("Updating Profile Picture")
    try {
        const image = data[0]
        const response = await apiConnector("put", profileEndpoints.UPDATE_PROFILE_PICTURE_API, { image }, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
        })
        console.log(response)
        dispatch(setUserImage(response.data.user.image))
        // change localstorage
        const user = getItemFromLocalStorage("user")
        setItemToLocalStorage("user", { ...user, image: response.data.user.image })
        toast.success("Updated User Image Successfully")
    } catch (err) {
        console.log(err)
        toast.error("Error Updating Profile Picture")
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false))
}

export const changePassword = async (password, confirmPassword, token) => {
    const toastId = toast.loading("Changing Password....")
    try {
        const response = await axios.post(profileEndpoints.CHANGE_PASSWORD_API, { password, confirmPassword }, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
        console.log(response)
        toast.success("Changed Password Successfully")
    } catch (err) {
        console.log(err)
        toast.error("Error Changing Password")
    }
    toast.dismiss(toastId)
}
export const fetchEnrolledCourses = async (token) => {
    let result = []
    try {
        const response = await apiConnector("GET", profileEndpoints.GET_ENROLLED_COURSES_API, null, {
            Authorization: "Bearer " + token
        })
        console.log("SUCCESSFULLY FETCHED AND SET COURSES ")
        result = response.data.enrolledCourses
    } catch (err) {
        throw new Error("Error Fetching Enrolled Courses")
    }
    finally {
        return result
    }
}

export const deleteAccount = (token, navigate) => async dispatch => {
    const toastId = toast.loading("Deleting Account....")
    try {
        const response = await apiConnector("DELETE", profileEndpoints.DELETE_PROFILE_API, null, {
            Authorization: "Bearer " + token
        })
        console.log(response)
        toast.success("Delete Account Successfully")
        dispatch(logout(null, navigate))
    } catch (err) {
        console.log(err)
        navigate('/404-not-found')
    }
    toast.dismiss(toastId)
}


export const removeProfilePicture = (token) => async dispatch => {
    const toastId = toast.loading("Removing Profile Picture....")
    try {
        const response = await apiConnector("GET", REMOVE_PROFILE_PICTURE_API, null, {
            Authorization: "Bearer " + token
        })
        if (!response.data.sucess) {
            throw new Error("RESPONSE ERROR")
        }
        toast.success("Removed Profile Picture Successfully!")
    } catch (err) {
        console.log('ERROR RMEOVING PROFILE PICTURE', err.message)
        toast.error("Error Removing profile picture!")
    }
    toast.dismiss(toastId)
}