import { createSlice } from "@reduxjs/toolkit";
import { getItemFromLocalStorage } from "../utils/localStorage";
const initialState = {
  loading: false,
  courses: getItemFromLocalStorage("courses")
    ? getItemFromLocalStorage("courses")
    : [],
  currentStep: 1,
  categories: getItemFromLocalStorage("courses")
    ? getItemFromLocalStorage("courses")
    : [],
};
const courseSlice = createSlice({
  name: "Course",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
  },
});

export const { setLoading, setCourses, setCategories, setCurrentStep } =
  courseSlice.actions;

export default courseSlice.reducer;
