import React, { useState } from 'react'
import Template from "../components/common/templates/verifyEmail/Template"
import { Primary, Wrapper } from "../components/common/index"
import { SubmitButton } from '../components/common/index'
import { nanoid } from '@reduxjs/toolkit'
import OtpInput from "react-otp-input"
import { useDispatch, useSelector } from 'react-redux'
import { signup } from '../services/operations/auth'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function VerifyEmail() {
  const [otp, setOtp] = useState(null)
  const { signupData } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleVerifyAndSignup = (e) => {

    e.preventDefault()
    // send the data to operation
    if(!otp  || otp.length <= 5) { 
      toast.error("OTP not filled properly")
      return
    } 
    dispatch(signup(signupData, otp, navigate))
  }
  return (
    <>
      <Template
        title="Verify Email"
        subTitle="A verification code has been sent to you. Enter the code below"
      >
        <form onSubmit={handleVerifyAndSignup} className=' flex flex-col gap-1 items-center'>
            <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span style={{ width: "8px" }}></span>}
                renderInput={(props) => <input {...props} />}
                skipDefaultStyles = {true}
                inputStyle = "border-0 focus:outline-yellow-100 focus:outline-2 focus:outline-solid max-sm:w-[2em] max-sm:h-[2em] rounded-lg  sm:w-[60px] sm:h-[60px] bg-custom-tertiary text-xl  text-white caret-yellow-50 text-center "
                focusStyle={{
                  border: "1px solid #CFD3DB",
                  outline: "none"
                }}
            />
          <SubmitButton buttoncss="text-black w-full ">
            Verify Mail
          </SubmitButton>
        </form>

      </Template>
    </>

  )
}
