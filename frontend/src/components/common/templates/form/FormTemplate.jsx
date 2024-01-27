import React from 'react'
import { useForm, useFormContext } from 'react-hook-form'
import { PrimaryButton } from "../../index"
export default function FormTemplate({handleForm}) {
    const {register,  handleSubmit , formState : {errors}} = useFormContext()
    const LabelCss ='text-pure-greys-100'
    const InputCss = "bg-custom-tertiary text-pure-greys-25 px-3 py-2 rounded-md focus:outline-2 border-none focus:outline-white w-full"
  return (
    <form className='flex flex-col text-pink-400 gap-3' onSubmit={handleSubmit(handleForm)}>
        <div className='grid lg:grid-cols-2 lg:grid-rows-1 lg:gap-3'>
            <div className='flex flex-col gap-1'>
                <label htmlFor="firstName"
                    className={LabelCss}
                >First Name <span className='text-pink-400'>*</span></label>
                <input
                    type="text" 
                    id ="firstName"
                    placeholder='Enter First Name'
                    {...register("firstName" , {required : true})}
                    className={InputCss}
                />
                {errors.firstName && <p>Please Fill First Name*</p>}
            </div>
            <div className='flex flex-col gap-1'>
                <label className={LabelCss} htmlFor="lastName">Last Name</label>
                <input
                    type="text" 
                    id ="lastName"
                    placeholder='Enter Last Name'
                    {...register("lastName" , {required : false})}
                    className={InputCss}
                />
            </div>
        </div>
        <div className='flex flex-col gap-1'>
                <label className={LabelCss} htmlFor="email">Email <span className='text-pink-400'>*</span></label>
                <input
                    type="email" 
                    id ="email"
                    placeholder='Enter Last Name'
                    {...register("email" , {required : true , pattern : /(@gmail.com)$/})}
                    className={InputCss}
                />
                {errors.email && <p>Please Fill Valid Email It Only supports Gmail</p>}
        </div>
        <div>
            <label className={LabelCss} htmlFor="phoneNumber">Phone Number <span className='text-pink-400'>*</span></label>
            <div>
                <div>

                </div>
                <input
                    type="text" 
                    id ="phoneNumber"
                    className={InputCss}
                    placeholder='Enter Phone Number'
                    {...register("phoneNumber" , {required : true , pattern : /\d{10}/})}
                    maxLength={10}
                    />
                    {errors.phoneNumber && <p>Please Fill Valid Phone Number</p>}
            </div>
        </div>
        <div className='flex flex-col gap-1'>
            <label className={LabelCss} htmlFor="message">Message <span className='text-pink-400'>*</span></label>
            <textarea className="bg-custom-tertiary text-pure-greys-5 px-3 py-2 rounded-md focus:outline-2 border-none focus:outline-white w-full h-[130px]" name="message" id="message" placeholder='Enter Message' {...register("message" , {required : true})}>
            </textarea>
        </div>
        <button type="submit" className='bg-yellow-100 hover:bg-yellow-50 text-black text-center py-3  rounded-md'>
            Send Message
        </button>
    </form>
  )
}
