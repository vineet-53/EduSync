import apiConnector from "../apiConnector"
import {authEndpoints} from "../endpointsAPI"

export const login = async (loginData) => { 
    // make a call to server
    try { 
       return await apiConnector(authEndpoints.LOGIN ,  "POST" , loginData)
    }catch(err) { 
        return err.response
    }
}