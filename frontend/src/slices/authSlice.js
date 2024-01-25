import { createSlice } from "@reduxjs/toolkit";

const initialState ={  
    user : null, 
    token : null, 
    loading : false, 
}

const authSlice = createSlice({ 
    name : "Auth",  
    initialState,  
    reducers : { 
        setToken : (state , action) => state.token = action.payload, 
        setUser : (state , action) => state.user = action.payload,
        setLoading : (state , action) => state.loading = action.payload,
    }
})

export const  {setToken , setUser}  = authSlice.actions; 
export default authSlice.reducer