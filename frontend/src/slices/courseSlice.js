import { createSlice } from "@reduxjs/toolkit";
import { getItemFromLocalStorage } from "../utils/localStorage";

const initialState = {
    loading: false,
    stages: 3,
    currentStage: 1,
    categories: localStorage.getItem("categories") ? JSON.parse(localStorage.getItem("categories")) : []
}
const courseSlice = createSlice({
    name: "Course",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setCurrentStage: (state, action) => {
            state.currentStage = action.payload
        },
        setCategories: (state, action) => {
            state.categories = action.payload
        }

    }

})

export const { setLoading, setCourse, setCategories, setCurrentStage } = courseSlice.actions

export default courseSlice.reducer