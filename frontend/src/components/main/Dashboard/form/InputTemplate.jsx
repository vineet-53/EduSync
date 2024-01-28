import React from 'react'

export default function Input({ children , templatecss }) {
    return (
        <div className={ "flex flex-col w-full gap-1  " + templatecss + " "}>
            {children}
        </div>
    )
}
