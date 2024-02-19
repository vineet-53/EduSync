import { toast } from "react-hot-toast";
import apiConnector from "../apiConnector";
import { rootEndpoints } from "../endpointsAPI";


export const  resetPasswordToken =async (email , setEmailSent) =>  { 
    const toastId = toast.loading("Sending RESET TOKEN....")
    try { 
        const response = await apiConnector("post" , rootEndpoints.RESET_PASSWORD_TOKEN_API ,{email})
        console.log(response)
        if(!response.data.success) { 
            throw new Error(response.data.message)
        }
        toast.success("Reset Token Sended Successfully")
        console.log('success sended reset token')
        setEmailSent(true)
    }catch(err) { 
        console.log(err.message)
        toast.error("Error Reseting TOKEN")
    }
    toast.dismiss(toastId)
}

export const updatePassword = async (password, confirmPassword, token, navigate) => {
    const toastId = toast.loading("Sending RESET TOKEN....")
    try {
        const response = await apiConnector("post", rootEndpoints.UPDATE_PASSWORD, {
            password,
            confirmPassword,
            token
        })
        console.log(response)
        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        toast.success("Password updated Successfully")
        console.log('Password updated successfully ')
        navigate("/login")
    } catch (err) {
        console.log(err.message)
        toast.error(err.response.data.message || err.message || "Error Updating PASSWORD")
    }
    toast.dismiss(toastId)
}