import React from 'react'
import FormTitle from "./FormTitle"
import FormTemplate from "./FormTemplate"
import { FormProvider, useForm } from 'react-hook-form'
import { contactus } from "../../../../services/operations/contact"
export default function ContactForm({
    details
}) {
    const methods = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            message: "",
        }
    })
    const { setError } = methods
    const handleContactForm = data => {
        console.log(data)
    }
    return (
        <>
            <FormTitle details={details} />
            <FormProvider {...methods} >
                <FormTemplate handleForm={handleContactForm} />
            </FormProvider>
        </>
    )
}
