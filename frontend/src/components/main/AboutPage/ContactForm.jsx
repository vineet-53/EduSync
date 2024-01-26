import React from 'react'
import FormTitle from "../../common/templates/form/FormTitle"
import FormTemplate from "../../common/templates/form/FormTemplate"
import { FormProvider, useForm } from 'react-hook-form'
export default function ContactForm({
    title , subTitle
}) {
    const handleContactForm = data => { 
        console.log(data)
    }
    const methods = useForm({
        defaultValues : { 
            firstName : "", 
            lastName : "",  
            email : "" , 
            phoneNumber :"",  
            message : "", 
        }
    })
  return (
    <div className='flex flex-col gap-8 lg:w-2/5'>
        <FormTitle title={title} titlecss={"text-center"} subTitle={subTitle}/>
        <FormProvider {...methods} > 
            <FormTemplate handleForm ={handleContactForm}/>
        </FormProvider>
    </div>
  )
}
