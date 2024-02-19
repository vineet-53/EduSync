import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    loading: false,
    currentStep: 1,
    categories: localStorage.getItem("categories") ? JSON.parse(localStorage.getItem("categories")) : []
}
const courseSlice = createSlice({
    name: "Course",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setCurrentStep: (state, action) => {
            state.currentStep = action.payload
        },
        setCategories: (state, action) => {
            state.categories = action.payload
        }
    }
})

export const { setLoading, setCourse, setCategories, setCurrentStep } = courseSlice.actions

export default courseSlice.reducer