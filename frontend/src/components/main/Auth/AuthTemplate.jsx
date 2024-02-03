import React from 'react';
import { Login , Signup , Frame} from "../../../assets/index"
import FormTitle from '../../common/form/Title';
const AuthTemplate = ({ children , login = false , signup = false }) => {
    return (
        <div className='flex  bg-custom-primary min-h-screen pt-10 px-22 lg:justify-evenly'>
        <div className='lg:w-3/6 mx-auto w-4/5 md:max-w-[480px] flex  flex-col gap-5 lg:px-10 '>
                <FormTitle />
                {children}
        </div>
        <div className='w-3/6 p-10  hidden lg:block'>
            <div className='relative w-[500px] h-[500px]'>
                {login && <img src={Login} className='relative z-20 ' />}
                {signup && <img src={Login} className='relative  z-20 ' />}
                <img className='absolute top-4 left-4 z-10' src={Frame} alt="" />
            </div>
        </div>
        
    </div>
    );
}

export default AuthTemplate;
