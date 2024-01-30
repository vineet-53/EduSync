import React from 'react'

export default function Label({ htmlFor, children }) {
    return <>
        <label htmlFor={htmlFor} className='text-richblack-100'>
            {children}
            <span className='text-pink-400'> *</span>
        </label >
    </>
}
