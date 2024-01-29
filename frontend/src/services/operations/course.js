import { getItemFromLocalStorage, setItemToLocalStorage } from "../../utils/localStorage"
import apiConnector from "../apiConnector"
import { courseEndpoints } from "../endpointsAPI"
import { setCart } from "../../slices/cartSlice"
export const fetchALLCatalogs = async () => {
    try {
        return await apiConnector("GET", courseEndpoints.GET_ALL_CATEGORY_API)
    } catch (err) {
        console.error(err.message)
    }
}

export const addToCart = (courseId, token, navigate) => async dispatch => {
    try {
        const response = await apiConnector("POST", courseEndpoints.ADD_TO_CART, {
            courseId
        }, {
            Authorization: "Bearer " + token
        })
        console.log(response)

    } catch (err) {
        console.log(err)
    }
}

export const getCartFullDetails = (token, navigate) => async dispatch => {
    try {
        console.log("FETCHING CART DETAILS.....")
        const response = await apiConnector("GET", courseEndpoints.GET_FULL_CART_DETAILS_API, null, {
            Authorization: "Bearer " + token
        })
        console.log("FETCHED CART DETIALS", response)
        dispatch(setCart(response.data.cart))
        setItemToLocalStorage("cart", response.data.cart)
        console.log("SUCESSFULLY FETCHED FULL CART DETAILS")
    } catch (err) {
        console.log(err)
    }
}
export const removeItemFromCart = (courseId, token, navigate) => async dispatch => {
    try {
        console.log("DELETING CART ITME.....")
        const response = await apiConnector("POST", courseEndpoints.REMOVE_ITEM_FROM_CART_API, { courseId }, {
            Authorization: "Bearer " + token
        })
        console.log("DELETED CART ITEM", response)
        dispatch(setCart(response.data.cart))
        setItemToLocalStorage("cart", response.data.cart)
        console.log("SUCESSFULLY FETCHED FULL CART DETAILS")
    } catch (err) {
        console.log(err)
        navigate("/404-not-found")
    }

}