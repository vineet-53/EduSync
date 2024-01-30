import React from 'react'

export default function FormDiv({ children, templatecss }) {
    return (
        <div className={"flex flex-col w-full gap-1  " + templatecss + " "}>
            {children}
        </div>
    )
}
