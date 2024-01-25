import { createSlice } from "@reduxjs/toolkit";

const initialState ={  
    loading : false,
    user : null,
}

const profileSlice = createSlice({ 
    name : "Profile",  
    initialState,  
    reducers : { 
        setLoading : (state ,action) => {
            state.loading = action.payload
        }
        ,setUser :  (state , action) => { 
            state.user = action.payload
        }
  
    }
})

export const  {setUser , setLoading}  = profileSlice.actions; 
export default profileSlice.reducer