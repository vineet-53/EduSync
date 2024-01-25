import React , {useState} from 'react'
import FormProvider from "../contexts/form/FormProvider"
import { Button, Input, InputPassword, SubmitButton, UserAuthTemplate } from "../components/common"
import { useFormContext } from '../contexts/form/FormProvider'
import { login } from "../services/operations/auth"
import { useNavigate } from 'react-router-dom'
import {Toaster , toast} from "react-hot-toast"
export default function Login() {
    return (
        <FormProvider>
            <LoginForm />
        </FormProvider>
  )
}
const LoginForm = () => { 
    const navigate = useNavigate()
    const {email , accountType, setAccountType , password ,setEmail , setPassword} = useFormContext()
    const handleLoginForm = async (e) =>  { 
        e.preventDefault()
        if(!email || !password) { 
            toast.error("Fill all form details")
            return null
        }
        const loginData = { 
            accountType , 
            email , 
            password
        }
        const response = await login(loginData)
        if(response.status === 200) { 
            navigate('/dashboard')
        }
        else { 
            toast.error(response.data.message)
        }

        setEmail("")
        setPassword("")
        setAccountType("Student")
    }

    return (<>
    <UserAuthTemplate login= {true}>
                <form onSubmit={handleLoginForm} className='flex flex-col gap-4'>
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
                    {/* email */}
                    <Input 
                        labelName ="Email"
                        placeholder ='Enter Email'
                        inputcss ="w-full"
                        id ="email"
                        type = "email"
                        value ={email}
                        handleEvent = {e => setEmail(e.target.value)}
                    />
                    {/* password  below forgot password*/}
                    <InputPassword 
                        labelName = "Enter Password"
                        forgotPassword = {false}
                        inputcss = "w-full"
                        placeholder= 'Enter Password'
                        id="password"
                        value={password}
                        handleEvent = {e => setPassword(e.target.value)}
                    />
                    {/* sign button */}
                    <SubmitButton buttoncss ="text-center" >
                        Sign In
                    </SubmitButton>
                </form>
            </UserAuthTemplate>
            <Toaster />     
    </>
      )
}