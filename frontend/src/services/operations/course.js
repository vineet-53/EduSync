import apiConnector from "../apiConnector"
import {courseEndpoints} from "../endpointsAPI"

export const fetchALLCatalogs = async () => { 
    try { 
        return await apiConnector("GET" , courseEndpoints.GET_ALL_CATEGORY_API)
    }catch(err) { 
        console.error(err.message)
    }
}


export const getCatalog = (id) => async dispatch => { 
    
}