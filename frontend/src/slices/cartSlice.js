import { createSlice } from "@reduxjs/toolkit";
import { getItemFromLocalStorage } from "../utils/localStorage";

const initialState = {
    loading: false,
    cart: getItemFromLocalStorage("cart") || [],
}
const cartSlice = createSlice({
    name: "Cart",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setItem: (state, action) => {
            state.cart = [...state.cart, action.payload]
        },
        setCart : (state ,action) => { 
            state.cart = action.payload
        },
        removeItem: (state, action) => {
            state.cart = state.cart.filter(id => id !== action.payload)
        }
    }
})

export const { setLoading, setItem , setCart, removeItem } = cartSlice.actions;
export default cartSlice.reducer