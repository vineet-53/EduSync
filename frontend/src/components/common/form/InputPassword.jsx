import React , {useContext, useState} from 'react';
import { Link } from 'react-router-dom';
import { IoMdEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
const InputPassword = (props) => {
    
    const {labelName  , forgotPassword , inputcss , placeholder , id  , value , handleEvent} = props
    const [isPasswordVisible , setPasswordVisible ] = useState(false);
    return (
        <li className='relative flex flex-col gap-2  text-richblack-100'>

            <label htmlFor={id}>{labelName}
            <span className='text-pink-400'> *</span>
            </label>   

            <input className={'bg-custom-tertiary  text-white px-4 pr-16  py-2 rounded-md '+ inputcss} type={isPasswordVisible ? "text" : "password"} value ={value} id={id} placeholder={placeholder}onChange={handleEvent}  />
            <span className='text-richblack-100 cursor-pointer absolute right-[1rem] bottom-[.5rem] ' onClick={() => setPasswordVisible(!isPasswordVisible)} >
                        {/* image */}
                        {isPasswordVisible ? <><IoMdEyeOff size ={24}/></> :<><IoMdEye size ={24}/></>}
            </span>

            { 
                forgotPassword ? (
                <>
                    <div className="w-max right-0 absolute bottom-[-2rem] text-blue-200  hover:text-blue-300">
                        <Link to="/forgot-password">
                            Forgot Password
                        </Link>
                    </div> 
                </>) : 
                ""
            
            }
        </li>
    );
}

export default InputPassword;
