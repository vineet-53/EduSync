import React, { useContext } from 'react'
import { useFormContext } from '../../../contexts/SignupFormProvider'
function Button({ children }) {
  const {accountType ,setAccountType} = useFormContext()
  return (
    <div className={
        `cursor-pointer  py-2 px-4 text-custom-secondary  rounded-full ${accountType === children ? "bg-custom-primary" : ""}`
    } onClick={(e) => setAccountType(e.target.innerHTML)}>{children}</div>
  ) 
}

export default Button