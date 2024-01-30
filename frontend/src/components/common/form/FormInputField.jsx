import React from 'react'
import { useFormContext } from 'react-hook-form'
import { FormInputFieldStyle } from '../../../styles/constantsStyles'
export default function FormInputField({ value, type, errorMsg, pattern, placeholder }) {
    const { register, formState: { errors } } = useFormContext()
    return (
        <>
            <input type={type} className={FormInputFieldStyle} id={value} {...register(value, { required: `Please Enter ${errorMsg}`, pattern: pattern || {} })} placeholder={placeholder} />
        </>
    )
}
