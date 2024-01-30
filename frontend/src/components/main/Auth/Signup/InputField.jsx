import React from 'react'
import { useFormContext } from 'react-hook-form'
export const InputFieldStyle = "w-full px-2 py-2 bg-custom-tertiary text-white rounded-md"
export default function InputField({ value, type, errorMsg, pattern, placeholder }) {
    const { register, formState: { errors } } = useFormContext()
    return (
        <>
            <input type={type} className={InputFieldStyle} id={value} {...register(value, { required: `Please Enter ${errorMsg}`, pattern: pattern || {} })} placeholder={placeholder} />
        </>
    )
}
