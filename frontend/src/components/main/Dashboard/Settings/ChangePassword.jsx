import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { changePassword } from '../../../../services/operations/profile'
import { useNavigate, Link } from 'react-router-dom'
import FormPassword from "../../../common/form/FormPassword"
import { useDispatch, useSelector } from 'react-redux'
import { ErrorInputFieldStyle, InActiveIconButtonStyles } from '../../../../styles/constantsStyles'
import { FormSubmitButton } from '../../../common/form'
import { ActiveIconButton, InActiveIconButton } from '../../../common'
export default function ChangePassword() {
    const methods = useForm({
        defaultValues: {
            password: "",
            confirmPassword: "",
        }
    })
    const { handleSubmit, setError, formState: { errors } } = methods
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
            changePassword(password, confirmPassword, token)
        }
    }
    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2' >
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
                <div className='grid col-span-2 py-2 '>
                    <div className='flex flex-row-reverse gap-2'>
                        <ActiveIconButton>
                            <span>Save</span>
                        </ActiveIconButton>
                        <InActiveIconButton navigateTo="/dashboard/my-profile">
                            <span>Cancel</span>
                        </InActiveIconButton>
                    </div>
                </div>
            </form>
        </FormProvider>
    )
}
