import React  from 'react'
import FormProvider from '../contexts/form/FormProvider'
import LoginForm from "../components/common/auth/LoginForm"
export default function Login() {
    return (
        <FormProvider>
            <LoginForm />
        </FormProvider>
  )
}