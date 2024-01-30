import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { changePassword } from '../../../../services/operations/profile'
import { IconButton } from '../../../common'
import { useNavigate } from 'react-router-dom'
import FormPassword from "../../../common/form/FormPassword"
import { useDispatch, useSelector } from 'react-redux'
export default function ChangePassword() {
    const methods = useForm({
        defaultValues: {
            password: "",
            confirmPassword: "",
        }
    })
    const { handleSubmit, setError, formState: { errors } } = methods
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { token } = useSelector(state => state.auth)
    const onSubmit = (data) => {
        const { password, confirmPassword } = data
        if (password !== confirmPassword) {
            let errorMsg = password.length < confirmPassword.length ? "confirmPassword" : "password"
            setError(`${errorMsg}`, {
                type: 'manual',
                message: 'Passwords do not match',
            });
        } else {
            dispatch(changePassword(password, confirmPassword, token, navigate))
        }
    }
    return (
        <>
            <div className=''>
                <form onSubmit={handleSubmit(onSubmit)} className='md:grid md:grid-cols-2 md:grid-rows-1 md:gap-2' >
                    <div>
                        <FormPassword value="password" name="Password" id="password" placeholder="Enter Password" />
                        <FormPassword value="confrimPassword" name="Confirm Password" id="confirmPassword" placeholder="Enter Confirm Password" />
                    </div>
                    <div className='grid col-span-2 relative'>
                        <div className='flex gap-2 md:gap-5 w-full flex-row-reverse absolute bottom-[-5em]'>
                            <IconButton type="submit" onClick={handleSubmit} isActive={true}>
                                Save
                            </IconButton>
                            <IconButton onClick={() => navigate('/dashboard/my-profile')} isActive={false}>
                                Cancel
                            </IconButton>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}
