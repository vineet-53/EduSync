import { setLoading, setProfile, setUser } from "../../slices/profileSlice"
import { profileEndpoints } from "../endpointsAPI"
import apiConnector from "../apiConnector"
import { toast } from "react-hot-toast"
export const getUserProfile = (id) => async (dispatch) => {
    dispatch(setLoading(true))
    const toastId = toast.loading("Fetching user details")
    try {
        const response = await apiConnector("GET", profileEndpoints.GET_USER_DETAILS_API)
        console.log(response)
    } catch (err) {
        console.log(err.message)
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false))
}

export const updateProfile = (token , data) => async (dispatch) => {
    dispatch(setLoading(true))
    const toastId = toast.loading("Fetching user details")
    try {
        const response = await apiConnector("put", profileEndpoints.UPDATE_PROFILE_API, { ...data }, {
            "Authorization": `Bearer ${token}`
        } )
        console.log(response)

        dispatch(setProfile(response.data.updatedProfileDetails))
        toast.success("Updated Profile Details ")
    } catch (err) {
        console.log(err.message)
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false))
}
export const updateProfilePicture = (token , data) => async (dispatch) => {
    dispatch(setLoading(true))
    const toastId = toast.loading("Fetching user details")
    try {
        console.log(data)
        const response = await apiConnector("put", profileEndpoints.UPDATE_PROFILE_PICTURE_API, { ...data }, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
        })
        console.log(response)
    } catch (err) {
        console.log(err.message)
    }
    toast.dismiss(toastId)
    dispatch(setLoading(false))
}