import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
const PrivateRoute = ({children}) =>  { 
    const {token} = useSelector(state => state.auth)
    const { user }= useSelector(state => state.profile)
    if(token !== null && user !== null) { 
        // return children
        return children
    }
    else { 
        // return login
        return  <Navigate to ="/login" />
    }
}

export default PrivateRoute