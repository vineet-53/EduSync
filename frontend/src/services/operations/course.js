import { getItemFromLocalStorage, setItemToLocalStorage } from "../../utils/localStorage"
import apiConnector from "../apiConnector"
import { courseEndpoints } from "../endpointsAPI"
export const fetchALLCatalogs = async () => {
    try {
        return await apiConnector("GET", courseEndpoints.GET_ALL_CATEGORY_API)
    } catch (err) {
        console.error(err.message)
    }
}

export const addToCart = (courseId, navigate) => async dispatch => {
    try {
        // const response 
        const cart = getItemFromLocalStorage("cart")
        setItemToLocalStorage("cart", { ...cart, courseId })
    } catch (err) {
        console.log(err)
    }
}