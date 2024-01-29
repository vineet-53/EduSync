import { setLoading, setProfile, setUser, setUserImage } from "../../slices/profileSlice"
import { profileEndpoints } from "../endpointsAPI"
import apiConnector from "../apiConnector"
import { toast } from "react-hot-toast"
import { getItemFromLocalStorage, setItemToLocalStorage } from "../../utils/localStorage"
import axios from "axios"
export const getAndSetUserDetails = (token) => async (dispatch) => {
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
        const response = await apiConnector("put", profileEndpoints.UPDATE_PROFILE_API, { ...data }, {
            "Authorization": `Bearer ${token}`
        })
        console.log(response)

        dispatch(setProfile(response.data.updatedProfileDetails))
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

export const changePassword = (password, confirmPassword, token, navigate) => async dispatch => {
    dispatch(setLoading(true))
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
    dispatch(setLoading(false))
}


