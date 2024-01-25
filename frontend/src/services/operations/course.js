import apiConnector from "../apiConnector"
import {courseEndpoints} from "../endpointsAPI"

export const fetchALlCatalogs = async () => { 
    try { 
        return await apiConnector(courseEndpoints.GET_ALL_CATEGORY)
    }catch(err) { 
        console.error(err.message)
    }
}