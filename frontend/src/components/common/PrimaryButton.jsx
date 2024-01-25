import React from 'react';
import {FaArrowRight } from "react-icons/fa"
import { Link } from 'react-router-dom';
const PrimaryButton = ({children , isActive = false , textColor = "" , hasArrow = false  , linkto} ) => {
    return (
        <> 
            <Link to={linkto} className=''>
                <button className={`${textColor} rounded-md  text-base lg:text-xl px-1 py-2 lg:px-4 lg:py-2 flex  gap-3 hover items-center transition-all duration-500 hover:scale-95 cursor-pointer ${isActive ? "bg-yellow-100" : "bg-richblack-700"} text-[1.2rem] shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] cursor-pointer `}>
                    <p>{children}</p>
                    <span>{hasArrow ? <FaArrowRight /> : ""}</span>
                </button>
            </Link>
        </>
    );
}

export default PrimaryButton;
