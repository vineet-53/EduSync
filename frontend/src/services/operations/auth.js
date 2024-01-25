import apiConnector from "../apiConnector"
import {authEndpoints} from "../endpointsAPI"
import {toast} from "react-hot-toast"
import {setLoading, setSignupData , setToken} from "../../slices/authSlice"
import {setUser} from "../../slices/profleSlice"
export const  login  =  (loginData, navigate  ) => async (dispatch) =>  { 
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
      try {
        const response = await apiConnector("post", authEndpoints.LOGIN_API, {...loginData})
  
        console.log("LOGIN API RESPONSE............", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
  
        toast.success("Login Successful")
        dispatch(setToken(response.data.token))
        const userImage = response.data?.user?.image
          ? response.data.user.image
          : `https://ui-avatars.com/api/?name=${response.data.user.firstName}+${response.data.user.lastName}`
        dispatch(setUser({ ...response.data.user, image: userImage }))
        
        localStorage.setItem("token", JSON.stringify(response.data.token))
        localStorage.setItem("user", JSON.stringify(response.data.user))
        navigate("/dashboard/my-profile")
      } catch (error) {
        console.log("LOGIN API ERROR............", error)
        toast.error("Login Failed")
      }finally { 
        dispatch(setLoading(false))
        toast.dismiss(toastId)
      }
} 

export const sendOTP = (email , navigate) => async (dispatch) => { 
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try { 
      const response = await apiConnector("post" , authEndpoints.SEND_OTP_API , {email})
      console.log(response)
      if(!response.data.success) { 
        throw new Error(response.data.message)
      }
      toast.success("succesfully sended OTP")
      navigate('/verify-email')
    }catch(err) { 
      console.log('Error sending OTP' , err.message)
      toast.error("Could not send OTP")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
}


export const signup = (signupData ,  otp , navigate) => async (dispatch)=> { 
    const toastId = toast.loading("Signing up...")
    dispatch(setLoading(true))
    try { 
      // make a call to api to server
      const response = await apiConnector("post" , authEndpoints.SIGN_UP_API , {...signupData , otp} )
      console.log(response) 
      if(!response.data.success) { 
        throw new Error(response.data.message) 
      }
      toast.success(response.data.message) 
      navigate("/login")
    }catch(err) { 
      console.log("SIGN UP ERROR......." , err)
      toast.error("Signup Failed")
    }
    dispatch(setLoading(true))
    toast.dismiss(toastId)
}