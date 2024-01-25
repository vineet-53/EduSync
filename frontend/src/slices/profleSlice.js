import { createSlice } from "@reduxjs/toolkit";

const initialState ={  
    loading : false,
}

const profileSlice = createSlice({ 
    name : "Profile",  
    initialState,  
    reducers : { 
        setLoading : (state ,action) => state.loading = action.payload
  
    }
})

export const  {}  = profileSlice.actions; 
export default profileSlice.reducer