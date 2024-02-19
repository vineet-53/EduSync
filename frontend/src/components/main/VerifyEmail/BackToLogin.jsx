import React from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { Link } from "react-router-dom"
export default function BackToLogin() {
    return (
        <Link to={"/login"} className='flex w-max gap-2  items-center'>
            <span className='px-1'><FaArrowLeftLong /></span>
            Back to login
        </Link>
    )
}
