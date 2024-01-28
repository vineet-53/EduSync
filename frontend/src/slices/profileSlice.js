import { createSlice } from "@reduxjs/toolkit";
import {getItemFromLocalStorage} from "../utils/localStorage"
const initialState ={  
    loading : false,
    user :  getItemFromLocalStorage("user"),
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
        }, 
        setProfile : (state ,action) => {
            state.user.profile = action.payload
        }, 
        setUserImage : (state , action) => { 
            state.user.image = action.payload
        }
  
    }
})

export const  {setUser , setLoading , setProfile , setUserImage}  = profileSlice.actions; 
export default profileSlice.reducer