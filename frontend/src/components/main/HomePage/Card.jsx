import React from 'react';
import { FaUserFriends } from "react-icons/fa";
const Card = (props) => {
    const { isActive , title , subTitle , footer1 , footer2 , footer1Quantity , footer2Quantity } =  props;
    return (
        <div className={` ${isActive ? "bg-white  shadow-[12px_12px_0_0] shadow-yellow-50  text-richblack-25  " :"bg-richblack-700"}  flex flex-col lg:w-[341.33px] lg:h-[300px] p-4 justify-between gap-8`}>
            <div className='flex flex-col gap-3'>
                <h4 className={`${isActive ? "text-black": "text-white" } `}>{title}</h4>
                <p className='text-richblack-300'> {subTitle}</p>
            </div>
            <div className={` ${isActive ? "text-blue-200" : "text-richblack-300"} flex flex-col`}>
                <div className='w-full border-t-2 border-dashed border-t-richblack-400  border-b-transparent border-r-transparent border-l-transparent '>

                </div>
                <div className='flex justify-between px-2 py-3'>
                    <div className='flex items-center gap-3'>
                        <span> <FaUserFriends /></span>
                        {footer1}
                    </div>
                    <div className='flex items-center gap-3'>
                        <span className=''>{footer2Quantity}</span>

                        {footer2}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
