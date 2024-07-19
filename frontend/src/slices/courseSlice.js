import { createSlice } from "@reduxjs/toolkit";
import { getItemFromLocalStorage } from "../utils/localStorage";
const initialState = {
  loading: false,
  course: getItemFromLocalStorage("course")
    ? getItemFromLocalStorage("course")
    : null,
  currentStep: getItemFromLocalStorage("currentStep")
    ? getItemFromLocalStorage("currentStep")
    : 1,
  categories: getItemFromLocalStorage("categories")
    ? getItemFromLocalStorage("categories")
    : [],
  editCourse: false,
  editSectionId: null,
  editSubSection: false,
  editSubSectionId: null,
  showAddLectureForm: false,
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
    setCourse: (state, action) => {
      state.course = action.payload;
    },
    setEditStatus: (state, action) => {
      state.editCourse = action.payload;
    },
    setEditSection: function (state, action) {
      state.editSection = action.payload;
    },
    setEditSectionId: function (state, action) {
      state.editSectionId = action.payload;
    },
    setEditSubSection: function (state, action) {
      state.editSubSection = action.payload;
    },
    setShowAddLectureForm: function (state, action) {
      state.showAddLectureForm = action.payload;
    },
  },
});

export const {
  setEditStatus,
  setLoading,
  setCourse,
  setCategories,
  setCurrentStep,
  setEditSection,
  setEditSubSection,
  setEditSectionId,
  setShowAddLectureForm,
} = courseSlice.actions;

export default courseSlice.reducer;
