import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, FormProvider } from 'react-hook-form'
import AuthTemplate from "../components/main/Auth/AuthTemplate"
import { Label, SubmitButton } from "../components/common/form/index"
import CountryCodes from "../data/countrycode.json"
import AccountTypeInput from '../components/main/Auth/Signup/AccountTypeInput'
import { nanoid } from "@reduxjs/toolkit"
import FormInputField from '../components/common/form/FormInputField'
import { FormInputFieldStyle } from '../styles/constantsStyles'
import FormPassword from "../components/common/form/FormPassword"
import { ErrorInputFieldStyle } from '../styles/constantsStyles'
import { setSignupData } from "../slices/authSlice"
import { sendOTP } from "../services/operations/auth"
export default function Signup() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const methods = useForm({
    defaultValues: {
      accountType: "Student",
      firstName: "",
      lastName: "",
      email: "",
      countryCode: "+91",
      contactNumber: "",
      password: "",
      confirmPassword: "",
    }
  })
  const { register, reset, handleSubmit, getValues, setValue, formState: { errors } } = methods
  const onSubmit = data => {
    console.log(data)
    dispatch(setSignupData({
      ...data
    }))
    dispatch(sendOTP(data.email, navigate))
    reset({
      accountType: "Student",
      firstName: "",
      lastName: "",
      email: "",
      countryCode: "+91",
      contactNumber: "",
      password: "",
      confirmPassword: "",

    })
  }
  return (
    <>
      <FormProvider {...methods}>
        <AuthTemplate signup={true}>
          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 text-sm lg:text-base'>
            {/* role */}
            <div className='text-custom-secondary flex gap-2 max-w-3/5 rounded-full p-1 bg-custom-tertiary'>
              {["Student", "Instructor"].map(role => <AccountTypeInput key={nanoid()} value={role} />)}
            </div>
            <div className='flex flex-col gap-2 sm:flex-row'>
              <div>
                <Label htmlFor="firstname" >
                  First Name
                </Label>
                <FormInputField type="text" value="firstName" errorMsg="First Name" placeholder="Enter First Name" />
                {errors?.firstName && <p className={ErrorInputFieldStyle}>{errors?.firstName.message}</p>}

              </div>
              <div>
                <Label htmlFor="lastname" >
                  Last Name
                </Label>
                <FormInputField type="text" value="lastname" placeholder="Enter Last Name" />

                {errors?.lastName && <p className={ErrorInputFieldStyle}>{errors?.lastName.message}</p>}
              </div>
            </div>
            <div>
              <Label htmlFor="lastname" >
                Email Address
              </Label>
              <FormInputField type="email" value="email" errorMsg="Email Address" pattern={{
                value: /.(@gmail.com)$/,
                message: "Enter Valid Email"
              }} placeholder="Enter Email Address" />
              {errors?.email && <p className={ErrorInputFieldStyle}>{errors?.email.message}</p>}
            </div>
            <div>
              <Label htmlFor="countryCode">
                Contact Number
              </Label>
              <div>
                <div className='flex flex-row gap-2 w-full'>
                  <select id="countryCode" className={FormInputFieldStyle + " w-2/6 sm:w-1/6 text-center"} defaultValue={getValues("countryCode")}>
                    {
                      CountryCodes?.map(code => {
                        return (
                          <option key={nanoid()} value={code.code}>{code.country} {code.code}</option>
                        )
                      })
                    }
                  </select>
                  <input type="text" className={FormInputFieldStyle} placeholder='Enter Contact Number' maxLength={10} {...register("contactNumber", {
                    required: "Please Enter Contact Number",
                    pattern: {
                      value: /\d{10}/,
                      message: "Contact Number Not Valid "
                    }
                  })} />
                </div>
                {errors?.contactNumber && <p className={ErrorInputFieldStyle}>{errors?.contactNumber.message}</p>}
              </div>
              <div className='md:flex gap-2 py-2'>
                <FormPassword name="Password" value="password" id="password" placeholder="Enter Password" />
                {errors?.password && <p className={ErrorInputFieldStyle}>{errors?.password.message}</p>}
                <FormPassword name="Confirm Password" value="confirmPassword" id="confirmPassword" placeholder="Enter Confirm Password" />
                {errors?.confirmPassword && <p className={ErrorInputFieldStyle}>{errors?.confirmPassword.message}</p>}
              </div>
              <SubmitButton buttoncss="w-full my-2">
                Submit
              </SubmitButton>
            </div>
          </form>
        </AuthTemplate>
      </FormProvider>

    </>
  )
}