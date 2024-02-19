import React from 'react';
import { Link } from 'react-router-dom';
import {FaArrowRight} from "react-icons/fa"
const SecondaryButton = ({children , hasArrow , linkto , buttoncss} ) => {
    return (
            <Link to={linkto}>
                <button className={'hover:scale-95 transition-all duration-200 flex  lg:items-center max-sm:items-start px-4 py-2 cursor-pointer  text-xl bg-richblack-700 text-richblack-100 rounded-full w-max h-max'  + buttoncss}>
                    {children} 
                    {hasArrow ? <span className='px-3 scale-75'><FaArrowRight/></span> : ""}
                </button>
            </Link>
    );
}

export default SecondaryButton;
