import React from 'react'

export default function Wrapper({children}) {
  return (
    <div className='w-11/12 pb-4 mx-auto'>
        {children}
    </div>
  )
}
