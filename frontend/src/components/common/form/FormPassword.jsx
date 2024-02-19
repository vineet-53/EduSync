import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { IoMdEye, IoMdEyeOff } from 'react-icons/io'
import Label from "./Label"
import { FormInputFieldStyle } from '../../../styles/constantsStyles'
export default function FormPassword(props) {
    const { value, name, id, placeholder, errorMsg , inputcss } = props
    const [showPassword, setShowPassword] = useState(false)
    const { register, formState: { errors } } = useFormContext()
    return (
        <div className='relative w-full'>
            <Label htmlFor={id} >
                {name}
            </Label>
            <input className={FormInputFieldStyle + ` ${inputcss}`} type={showPassword ? "text" : "password"} id={id} placeholder={placeholder} {...register
                (value, { required: `Please Enter ${name}` })} />
            < div className='w-6 h-6 absolute right-2 top-[50%] '>
                {
                    showPassword ?
                        <IoMdEye onClick={() => setShowPassword(!showPassword)} className='w-full h-full text-custom-secondary' />
                        :
                        <IoMdEyeOff onClick={() => setShowPassword(!showPassword)} className='w-full h-full text-custom-secondary' />
                }
            </div>
            
        </div>
    )
}
