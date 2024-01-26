import { nanoid } from '@reduxjs/toolkit'
import React from 'react'

export default function PlanTemplate({tilte , body , tilteGradient }) {
  return (
    <div className='flex flex-col gap-2'>
        <h2 className={'text-2xl font-bold lg:text-2xl bg-clip-text bg-gradient-to-r text-transparent ' + tilteGradient}>{tilte}</h2>
        {
            body.map(body => <p key={nanoid()} className='text-sm lg:text-base text-custom-secondary w-full'>{body}</p>
            )
        }
    </div>
  )
}
