import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
    courseList : { type :null , payload : []}
}
const courseSlice = createSlice({ 
    name : "Course", 
    initialState , 
    reducers : { 
        setCourseList  : (state , action) =>{ 
            state.courseList = action.payload
        }
    }
})



export default courseSlice.reducer