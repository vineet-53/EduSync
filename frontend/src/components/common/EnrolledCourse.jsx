import React from 'react'
import {Link} from "react-router-dom"
export default function EnrolledCourse({ course }) {
    return (
        <div className=' w-full flex items-center flex-col md:flex-row '>
            <div className='max-sm:w-11/12 h-full grid md:flex md:gap-2 grid-cols-1 max-sm:gap-2 bg-custom-secondary bg-opacity-30 px-3 py-3 rounded-md hover:scale-105 transition-all duration-700 lg:w-4/5'>
                <div className=' flex flex-col md:flex-row gap-2'>
                    <img src={course?.thumbnailImage} alt={`${course?.courseName} thumbnail`} className='mx-auto md:w-24 rounded-md' />
                    <div className='flex flex-col'>
                        <Link to={`/courses/${course?._id}`}><h3 className='hover:underline text-2xl font-bold text-white'>{course?.courseName}</h3></Link>
                        <p className='text-base text-custom-secondary '>{course?.courseDescription}</p>
                        <div>
                            <p className='text-yellow-100 font-semibold pt-2'>Ratings : 4.7</p>
                        </div>
                    </div>
                </div>
                <div className=' flex md:px-6 items-center py-2 text-yellow-100 font-bold text-xl'>
                    ₹{course?.price}
                </div>

            </div>
        </div>
    )
}
