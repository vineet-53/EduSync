import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
export default function OpenRoute({children}) {
    const {token} = useSelector(state => state.auth)
    const {user} = useSelector(state => state.profile)
    return ( !!token  && !!user ) ? <Navigate to ="/dashboard/my-profile" /> : children
}


