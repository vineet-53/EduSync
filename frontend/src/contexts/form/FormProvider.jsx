import React, { createContext, useContext , useState} from 'react'
const FormContext = createContext() 
export default function FormProvider({children}) {
    const [password , setPassword] = useState("")
    const [email , setEmail] = useState("")
    const [accountType , setAccountType] = useState("Student")
    const [firstName, setFirstName] = useState(""); 
    const [lastName, setLastName] = useState("");
    const [confirmPassword ,setConfirmPassword]  = useState("")
    const [phoneNumber , setPhoneNumber] = useState("")
    const [phonePrefix , setPhonePrefix] = useState("91")

    const CONTEXT_DATA = { 
        accountType,
        email , 
        password , 
        firstName ,
        lastName , 
        confirmPassword , 
        phoneNumber ,
        phonePrefix , 
        setAccountType , 
        setEmail,   
        setPassword , 
        setFirstName ,
        setLastName , 
        setConfirmPassword,
        setPhoneNumber , 
        setPhonePrefix,
    }
    return (
        <FormContext.Provider value={CONTEXT_DATA}>
            {children}
        </FormContext.Provider>
    )
}
export const useFormContext = () =>{
    return useContext(FormContext)
}

