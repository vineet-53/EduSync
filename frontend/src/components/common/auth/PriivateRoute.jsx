import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
const PrivateRoute = ({children}) =>  { 
    const {token} = useSelector(state => state.auth)
    const { user }= useSelector(state => state.profile)
    return token === null && user === null  ? <Navigate to ="/login"/> : children
}

export default PrivateRoute