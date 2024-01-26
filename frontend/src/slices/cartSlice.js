import { createSlice } from "@reduxjs/toolkit";

const initialState ={  
    loading : false ,
}


const cartSlice = createSlice({ 
    name : "Cart",  
    initialState,  
    reducers : { 
        setLoading : (state ,action) =>{ 
            state.loading = action.payload
        }
    }
})

export const  {}  = cartSlice.actions; 
export default cartSlice.reducer