import { nanoid } from '@reduxjs/toolkit'
import React from 'react'

export default function LearningCard({title,  body , cardcss}) {
  return (
    <div className={`py-3 px-4 h-[250px] lg:h-full ${cardcss} ${title == "Certification" ? "grid lg:col-start-2 gap-2" : "flex flex-col gap-2"} `}>
       <div>
       { 
        title.map(title => (<h3 key={nanoid()} className='text-[1.1rem] text-white lg:text-xl capitalize '>{title}</h3>))
       }
       </div>
        <p className='text-sm lg:text-base text-pure-greys-200 capitalize'>{body}</p>
    </div>
  )
}
