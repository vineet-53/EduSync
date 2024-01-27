import apiConnector from "../apiConnector"
import {courseEndpoints} from "../endpointsAPI"

export const fetchALlCatalogs = async () => { 
    try { 
        return await apiConnector("GET" , courseEndpoints.GET_ALL_CATEGORY_API)
    }catch(err) { 
        console.error(err.message)
    }
}
