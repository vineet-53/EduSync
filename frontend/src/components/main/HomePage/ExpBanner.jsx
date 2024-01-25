import React from 'react'
import Line from './Line'
const TextTemplate = ({number  , text}) => {
    return (
        <>
            <div className="flex min-w-[160px] lg:w-max justify-between items-center lg:text-center lg:items-center ">
                <div className='text-2xl text-white font-bold'>
                    <div className='flex justify-center'>
                        {number}
                    </div>
                </div>
                <div className='max-w-[100px] text-sm text-richblack-50'>
                    {text}
                </div>
            </div>

        </>
    )
}
export default function ExpBanner() {
    return (
        <>
            <TextTemplate 
                number="10"
                text="YEARS EXPERIENCES"
            />
            <div className="hidden lg:flex  ">
            </div>
            <TextTemplate 
                number="250"
                text="TYPES OF COURSES"
            />
        </>
    )
}
