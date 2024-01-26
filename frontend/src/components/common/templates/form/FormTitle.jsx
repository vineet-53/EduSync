import React from 'react'

export default function FormTitle({title , subTitle , titlecss}) {
  return (
    <div className={'' + titlecss}>
          <h2 className='text-white py-4  text-2xl lg:text-4xl font-bold '>{title}</h2>
          <p className=' text-base lg:text-xl  text-custom-secondary'>{subTitle}</p>
    </div>
  )
}
