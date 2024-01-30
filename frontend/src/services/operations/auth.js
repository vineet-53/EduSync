import apiConnector from "../apiConnector"
import {authEndpoints} from "../endpointsAPI"
import {ToastBar, toast} from "react-hot-toast"
import {setLoading, setSignupData , setToken} from "../../slices/authSlice"
import {setUser} from "../../slices/profileSlice"
import { setItemToLocalStorage } from "../../utils/localStorage"

export const  login  =  (email , password, navigate  ) => async (dispatch) =>  { 
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
      try {
        const response = await apiConnector("post", authEndpoints.LOGIN_API, {
          email , 
          password
        })
  
        console.log("LOGIN API RESPONSE............", response)
  
        if (!response.data.success || response.status !== 200) {
          throw new Error(response.data.message)
        }
  
        toast.success("Login Successful")
        dispatch(setToken(response.data.token))
        const userImage = response.data?.user?.image
          ? response.data.user.image
          : `https://ui-avatars.com/api/?name=${response.data.user.firstName}+${response.data.user.lastName}`
        dispatch(setUser({ ...response.data.user, image: userImage }))
        setItemToLocalStorage("token" , response.data.token)
        setItemToLocalStorage("user" , response.data.user)

        navigate("/dashboard/my-profile")
      } catch (error) {
        console.log("LOGIN API ERROR............", error )
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

export const logout  =  (email ,navigate) => async (dispatch) => { 
    try { 
      const response = await apiConnector("post" , authEndpoints.LOGOUT , {email})
      console.log(response)
      localStorage.clear()
      // clear the user and token from redux store 
      dispatch(setToken(null))
      dispatch(setUser(null))
      toast.success(response.data.message)
      navigate("/")
  }catch(err) { 
    console.log("LOGOUT FAILED ----> " ,err)
    toast.error("Logout Failed")
  }
}


