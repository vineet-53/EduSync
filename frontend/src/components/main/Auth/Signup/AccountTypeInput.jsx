import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'

export default function AccountTypeInput({ value  }) {
    const { register, getValues, setValue } = useFormContext()
    const currentAccountTypeValue = getValues("accountType")
    return (
        <button className={` ${currentAccountTypeValue === value && "bg-custom-primary "} w-full py-2 px-2 text-center rounded-full text-richblack-300 transition-all duration-700 `} id={value} {...register('accountType', { required: false })}
            onClick={() => {
                setValue("accountType", value)
            }} >
            {value}
        </button>
    )
}
