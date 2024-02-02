import React from 'react'
import { FaTrash } from 'react-icons/fa'

export default function Item() {
    return (

        <>
            <div className='flex flex-col sm:flex-row lg:flex-row gap-3 p-3 border-b-2 border-b-pure-greys-200 border-opacity-20'>
                <div className='lg:w-[20%] lg:h-max sm:w-[20%]'>
                    <img className='bg-white  ' src='http://res.cloudinary.com/dhidi3gwx/image/upload/v1705388182/study-notion/tj3cdnansbeqhlnngn14.jpg' alt="" />
                </div>
                <div className='flex flex-col lg:w-[60%] gap-2 text-pure-greys-200'>
                    <h3 className='text-xl font-bold text-white'>Learn C++ 100day to code</h3>
                    <p>
                        Name of Instructor
                    </p>
                    <div >
                        <span>

                        </span>
                        (Review Cournt)
                    </div>
                    <p>Total Courses <span>*</span> Lesson <span>*</span> Begginer</p>
                </div>
                <div className='lg:w-[20%] flex lg:flex-col max-md:justify-between max-sm:flex-row-reverse lg:items-center gap-2 lg:justify-evenly'>
                    <button className='bg-pink-600 text-pink-100 rounded-md flex gap-2 items-center p-3 h-max'>
                        <span><FaTrash /></span>
                        <span>Remove</span>
                    </button>
                    <div className='sm:text-2xl text-3xl flex lg:items-center lg:px-2 font-bold text-yellow-200'>
                        Rs. 1,700
                    </div>

                </div>
            </div>
        </>
    )
}
