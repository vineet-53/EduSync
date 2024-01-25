import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Input, Primary, SubmitButton, Template, Wrapper } from '../components/common'
import toast from 'react-hot-toast'
import { checkPasswordStrength } from '../utils/passwordStrength'
import {updatePassword} from "../services/operations/password"
export default function UpdatePassword() {
    const {token} = useParams()
    const [password , setPassword] = useState(null)
    const [confirmPassword , setConfirmPassword] = useState(null)
    const navigate = useNavigate()
    const handleUpdatePasswordForm =async e =>{ 
        e.preventDefault()
        if(!password  || !confirmPassword) { 
            toast.error("Please Fill All Details")
            return 
        }
        if(password !== confirmPassword) { 
            toast.error("Password Not Matched")
            return 
        }
        // check the strength of password 
        // make call to server for update password
        updatePassword(password , confirmPassword , token , navigate)
    }
  return (
    <>
               <Template 
                title= "Choose  new password"
                subTitle="Almost done. Enter your new password and youre all set."
               >
                    <form onSubmit={handleUpdatePasswordForm} className='flex-col flex gap-4'>
                        <Input
                            labelName ="New Password" 
                            id ="password" 
                            placeholder ="Enter Password"
                            handleEvent = {e => setPassword(e.target.value)}
                            type = "password"
                        />
                        
                        <Input
                            labelName ="Confirm New Password" 
                            id ="confirmPassword" 
                            placeholder ="Enter Confirm Password"
                            handleEvent = {e => setConfirmPassword(e.target.value)}
                            type = "password"
                        />
                        <SubmitButton buttoncss="text-center text-black w-full my-3">
                                Reset Password
                        </SubmitButton>

                    </form>
               </Template>
    
    </>
  )
}
