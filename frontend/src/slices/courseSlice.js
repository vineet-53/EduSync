import { createSlice } from "@reduxjs/toolkit";

const initialState ={  
    loading : false ,
}


const courseSlice = createSlice({ 
    name : "Course",  
    initialState,  
    reducers : { 
        setLoading : (state ,action) => state.loading = action.payload
    }
})

export const  {}  = courseSlice.actions; 
export default courseSlice.reducer