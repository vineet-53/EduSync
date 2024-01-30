import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Input, FormSubmitButton } from '../components/common/form'
import Template from '../components/main/VerifyEmail/Template'
import toast from 'react-hot-toast'
import { FaCircleCheck } from "react-icons/fa6";
import { updatePassword } from "../services/operations/password"
export default function UpdatePassword() {
    const [newPassword, setNewPassword] = useState(null)
    const [confirmNewPassword, setConfirmNewPassword] = useState(null)
    const [hasSpecialChar, setHasSpecialChar] = useState(null)
    const [hasNumber, setHasNumber] = useState(null)
    const [hasChar, setHasChar] = useState(null)
    const [hasUpper, setHasUpper] = useState(null)
    const [hasLower, setHasLower] = useState(null)
    const navigate = useNavigate()
    const { token } = useParams()
    const checkPasswordStrength = (newPassword) => {
        setHasSpecialChar(/[!@#$%^&*]{1,}/.test(newPassword))
        setHasNumber(/\d{1,}/.test(newPassword))
        setHasChar(/\w{8,}/.test(newPassword))
        setHasUpper(/[A-Z]{1,}/.test(newPassword))
        setHasLower(/[a-z]{1,}/.test(newPassword))
    }
    const handleUpdatePasswordForm = async e => {
        e.preventDefault()
        if (!newPassword || !confirmNewPassword) {
            toast.error("Please Fill All Details")
            return
        }
        if (newPassword !== confirmNewPassword) {
            toast.error("Password Not Matched")
            return
        }

        // make call to server for update password
        if (!hasNumber || !hasChar || !hasUpper || !hasSpecialChar || !hasLower) {
            toast.error("Password not met requirements")
            return
        }
        updatePassword(newPassword, confirmNewPassword, token, navigate)
    }
    return (
        <>
            <Template
                title="Choose  new password"
                subTitle="Almost done. Enter your new password and youre all set."
            >
                <form onSubmit={handleUpdatePasswordForm} className='flex-col flex gap-4'>
                    <Input
                        labelName="New Password"
                        id="password"
                        placeholder="Enter Password"
                        handleEvent={e => {
                            setNewPassword(e.target.value)
                            checkPasswordStrength(e.target.value)
                        }}
                        type="password"
                    />

                    <Input
                        labelName="Confirm New Password"
                        id="confirmPassword"
                        placeholder="Enter Confirm Password"
                        handleEvent={e => {
                            setConfirmNewPassword(e.target.value)
                        }}
                        type="text"
                    />
                    <div className='flex lg:gap-2'>
                        <div>
                            <PasswordStrengthTemplate state={hasLower} text="one lowercase character" />

                            <PasswordStrengthTemplate state={hasUpper} text="one uppercase character" />

                            <PasswordStrengthTemplate state={hasNumber} text="one number" />
                        </div>
                        <div>
                            <PasswordStrengthTemplate state={hasSpecialChar} text="one special character" />
                            <PasswordStrengthTemplate state={hasChar} text="8 character minimum" />

                        </div>
                    </div>
                    <FormSubmitButton buttoncss="text-center text-black w-full my-3">
                        Reset Password
                    </FormSubmitButton>

                </form>
            </Template>

        </>
    )
}

const PasswordStrengthTemplate = ({ state, text }) => {
    return (
        <>
            <div className={`flex items-center gap-2 lg:gap-3 ${!state ? "text-pink-500" : "text-caribbeangreen-100"} `}>
                <span><FaCircleCheck className={`${!state ? "text-pink-500" : "text-caribbeangreen-100"} text-xl`} /></span>
                <span className='text-base'>{text}</span>
            </div>
        </>
    )
}