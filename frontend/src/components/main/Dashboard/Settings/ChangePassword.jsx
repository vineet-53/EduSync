import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { changePassword } from '../../../../services/operations/profile'
import { useNavigate, Link } from 'react-router-dom'
import FormPassword from "../../../common/form/FormPassword"
import { useDispatch, useSelector } from 'react-redux'
import { ErrorInputFieldStyle, InActiveIconButtonStyles } from '../../../../styles/constantsStyles'
import { FormSubmitButton } from '../../../common/form'
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
        <FormProvider {...methods}>
            <div className=''>
                <form onSubmit={handleSubmit(onSubmit)} className='' >
                    <div className='flex gap-4 sm:gap-2 flex-col sm:flex-row'>
                        <div className='w-full'>
                            <FormPassword value="password" name="Password" id="password" placeholder="Enter Password" inputcss="bg-richblack-600 px-3" />
                            {errors?.contactNumber && <p className={ErrorInputFieldStyle}>{errors?.contactNumber.message}</p>}
                        </div>
                        <div className='w-full'>
                            <FormPassword value="confrimPassword" name="Confirm Password" id="confirmPassword" placeholder="Enter Confirm Password" inputcss="bg-richblack-600 px-3" />
                            {errors?.confirmPassword && <p className={ErrorInputFieldStyle}>{errors?.confirmPassword.message}</p>}
                        </div>
                    </div>
                    <div className='grid col-span-2 relative'>
                        <div className='flex gap-2 md:gap-5 w-full flex-row-reverse absolute bottom-[-5em]'>
                            <FormSubmitButton>
                                Save
                            </FormSubmitButton>
                            <Link to="/dashboard/my-profile" >
                                <span className={InActiveIconButtonStyles}>Cancel</span>
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </FormProvider>
    )
}
