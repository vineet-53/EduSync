import React from 'react'
import { Button, Input, InputPassword, SubmitButton, AuthTemplate } from '../index'
import  { useFormContext } from '../../../contexts/form/FormProvider'
import { setSignupData} from "../../../slices/authSlice"
import { useDispatch } from 'react-redux'
import {toast , Toaster} from "react-hot-toast"
import { sendOTP } from '../../../services/operations/auth'
import { useNavigate } from 'react-router-dom'
const SignupForm = () => { 
    const dispatch = useDispatch() 
    const navigate = useNavigate()
    const {
        accountType,
        email , 
        password , 
        firstName ,
        lastName , 
        confirmPassword , 
        phoneNumber ,
        setEmail,   
        setPassword , 
        setFirstName ,
        setLastName , 
        setConfirmPassword,
        setPhoneNumber , 
        setPhonePrefix,
    } = useFormContext()
    
    const handleSignupForm = e => { 
        e.preventDefault() 
        if(password !== confirmPassword) { 
            toast.error("Password not matched")
            return 
        }
        if(!email || !password || !confirmPassword || !lastName || !firstName || !phoneNumber){ 
            toast.error("Please Fill All Details")
            return
        }
        
        if(/^[0-9]\d{8}[0-9]$/.test(phoneNumber)){ 
            toast.error("Phone Number Invalid")
            return
        }

        if(/^[(\w\d\W)+]+@[\w+]+\.[\w+]+$/i.test(email)){ 
            toast.error("Email Invalid")
            return
        }
        
        // send otp to the user 
        dispatch(setSignupData({ 
            accountType,
            email , 
            password , 
            firstName ,
            lastName , 
            confirmPassword , 
            phoneNumber ,
        }))
        dispatch(sendOTP(email , navigate))

    }
    return ( 
        <>  
            <AuthTemplate signup={true}> 
                <form action=""  onSubmit={handleSignupForm} className='flex flex-col gap-4 text-sm lg:text-base'>
                    {/* role */}
                    <div className='rounded-full p-1 bg-custom-tertiary flex w-max'>
                        <Button
                        >
                            Student
                        </Button> 
                        <Button
                        >
                            Instructor
                        </Button> 
                    </div>
                    <div className='flex flex-col lg:flex-row gap-3 lg:gap-3'>
                        <Input 
                            labelName ="First Name"
                            inputcss ="w-full"
                            placeholder = "Enter First Name"
                            id ="firstName"
                            handleEvent ={e => setFirstName(e.target.value)}
                            />
                        <Input 
                            labelName ="Last Name"
                            inputcss ="w-full"
                            placeholder = "Enter Last Name"
                            id ="lastName"
                            handleEvent={e => setLastName(e.target.value)}
                        />
                    </div>
                    {/* email */}
                    <Input 
                        labelName ="Email"
                        placeholder ='Enter Email'
                        inputcss ="w-full"
                        id ="email"
                        type = "email"
                        handleEvent={e => setEmail(e.target.value)}
                    />
                    <div className='list-none text-richblack-100 flex flex-col lg:gap-3'>

                        <label htmlFor="phone" className=''>
                            Phone Number
                            <span className='text-pink-400'> *</span>
                        </label>
                        {/* dropdown */}
                        <div className='flex gap-2'>
                            <div className='flex  items-center px-1 bg-custom-tertiary rounded-md w-16 justify-center'>
                                <select onChange={e => setPhonePrefix(e.target.value)} name="phone_prefix"  className='bg-custom-tertiary rounded-md py-2'>
                                    <option defaultChecked value="91">+91</option>
                                    <option defaultChecked value="88">+88</option>
                                </select>
                                <span>^</span>
                            </div>
                            <Input 
                                placeholder ="Enter Phone Number "
                                inputcss = "w-full"
                                id = "phone"
                                handleEvent={e => setPhoneNumber(e.target.value)}
                            />
                        </div>
                    </div>
                    {/* password  below forgot password*/}
                    <div className='flex flex-col lg:flex-row gap-3 lg:gap-3'>
                        <div>
                            <InputPassword 
                                labelName = "Create Password"
                                forgotPassword = {false}
                                inputcss = "w-full"
                                placeholder= 'Enter Password'
                                id="password"
                                value={password}
                                handleEvent ={e => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <InputPassword 
                                labelName = "Confirm Password"
                                inputcss = "w-full"
                                placeholder= 'Enter Confirm Password'
                                id="confirmPassword"
                                value={confirmPassword}
                                handleEvent ={e => setConfirmPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    {/* sign button */}
                    <SubmitButton  buttoncss ="" >
                        Create Account
                    </SubmitButton>
                </form>
            </AuthTemplate>
            <Toaster />
        </>
    )
}
export default SignupForm