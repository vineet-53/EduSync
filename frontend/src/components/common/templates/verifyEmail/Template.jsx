import React from 'react'
import {Link} from "react-router-dom"
import { FaArrowLeftLong } from "react-icons/fa6";
export default function Template({title , children , subTitle , email }) {
  return (
    <div className='flex bg-custom-primary w-screen h-screen items-center justify-center'>

        <div className='w-11/12 mx-auto gap-4 flex flex-col max-w-[400px] text-richblack-100 '>
            <div className='flex flex-col gap-3'>   
                <div className='text-2xl lg:text-3xl font-bold text-richblack-5'>{title}</div>
                <div className='text-sm lg:text-base'>
                    <p>{subTitle}</p>
                    <p>{email}</p>
                </div>
            </div>
            <div className='flex flex-col gap-3'>
                <div>
                {children}
                </div>
            </div>

        </div>

    </div>
  )
}
