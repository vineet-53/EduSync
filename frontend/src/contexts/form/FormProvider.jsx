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
    const [countryCode , setCountryCode] = useState("+91")

    const CONTEXT_DATA = { 
        accountType,
        email , 
        password , 
        firstName ,
        lastName , 
        confirmPassword , 
        phoneNumber ,
        countryCode , 
        setAccountType , 
        setEmail,   
        setPassword , 
        setFirstName ,
        setLastName , 
        setConfirmPassword,
        setPhoneNumber , 
        setCountryCode,
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

