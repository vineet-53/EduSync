import React from 'react'

export default function PersonalDiv({ label, text }) {
  return (
    <div className='flex flex-col gap-2'>
      <p className='text-custom-secondary'>{label}</p>
      <p className='text-white font-semibold'>{text ? text  : "Add" + " " +  label }</p>
    </div>
  )
}
