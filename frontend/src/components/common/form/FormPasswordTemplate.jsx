import React from 'react'
import FormPassword from './FormPassword'
import { useFormContext } from 'react-hook-form'
import { ErrorInputFieldStyle } from '../../../styles/constantsStyles'

export default function FormPasswordTemplate() {
    const { formState: { errors } } = useFormContext()
    return (
        <>
            <div className='flex flex-col gap-2 w-full'>
                <div className='md:flex gap-2 py-2'>
                    <FormPassword name="Password" value="password" id="password" placeholder="Enter Password" />
                    <FormPassword name="Confirm Password" value="confirmPassword" id="confirmPassword" placeholder="Enter Confirm Password" />
                </div>
                <div className='md:flex gap-3 w-full justify-between'>
                    {errors?.password && <p className={ErrorInputFieldStyle}>{errors?.password.message}</p>}
                    {errors?.confirmPassword && <p className={ErrorInputFieldStyle}>{errors?.confirmPassword.message}</p>}
                </div>
            </div>
        </>
    )
}
