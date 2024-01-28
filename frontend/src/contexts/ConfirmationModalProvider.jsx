import React, { createContext, useContext, useState } from 'react'
const ConfirmationModalCotext = createContext()
export default function ConfirmationModalProvider({children}) {
  const [confirmationModal , setConfirmationModal] = useState(null)
  
  return (
    <ConfirmationModalCotext.Provider value={{ 
      confirmationModal, 
      setConfirmationModal
    }}>
      {children}
    </ConfirmationModalCotext.Provider>
  )
}


export const useConfirmationModalContext = () => { 
  return useContext(ConfirmationModalCotext)
}