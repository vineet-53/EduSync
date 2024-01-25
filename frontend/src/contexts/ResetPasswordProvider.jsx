import React, { createContext, useContext, useState } from 'react'

const ResetPasswordContext = createContext()
export const useResetPasswordContext = () => {
  return useContext(ResetPasswordContext)
}
export default function ResetPasswordProvider({ children }) {
  const [email, setEmail] = useState(null)
  const [emailSent, setEmailSent] = useState(false)
  const CONTEXT_VALUE = {
    email,
    emailSent,
    setEmail,
    setEmailSent
  }
  return (
    <ResetPasswordContext.Provider value={CONTEXT_VALUE}>
      {children}
    </ResetPasswordContext.Provider>
  )
}