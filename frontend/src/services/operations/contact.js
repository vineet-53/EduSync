import toast from "react-hot-toast"
import {rootEndpoints} from "../endpointsAPI"
import apiConnector from "../apiConnector"



export const contactUs = async (data) => { 
    const toastId = toast.loading("Sending Message...")
    try { 
        const response=  await apiConnector("POST" , rootEndpoints.CONTACT_US , {...data})
        if(!response.data.success) { 
            throw new Error(response.data.message)
        }
        console.log(response)
        toast.success("Check Your Mail")
    }catch(err){ 
        console.log(err)
        toast.error(err.response.data.message)
    }
    toast.dismiss(toastId)

}