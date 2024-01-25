import React from 'react'
import SignupForm from "../components/common/auth/SignupForm"
import FormProvider from '../contexts/form/FormProvider'
export default function Signup() {
  return (
    <FormProvider> 
        <SignupForm />
    </FormProvider>
  )
}
