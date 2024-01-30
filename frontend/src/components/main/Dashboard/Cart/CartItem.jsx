import React, { useRef } from 'react'
import { IoTrashBin } from 'react-icons/io5'
import { Link } from "react-router-dom"

export default function CartItem({ cartItem , handleRemoveFromCart}) {
    const course = useRef(null)
    return (
        <div className=' w-full flex items-center flex-col md:flex-row ' id={cartItem?._id} ref={course}>
            <div className='max-sm:w-11/12 h-full grid md:flex md:gap-2 grid-cols-1 max-sm:gap-2 bg-custom-secondary bg-opacity-30 px-3 py-3 rounded-md hover:scale-[.98] transition-all duration-500 lg:w-4/5'>
                <div className=' flex flex-col md:flex-row gap-2'>
                    <img src={cartItem?.thumbnailImage} alt={`${cartItem?.courseName} thumbnail`} className='mx-auto md:w-24 rounded-md' />
                    <div className='flex flex-col'>
                        <Link to={`/courses/${cartItem?._id}`}><h3 className='hover:underline text-2xl font-bold text-white'>{cartItem?.courseName}</h3></Link>
                        <p className='text-base text-custom-secondary '>{cartItem?.courseDescription}</p>
                        <div>
                            <p className='text-yellow-100 font-semibold pt-2'>Ratings : 4.7</p>
                        </div>
                    </div>
                </div>
                <div className='flex flex-row justify-between md:justify-start md:flex-col'>
                    <button className='flex gap-2 py-2 px-3 rounded-md bg-pink-300 text-pink-900 items-center w-max hover:scale-[.98] transition-all duration-500' onClick={() => { 
                        handleRemoveFromCart(course.current.id)
                    }}>
                        <span><IoTrashBin /></span>
                        <span>Remove</span>
                    </button>
                    <div className=' flex md:px-6 items-center py-2 text-yellow-100 font-bold text-xl my-auto'>
                        ₹{cartItem?.price}
                    </div>
                </div>

            </div>
        </div>
    )
}
