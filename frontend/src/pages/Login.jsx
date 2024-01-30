import React  from 'react'
import FormProvider from '../contexts/SignupFormProvider'
import LoginForm from "../components/main/Auth/Login/LoginForm"
export default function Login() {
    return (
        <FormProvider>
            <LoginForm />
        </FormProvider>
  )
}