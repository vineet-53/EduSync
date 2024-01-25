import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
export default function OpenRoute({children}) {
    const {token} = useSelector(state => state.auth)
    return token !== null ? <Navigate to ="/dashboard/my-profile" /> : children
}


