import { createSlice } from "@reduxjs/toolkit";
import { getItemFromLocalStorage } from "../utils/localStorage"
const initialState = {
    loading: false,
    user: getItemFromLocalStorage("user"),
    enrolledCourses : getItemFromLocalStorage("user")?.courses ||  []
}
const profileSlice = createSlice({
    name: "Profile",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload
        }
        , setUser: (state, action) => {
            state.user = action.payload
        },
        setProfile: (state, action) => {
            state.user.profile = action.payload
        },
        setUserImage: (state, action) => {
            state.user.image = action.payload
        }, 
        setEnrolledCourses: (state, action) => {
            state.enrolledCourses = action.payload
        }

    }
})

export const { setUser, setLoading , setEnrolledCourses, setProfile, setUserImage } = profileSlice.actions;
export default profileSlice.reducer