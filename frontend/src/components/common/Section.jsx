import React from 'react'

export default function Section({children , sectioncss}) {
  return (
    <section className={'w-full p-6 rounded-md bg-richblack-800 ' + sectioncss}>
        {children}
    </section>
  )
}
