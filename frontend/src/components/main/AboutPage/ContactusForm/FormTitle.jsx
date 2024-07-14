import React from 'react'

export default function FormTitle({details}) {
  
  return (
    <div className={'' + details?.titlecss}>
          <h2 className='text-white py-4  text-2xl lg:text-4xl font-bold '>{details?.title}</h2>
          <p className=' text-base lg:text-xl  text-custom-secondary'>{details?.subTitle}</p>
    </div>
  )
}
