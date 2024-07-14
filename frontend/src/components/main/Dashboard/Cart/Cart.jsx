import React from 'react'
import Item from "./Item"
export default function Cart() {
    return (
        <div className=''>
            <div className='grid px-3'>
                <h2 className=' text-white font-bold text-2xl'>Cart</h2>
            </div>
            <div className='flex flex-col lg:flex-row gap-2'>

                <div className='lg:w-[60%]'>
                    <Item />
                    <Item />
                    <Item />
                    <Item />
                    <Item />
                    <Item />
                </div>
                <div className='lg:w-[30%] p-2'>
                    <div className='bg-richblack-700 rounded-md text-pure-greys-200 w-[50%] max-lg:ml-auto lg:w-[70%] p-3 flex flex-col lg:gap-2'>
                        <h4>Total :</h4>
                        <p className='text-yellow-200 text-2xl font-semibold'>Rs. 4500</p>
                        <p className='line-through'> Rs. 3500</p>
                        <button className='py-2 text-black bg-yellow-200 text-semibold text-center rounded-md'>
                            Buy Now
                        </button>

                    </div>
                </div>
            </div>


        </div>
    )
}
