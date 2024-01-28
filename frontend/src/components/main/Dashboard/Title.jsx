import React from 'react'

export default function Title({children}) {
  return (
    <h1 className='mb-4 text-2xl max-sm:text-center lg:text-3xl font-bold text-white'>{children}</h1>
  )
}
