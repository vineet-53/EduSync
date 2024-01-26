import React from 'react'

export default function Achievement({count , text }) {
  return (
    <div className='flex flex-col gap-1'>
        <div className='text-center w-full font-bold text-xl capitalize lg:text-2xl text-white'>{count}</div>
        <div className='text-base lg:text-xl text-custom-secondary capitalize'>{text}</div>
    </div>
  )
}
